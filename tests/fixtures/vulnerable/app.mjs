import fs from 'node:fs';
import path from 'node:path';
import { createHmac, timingSafeEqual } from 'node:crypto';
export const apiKey = 'sk-argus-synthetic-only-000000'; // deliberately fake fixture credential
export function login(password) { return Boolean(password); }
export function readRecord(actor, record) { return record.value; }
export function validateProfile(input) { return {name:input.name}; }
export function save(value) { globalThis.cached=value; }
export function reload() { return null; }
export function chatHistory(events) { return events; }
export function emailState(event) { return 'delivered'; }
export function whatsappState(event) { return 'delivered'; }
export function otpValid(issued, now) { return true; }
export function webhook(payload, signature, key) { return JSON.parse(payload); }
export function applyEvent(state, event) { return event; }
export function grantsAccess(payment) { return Boolean(payment.id); }
export function charge(existing, key) { const id='charge-'+existing.size; existing.set(id,id); return id; }
export async function providerFallback(call) { return await call(); }
