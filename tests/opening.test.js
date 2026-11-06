// § opening card (D-628): a new journey opens on its first words, then play
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { OPENING, OPENING_BUTTON, openingWords } from '../src/core/opening.js';
import { openingAt } from '../src/render/openingcard.js';
import { textWidth } from '../src/render/font.js';
import { W, H } from '../src/render/screen.js';
import { PAD } from '../src/render/bag.js';
import { modeCard } from '../src/input/cards/mode.js';
import { openingCard } from '../src/input/cards/opening.js';
import { MODE_MENU } from '../src/core/menu.js';

test('the words: three sentences, then Begin, and the same for the screen reader', () => {
  assert.deepEqual(OPENING, ['You wake in the dark of the crypt.', 'Your lantern still burns, but its oil will not last.', 'Something waits below.']);
  assert.equal(OPENING_BUTTON, 'Begin');
  assert.ok(openingWords().startsWith(OPENING.join(' ')));
});

test('picking a way to play opens the first words, not play', () => {
  const shown = [], made = [];
  const card = modeCard({ screen: 'mode', chosen: 0 }, { newJourney: (id) => made.push(id) }, (sc) => shown.push(sc), { menuOf: () => MODE_MENU, titleAt: () => {} });
  card.pick(0);
  assert.deepEqual(made, [MODE_MENU[0].id]);
  assert.deepEqual(shown, ['opening']);
});

test('Enter, a tap anywhere or Esc begins; a held press and an arrow do nothing', () => {
  const shown = [], card = openingCard({}, {}, (sc) => shown.push(sc));
  card.dir('down'); card.tap(5, 5, true);
  assert.deepEqual(shown, []);
  card.pick(0); card.tap(5, 5, false); card.close();
  assert.deepEqual(shown, ['play', 'play', 'play']);
});

test('the card fits the smallest screen and the widest, every line inside it', () => {
  for (const [vw, vh] of [[W, H], [400, 220]]) {
    const card = openingAt(vw, vh);
    assert.ok(card.x >= 0 && card.y >= 0 && card.x + card.w <= vw && card.y + card.h <= vh, `${vw}×${vh}`);
    for (const line of card.lines.flat()) assert.ok(textWidth(line) <= card.w - 2 * PAD, line);
    assert.equal(card.lines.flat().join(' '), OPENING.join(' '));
  }
});
