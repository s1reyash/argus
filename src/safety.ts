import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
export const hash = (text: string | Buffer): string => createHash('sha256').update(text).digest('hex');
export function inside(root: string, target: string): boolean {
  const rel = path.relative(root, target);
  return rel === '' || (!rel.startsWith('..' + path.sep) && rel !== '..' && !path.isAbsolute(rel));
}
export async function contained(root: string, target: string): Promise<string> {
  const real = await fs.realpath(path.resolve(root, target));
  if (!inside(root, real)) throw new Error('Path is outside the authorized root');
  return real;
}
export const OMIT = new Set(['node_modules', '.git', '.hg', '.svn', '.argus-runs', '.ssh', '.aws', '.azure', '.gcloud', '.venv', 'venv', 'dist', 'build', 'coverage']);
export function excluded(name: string): boolean {
  return OMIT.has(name) || /^\.env(?:\.|$)/i.test(name) || /\.(pem|key|p12|pfx|keystore)$/i.test(name) || /^(credentials|id_rsa|id_ed25519|\.npmrc|\.netrc)$/i.test(name);
}
export function redact(value: string): string {
  return value
    .replace(/-----BEGIN [^-]*PRIVATE KEY-----[\s\S]*?-----END [^-]*PRIVATE KEY-----/g, '[REDACTED PRIVATE KEY]')
    .replace(/\b(?:sk-[A-Za-z0-9_-]{12,}|gh[pousr]_[A-Za-z0-9_]{10,}|AKIA[A-Z0-9]{16}|xox[baprs]-[A-Za-z0-9-]+)\b/g, '[REDACTED TOKEN]')
    .replace(/\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g, '[REDACTED JWT]')
    .replace(/((?:authorization|api[-_]?key|access[-_]?token|refresh[-_]?token|token|password|passwd|secret|cookie|set-cookie)["']?\s*[:=]\s*)(?:"[^"\r\n]*"|'[^'\r\n]*'|[^\s,;}\r\n]+)/gi, '$1[REDACTED]')
    .replace(/\bBearer\s+[^\s"',;]+/gi, 'Bearer [REDACTED]')
    .replace(/(https?:\/\/)[^\s/@]+:[^\s/@]+@/gi, '$1[REDACTED]@')
    .replace(/([?&](?:token|key|secret|password|signature|sig)=)[^&\s"']*/gi, '$1[REDACTED]')
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[REDACTED EMAIL]')
    .replace(/\+\d[\d ()-]{7,}\d/g, '[REDACTED PHONE]');
}
export function sanitize<T>(value: T): T {
  if (typeof value === 'string') return redact(value) as T;
  if (Array.isArray(value)) return value.map(sanitize) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k,v]) => [k, /^(?:password|secret|token|authorization|cookie|apiKey)$/i.test(k) ? '[REDACTED]' : sanitize(v)])) as T;
  }
  return value;
}
export interface SourceFile { relative: string; absolute: string; content: string; }
export async function readSources(root: string, limits = { files: 3000, bytes: 20_000_000 }): Promise<{ files: SourceFile[]; truncated: boolean }> {
  const files: SourceFile[] = []; let bytes = 0; let truncated = false;
  async function walk(dir: string): Promise<void> {
    for (const ent of (await fs.readdir(dir, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name))) {
      if (excluded(ent.name) || ent.isSymbolicLink()) continue;
      if (files.length >= limits.files || bytes >= limits.bytes) { truncated = true; return; }
      const absolute = path.join(dir, ent.name);
      if (ent.isDirectory()) { await walk(absolute); continue; }
      if (!ent.isFile() || !/\.(?:[cm]?[jt]sx?|py|rb|go|rs|java|kt|swift|cs|php|sql|json|ya?ml|toml|xml|html|css|md|txt|sh|gradle|graphql|proto|lock)$|(?:Dockerfile|Makefile|Gemfile|requirements\.txt)$/i.test(ent.name)) continue;
      const stat = await fs.lstat(absolute);
      if (stat.size > 256_000) { truncated = true; continue; }
      const safe = await contained(root, absolute);
      const buffer = await fs.readFile(safe);
      if (buffer.includes(0)) continue;
      bytes += buffer.length;
      files.push({ relative: path.relative(root, safe).split(path.sep).join('/'), absolute: safe, content: buffer.toString('utf8') });
    }
  }
  await walk(root); return { files, truncated };
}
export async function snapshot(root: string, dest: string): Promise<void> {
  let bytes = 0; let count = 0;
  async function copy(dir: string, out: string): Promise<void> {
    await fs.mkdir(out, { recursive: true, mode: 0o700 });
    for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
      if (excluded(ent.name) || ent.isSymbolicLink()) continue;
      const src = path.join(dir, ent.name), target = path.join(out, ent.name);
      if (ent.isDirectory()) await copy(src, target);
      else if (ent.isFile()) {
        const st = await fs.lstat(src); bytes += st.size; count++;
        if (bytes > 100_000_000 || count > 10000) throw new Error('Snapshot limit exceeded; narrow the authorized project root');
        await contained(root, src);
        await fs.copyFile(src, target); await fs.chmod(target, 0o600);
      }
    }
  }
  await copy(root, dest);
}
export function markdown(value: string): string { return redact(value).replace(/[<>]/g, c => c === '<' ? '&lt;' : '&gt;').replace(/\|/g, '\\|').replace(/[\r\n]+/g, ' '); }
