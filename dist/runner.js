import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { contained, redact, snapshot } from './safety.js';
async function command(executable, argv, options) {
    if (options.signal.aborted)
        return { code: null, output: '', stopped: 'cancelled' };
    return new Promise(resolve => {
        let output = '', stopped = '', finished = false;
        const child = spawn(executable, argv, { cwd: options.cwd, env: options.env, stdio: ['ignore', 'pipe', 'pipe'], detached: process.platform !== 'win32', shell: false });
        const kill = (reason) => {
            if (finished)
                return;
            stopped = reason;
            try {
                if (process.platform !== 'win32' && child.pid)
                    process.kill(-child.pid, 'SIGKILL');
                else
                    child.kill('SIGKILL');
            }
            catch { /* process already exited */ }
        };
        const onAbort = () => kill('cancelled');
        const timer = setTimeout(() => kill('execution timeout'), options.timeout);
        options.signal.addEventListener('abort', onAbort, { once: true });
        const collect = (chunk) => {
            if (Buffer.byteLength(output) + chunk.length > 1_000_000) {
                kill('output limit exceeded');
                return;
            }
            output += chunk.toString('utf8');
        };
        child.stdout.on('data', collect);
        child.stderr.on('data', collect);
        function finish(code, error) {
            if (finished)
                return;
            finished = true;
            clearTimeout(timer);
            options.signal.removeEventListener('abort', onAbort);
            resolve({ code, output: redact((error ? error + '\n' : '') + output), stopped });
        }
        child.on('error', err => finish(null, err.message));
        child.on('close', (code, signal) => finish(code, signal ? 'Process terminated by ' + signal : undefined));
    });
}
function adapterCommand(r) {
    if (r.adapter === 'gitleaks')
        return ['gitleaks', 'dir', '/project', '--report-format', 'json', '--report-path', '/work/result.json', '--redact=100', '--no-banner'];
    if (r.adapter === 'semgrep')
        return ['semgrep', 'scan', '--config', '/project/' + r.rules, '--metrics', 'off', '--disable-version-check', '--json', '--output', '/work/result.json', '/project'];
    if (r.adapter === 'osv')
        return ['osv-scanner', 'scan', 'source', '--recursive', '/project', '--offline', '--format', 'json', '--output', '/work/result.json'];
    return r.command;
}
function blocked(scenarios, observed, durationMs) {
    return scenarios.map(s => ({ ...s, evidenceType: 'unverified', outcome: 'blocked', observed, evidence: 'No passing execution evidence. ' + observed, durationMs }));
}
export function parseAdapterResults(raw, r, scenarios, execution, elapsed) {
    const obj = raw;
    if (r.adapter === 'project') {
        if (!obj || !Array.isArray(obj.results))
            throw new Error('Project runner must write {results:[...]}');
        const ids = obj.results.map((x) => x?.id);
        if (ids.some((id) => typeof id !== 'string') || new Set(ids).size !== ids.length)
            throw new Error('Invalid or duplicate scenario result identifiers');
        return scenarios.map(s => {
            const record = obj.results.find((x) => x.id === s.id);
            if (!record)
                return blocked([s], 'Runner omitted the configured scenario result', elapsed)[0];
            if (!['passed', 'failed', 'blocked'].includes(record.status) || typeof record.observed !== 'string' || !record.observed.trim() || typeof record.evidence !== 'string' || !record.evidence.trim())
                throw new Error('Invalid scenario evidence record');
            if (record.status === 'passed' && execution.code !== 0)
                return blocked([s], 'Runner exited unsuccessfully despite reporting a pass', elapsed)[0];
            return { ...s, evidenceType: record.status === 'blocked' ? 'unverified' : s.evidenceType, outcome: record.status, observed: redact(record.observed).slice(0, 8000), evidence: redact(record.evidence).slice(0, 12000), durationMs: elapsed };
        });
    }
    if (r.adapter === 'playwright') {
        const specs = [];
        function walk(suites) { for (const suite of suites) {
            specs.push(...(suite.specs ?? []));
            walk(suite.suites ?? []);
        } }
        if (!obj || !Array.isArray(obj.suites))
            throw new Error('Expected Playwright JSON reporter output');
        walk(obj.suites);
        return scenarios.map(s => {
            // Match [scenario-id] in the test title. A flaky, skipped or unexpected test is not a pass.
            const found = specs.filter(x => typeof x.title === 'string' && x.title.includes('[' + s.id + ']'));
            if (!found.length)
                return blocked([s], 'No Playwright test matched [' + s.id + ']', elapsed)[0];
            const tests = found.flatMap(x => x.tests ?? []);
            const passed = tests.length > 0 && tests.every(t => t.status === 'expected' && t.expectedStatus === 'passed' && t.results?.length === 1 && t.results[0]?.status === 'passed');
            const failed = tests.some(t => t.status === 'unexpected' || t.status === 'flaky' || t.results?.some((x) => ['failed', 'timedOut', 'interrupted'].includes(x.status)));
            const outcome = passed && execution.code === 0 ? 'passed' : failed ? 'failed' : 'blocked';
            return { ...s, evidenceType: outcome === 'blocked' ? 'unverified' : s.evidenceType, outcome, observed: passed && execution.code === 0 ? 'Matched Playwright assertions passed once without retry.' : 'Matched tests failed, were flaky, skipped, or did not complete successfully.', evidence: 'Playwright JSON report; matched specs: ' + found.length, durationMs: elapsed };
        });
    }
    let count = 0;
    if (r.adapter === 'gitleaks') {
        if (!Array.isArray(obj))
            throw new Error('Invalid Gitleaks JSON');
        count = obj.length;
    }
    if (r.adapter === 'semgrep') {
        if (!obj || !Array.isArray(obj.results))
            throw new Error('Invalid Semgrep JSON');
        if (obj.errors?.length)
            throw new Error('Semgrep reported incomplete/error results');
        count = obj.results.length;
    }
    if (r.adapter === 'osv') {
        if (!obj || !Array.isArray(obj.results))
            throw new Error('Invalid OSV JSON');
        count = obj.results.reduce((n, x) => n + (x.packages ?? []).reduce((m, p) => m + (p.vulnerabilities ?? []).length, 0), 0);
    }
    if (!count && execution.code !== 0)
        throw new Error('Scanner failed; no clean result established');
    return scenarios.map(s => ({ ...s, evidenceType: 'static_review', outcome: count ? 'failed' : 'passed', observed: count + ' scanner findings in this bounded scan; findings require agent triage.', evidence: redact(JSON.stringify(obj)).slice(0, 12000), durationMs: elapsed }));
}
export async function runIsolated(root, runner, scenarios, signal) {
    const start = Date.now();
    const scratch = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'argus-run-')));
    await fs.chmod(scratch, 0o700);
    const project = path.join(scratch, 'project'), work = path.join(scratch, 'work');
    const container = 'argus-' + randomUUID();
    let usedDocker = false;
    try {
        await fs.mkdir(work, { mode: 0o700 });
        await snapshot(root, project);
        if (runner.harnessDirectory) {
            const harness = await fs.realpath(runner.harnessDirectory);
            const target = path.join(project, '.argus-harness');
            if (await fs.lstat(target).catch(() => null))
                throw new Error('Reserved .argus-harness directory conflicts with project content');
            await snapshot(harness, target);
        }
        if (signal.aborted)
            return blocked(scenarios, 'Cancelled before execution', Date.now() - start);
        let execution;
        if (runner.sandbox === 'macos-offline-node') {
            if (process.platform !== 'darwin')
                return blocked(scenarios, 'macOS offline sandbox is unavailable on this platform', Date.now() - start);
            const argv = runner.command;
            if (argv[0] !== 'node' || !argv[1] || argv[1].startsWith('-') || !/\.[cm]?js$/.test(argv[1]))
                throw new Error('Offline Node runner requires [node, relative-script.js, ...args]');
            const script = await contained(project, argv[1]);
            const node = await fs.realpath(process.execPath);
            const quote = (v) => JSON.stringify(v);
            const policy = '(version 1)\n(deny default)\n' +
                '(allow process-exec (literal ' + quote(node) + '))\n' +
                '(allow process-info* (target self))\n(allow sysctl-read)\n(allow file-read-metadata)\n' +
                '(allow file-read* (literal "/") (subpath "/System") (subpath "/usr/lib") (subpath "/usr/share") (subpath "/Library/Apple") (subpath "/dev") (literal ' + quote(node) + ') (subpath ' + quote(project) + ') (subpath ' + quote(work) + '))\n' +
                '(allow file-write* (subpath ' + quote(work) + ') (literal "/dev/null"))\n';
            const profile = path.join(scratch, 'profile.sb');
            await fs.writeFile(profile, policy, { mode: 0o600 });
            execution = await command('/usr/bin/sandbox-exec', ['-f', profile, node, '--max-old-space-size=' + runner.memoryMb, script, ...argv.slice(2)], { cwd: project, env: { PATH: path.dirname(node), HOME: work, TMPDIR: work, ARGUS_RESULT_FILE: path.join(work, 'result.json'), ARGUS_DELIVERY_MODE: 'simulation-only' }, timeout: runner.timeoutMs, signal });
        }
        else {
            usedDocker = true;
            const cmd = adapterCommand(runner);
            execution = await command('docker', ['run', '--name', container, '--rm', '--pull=never', '--network=none', '--read-only', '--cap-drop=ALL', '--security-opt=no-new-privileges', '--pids-limit=128', '--memory=' + runner.memoryMb + 'm', '--cpus=' + runner.cpus, '--user=' + String(process.getuid?.() ?? 1000) + ':' + String(process.getgid?.() ?? 1000), '--tmpfs', '/tmp:rw,noexec,nosuid,size=128m', '--mount', 'type=bind,src=' + project + ',dst=/project,readonly', '--mount', 'type=bind,src=' + work + ',dst=/work', '--workdir', '/project', '--env', 'HOME=/work', '--env', 'ARGUS_RESULT_FILE=/work/result.json', '--env', 'PLAYWRIGHT_JSON_OUTPUT_NAME=/work/result.json', '--env', 'ARGUS_DELIVERY_MODE=simulation-only', runner.image, ...cmd], { cwd: scratch, env: { PATH: process.env.PATH }, timeout: runner.timeoutMs, signal });
        }
        if (execution.stopped)
            return blocked(scenarios, execution.stopped, Date.now() - start);
        const outputFile = path.join(work, 'result.json');
        const stat = await fs.lstat(outputFile).catch(() => null);
        if (!stat || !stat.isFile() || stat.isSymbolicLink() || stat.size > 2_000_000)
            return blocked(scenarios, 'No bounded regular result file (exit ' + execution.code + '). ' + execution.output.slice(0, 1500), Date.now() - start);
        const raw = JSON.parse(await fs.readFile(outputFile, 'utf8'));
        return parseAdapterResults(raw, runner, scenarios, execution, Date.now() - start);
    }
    catch (error) {
        return blocked(scenarios, redact(error instanceof Error ? error.message : String(error)), Date.now() - start);
    }
    finally {
        if (usedDocker)
            await command('docker', ['rm', '--force', container], { cwd: scratch, env: { PATH: process.env.PATH }, timeout: 5000, signal: new AbortController().signal });
        await fs.rm(scratch, { recursive: true, force: true });
    }
}
//# sourceMappingURL=runner.js.map