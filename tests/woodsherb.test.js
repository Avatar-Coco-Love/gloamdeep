// § woodsherb (D-762): a herb on open grass in each woods room, none in the mountain rooms
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROOMS, HOME_ID, isMountain } from '../src/core/hearthwood.js';
import { beginPlace } from '../src/core/room.js';
import { makeWorld } from '../src/core/turn.js';
import { reherb } from '../src/core/reherb.js';
import { get } from '../src/core/registry.js';
import { FORMAT, UPGRADES } from '../src/core/save.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i * 7919 + 3);
const herbsIn = (p) => p.items.filter((it) => it.id === 'herb');

test('each woods room, home too, holds one herb on open grass, alone; a mountain room none', () => {
  for (const seed of SEEDS) for (const id of ROOMS) {
    const p = beginPlace(id, seed), h = herbsIn(p);
    if (isMountain(id)) { assert.equal(h.length, 0, `${seed} ${id}`); continue; }
    assert.equal(h.length, 1, `${seed} ${id}`);
    const [c] = h;
    assert.equal(p.room.map[c.y][c.x], '.', `${seed} ${id}: on grass`);
    assert.notDeepEqual({ x: c.x, y: c.y }, p.start);
    assert.equal(p.items.filter((it) => it.x === c.x && it.y === c.y).length, 1, 'alone on its tile');
  }
});

test('the same seed lays the same herb; it is the cave herb, growing back after a day', () => {
  assert.deepEqual(herbsIn(beginPlace(HOME_ID, 11)), herbsIn(beginPlace(HOME_ID, 11)));
  const h = get('herb');
  assert.deepEqual([h.regrow, h.heal, h.eatHurt, h.bag], [300, 2, true, true]);
});

test('an older save: unseen woods rooms get their herb; seen, taken from or stood in stay', () => {
  assert.ok(FORMAT >= 26); assert.equal(UPGRADES[25], reherb);
  for (const seed of SEEDS.slice(0, 8)) {
    const w = makeWorld('first', seed), bare = (p) => ({ ...p, items: p.items.filter((it) => it.id !== 'herb') });
    const woods = ROOMS.filter((id) => !isMountain(id) && id !== w.place), [a, b, c] = woods, hill = ROOMS.find(isMountain);
    const away = { ...w.elsewhere, [a]: bare(w.elsewhere[a]), [b]: { ...bare(w.elsewhere[b]), seen: [1] }, [c]: { ...bare(w.elsewhere[c]), taken: [{ x: 1, y: 1 }] } };
    const up = reherb({ ...w, elsewhere: away });
    assert.deepEqual(herbsIn(up.elsewhere[a]), herbsIn(w.elsewhere[a]), `seed ${seed}: unseen gets its herb`);
    assert.deepEqual(up.elsewhere[b], away[b], 'seen stays');
    assert.deepEqual(up.elsewhere[c], away[c], 'taken from stays');
    assert.deepEqual(up.elsewhere[hill], away[hill], 'a mountain room stays');
    assert.equal(herbsIn(reherb(up).elsewhere[a]).length, 1, 'never a second');
  }
});
