// § duskstar (D-763): 2 duskstars on open grass in each woods room, none in the mountain rooms
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROOMS, HOME_ID, isMountain } from '../src/core/hearthwood.js';
import { beginPlace } from '../src/core/room.js';
import { makeWorld } from '../src/core/turn.js';
import { restar } from '../src/core/restar.js';
import { regrow, noteTaken } from '../src/core/regrow.js';
import { get } from '../src/core/registry.js';
import { FORMAT, UPGRADES } from '../src/core/save.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i * 7919 + 3);
const starsIn = (p) => p.items.filter((it) => it.id === 'duskstar');

test('each woods room, home too, holds 2 duskstars on open grass, alone, toned; a mountain room none', () => {
  let flips = 0, all = 0;
  for (const seed of SEEDS) for (const id of ROOMS) {
    const p = beginPlace(id, seed), d = starsIn(p);
    if (isMountain(id)) { assert.equal(d.length, 0, `${seed} ${id}`); continue; }
    assert.equal(d.length, 2, `${seed} ${id}`);
    for (const f of d) {
      assert.equal(p.room.map[f.y][f.x], '.', `${seed} ${id}: on grass`);
      assert.notDeepEqual({ x: f.x, y: f.y }, p.start);
      assert.equal(p.items.filter((it) => it.x === f.x && it.y === f.y).length, 1, 'alone on its tile');
      assert.ok(Math.abs(f.tone.hue) <= 16 && Math.abs(f.tone.light) <= 6, 'its own tone');
      all++; if (f.flip) flips++;
    }
  }
  assert.ok(flips > all * 0.3 && flips < all * 0.7, 'about half face the other way');
});

test('the same seed lays the same duskstars; one for the bag, for crafts later', () => {
  assert.deepEqual(starsIn(beginPlace(HOME_ID, 11)), starsIn(beginPlace(HOME_ID, 11)));
  const d = get('duskstar');
  assert.deepEqual([d.bag, d.max, d.regrow, d.roam, d.heal, d.eats], [true, 20, 300, true, undefined, undefined]);
});

test('picked, a duskstar comes back a day later on another grass tile of its room', () => {
  const p = beginPlace(HOME_ID, 11), [f] = starsIn(p);
  const s0 = { ...p, seed: 11, turn: 10, hero: { x: p.start.x, y: p.start.y }, people: [], items: p.items.filter((it) => it !== f) };
  const s1 = noteTaken(s0, f);
  assert.equal(starsIn(regrow({ ...s1, turn: 309 }, true)).length, 1, 'not before a day');
  const back = regrow({ ...s1, turn: 310 }, true), [g] = starsIn(back).filter((it) => !p.items.includes(it));
  assert.ok(g, 'it grew back');
  assert.notDeepEqual([g.x, g.y], [f.x, f.y], 'somewhere else');
  assert.equal(back.room.map[g.y][g.x], '.', 'on grass');
  assert.deepEqual([g.tone, g.flip], [f.tone, f.flip], 'the same flower');
  assert.deepEqual(regrow({ ...s1, turn: 310 }, true), back, 'the seed picks the same tile');
});

test('an older save: unseen woods rooms get their duskstars; seen, taken from or stood in stay', () => {
  assert.equal(FORMAT, 27); assert.equal(UPGRADES[26], restar);
  for (const seed of SEEDS.slice(0, 8)) {
    const w = makeWorld('first', seed), bare = (p) => ({ ...p, items: p.items.filter((it) => it.id !== 'duskstar') });
    const woods = ROOMS.filter((id) => !isMountain(id) && id !== w.place), [a, b, c] = woods, hill = ROOMS.find(isMountain);
    const away = { ...w.elsewhere, [a]: bare(w.elsewhere[a]), [b]: { ...bare(w.elsewhere[b]), seen: [1] }, [c]: { ...bare(w.elsewhere[c]), taken: [{ x: 1, y: 1 }] } };
    const up = restar({ ...w, elsewhere: away });
    assert.deepEqual(starsIn(up.elsewhere[a]), starsIn(w.elsewhere[a]), `seed ${seed}: unseen gets its duskstars`);
    assert.deepEqual(up.elsewhere[b], away[b], 'seen stays');
    assert.deepEqual(up.elsewhere[c], away[c], 'taken from stays');
    assert.deepEqual(up.elsewhere[hill], away[hill], 'a mountain room stays');
    assert.equal(starsIn(restar(up).elsewhere[a]).length, 2, 'never more');
  }
});
