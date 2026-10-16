import path from 'node:path';
import fs from 'node:fs/promises';
import { catalog, areaById } from './catalog.js';
import { hash, readSources, sanitize } from './safety.js';
import type { Config } from './config.js';
import type { Coverage, Feature, Finding, Inspection } from './types.js';

const rules = [
  {id:'embedded-credential', area:'ARG-033', re: /(?:api[_-]?key|secret|password|access[_-]?token)\s*[:=]\s*["'](?!\$\{|process\.|example|test|fake|REPLACE|placeholder)[^"'\r\n]{8,}["']/i, title:'Possible embedded credential', severity:'high' as const},
  {id:'private-key', area:'ARG-033', re:/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, title:'Private key material in inspected source', severity:'high' as const},
  {id:'disabled-tls', area:'ARG-034', re:/(?:rejectUnauthorized\s*:\s*false|verify\s*=\s*False|NODE_TLS_REJECT_UNAUTHORIZED\s*=\s*["']?0)/, title:'Certificate verification appears disabled', severity:'high' as const},
  {id:'wildcard-cors', area:'ARG-058', re:/(?:Access-Control-Allow-Origin["']?\s*[:,=]\s*["']\*|origin\s*:\s*(?:true|["']\*["']))/i, title:'Broad cross-origin policy needs review', severity:'medium' as const},
  {id:'dynamic-eval', area:'ARG-055', re:/\beval\s*\(/, title:'Dynamic evaluation requires input tracing', severity:'medium' as const},
  {id:'unsafe-html', area:'ARG-056', re:/dangerouslySetInnerHTML|\.innerHTML\s*=/, title:'HTML insertion requires sanitization review', severity:'medium' as const}
];

export async function inspectProject(rootInput: string, config: Config, execute = false): Promise<Inspection> {
  const root = await fs.realpath(rootInput);
  if (!(await fs.stat(root)).isDirectory()) throw new Error('Authorized root must be a directory');
  const sources = await readSources(root), files=sources.files;
  let truncated=sources.truncated;
  const harnesses=[];
  for(const runner of config.runners) if(runner.harnessDirectory) {
    const source=await readSources(await fs.realpath(runner.harnessDirectory));
    truncated ||= source.truncated;
    harnesses.push(runner.id+':'+hash(source.files.map(f=>f.relative+':'+hash(f.content)).join('\n')));
  }
  const revision = hash(files.map(f => f.relative + ':' + hash(f.content)).join('\n')+'\n'+harnesses.join('\n'));
  const features: Feature[] = config.features.map(f => ({...f, origin:'declared'}));
  const findings: Finding[] = [];
  for(const f of config.features.filter(f=>f.implementation==='missing')) {
    const fingerprint=hash('missing:'+f.id);
    findings.push({id:'finding-'+fingerprint.slice(0,16),fingerprint,areaIds:f.areaIds,featureIds:[f.id],title:'Missing requirement: '+f.title,kind:'missing_requirement',severity:f.required?'high':'low',confidence:'high',location:f.source,expected:f.title,observed:'Owner/agent declared this requirement unimplemented.',evidence:f.evidence,reproduction:'Compare the cited requirement with the identified implementation gap.',likelyCause:'The required behavior has not been implemented or connected.',remediation:'Implement the confirmed acceptance criteria and connect the end-to-end workflow.',verification:'Add positive, negative and role-specific acceptance scenarios for '+f.id});
  }
  const matches = new Map<string, Set<string>>(catalog.map(a => [a.id,new Set<string>()]));
  for (const f of files) {
    const lower = (f.relative + '\n' + f.content).toLowerCase();
    const ids = catalog.filter(a => a.signals.some(s => lower.includes(s.toLowerCase()))).map(a => a.id);
    for (const id of ids) matches.get(id)!.add(f.relative);
    // A source module is a candidate feature, never a claim that discovery is exhaustive.
    if (!/(?:lock|\.test\.|\.spec\.|test\/|tests\/)/i.test(f.relative) && !features.some(x=>x.origin==='declared' && x.source===f.relative) && features.length < 500) {
      features.push({id:'file-' + hash(f.relative).slice(0,12), title:'Inspect module: ' + f.relative, source:f.relative, areaIds:ids.length ? ids : ['ARG-001'], origin:'discovered', required:false});
    }
    if (!/\.(?:[cm]?[jt]sx?|py|rb|go|java|kt|cs|php|yaml|yml|toml|json)$/i.test(f.relative)) continue;
    for (const rule of rules) {
      const match = rule.re.exec(f.content); if (!match) continue;
      const line = f.content.slice(0, match.index).split('\n').length;
      const area = areaById(rule.area);
      const fingerprint = hash(rule.id + ':' + f.relative);
      findings.push({id:'finding-' + fingerprint.slice(0,16),fingerprint,areaIds:[rule.area],featureIds:features.filter(x=>x.source===f.relative).map(x=>x.id),title:rule.title,kind:'suspected_weakness',severity:rule.severity,confidence:'medium',location:f.relative+':'+line,expected:area.expectedOutcome,observed:'A source pattern matched. Reachability and exploitability are not established.',evidence:'Rule '+rule.id+' matched at '+f.relative+':'+line+'; raw matched values are deliberately omitted.',reproduction:'Inspect the indicated location and trace the data flow in an isolated fixture.',likelyCause:'Potential unsafe configuration or trust-boundary handling; source review required.',remediation:area.remediation,verification:area.verification});
    }
  }
  const areas: Coverage[] = catalog.map(a => {
    const explicit = config.applicability[a.id];
    const scenarios = config.scenarios.filter(s=>s.areaIds.includes(a.id));
    const detected = matches.get(a.id)!;
    const conflictingFinding=explicit?.status==='not_applicable' && findings.some(f=>f.areaIds.includes(a.id));
    const applicability = conflictingFinding?'applicable':explicit?.status ?? (detected.size || scenarios.length || features.some(f=>f.origin==='declared' && f.areaIds.includes(a.id)) ? 'applicable':'unknown');
    const reason = conflictingFinding?'Source evidence conflicts with a configured exclusion; review the finding and applicability.':explicit?.reason ?? (detected.size ? 'Candidate signals in: ' + [...detected].slice(0,4).join(', ') + '. Agent must confirm scope.' : scenarios.length ? 'Configured acceptance scenarios.' : 'No sufficient discovery evidence; absence of a signal does not establish irrelevance.');
    return {id:a.id,title:a.title,applicability,reason,outcome:applicability==='not_applicable'?'not_applicable':'not_run',scenarioIds:scenarios.map(s=>s.id),evidenceTypes:[]};
  });
  const proposedScenarios = areas.filter(a=>a.applicability!=='not_applicable').map(a => {
    const rule = areaById(a.id), associated = features.filter(f=>f.areaIds.includes(a.id));
    return {id:'proposal-'+a.id,areaId:a.id,featureIds:associated.map(f=>f.id),target:associated.slice(0,3).map(f=>f.source).join(', ') || 'Scope must be established by the agent',failureExample:rule.failureExamples[0]!,expected:rule.expectedOutcome,steps:rule.testApproaches,prerequisites:rule.prerequisites};
  });
  if(features.length>=500) truncated=true;
  return sanitize({root,revision,filesScanned:files.length,truncated,features,areas,scenarios:config.scenarios,proposedScenarios,findings,
    limitations:['Discovery uses bounded source and documentation signals, not complete semantic analysis. Confirm requirements and expand candidate modules into user journeys.','Ignored: secrets files, symlinks, dependencies, Git history, generated builds and binary artifacts. Inspect those separately when in scope.','No credential, provider or production connection is attempted. Real delivery remains unverified.',...(truncated?['Source limits reached or oversized files omitted; coverage is incomplete.']:[])],
    capabilities:{node:process.versions.node,platform:process.platform,executionEnabled:execute,sandbox:process.platform==='darwin'?'macOS offline Node or Docker required':'Docker required for application execution',runners:config.runners.map(r=>r.id)}});
}
