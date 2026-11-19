// § code size: no code file under src/ passes 20 KB (H-99), but those listed here, each already
// over when the list was made. The list only shrinks: a file split under 20 KB comes off it, and
// none is added; a file that grows past 20 KB is split by topic instead (lines.js, frame.js).
// The version history's files are left out: release.js gives each 50 versions (D-982).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';

const CAP = 20 * 1024;
const OVER = [ // already over 20 KB at 0.3.424; take a file off once it is split
  'src/core/bagturn.js', 'src/core/cave.js', 'src/core/creatureturn.js', 'src/core/enemies.js',
  'src/core/items.js', 'src/core/room.js', 'src/core/tiles.js', 'src/core/turn.js',
  'src/input/screens.js', 'src/main.js', 'src/render/bag.js', 'src/render/cloak.js',
  'src/render/frame.js', 'src/render/pictures-finds.js', 'src/render/pictures.js',
  'src/render/sprites.js',
];
const code = readdirSync('src', { recursive: true }).filter((f) => f.endsWith('.js') && !/(^|\/)history-/.test(f)).map((f) => `src/${f}`);

test('no code file passes 20 KB but those already listed (H-99)', () => {
  const over = code.filter((f) => statSync(f).size > CAP && !OVER.includes(f));
  assert.deepEqual(over, [], 'split these by topic, as lines.js and frame.js were');
});

test('the list of big code files only shrinks: each listed file is still there and over 20 KB', () => {
  const gone = OVER.filter((f) => !code.includes(f) || statSync(f).size <= CAP);
  assert.deepEqual(gone, [], 'take these off OVER in tests/codesize.test.js');
});
