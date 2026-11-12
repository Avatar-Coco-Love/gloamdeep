// § pack: the packer the playtest (D-073) and the map preview (D-646) share. It
// turns an entry module and every module it imports into one inline script, so a
// page runs the game's real code with no build step in the game. Not part of the
// game. No dependencies.
//
// Each module becomes a function that returns its exports, in dependency
// order. It handles only the forms the code uses: `import { a, b as c } from
// './x.js'`, `export const`, `export function` and, for a file split into
// several, `export { a, b } from './x.js'` (D-362), and `import('./x.js')`, a file loaded
// later (history.js, D-868), packed in with the rest and handed over at once. Anything else stops it.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// § modules: read each file once, deps before the files that use them
const IMPORT = /^(import|export)\s*\{([^}]*)\}\s*from\s*'([^']+)';?[ \t]*$/gm;
const LATER = /\bimport\('([^']+)'\)/g; // a module loaded later, by its own call
const order = [];
const seen = new Set();
function visit(file, path = []) {
  if (path.includes(file)) throw new Error(`circular import: ${[...path, file].join(' → ')}`);
  if (seen.has(file)) return;
  seen.add(file);
  const text = readFileSync(join(ROOT, file), 'utf8');
  const imports = [...text.matchAll(IMPORT)].map(([line, kind, names, from]) => ({
    line, kind, names, file: normalize(join(dirname(file), from)).split('\\').join('/'),
  }));
  const later = [...text.matchAll(LATER)].map(([call, from]) => ({ call, file: normalize(join(dirname(file), from)).split('\\').join('/') }));
  for (const dep of [...imports, ...later]) visit(dep.file, [...path, file]);
  order.push({ file, text, imports, later });
}

// § wrap: one module as `__gd['src/x.js'] = (() => { …; return { … }; })();`
// Every name imported must be one the packer found exported, so a form it
// misses (`export const a = 1, b = 2`) stops it instead of packing undefined.
const exportsOf = {};
function wrap({ file, text, imports, later = [] }) {
  let body = text;
  for (const { call, file: dep } of later) body = body.replace(call, `Promise.resolve(__gd['${dep}'])`);
  const exported = [], bound = new Set();
  for (const { kind, names } of imports) if (kind === 'import') names.split(',').forEach((n) => bound.add(n.trim().split(/\s+/).pop()));
  for (const { line, kind, names, file: dep } of imports) {
    for (const n of names.split(',').map((n) => n.trim().split(/\s+/)[0]).filter(Boolean)) {
      if (!exportsOf[dep].includes(n)) throw new Error(`${file}: imports ${n}, which the packer found no export of in ${dep}`);
    }
    const list = names.split(',').map((n) => n.trim()).filter(Boolean);
    const fields = list.filter((n) => kind === 'import' || !bound.has(n)).map((n) => n.replace(/^(\w+)\s+as\s+(\w+)$/, '$1: $2'));
    body = body.replace(line, fields.length ? `const { ${fields.join(', ')} } = __gd['${dep}'];` : '');
    if (kind === 'export') exported.push(...list); // passed on; a name also imported is bound once
  }
  body = body.replace(/^export\s*\{([^}]*)\};?[ \t]*$/gm, (_, names) => { // a plain list, `export { a, b };` (pictures.js, D-617)
    exported.push(...names.split(',').map((n) => n.trim()).filter(Boolean));
    return '';
  });
  body = body.replace(/^export\s+(const|function)\s+(\w+)/gm, (_, kind, name) => {
    exported.push(name);
    return `${kind} ${name}`;
  });
  const left = body.match(/^\s*(import|export)\b.*$/m);
  if (left) throw new Error(`${file}: can't pack this line: ${left[0].trim()}`);
  exportsOf[file] = exported;
  return `__gd['${file}'] = (() => {\n${body}\nreturn { ${exported.join(', ')} };\n})();`;
}

// § script: (entry) → `<script type="module">…</script>`, the entry and all it imports
export function packScript(entry) {
  order.length = 0; seen.clear();
  visit(entry);
  return { code: `<script type="module">\nconst __gd = {};\n${order.map(wrap).join('\n')}\n</script>`, modules: order.length };
}
