import { markdown as m } from './safety.js';
import type { Run } from './types.js';
export function reportMarkdown(run: Run): string {
  const lines=['# Argus application audit', '', '**Readiness:** '+run.readiness+'  ', '**Run:** '+run.id+'  ', '**Status:** '+run.status+'  ', '**Source fingerprint:** '+run.revision+'  ', '**Configuration fingerprint:** '+run.configHash+'  ', '**Profile:** '+run.profile, '', 'Real external message/payment delivery: **unverified**. External providers are simulated. Passing scenarios establish only the tested behavior.', '', '## Findings', ''];
  if(!run.findings.length) lines.push('No findings were produced by the checks that ran. Read the coverage gaps below.','');
  for(const f of run.findings) lines.push('### '+m(f.severity.toUpperCase()+' — '+f.title),'', '- Kind / confidence: '+f.kind+' / '+f.confidence, '- Areas: '+f.areaIds.join(', '),'- Location: '+m(f.location),'- Expected: '+m(f.expected),'- Observed: '+m(f.observed),'- Evidence: '+m(f.evidence),'- Reproduce: '+m(f.reproduction),'- Likely cause: '+m(f.likelyCause),'- Fix: '+m(f.remediation),'- Verify: '+m(f.verification),'');
  lines.push('## Feature register','','| Feature | Origin | Areas | Scenarios / gap |','|---|---|---|---|');
  for(const f of run.inspection.features) {
    const actual=run.results.filter(r=>r.featureIds.includes(f.id));
    lines.push('| '+m(f.id+': '+f.title)+' | '+f.origin+' | '+f.areaIds.join(', ')+' | '+m(actual.length?actual.map(r=>r.id+': '+r.outcome).join('; '):'VERIFICATION GAP: no executed scenario mapped to this feature')+' |');
  }
  lines.push('','## 101-area coverage','','A passed area means its configured scenarios passed; it does not establish exhaustive coverage of all possible inputs. Unknown applicability remains incomplete.','','| Area | Applicability | Outcome | Evidence type | Reason |','|---|---|---|---|---|');
  for(const a of run.areas) lines.push('| '+m(a.id+' '+a.title)+' | '+a.applicability+' | '+a.outcome+' | '+a.evidenceTypes.join(', ')+' | '+m(a.reason)+' |');
  lines.push('','## Scenario results','','| Scenario | Outcome | Evidence | Observation |','|---|---|---|---|');
  for(const r of run.results) lines.push('| '+m(r.id+': '+r.title)+' | '+r.outcome+' | '+r.evidenceType+' | '+m(r.observed)+' |');
  lines.push('','## Limitations and errors','',...run.inspection.limitations.map(x=>'- '+m(x)),...run.errors.map(x=>'- '+m(x)),'','## Suggested next steps','','Resolve failed required journeys first. Confirm suspected security findings by tracing the affected source. Supply missing acceptance scenarios or infrastructure for blocked and untested features. Treat optional product improvements separately from confirmed requirements.','');
  return lines.join('\n');
}
export function compareRuns(before: Run, after: Run): object {
  if(before.inspection.root!==after.inspection.root) throw new Error('Cannot compare runs from different authorized projects');
  const prior=new Map(before.findings.map(f=>[f.fingerprint,f]));
  const current=new Map(after.findings.map(f=>[f.fingerprint,f]));
  const resolved:string[]=[], noLongerVerified:string[]=[];
  for(const f of before.findings) if(!current.has(f.fingerprint)) {
    const priorResult=before.results.find(r=>f.id==='scenario-'+r.id);
    const verified=priorResult && before.configHash===after.configHash && after.status==='completed' && after.results.some(r=>r.id===priorResult.id && r.outcome==='passed' && r.expected===priorResult.expected && r.evidenceType===priorResult.evidenceType);
    (verified?resolved:noLongerVerified).push(f.id);
  }
  return {before:before.id,after:after.id,sameRevision:before.revision===after.revision,configurationChanged:before.configHash!==after.configHash,new:after.findings.filter(f=>!prior.has(f.fingerprint)).map(f=>f.id),recurring:after.findings.filter(f=>prior.has(f.fingerprint)).map(f=>f.id),resolved,noLongerVerified,unverifiedScenarios:before.results.filter(r=>!after.results.some(x=>x.id===r.id && ['passed','failed'].includes(x.outcome))).map(r=>r.id),note:'Absent static warnings are not treated as proven fixes. Resolution requires a matching passing scenario with unchanged expected behavior and evidence type.'};
}
