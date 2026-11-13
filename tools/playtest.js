// § playtest: packs index.html and every module under src/ into one HTML
// file, for the private playtest Artifact (D-073). Not part of the game: the
// game itself has no build step. No dependencies.
//
//   node tools/playtest.js out.html
//
// Dev tools are on for everyone, so the playtest has them too (D-086).
//
// The packing itself is tools/pack.js, shared with the map preview (D-646).
import { readFileSync, writeFileSync } from 'node:fs';
import { writeSoundFiles } from './soundfiles.js';
import { join } from 'node:path';
import { ROOT, packScript } from './pack.js';

const ENTRY = 'src/main.js';
const TAG = `<script type="module" src="${ENTRY}"></script>`;

// § page: swap the module tag for the packed code
const out = process.argv.slice(2).find((a) => !a.startsWith('--')); // an old --dev is ignored
if (!out) {
  console.error('usage: node tools/playtest.js out.html');
  process.exit(1);
}
const page = readFileSync(join(ROOT, 'index.html'), 'utf8');
if (!page.includes(TAG)) throw new Error(`index.html has no ${TAG}`);
const { code, modules } = packScript(ENTRY);
writeFileSync(out, page.replace(TAG, () => code));
console.log(`playtest: ${modules} modules → ${out}`);
writeSoundFiles(out); // its sounds and music, to publish beside it (soundfiles.js)
