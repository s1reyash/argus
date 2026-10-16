import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';

test('stdio MCP negotiates protocol and serves all five scoped tools, catalog and prompt',async t=>{
  const dir=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'argus-mcp-')));
  t.after(()=>fs.rm(dir,{recursive:true,force:true}));
  const root=path.join(dir,'app');await fs.mkdir(root);await fs.writeFile(path.join(root,'app.mjs'),'export const value=1;');
  const transport=new StdioClientTransport({command:process.execPath,args:[path.resolve('dist/cli.js'),'mcp','--root',root,'--out',path.join(dir,'reports')],stderr:'pipe'});
  const client=new Client({name:'argus-test-client',version:'1.0.0'});
  t.after(()=>client.close());await client.connect(transport);
  const listing=await client.listTools();assert.deepEqual(listing.tools.map(x=>x.name).sort(),['cancel_run','compare_runs','get_run','inspect_project','run_checkup']);
  const parse=r=>{assert.notEqual(r.isError,true,JSON.stringify(r));return JSON.parse(r.content[0].text);};
  const inspect=parse(await client.callTool({name:'inspect_project',arguments:{}}));assert.equal(inspect.areas.length,101);assert.equal(inspect.root,root);assert.equal(inspect.capabilities.executionEnabled,false);
  const resources=await client.listResources();assert.equal(resources.resources[0].uri,'argus://catalog');
  const catalog=await client.readResource({uri:'argus://catalog'});assert.equal(JSON.parse(catalog.contents[0].text).areas.length,101);
  const prompts=await client.listPrompts();assert.ok(prompts.prompts.some(p=>p.name==='audit'));
  const prompt=await client.getPrompt({name:'audit'});assert.match(prompt.messages[0].content.text,/101/);
  async function run() {
    const started=parse(await client.callTool({name:'run_checkup',arguments:{profile:'full'}}));
    let result;
    for(let i=0;i<100;i++) {result=parse(await client.callTool({name:'get_run',arguments:{runId:started.runId,detail:'full'}}));if(result.status!=='running')return result;await new Promise(r=>setTimeout(r,20));}
    throw new Error('MCP run did not finish');
  }
  const first=await run();assert.equal(first.readiness,'incomplete');assert.equal(first.realExternalDelivery,'unverified');
  const cancellation=parse(await client.callTool({name:'cancel_run',arguments:{runId:first.id}}));assert.equal(cancellation.cancellationRequested,false);
  const second=await run();const delta=parse(await client.callTool({name:'compare_runs',arguments:{before:first.id,after:second.id}}));assert.equal(delta.sameRevision,true);
  const outside=await client.callTool({name:'get_run',arguments:{runId:'../../outside'}});assert.equal(outside.isError,true);
  const noRoot=listing.tools.find(x=>x.name==='inspect_project').inputSchema;assert.ok(!noRoot.properties?.root);
});
