// § the prize (L1 step 4, D-896): one prize a vault, on a plinth at its heart: 1 vault in 4 an
// ember, glowing faintly, the rest 2 of a rare material; bumped, taken at once, a turn, the plinth
// left bare; an ember 1 more for Growth
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { layoutAt } from '../src/core/region.js';
import { placeFor, vaultAt, beginPlace, makeRoom, tileAt } from '../src/core/room.js';
import { prizeOf, RARE, RARE_N, EMBER_IN } from '../src/core/vault.js';
import { makeState, step } from '../src/core/turn.js';
import { embers } from '../src/core/growth.js';
import { bagSize } from '../src/core/bag.js';

const MAP = ['#####', '#.n.#', '#...#', '#####'];
const at = (prize, map = MAP) => ({ ...makeState({ ...makeRoom(map, undefined, 'crypt'), prize }, { x: 2, y: 2 }) });

test('the Plinth and the Ember: solid, light passing; an ember\'s glows 1 tile; their words', () => {
  for (const id of ['plinth', 'plinthEmber', 'plinthBare']) { const t = get(id); assert.equal(t.name, 'Plinth'); assert.ok(t.solid && !t.blocksLight, id); }
  assert.equal(get('plinthEmber').glow.reach, 1); assert.ok(!get('plinth').glow);
  assert.equal(get('ember').name, 'Ember'); assert.ok(!get('ember').bag);
  assert.equal(LINES.emberTake.text, 'An ember! Spend it in Growth.');
  assert.deepEqual(LINES.emberLook.texts, ['An ember, still warm.', 'It glows in your palm.']);
  assert.deepEqual(LINES.plinthBare.texts, ['A bare stone plinth.', 'Something rested here once.']);
});

test('the draw: about 1 vault in 4 an ember, else 2 of one of the 7 rare materials, each turning up', () => {
  const draws = Array.from({ length: 4000 }, (_, i) => prizeOf(i * 7919 + 1)), seen = new Set();
  const n = draws.filter((p) => p.id === 'ember').length;
  assert.ok(Math.abs(n / draws.length - 1 / EMBER_IN) < 0.03, `${n}`);
  for (const p of draws) if (p.id === 'ember') assert.equal(p.n, 1); else { assert.ok(RARE.includes(p.id)); assert.equal(p.n, RARE_N); seen.add(p.id); }
  assert.equal(seen.size, RARE.length);
  assert.deepEqual(prizeOf(42), prizeOf(42));
});

test('every vault has one plinth at its heart, its prize kept with the room, the ember\'s its own tile', () => {
  let found = 0;
  for (let seed = 1; seed <= 30; seed++) for (const depth of [2, 5, 8]) {
    const id = vaultAt(seed, depth);
    if (!id) continue;
    const { room } = beginPlace(id, seed), tiles = room.map.join('');
    const want = get(room.prize.id === 'ember' ? 'plinthEmber' : 'plinth').letter;
    assert.equal(tiles.split(want).length - 1, 1, `${seed} ${depth}`);
    assert.equal(tiles.split(get(room.prize.id === 'ember' ? 'plinth' : 'plinthEmber').letter).length - 1, 0);
    found++;
  }
  assert.ok(found > 10);
});

test('a rare material bumped: 2 into the bag, its own line, a turn, the plinth bare and its prize gone', () => {
  const s = at({ id: 'venomSac', n: 2 }), next = step(s, 'up');
  assert.equal(tileAt(next.room, 2, 1).id, 'plinthBare');
  assert.equal(next.room.prize, null);
  assert.equal(next.bag.find((b) => b?.id === 'venomSac')?.n, 2);
  assert.ok(LINES.venomSacTake.texts.includes(shownLine(next).text));
  assert.equal(next.turn, s.turn + 1);
  assert.ok(next.events.some((e) => e.type === 'take'));
  const again = step(next, 'up');
  assert.equal(shownLine(again).text, 'A bare stone plinth.');
  assert.equal(again.turn, next.turn);
});

test('an ember bumped: 1 more ember for Growth, never in the bag', () => {
  const s = at({ id: 'ember', n: 1 }, ['#####', '#.o.#', '#...#', '#####']), next = step(s, 'up');
  assert.equal(embers(next), embers(s) + 1);
  assert.equal(tileAt(next.room, 2, 1).id, 'plinthBare');
  assert.deepEqual(next.bag, s.bag);
  assert.equal(shownLine(next).text, 'An ember! Spend it in Growth.');
});

test('with no room in the bag for both, nothing is taken, free, and the prize stays', () => {
  const s = at({ id: 'gloamEye', n: 2 }), full = { ...s, bag: Array.from({ length: bagSize(s) }, () => ({ id: 'stone', n: 20 })) };
  const next = step(full, 'up');
  assert.equal(tileAt(next.room, 2, 1).id, 'plinth');
  assert.equal(next.turn, full.turn);
  assert.deepEqual(next.room.prize, { id: 'gloamEye', n: 2 });
});
