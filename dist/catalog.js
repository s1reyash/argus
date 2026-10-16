import { readFileSync } from 'node:fs';
export const VERSION = '0.1.0-draft';
export const catalog = JSON.parse(readFileSync(new URL('../references/catalog.json', import.meta.url), 'utf8')).areas;
if (catalog.length !== 101 || new Set(catalog.map(a => a.id)).size !== 101 || catalog.some((a, i) => a.number !== i + 1))
    throw new Error('Invalid 101-area catalog');
export const areaIds = new Set(catalog.map(a => a.id));
export const areaById = (id) => { const area = catalog.find(a => a.id === id); if (!area)
    throw new Error('Unknown area identifier'); return area; };
//# sourceMappingURL=catalog.js.map