import fs from 'node:fs/promises';
import { z } from 'zod';
import { areaIds } from './catalog.js';
import { hash } from './safety.js';
const areaId = z.string().refine(id => areaIds.has(id), 'Unknown area id');
const identifier = z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,79}$/);
export const configSchema = z.object({
    schemaVersion: z.literal(1),
    deliveryMode: z.literal('simulation-only').default('simulation-only'),
    applicability: z.record(areaId, z.object({ status: z.enum(['applicable', 'not_applicable']), reason: z.string().min(10).max(2000) }).strict()).default({}),
    features: z.array(z.object({ id: identifier, title: z.string().min(1), source: z.string().default('user-supplied requirements'), areaIds: z.array(areaId).min(1), required: z.boolean().default(true), implementation: z.enum(['present', 'missing', 'unknown']).default('unknown'), evidence: z.string().default('') }).strict()).default([]),
    runners: z.array(z.object({
        id: identifier, adapter: z.enum(['project', 'playwright', 'gitleaks', 'semgrep', 'osv']),
        sandbox: z.enum(['docker', 'macos-offline-node']),
        command: z.array(z.string().min(1).max(2000)).min(1).max(40).optional(),
        image: z.string().regex(/^(?:[-a-zA-Z0-9._/:]+@)?sha256:[a-f0-9]{64}$/).optional(),
        rules: z.string().optional(),
        harnessDirectory: z.string().min(1).optional(),
        timeoutMs: z.number().int().min(100).max(600000).default(60000),
        memoryMb: z.number().int().min(128).max(4096).default(512),
        cpus: z.number().min(0.25).max(4).default(1)
    }).strict()).max(30).default([]),
    scenarios: z.array(z.object({
        id: identifier, title: z.string().min(1), areaIds: z.array(areaId).min(1),
        featureIds: z.array(identifier).default([]), expected: z.string().min(5),
        required: z.boolean().default(true), severity: z.enum(['critical', 'high', 'medium', 'low', 'info']).default('medium'),
        evidenceType: z.enum(['observed', 'simulated', 'static_review']).default('observed'), runner: identifier
    }).strict()).max(1000).default([])
}).strict();
export function validateConfig(raw) {
    const config = configSchema.parse(raw);
    for (const list of [config.features, config.runners, config.scenarios])
        if (new Set(list.map(x => x.id)).size !== list.length)
            throw new Error('Duplicate configured identifier');
    for (const s of config.scenarios) {
        if (!config.runners.some(r => r.id === s.runner))
            throw new Error('Scenario refers to missing runner: ' + s.id);
        if (s.featureIds.some(id => !config.features.some(f => f.id === id)))
            throw new Error('Scenario refers to undeclared feature: ' + s.id);
        if (s.areaIds.some(id => config.applicability[id]?.status === 'not_applicable'))
            throw new Error('Scenario conflicts with not-applicable declaration: ' + s.id);
        if (s.areaIds.some(id => { const n = Number(id.slice(4)); return n >= 71 && n <= 82; }) && s.evidenceType !== 'simulated')
            throw new Error('External messaging/payment scenarios must be simulated');
    }
    for (const f of config.features) {
        if (f.implementation === 'missing' && f.evidence.trim().length < 10)
            throw new Error('Missing requirements need supporting evidence');
        if (f.areaIds.some(id => config.applicability[id]?.status === 'not_applicable'))
            throw new Error('Declared feature conflicts with not-applicable area');
    }
    for (const r of config.runners) {
        if (r.sandbox === 'docker' && !r.image)
            throw new Error('Docker runners require a digest-pinned image');
        if (r.sandbox === 'macos-offline-node' && r.adapter !== 'project')
            throw new Error('macOS offline sandbox only supports project Node scripts');
        if (['project', 'playwright'].includes(r.adapter) && !r.command)
            throw new Error('Runner requires a command');
        if (r.adapter === 'semgrep' && (!r.rules || r.rules.includes('..') || r.rules.startsWith('/') || r.rules.includes('://')))
            throw new Error('Semgrep requires project-relative local rules');
    }
    return config;
}
export async function loadConfig(file) {
    const raw = file ? JSON.parse(await fs.readFile(file, 'utf8')) : { schemaVersion: 1 };
    const config = validateConfig(raw);
    return { config, configHash: hash(JSON.stringify(config)) };
}
//# sourceMappingURL=config.js.map