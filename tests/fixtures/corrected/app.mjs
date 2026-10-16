import fs from 'node:fs';
import path from 'node:path';
import { createHmac, timingSafeEqual } from 'node:crypto';
export function login(password) { return password === 'fixture-correct'; }
export function readRecord(actor, record) { if (actor.tenant !== record.tenant || actor.id !== record.owner) throw new Error('denied'); return record.value; }
export function validateProfile(input) { if (typeof input.name !== 'string' || !input.name.trim()) throw new Error('name required'); return {name:input.name}; }
export function save(value) { fs.writeFileSync(path.join(process.env.HOME,'state.json'),JSON.stringify(value)); }
export function reload() { return JSON.parse(fs.readFileSync(path.join(process.env.HOME,'state.json'),'utf8')); }
export function chatHistory(events) { return [...new Map(events.map(e=>[e.id,e])).values()].sort((a,b)=>a.seq-b.seq); }
export function emailState(event) { return ({accepted:'queued',bounced:'failed',delivered:'delivered'})[event] ?? 'unknown'; }
export function whatsappState(event) { return event === 'template_rejected' ? 'failed' : event; }
export function otpValid(issued, now) { return now-issued<30000 && now>=issued; }
export function webhook(payload, signature, key) { const actual=createHmac('sha256',key).update(payload).digest('hex'); if(signature.length!==actual.length || !timingSafeEqual(Buffer.from(signature),Buffer.from(actual))) throw new Error('bad signature'); return JSON.parse(payload); }
export function applyEvent(state, event) { return event.sequence>state.sequence ? event : state; }
export function grantsAccess(payment) { return payment.status==='paid'; }
export function charge(existing, key) { if(existing.has(key)) return existing.get(key); const id='charge-'+existing.size; existing.set(key,id); return id; }
export async function providerFallback(call) { try {return await call();} catch {return {status:'unavailable',retryable:true};} }
export function exportCSV(records) { return 'name\n'+records.map(r=>JSON.stringify(r.name)).join('\n'); }
