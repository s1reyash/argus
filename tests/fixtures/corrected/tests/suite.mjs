import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as app from '../app.mjs';
const results=[];
async function check(id, fn) {
 try { await fn(); results.push({id,status:'passed',observed:'Expected acceptance assertion held.',evidence:'Independent fixture assertions executed for '+id}); }
 catch(error) {results.push({id,status:'failed',observed:error.message,evidence:'Assertion failed in '+id});}
}
await check('login',()=>assert.equal(app.login('wrong-fixture'),false));
await check('tenant-isolation',()=>assert.throws(()=>app.readRecord({id:'alice',tenant:'one'},{owner:'bob',tenant:'two',value:'synthetic-private'})));
await check('field-validation',()=>assert.throws(()=>app.validateProfile({})));
await check('durability',()=>{app.save({name:'synthetic'});assert.deepEqual(app.reload(),{name:'synthetic'});});
await check('chat-dedupe',()=>assert.deepEqual(app.chatHistory([{id:'b',seq:2},{id:'a',seq:1},{id:'a',seq:1}]).map(e=>e.id),['a','b']));
await check('email-state',()=>{assert.equal(app.emailState('accepted'),'queued');assert.equal(app.emailState('bounced'),'failed');});
await check('whatsapp-state',()=>assert.equal(app.whatsappState('template_rejected'),'failed'));
await check('sms-expiry',()=>assert.equal(app.otpValid(0,60000),false));
await check('webhook-auth',()=>assert.throws(()=>app.webhook('{"paid":true}','forged','fixture-signing-key')));
await check('webhook-order',()=>assert.equal(app.applyEvent({sequence:2},{sequence:1}).sequence,2));
await check('payment-failure',()=>assert.equal(app.grantsAccess({id:'p1',status:'failed'}),false));
await check('duplicate-payment',()=>{const store=new Map();assert.equal(app.charge(store,'same'),app.charge(store,'same'));assert.equal(store.size,1);});
await check('outage-fallback',async()=>assert.equal((await app.providerFallback(async()=>{throw new Error('simulated outage');})).status,'unavailable'));
await check('export-feature',()=>{assert.equal(typeof app.exportCSV,'function');assert.match(app.exportCSV([{name:'fixture'}]),/fixture/);});
fs.writeFileSync(process.env.ARGUS_RESULT_FILE,JSON.stringify({results}));
if(results.some(r=>r.status==='failed'))process.exitCode=1;
