import fs from 'node:fs/promises';
import path from 'node:path';
import {catalog} from '../dist/catalog.js';
import {loadConfig} from '../dist/config.js';
const root=path.resolve(import.meta.dirname,'..');
const errors=[];
const sources=JSON.parse(await fs.readFile(path.join(root,'references/sources.json'),'utf8')).sources;
for(const area of catalog)for(const id of area.references)if(!sources.some(s=>s.id===id))errors.push('Unresolved standard reference: '+id);
if(catalog.length!==101 || new Set(catalog.map(a=>a.id)).size!==101)errors.push('Catalog must have 101 unique areas');
for(const a of catalog)for(const key of ['applicability','prerequisites','failureExamples','testApproaches','expectedOutcome','evidenceRequirements','remediation','verification'])if(!a[key]?.length)errors.push(`${a.id} lacks ${key}`);
const all=[];async function walk(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){if(['node_modules','dist','.git'].includes(entry.name))continue;const file=path.join(dir,entry.name);if(entry.isDirectory())await walk(file);else all.push(file);}}await walk(root);
for(const file of all.filter(f=>f.endsWith('.md'))){const text=await fs.readFile(file,'utf8');for(const m of text.matchAll(/\]\(([^)]+)\)/g)){const href=m[1].split('#')[0];if(!href||/^(?:https?:|mailto:)/.test(href))continue;const target=path.resolve(path.dirname(file),href);if(!await fs.stat(target).catch(()=>null))errors.push('Broken link: '+path.relative(root,file)+' -> '+href);}}
for(const name of ['SKILL.md','README.md','LICENSE','NOTICE','CONTRIBUTING.md','SECURITY.md','docs/compatibility.md','docs/limitations.md','references/execution.md','references/sources.json'])if(!await fs.stat(path.join(root,name)).catch(()=>null))errors.push('Missing '+name);
await loadConfig(path.join(root,'examples/fixture.config.json'));
console.log(JSON.stringify({catalogAreas:catalog.length,checkedFiles:all.length,errors},null,2));
if(errors.length)process.exitCode=1;
