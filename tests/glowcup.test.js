// § glowcup (D-1007): the dark floors' flower, one in about half the rooms from depth 1 down, on open
// floor, alone; rooted, as the duskstar now is; picked, it comes back a day later elsewhere in its room
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { seeds } from './fixtures.js';
import { layoutAt } from '../src/core/region.js';
import { placeFor, beginPlace, vaultAt } from '../src/core/room.js';
import { ROOMS } from '../src/core/hearthwood.js';
import { regrow, noteTaken } from '../src/core/regrow.js';
import { get } from '../src/core/registry.js';
import { GLOWCUP_ODDS } from '../src/core/glowcup.js';

const cupsIn = (p) => p.items.filter((it) => it.id === 'glowcup');

test('about half the rooms from depth 2 to 12 hold one glowcup, on open floor, alone, toned; never in a vault, the arena or its hallway', () => {
  let rooms = 0, cups = 0, flips = 0;
  for (const seed of seeds(40)) for (let d = 2; d <= 12; d++) for (const c of layoutAt(seed, d).cells) {
    const p = placeFor(c.id, seed), g = cupsIn(p), at = `seed ${seed} ${c.id}`;
    if (c.arena || c.hall || c.id === vaultAt(seed, d)) { assert.equal(g.length, 0, `${at}: none there`); continue; }
    assert.ok(g.length <= 1, `${at}: one at most`);
    rooms++;
    for (const f of g) {
      assert.equal(p.map[f.y][f.x], '.', `${at}: on open floor`);
      assert.notDeepEqual({ x: f.x, y: f.y }, p.start);
      assert.equal(p.items.filter((it) => it.x === f.x && it.y === f.y).length, 1, `${at}: alone on its tile`);
      assert.ok(![...p.enemies, ...p.lights, ...(p.people || [])].some((e) => e.x === f.x && e.y === f.y), `${at}: nothing standing there`);
      assert.ok(Math.abs(f.tone.hue) <= 16 && Math.abs(f.tone.light) <= 6, 'its own tone');
      cups++; if (f.flip) flips++;
    }
  }
  assert.ok(Math.abs(cups / rooms - GLOWCUP_ODDS) < 0.1, `about half: ${cups} of ${rooms}`);
  assert.ok(flips > cups * 0.3 && flips < cups * 0.7, 'about half face the other way');
});

test('depth 1 may hold one; the surface none; the same seed the same glowcup', () => {
  const one = seeds(40).filter((seed) => cupsIn(placeFor('second', seed)).length).length;
  assert.ok(one > 0 && one < seeds(40).length, 'depth 1, in some seeds');
  for (const id of ROOMS) assert.equal(cupsIn(beginPlace(id, 11)).length, 0, `${id}: none outside`);
  for (const seed of seeds(10)) assert.deepEqual(cupsIn(placeFor(layoutAt(seed, 3).cells[0].id, seed)), cupsIn(placeFor(layoutAt(seed, 3).cells[0].id, seed)));
});

test('a glowcup goes in the bag, for crafts later; the flowers, the herb and the mushrooms are rooted, other finds bob', () => {
  const g = get('glowcup');
  assert.deepEqual([g.bag, g.max, g.regrow, g.roam, g.rooted, g.heal, g.eats, g.light], [true, 20, 300, true, true, undefined, undefined, undefined]);
  assert.equal(get('duskstar').rooted, true);
  for (const id of ['herb', 'oilcap', 'heartcap']) assert.equal(get(id).rooted, true, `${id} is rooted (D-1008)`);
  for (const id of ['flask', 'stone', 'ratTail']) assert.equal(get(id).rooted, undefined, `${id} still bobs`);
});

test('picked, a glowcup comes back a day later on another floor tile of its room', () => {
  const seed = seeds(40).find((s) => cupsIn(beginPlace(layoutAt(s, 2).cells[0].id, s)).length), id = layoutAt(seed, 2).cells[0].id;
  const p = beginPlace(id, seed), [f] = cupsIn(p);
  const s0 = { ...p, seed, turn: 10, hero: { x: 0, y: 0 }, lit: [], people: [], items: p.items.filter((it) => it !== f) };
  const s1 = noteTaken(s0, f);
  assert.equal(cupsIn(regrow({ ...s1, turn: 309 }, true)).length, 0, 'not before a day');
  const back = regrow({ ...s1, turn: 310 }, true), [g] = cupsIn(back);
  assert.ok(g, 'it grew back');
  assert.notDeepEqual([g.x, g.y], [f.x, f.y], 'somewhere else');
  assert.deepEqual([g.tone, g.flip], [f.tone, f.flip], 'the same flower');
});

test("a mushroom's tuft is earth alone, a herb's and a flower's have grass blades (D-1008)", async () => {
  const { TUFT, TUFT_OPEN, TUFT_EARTH } = await import('../src/render/pictures-finds.js');
  const blades = (t) => t.rows.join('').includes('g');
  assert.deepEqual([blades(TUFT), blades(TUFT_OPEN), blades(TUFT_EARTH)], [true, true, false]);
});
