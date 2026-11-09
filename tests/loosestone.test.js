// § loosestone (D-761): 2 loose stones on open grass in each mountain room, none in the woods rooms
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROOMS, isMountain } from '../src/core/hearthwood.js';
import { beginPlace } from '../src/core/room.js';
import { STONES } from '../src/core/loosestone.js';
import { strewn } from '../src/core/strewn.js';
import { makeWorld } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { FORMAT, UPGRADES } from '../src/core/save.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i * 7919 + 3);
const stonesIn = (p) => p.items.filter((it) => it.id === 'stone');

test('each mountain room holds 2 loose stones on open grass, each alone; a woods room none', () => {
  assert.equal(STONES, 2);
  for (const seed of SEEDS) for (const id of ROOMS) {
    const p = beginPlace(id, seed), st = stonesIn(p);
    if (!isMountain(id)) { assert.equal(st.length, 0, `${seed} ${id}`); continue; }
    assert.equal(st.length, 2, `${seed} ${id}`);
    for (const s of st) {
      assert.equal(p.room.map[s.y][s.x], '.', `${seed} ${id}: on grass`);
      assert.notDeepEqual({ x: s.x, y: s.y }, p.start);
      assert.equal(p.items.filter((it) => it.x === s.x && it.y === s.y).length, 1, 'alone on its tile');
    }
  }
});

test('the same seed lays the same stones; picked, a stone grows back after a day, with its own lines', () => {
  const id = ROOMS.find(isMountain);
  assert.deepEqual(stonesIn(beginPlace(id, 11)), stonesIn(beginPlace(id, 11)));
  assert.equal(get('stone').regrow, 300);
  assert.equal(get('stone').says, 'looseStoneTake');
});

test('an older save: unseen mountain rooms get their stones; seen, taken from or stood in stay', () => {
  assert.equal(FORMAT, 25); assert.equal(UPGRADES[24], strewn);
  for (const seed of SEEDS.slice(0, 8)) {
    const w = makeWorld('first', seed), bare = (p) => ({ ...p, items: p.items.filter((it) => it.id !== 'stone') });
    const hills = ROOMS.filter((id) => isMountain(id) && id !== w.place), [a, b, c] = hills, wood = ROOMS.find((id) => !isMountain(id) && id !== w.place);
    const away = { ...w.elsewhere, [a]: bare(w.elsewhere[a]), [b]: { ...bare(w.elsewhere[b]), seen: [1] }, [c]: { ...bare(w.elsewhere[c]), taken: [{ x: 1, y: 1 }] } };
    const up = strewn({ ...w, elsewhere: away });
    assert.deepEqual(stonesIn(up.elsewhere[a]), stonesIn(w.elsewhere[a]), `seed ${seed}: unseen gets its stones`);
    assert.deepEqual(up.elsewhere[b], away[b], 'seen stays');
    assert.deepEqual(up.elsewhere[c], away[c], 'taken from stays');
    assert.deepEqual(up.elsewhere[wood], away[wood], 'a woods room stays');
    assert.equal(stonesIn(strewn(up).elsewhere[a]).length, 2, 'never more');
  }
});
