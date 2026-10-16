// Keep the standalone catalog generated from the engine's canonical references.
import {readFile, writeFile} from 'node:fs/promises';
const check = process.argv.includes('--check');
for (const name of ['catalog.json', 'catalog.md', 'sources.json']) {
  const source = new URL('../references/' + name, import.meta.url);
  const target = new URL('../skills/argus/references/' + name, import.meta.url);
  const content = await readFile(source);
  if (check) {
    if (!content.equals(await readFile(target))) throw new Error('Skill catalog drift: ' + name);
  } else await writeFile(target, content);
}
console.log(check ? 'Standalone catalog matches canonical references.' : 'Standalone catalog synchronized.');
