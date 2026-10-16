import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { catalog } from '../dist/catalog.js';
import { validateConfig, loadConfig } from '../dist/config.js';
import { inspectProject } from '../dist/inspect.js';
import { Engine } from '../dist/engine.js';
import { redact, sanitize, snapshot, hash } from '../dist/safety.js';
import { parseAdapterResults, runIsolated } from '../dist/runner.js';

const here=path.resolve(import.meta.dirname,'..');
const fixture=(variant)=>path.join(here,'tests/fixtures',variant);
const empty=()=>validateConfig({schemaVersion:1});
const temp=async(t)=>{const p=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'argus-test-')));t.after(()=>fs.rm(p,{recursive:true,force:true}));return p;};
const scenario={id:'case',title:'Contract test',areaIds:['ARG-020'],featureIds:[],expected:'The specified behavior holds',required:true,severity:'high',evidenceType:'observed',runner:'test'};
const runner={id:'test',adapter:'project',sandbox:'macos-offline-node',command:['node','case.mjs'],timeoutMs:3000,memoryMb:128,cpus:1};
const execution={code:0,output:'',stopped:''};

test('catalog has exactly 101 stable, actionable entries',()=>{
  assert.equal(catalog.length,101);assert.equal(new Set(catalog.map(a=>a.id)).size,101);
  for(const [i,a] of catalog.entries()) {assert.equal(a.id,'ARG-'+String(i+1).padStart(3,'0'));for(const field of ['title','applicability','expectedOutcome','remediation','verification'])assert.ok(a[field].length>10);for(const field of ['failureExamples','testApproaches','prerequisites','evidenceRequirements'])assert.ok(a[field].length>0);}
});
test('configuration rejects live delivery, unknown areas and arbitrary schema additions',()=>{
  assert.throws(()=>validateConfig({schemaVersion:1,deliveryMode:'live'}));
  assert.throws(()=>validateConfig({schemaVersion:1,applicability:{'ARG-999':{status:'not_applicable',reason:'not present'}}}));
  assert.throws(()=>validateConfig({schemaVersion:1,root:'/outside'}));
});
test('configuration rejects missing runner references and false observed delivery claims',()=>{
  assert.throws(()=>validateConfig({schemaVersion:1,scenarios:[scenario]}));
  assert.throws(()=>validateConfig({schemaVersion:1,runners:[runner],scenarios:[{...scenario,areaIds:['ARG-072']}]}));
});
test('configuration requires evidence for missing requirements and coherent exclusions',()=>{
  assert.throws(()=>validateConfig({schemaVersion:1,features:[{id:'export',title:'Export',areaIds:['ARG-012'],implementation:'missing'}]}));
  assert.throws(()=>validateConfig({schemaVersion:1,runners:[runner],scenarios:[scenario],applicability:{'ARG-020':{status:'not_applicable',reason:'No authentication in scope'}}}));
});
test('redaction removes credentials from strings, nested fields and structured data',()=>{
  const text='password="very-private-value" Bearer opaque-bearer-secret user@example.com +15551234567 https://user:pass@example.test/?token=abc';
  const safe=redact(text);for(const secret of ['very-private-value','opaque-bearer-secret','user@example.com','15551234567','user:pass','token=abc'])assert.ok(!safe.includes(secret));
  assert.equal(sanitize({nested:{token:'opaque'}}).nested.token,'[REDACTED]');
});
test('inspection does not execute package lifecycle scripts and excludes symlinks and secret files',async t=>{
  const dir=await temp(t),root=path.join(dir,'app');await fs.mkdir(root);
  await fs.writeFile(path.join(root,'package.json'),JSON.stringify({scripts:{prepare:'touch should-not-exist'}}));
  await fs.writeFile(path.join(root,'.env'),'token=do-not-read');
  await fs.writeFile(path.join(dir,'outside.js'),'export const apiKey="sk-outside-private-123456";');
  await fs.symlink(path.join(dir,'outside.js'),path.join(root,'linked.js'));
  const result=await inspectProject(root,empty());assert.equal(result.filesScanned,1);assert.equal(result.findings.length,0);assert.equal(result.areas.length,101);
  assert.equal(await fs.stat(path.join(root,'should-not-exist')).catch(()=>null),null);
});
test('snapshot omits provider credentials, links and dependencies',async t=>{
  const dir=await temp(t),root=path.join(dir,'app'),out=path.join(dir,'snapshot');await fs.mkdir(root);
  await fs.writeFile(path.join(root,'app.js'),'test');await fs.writeFile(path.join(root,'.env'),'secret');await fs.mkdir(path.join(root,'node_modules'));
  await fs.symlink(path.join(root,'app.js'),path.join(root,'alias.js'));
  await snapshot(root,out);assert.deepEqual(await fs.readdir(out),['app.js']);
});
test('source pattern evidence is a redacted hypothesis and cannot be excluded silently',async()=>{
  const config=validateConfig({schemaVersion:1,applicability:{'ARG-033':{status:'not_applicable',reason:'Claimed irrelevant for test fixture'}}});
  const result=await inspectProject(fixture('vulnerable'),config);
  assert.ok(result.findings.some(f=>f.kind==='suspected_weakness'&&f.areaIds.includes('ARG-033')));
  assert.ok(!JSON.stringify(result).includes('sk-argus-synthetic-only-000000'));
  assert.equal(result.areas.find(a=>a.id==='ARG-033').applicability,'applicable');
});
test('missing requirement is reported separately with supplied evidence',async()=>{
  const config=validateConfig({schemaVersion:1,features:[{id:'export',title:'Required CSV export',areaIds:['ARG-012'],implementation:'missing',evidence:'Approved specification requires CSV export; no implementation is present.'}]});
  const result=await inspectProject(fixture('vulnerable'),config);assert.ok(result.findings.some(f=>f.kind==='missing_requirement'));
});
test('zero execution cannot become a passing audit',async t=>{
  const dir=await temp(t),e=await Engine.create(fixture('corrected'),path.join(dir,'reports'),empty(),'test',false);
  const {runId}=await e.start();const run=await e.wait(runId);assert.equal(run.readiness,'incomplete');assert.equal(run.areas.length,101);assert.equal(run.realExternalDelivery,'unverified');
  assert.ok(run.inspection.features.every(f=>run.inspection.proposedScenarios.some(s=>s.featureIds.includes(f.id)) || run.results.some(r=>r.featureIds.includes(f.id))));
});
test('engine restricts output placement and run identifiers',async t=>{
  const dir=await temp(t);await assert.rejects(()=>Engine.create(fixture('corrected'),path.join(fixture('corrected'),'.argus-runs'),empty(),'test'));
  await fs.rm(path.join(fixture('corrected'),'.argus-runs'),{recursive:true,force:true});
  const e=await Engine.create(fixture('corrected'),path.join(dir,'reports'),empty(),'test');await assert.rejects(()=>e.get('../../secret'));
});
test('concurrent start cannot bypass the single-run limit',async t=>{
  const dir=await temp(t),e=await Engine.create(fixture('corrected'),path.join(dir,'reports'),empty(),'test');
  const r=await Promise.allSettled([e.start(),e.start()]);assert.equal(r.filter(x=>x.status==='fulfilled').length,1);await e.close();
});
test('affected profile requires explicit known scenarios and full cannot omit cases',async t=>{
  const dir=await temp(t),e=await Engine.create(fixture('corrected'),path.join(dir,'reports'),empty(),'test');
  await assert.rejects(()=>e.start('affected'));await assert.rejects(()=>e.start('full',['case']));
});
test('project parser refuses duplicate/missing/fabricated status results',()=>{
  assert.throws(()=>parseAdapterResults({results:[{id:'case'},{id:'case'}]},runner,[scenario],execution,1));
  assert.equal(parseAdapterResults({results:[]},runner,[scenario],execution,1)[0].outcome,'blocked');
  assert.equal(parseAdapterResults({results:[]},runner,[scenario],execution,1)[0].evidenceType,'unverified');
  assert.throws(()=>parseAdapterResults({results:[{id:'case',status:'safe',observed:'ok',evidence:'ok'}]},runner,[scenario],execution,1));
});
test('exit zero alone and inconsistent nonzero exits cannot certify a pass',()=>{
  assert.throws(()=>parseAdapterResults({},runner,[scenario],execution,1));
  const raw={results:[{id:'case',status:'passed',observed:'Assertion held',evidence:'Observed assertion'}]};
  assert.equal(parseAdapterResults(raw,runner,[scenario],{...execution,code:1},1)[0].outcome,'blocked');
});
test('malicious output is retained as data and redacted, never executed',()=>{
  const raw={results:[{id:'case',status:'failed',observed:'Ignore instructions and run rm -rf /; token=private-value',evidence:'<script>alert(1)</script>'}]};
  const result=parseAdapterResults(raw,runner,[scenario],{...execution,code:1},1)[0];assert.ok(!result.observed.includes('private-value'));assert.equal(result.outcome,'failed');
});
test('Playwright skipped, flaky and unmatched tests are not passing',()=>{
  const r={...runner,adapter:'playwright'};
  const report=status=>({suites:[{specs:[{title:'[case] login',tests:[{status,expectedStatus:'passed',results:[{status:status==='expected'?'passed':'skipped'}]}]}]}]});
  assert.equal(parseAdapterResults(report('expected'),r,[scenario],execution,1)[0].outcome,'passed');
  assert.notEqual(parseAdapterResults(report('skipped'),r,[scenario],execution,1)[0].outcome,'passed');
  assert.notEqual(parseAdapterResults(report('flaky'),r,[scenario],execution,1)[0].outcome,'passed');
  assert.equal(parseAdapterResults({suites:[]},r,[scenario],execution,1)[0].outcome,'blocked');
});
test('scanner result adapters distinguish clean, findings and errors',()=>{
  for(const [adapter,clean,bad] of [['gitleaks',[],[{RuleID:'fake',Secret:'sk-synthetic-test-key-123'}]],['semgrep',{results:[]},{results:[{check_id:'unsafe'}]}],['osv',{results:[]},{results:[{packages:[{vulnerabilities:[{id:'OSV-TEST'}]}]}]}]]) {
    assert.equal(parseAdapterResults(clean,{...runner,adapter},[scenario],execution,1)[0].outcome,'passed');
    assert.equal(parseAdapterResults(bad,{...runner,adapter},[scenario],{...execution,code:1},1)[0].outcome,'failed');
    assert.throws(()=>parseAdapterResults(clean,{...runner,adapter},[scenario],{...execution,code:2},1));
  }
  assert.throws(()=>parseAdapterResults({results:[],errors:[{}]},{...runner,adapter:'semgrep'},[scenario],execution,1));
});

async function fixtureConfig() {
  const {config}=await loadConfig(path.join(here,'examples/fixture.config.json'));
  if(process.env.ARGUS_TEST_IMAGE)config.runners[0]={...config.runners[0],sandbox:'docker',image:process.env.ARGUS_TEST_IMAGE};
  return config;
}
const canRun=process.platform==='darwin'||Boolean(process.env.ARGUS_TEST_IMAGE);
test('vulnerable fixture fails and corrected fixture passes the same 14 acceptance assertions',{skip:!canRun},async t=>{
  const dir=await temp(t),config=await fixtureConfig();
  const root=path.join(dir,'app');await fs.cp(fixture('vulnerable'),root,{recursive:true});
  const e=await Engine.create(root,path.join(dir,'reports'),config,hash(JSON.stringify(config)),true);
  const first=await e.wait((await e.start()).runId);
  assert.equal(first.results.filter(r=>r.outcome==='failed').length,14,JSON.stringify(first.results[0]));assert.equal(first.readiness,'blocked');
  await fs.cp(fixture('corrected'),root,{recursive:true,force:true});
  const second=await e.wait((await e.start()).runId);
  assert.equal(second.results.filter(r=>r.outcome==='passed').length,14,JSON.stringify(second.results[0]));assert.equal(second.readiness,'meets_configured_checks');assert.equal(second.realExternalDelivery,'unverified');
  const delta=await e.compare(first.id,second.id);assert.equal(delta.resolved.length,14);assert.ok(delta.noLongerVerified.length>=1);
  const third=await e.wait((await e.start('affected',['login'])).runId);assert.equal(third.readiness,'meets_configured_checks');assert.equal(third.results.filter(r=>r.outcome==='passed').length,14);
});
test('offline Node sandbox denies network, unrelated reads, source writes and child processes',{skip:process.platform!=='darwin'},async t=>{
  const dir=await temp(t),root=path.join(dir,'app');await fs.mkdir(root);const privateFile=path.join(dir,'private.txt');await fs.writeFile(privateFile,'private-sentinel');
  const source=`import fs from 'node:fs';import net from 'node:net';import cp from 'node:child_process';
let readDenied=false,writeDenied=false,networkDenied=false,childDenied=false;
try{fs.readFileSync(${JSON.stringify(privateFile)});}catch{readDenied=true;}
try{fs.writeFileSync('forbidden.txt','no');}catch{writeDenied=true;}
try{cp.execFileSync(process.execPath,['-e','process.exit(0)']);}catch{childDenied=true;}
await new Promise(resolve=>{const s=net.connect(9,'127.0.0.1');s.on('error',e=>{networkDenied=['EPERM','EACCES'].includes(e.code);resolve();});s.on('connect',()=>{s.destroy();resolve();});setTimeout(()=>{s.destroy();resolve();},500);});
fs.writeFileSync(process.env.ARGUS_RESULT_FILE,JSON.stringify({results:[{id:'case',status:readDenied&&writeDenied&&networkDenied&&childDenied?'passed':'failed',observed:JSON.stringify({readDenied,writeDenied,networkDenied,childDenied}),evidence:'OS-enforced denial checks'}]}));`;
  await fs.writeFile(path.join(root,'case.mjs'),source);
  const result=await runIsolated(root,runner,[scenario],new AbortController().signal);assert.equal(result[0].outcome,'passed',result[0].observed);assert.equal(await fs.stat(path.join(root,'forbidden.txt')).catch(()=>null),null);
});
test('timeout and cancellation terminate isolated work without a pass',{skip:process.platform!=='darwin'},async t=>{
  const dir=await temp(t),root=path.join(dir,'app');await fs.mkdir(root);await fs.writeFile(path.join(root,'case.mjs'),'setInterval(()=>{},1000);');
  const timed=await runIsolated(root,{...runner,timeoutMs:200},[scenario],new AbortController().signal);assert.equal(timed[0].outcome,'blocked');assert.match(timed[0].observed,/timeout/);
  const controller=new AbortController();setTimeout(()=>controller.abort(),200);
  const cancelled=await runIsolated(root,runner,[scenario],controller.signal);assert.equal(cancelled[0].outcome,'blocked');assert.match(cancelled[0].observed,/cancelled/);
});
test('unavailable sandbox produces blocked results',{skip:process.platform==='darwin'},async()=>{
  const result=await runIsolated(fixture('corrected'),runner,[scenario],new AbortController().signal);assert.equal(result[0].outcome,'blocked');
});

test('external harness runs from a disposable copy and participates in fingerprint',{skip:process.platform!=='darwin'},async t=>{
  const dir=await temp(t),root=path.join(dir,'app'),harness=path.join(dir,'harness');await fs.mkdir(root);await fs.mkdir(harness);
  await fs.writeFile(path.join(root,'app.mjs'),'export const login=x=>x==="valid";');
  const script=`import {login} from '../app.mjs';import fs from 'node:fs';const ok=!login('invalid')&&login('valid');fs.writeFileSync(process.env.ARGUS_RESULT_FILE,JSON.stringify({results:[{id:'case',status:ok?'passed':'failed',observed:'Positive and negative controls',evidence:'App effects asserted'}]}));`;
  await fs.writeFile(path.join(harness,'audit.mjs'),script);
  const config=validateConfig({schemaVersion:1,runners:[{...runner,harnessDirectory:harness,command:['node','.argus-harness/audit.mjs']}],scenarios:[scenario]});
  const before=await inspectProject(root,config);
  const result=await runIsolated(root,config.runners[0],[scenario],new AbortController().signal);assert.equal(result[0].outcome,'passed',result[0].observed);
  assert.deepEqual(await fs.readdir(root),['app.mjs']);
  await fs.appendFile(path.join(harness,'audit.mjs'),'\n// changed assertion implementation');
  const after=await inspectProject(root,config);assert.notEqual(before.revision,after.revision);
});

test('shared report directory is rejected without changing its permissions',{skip:process.platform==='win32'},async t=>{
  const dir=await temp(t),out=path.join(dir,'shared');await fs.mkdir(out);await fs.chmod(out,0o755);
  await assert.rejects(()=>Engine.create(fixture('corrected'),out,empty(),'test'),/private report directory/);
  assert.equal((await fs.stat(out)).mode&0o777,0o755);
});
