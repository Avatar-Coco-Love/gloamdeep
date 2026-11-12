import { core } from './h.mjs';
const r = await core('registry');
const kinds = {}; for (const e of r.ALL) (kinds[e.kind] ??= []).push(e.id);
for (const [k, v] of Object.entries(kinds)) console.log(k, v.length, k === 'item' || k === 'enemy' ? '' : v.join(' '));
const names = {}; for (const e of r.ALL) (names[e.kind + ':' + e.name] ??= []).push(e.id);
console.log('dup names:', Object.entries(names).filter(([, v]) => v.length > 1).map(([k, v]) => `${k}=${v.join('|')}`).join('; '));
