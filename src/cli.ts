#!/usr/bin/env node
import { parseArgs } from 'node:util';
import path from 'node:path';
import os from 'node:os';
import { catalog, VERSION } from './catalog.js';
import { loadConfig } from './config.js';
import { Engine } from './engine.js';
import { serve } from './mcp.js';
import { hash, redact, sanitize } from './safety.js';

const HELP='Argus '+VERSION+'\n\n'+
  'argus catalog [--area ARG-001]\n'+
  'argus inspect --root PATH [--config FILE] [--out DIRECTORY]\n'+
  'argus run --root PATH [--config FILE] [--out DIRECTORY] [--execute]\n'+
  'argus run ... --profile affected --scenarios case-one,case-two\n'+
  'argus get RUN_ID --root PATH --out DIRECTORY\n'+
  'argus compare BEFORE AFTER --root PATH --out DIRECTORY\n'+
  'argus mcp --root PATH [--config FILE] [--out DIRECTORY] [--execute]\n\n'+
  'Execution is disabled unless --execute is supplied at startup. No automatic configuration discovery.\n'+
  'Reports must be outside the application root. Default: private temporary state directory.\n'+
  'Exit codes for run: 0 configured checks met; 1 findings/required test failures; 2 incomplete/error.\n';

async function main():Promise<void> {
  const {values,positionals}=parseArgs({allowPositionals:true,options:{root:{type:'string'},out:{type:'string'},config:{type:'string'},execute:{type:'boolean'},profile:{type:'string'},scenarios:{type:'string'},area:{type:'string'},help:{type:'boolean'},version:{type:'boolean'}}});
  const cmd=positionals[0];
  const print=(value:unknown):void=>{process.stdout.write(JSON.stringify(sanitize(value),null,2)+'\n');};
  if(values.version){process.stdout.write(VERSION+'\n');return;}
  if(values.help || !cmd){process.stdout.write(HELP);return;}
  if(cmd==='catalog'){const areas=values.area?catalog.filter(a=>a.id===values.area):catalog;if(!areas.length)throw new Error('Unknown area');print(areas);return;}
  if(!['inspect','run','get','compare','mcp'].includes(cmd))throw new Error('Unknown command; use --help');
  if(!values.root)throw new Error('--root is required; Argus never guesses authorized project scope');
  const {config,configHash}=await loadConfig(values.config);
  const out=values.out??path.join(os.tmpdir(),'argus-state-'+String(process.getuid?.()??'user'),hash(path.resolve(values.root)).slice(0,16));
  const engine=await Engine.create(values.root,out,config,configHash,values.execute??false);
  if(cmd==='mcp') {
    const server=await serve(engine);
    let closing=false;
    const close=async()=>{if(closing)return;closing=true;await engine.close();await server.close();};
    process.on('SIGINT',()=>void close().then(()=>process.exit(0)));
    process.on('SIGTERM',()=>void close().then(()=>process.exit(0)));
    process.stdin.on('end',()=>void close().then(()=>process.exit(0)));
    return;
  }
  if(cmd==='inspect'){print(await engine.inspect());return;}
  if(cmd==='get'){if(!positionals[1])throw new Error('Run id is required');print(await engine.get(positionals[1]));return;}
  if(cmd==='compare'){if(!positionals[1]||!positionals[2])throw new Error('Two run ids are required');print(await engine.compare(positionals[1],positionals[2]));return;}
  const profile=values.profile??'full';if(profile!=='full'&&profile!=='affected')throw new Error('Profile must be full or affected');
  const {runId}=await engine.start(profile,values.scenarios?.split(',').filter(Boolean));
  const onSignal=()=>void engine.cancel(runId);process.on('SIGINT',onSignal);process.on('SIGTERM',onSignal);
  const run=await engine.wait(runId);process.off('SIGINT',onSignal);process.off('SIGTERM',onSignal);
  print({id:run.id,status:run.status,readiness:run.readiness,report:path.join(engine.out,run.id+'.md'),json:path.join(engine.out,run.id+'.json'),realExternalDelivery:run.realExternalDelivery,findings:run.findings.length});
  process.exitCode=run.readiness==='meets_configured_checks'?0:run.readiness==='blocked'?1:2;
}
main().catch(error=>{process.stderr.write(redact(error instanceof Error?error.message:String(error))+'\n');process.exitCode=2;});
