// § imports: a name another file exports, used in a file, must be imported or made there.
// 0.3.424's split of frame.js left 13 names behind (LANTERN, torchLights and more); the
// frame's safety net (D-557) only logged it, so the dark went undrawn in play and no test
// failed (found at H-73, D-988). Plain text, no parser: comments, strings and property
// names are skipped, and a name declared in the file in any way counts as made there.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const files = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (p.endsWith('.js')) files.push(p); } };
walk('src');

// the code without comments, strings or template text (a template's ${ } kept)
function bare(src) {
  let out = '', i = 0;
  const depth = [];
  while (i < src.length) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
    if (c === '/' && d === '*') { i = src.indexOf('*/', i + 2) + 2; continue; }
    if (c === "'" || c === '"') { i++; while (src[i] !== c) i += src[i] === '\\' ? 2 : 1; i++; out += '""'; continue; }
    if (c === '`' || (c === '}' && depth.at(-1) === 0)) {
      if (c === '}') depth.pop();
      i++;
      while (src[i] !== '`' && !(src[i] === '$' && src[i + 1] === '{')) i += src[i] === '\\' ? 2 : 1;
      if (src[i] === '`') { i++; out += '""'; } else { i += 2; depth.push(0); out += ' '; }
      continue;
    }
    if (depth.length && c === '{') depth[depth.length - 1]++;
    if (depth.length && c === '}') depth[depth.length - 1]--;
    out += c; i++;
  }
  return out;
}

const code = Object.fromEntries(files.map((f) => [f, bare(readFileSync(f, 'utf8'))]));
const exported = new Set();
for (const c of Object.values(code)) {
  for (const m of c.matchAll(/export\s+(?:async\s+)?(?:const|let|var|function\*?|class)\s+([\w$]+)/g)) exported.add(m[1]);
  for (const m of c.matchAll(/export\s*\{([^}]*)\}/g)) for (const n of m[1].split(',')) { const w = n.trim().split(/\s+as\s+/).pop(); if (w) exported.add(w); }
}

// § made: imported, or passed on from another file; declared; or named in a parameter list or a destructuring
const esc = (name) => name.replace('$', '\\$');
const imported = (c, name) => new RegExp(`(?:import|export)\\s*\\{[^}]*(?<![\\w$])${esc(name)}(?![\\w$])`).test(c);
const declared = (c, name) => new RegExp(`\\b(?:const|let|var|function\\*?|class)\\s+${esc(name)}(?![\\w$])`).test(c)
  || new RegExp(`,\\s*${esc(name)}\\s*=(?![=>])`).test(c) // a later one in `const a = 1, b = 2`
  || new RegExp(`\\blet\\s+[\\w$\\s,]*(?<![\\w$])${esc(name)}(?![\\w$])[\\w$\\s,]*;`).test(c); // `let a, b;`
const listed = new Map();
function lists(c) { // every parameter list and destructuring pattern's text
  if (!listed.has(c)) {
    const found = [];
    for (const re of [/\(([^()]*)\)\s*=>/g, /function\*?\s*[\w$]*\s*\(([^\n;]*?)\)\s*\{/g, /[\w$]+\s*\(([^\n;]*?)\)\s*\{/g, /\b(?:const|let|var)\s*([{[][^=;]*?)\s*=/g, /catch\s*\(([^()]*)\)/g]) {
      for (const m of c.matchAll(re)) found.push(m[1]);
    }
    for (const m of c.matchAll(/(?<![\w$.])([\w$]+)\s*=>/g)) found.push(m[1]);
    listed.set(c, found);
  }
  return listed.get(c);
}
// a name in a list, not a key (`{ key: name }`), a property or a default value's
const namedIn = (list, name) => new RegExp(`(?<![\\w$]|(?<!\\.\\.)\\.|=\\s*)${esc(name)}(?![\\w$])(?!\\s*:)`).test(list);

test('every exported name a file uses is imported or made there', () => {
  const missing = [];
  for (const [f, c] of Object.entries(code)) {
    const words = new Set([...c.matchAll(/[\w$]+/g)].map((m) => m[0]));
    for (const name of words) {
      if (!exported.has(name)) continue;
      const used = new RegExp(`(?<![\\w$]|(?<!\\.\\.)\\.)${esc(name)}(?![\\w$])(?!\\s*:(?!:))(?!\\s*\\([^()]*\\)\\s*\\{)`, 'g');
      if (![...c.matchAll(used)].length) continue; // only as a property, an object key or a method
      if (imported(c, name) || declared(c, name) || lists(c).some((l) => namedIn(l, name))) continue;
      missing.push(`${f}: ${name}`);
    }
  }
  assert.deepEqual(missing, []);
});
