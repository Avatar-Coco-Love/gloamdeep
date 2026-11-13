// § lit brazier (L1 step 2, D-893): a cold brazier bumped with the lantern lit asks Light the
// brazier?, Yes lighting it for 5 turns' oil, grey with less; with the lantern out it says its words.
// Lit, it burns with a campfire's embers' glow and says its own words; the door's notches count it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { makeRoom, tileAt } from '../src/core/room.js';
import { makeState, kindle, canKindle, panelBeside } from '../src/core/turn.js';
import { TAKE_ASKS } from '../src/core/menu.js';
import { glowsIn } from '../src/core/stairs.js';
import { OIL } from '../src/core/oil.js';

const MAP = ['#####', '#.j.#', '#####'];
const at = (over = {}) => ({ ...makeState(makeRoom(MAP, undefined, 'crypt'), { x: 1, y: 1 }), ...over });

test('the lit Brazier: solid, light passing, burning with a campfire\'s embers\' glow, its words', () => {
  const t = get('brazierLit');
  assert.equal(t.name, 'Brazier'); assert.ok(t.solid && !t.blocksLight && t.fire);
  assert.deepEqual(t.glow, get('campfireEmbers').glow);
  assert.deepEqual(LINES[t.bump].texts, ['A brazier, burning.', 'Its flame burns steady.']);
});

test('a cold brazier with the lantern lit opens Light the brazier?, its first words on the text line; out, no card', () => {
  assert.deepEqual(panelBeside(at(), 'right'), { x: 2, y: 1 });
  assert.deepEqual(TAKE_ASKS.brazier, ['Light the brazier?', 'Old ash lies in its bowl.']);
  assert.equal(LINES[get('brazier').says].text, 'A cold stone brazier.');
  assert.equal(panelBeside(at({ lit: false }), 'right'), null);
  assert.equal(panelBeside(at({ lit: false }), 'right', true), null);
});

test('Yes grey with less than 5 turns\' oil; lit, it burns, 5 turns\' oil and a turn gone, with its line', () => {
  assert.equal(canKindle(at({ oil: 5 * OIL.burn }), 2, 1), true);
  assert.equal(canKindle(at({ oil: 4.9 * OIL.burn }), 2, 1), false);
  const s = at({ oil: 0.5 }), lit = kindle(s, 2, 1);
  assert.equal(tileAt(lit.room, 2, 1).id, 'brazierLit');
  assert.equal(lit.turn, s.turn + 1);
  assert.ok(Math.abs(lit.oil - (0.5 - 6 * OIL.burn)) < 1e-9); // its 5 turns', and the turn's own
  assert.equal(shownLine(lit).text, 'The brazier catches.');
  assert.ok(lit.events.some((e) => e.type === 'kindle' && e.id === 'brazierLit'));
  const dry = at({ oil: 4 * OIL.burn });
  assert.equal(kindle(dry, 2, 1), dry);
  assert.equal(glowsIn(s.room, null).length, 0);
  assert.deepEqual(glowsIn(lit.room, null).map((g) => g.r), [2 * 16]); // its glow, 2 tiles
});
