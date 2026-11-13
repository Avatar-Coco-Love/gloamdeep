// § soundfiles: the sound files a page fetches from sounds/packs/ (D-773), which must be published
// beside it or it plays nothing. Every sound's files and every music theme's, as the Artifact
// tool's `files` list: [{ path, contentType }]. The playtest and the sound board write it next to
// their page as <page>.files.json. Not part of the game.
import { writeFileSync } from 'node:fs';
import { FILES, MUSIC } from '../src/render/sound.js';

export function soundFiles() {
  const all = new Set();
  for (const v of Object.values(FILES)) for (const f of v.files || []) all.add(f);
  for (const m of Object.values(MUSIC)) if (m.file) all.add(m.file);
  return [...all].map((f) => ({ path: `sounds/packs/${f}`, contentType: 'audio/ogg' }));
}

// Writes the list beside the page and says so
export function writeSoundFiles(page) {
  const list = soundFiles(), at = page.replace(/\.html?$/, '') + '.files.json';
  writeFileSync(at, JSON.stringify(list));
  console.log(`  ${list.length} sound files to publish beside it as \`files\` → ${at}`);
}
