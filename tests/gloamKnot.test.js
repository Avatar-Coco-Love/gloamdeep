// § gloamKnot (D-1024): the knot of gloam holding the spark, in depth 2's room with the stairs up,
// never cutting a way; bumped lit it melts and the spark is free, its line; dark it holds, free;
// an older save gets it laid in a kept room, or the spark freed
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { seeds, start, walk } from './fixtures.js';
import { layoutAt } from '../src/core/region.js';
import { placeFor, placeAt, beginPlace, makeRoom, withTile, tileAt } from '../src/core/room.js';
import { get, byLetter } from '../src/core/registry.js';
import { step } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { upgradeState, FORMAT } from '../src/core/save.js';
import { newJourney } from '../src/core/state.js';
import { KNOT_DEPTH } from '../src/core/knot.js';

const letter = () => get('gloamKnot').letter;
const knotsIn = (map) => map.flatMap((row, y) => [...row].map((ch, x) => (ch === letter() ? { x, y } : null)).filter(Boolean));
// walking steps from the stairs up to beside the knot, plus one
const stepsTo = (p, k) => { const seen = new Map([[`${p.start.x},${p.start.y}`, 0]]), q = [p.start];
  while (q.length) { const t = q.shift(), n = seen.get(`${t.x},${t.y}`); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const x = t.x + dx, y = t.y + dy;
    if (x === k.x && y === k.y) return n + 1;
    if (!seen.has(`${x},${y}`) && p.map[y]?.[x] && !byLetter(p.map[y][x]).solid) { seen.set(`${x},${y}`, n + 1); q.push({ x, y }); } } }
  return Infinity; };
const openIn = (map) => (x, y) => !byLetter(map[y][x]).solid;

test('the Gloam knot is a low solid tile light passes over, that frees', () => {
  const k = get('gloamKnot');
  assert.deepEqual([k.kind, k.name, k.solid, k.low, k.blocksLight, k.frees], ['tile', 'Gloam knot', true, true, false, true]);
});

test('every seed: one knot in depth 2\'s room with the stairs up, none elsewhere; it cuts no way and stands clear', () => {
  for (const seed of seeds(200)) {
    const id = placeAt(KNOT_DEPTH), p = placeFor(id, seed), [k, more] = knotsIn(p.map), at = `seed ${seed}`;
    assert.ok(k && !more, `${at}: one knot`);
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      assert.ok(!byLetter(p.map[k.y + dy][k.x + dx]).leads, `${at}: not beside the stairs`);
    }
    assert.ok(![...p.items, ...p.enemies, ...(p.lights || []), ...(p.people || [])].some((t) => t.x === k.x && t.y === k.y), `${at}: alone`);
    const without = p.map.map((row, y) => (y === k.y ? row.slice(0, k.x) + '.' + row.slice(k.x + 1) : row));
    const room = { cols: p.map[0].length, rows: p.map.length };
    assert.equal(walk(room, p.start, openIn(p.map)).size, walk(room, p.start, openIn(without)).size - 1, `${at}: every tile still reached`);
    for (const c of layoutAt(seed, KNOT_DEPTH).cells) if (c.id !== id) assert.equal(knotsIn(placeFor(c.id, seed).map).length, 0, `${at} ${c.id}: none`);
  }
  for (const seed of seeds(20)) for (const d of [1, 3, 5]) for (const c of (d === 1 ? [{ id: 'second' }] : layoutAt(seed, d).cells)) assert.equal(knotsIn(placeFor(c.id, seed).map).length, 0, `depth ${d}: none`);
});

test('most seeds put it 2 to 4 steps from the stairs up; the same seed, the same spot', () => {
  let near = 0, all = 0;
  for (const seed of seeds(100)) {
    const p = placeFor(placeAt(KNOT_DEPTH), seed), [k] = knotsIn(p.map);
    assert.deepEqual(knotsIn(placeFor(placeAt(KNOT_DEPTH), seed).map), [k]);
    const d = stepsTo(p, k);
    all++; if (d <= 4) near++;
  }
  assert.ok(near / all > 0.5, `near the stairs in ${near} of ${all}`);
});

// The first room with a knot just above the hero
const knotted = (more = {}) => { const s = start(); return { ...s, room: withTile(s.room, s.hero.x, s.hero.y - 1, get('gloamKnot')), ...more }; };

test('bumped with the lantern lit, it melts to floor, a turn, the spark freed with its line in two halves', () => {
  const s = knotted(), out = step(s, 'up');
  assert.equal(tileAt(out.room, s.hero.x, s.hero.y - 1).id, 'floor');
  assert.deepEqual(out.hero, s.hero, 'the hero stays');
  assert.equal(out.turn, s.turn + 1);
  assert.equal(out.spark, true);
  assert.ok(out.events.some((e) => e.type === 'spark' && e.x === s.hero.x && e.y === s.hero.y - 1));
  assert.equal(shownLine(out).text, 'The gloam lets go. A small warm light comes to your side.');
});

test('bumped with the lantern dark, it holds, its line, no turn; an ember melts it', () => {
  const s = knotted({ lit: false }), out = step(s, 'up');
  assert.equal(tileAt(out.room, s.hero.x, s.hero.y - 1).id, 'gloamKnot');
  assert.equal(out.turn, s.turn);
  assert.ok(!out.spark);
  assert.equal(shownLine(out).text, 'The threads hold fast in the dark.');
  assert.equal(step(knotted({ oil: 0 }), 'up').spark, true, 'an ember still melts it');
});

test('a new journey has the spark held', () => assert.equal(newJourney(5).spark, false));

test('a save step 38 → 39: the spark held; a kept depth 2 first room gets its knot, away from the hero; unseen rooms untouched', () => {
  assert.equal(FORMAT, 39);
  const id = placeAt(KNOT_DEPTH), seed = 7, made = beginPlace(id, seed), [k] = knotsIn(placeFor(id, seed).map);
  const old = { ...made, room: { ...made.room, map: made.room.map.map((row) => row.replaceAll(letter(), '.')) } };
  const away = upgradeState(38, { ...start(), seed, elsewhere: { [id]: old } });
  assert.equal(away.spark, false);
  assert.deepEqual(knotsIn(away.elsewhere[id].room.map), [k], 'laid at the seed\'s spot');
  const none = upgradeState(38, { ...start(), seed, elsewhere: {} });
  assert.equal(none.spark, false);
  assert.deepEqual(none.elsewhere, {});
  const here = upgradeState(38, { ...start(), seed, place: id, room: old.room, hero: k, items: old.items, enemies: old.enemies, people: [], elsewhere: {} });
  const [k2] = knotsIn(here.room.map);
  assert.ok(k2 && (k2.x !== k.x || k2.y !== k.y), 'never under the hero');
  const tight = { ...old, room: { ...old.room, map: old.room.map.map((row, y) => (y === 0 || y === old.room.map.length - 1 ? row : row.replace(/\.(?=\.)/g, '#'))) } };
  assert.equal(upgradeState(38, { ...start(), seed, elsewhere: { [id]: tight } }).spark, true, 'nowhere it fits: freed');
});
