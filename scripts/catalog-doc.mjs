import fs from 'node:fs/promises';
const catalog=JSON.parse(await fs.readFile(new URL('../references/catalog.json',import.meta.url),'utf8'));
const lines=['# Argus 101-area catalog','','Generated from `catalog.json`. Edit the JSON source, then run `npm run catalog`. Stable IDs must not be renumbered. These are Argus guidance, not an official certification checklist.','','## Index',''];
for(const a of catalog.areas)lines.push(`- [${a.id}: ${a.title}](#${a.id.toLowerCase()})`);
for(const a of catalog.areas)lines.push('',`## ${a.id}`,'',`**${a.title}** (${a.group})`,'',`Applicability: ${a.applicability}`,'','Prerequisites: '+a.prerequisites.join('; '),'','Failure examples: '+a.failureExamples.join(' '),'',...a.testApproaches.map(x=>'- '+x),'',`Expected: ${a.expectedOutcome}`,'','Evidence: '+a.evidenceRequirements.join('; '),'',`Remediation: ${a.remediation}`,'',`Verify: ${a.verification}`,'','References: '+(a.references.join(', ')||'Argus functional guidance.'));
await fs.writeFile(new URL('../references/catalog.md',import.meta.url),lines.join('\n')+'\n');
console.log(`Generated ${catalog.areas.length} catalog entries.`);
