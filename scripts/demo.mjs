import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {Engine} from '../dist/engine.js';
import {loadConfig} from '../dist/config.js';
import {hash} from '../dist/safety.js';
import {reportMarkdown} from '../dist/report.js';
const base=path.resolve(import.meta.dirname,'..');
const workspace=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'argus-demo-')));
const output=path.join(base,'examples/reports');
let engine;
try {
  const root=path.join(workspace,'synthetic-app');
  await fs.cp(path.join(base,'tests/fixtures/vulnerable'),root,{recursive:true});
  const {config}=await loadConfig(path.join(base,'examples/fixture.config.json'));
  if(process.env.ARGUS_TEST_IMAGE)config.runners[0]={...config.runners[0],sandbox:'docker',image:process.env.ARGUS_TEST_IMAGE};
  engine=await Engine.create(root,path.join(workspace,'state'),config,hash(JSON.stringify(config)),true);
  const vulnerable=await engine.wait((await engine.start()).runId);
  await fs.cp(path.join(base,'tests/fixtures/corrected'),root,{recursive:true,force:true});
  const corrected=await engine.wait((await engine.start()).runId);
  const comparison=await engine.compare(vulnerable.id,corrected.id);
  await fs.mkdir(output,{recursive:true});
  for(const [name,run] of [['vulnerable',vulnerable],['corrected',corrected]]) {
    // Export synthetic evidence with local paths anonymized. Raw report storage is private.
    const safe=JSON.parse(JSON.stringify(run).split(root).join('/synthetic-fixture'));
    await fs.writeFile(path.join(output,name+'.json'),JSON.stringify(safe,null,2)+'\n');
    await fs.writeFile(path.join(output,name+'.md'),reportMarkdown(safe));
  }
  await fs.writeFile(path.join(output,'comparison.json'),JSON.stringify(comparison,null,2)+'\n');
  const result={argus:'0.1.0-draft',node:process.versions.node,platform:process.platform,vulnerableFailed:vulnerable.results.filter(r=>r.outcome==='failed').length,correctedPassed:corrected.results.filter(r=>r.outcome==='passed').length,realExternalDelivery:corrected.realExternalDelivery,resolved:comparison.resolved.length};
  await fs.writeFile(path.join(output,'demo-validation.json'),JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result,null,2));
  if(result.vulnerableFailed!==14 || result.correctedPassed!==14 || result.resolved!==14)process.exitCode=2;
} finally {await engine?.close();await fs.rm(workspace,{recursive:true,force:true});}
