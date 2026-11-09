// § woodscap (D-760): an oilcap beside a tree in each woods room, none in the mountain rooms
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROOMS, HOME_ID, isMountain } from '../src/core/hearthwood.js';
import { beginPlace } from '../src/core/room.js';
import { besideTree } from '../src/core/woodscap.js';
import { makeWorld } from '../src/core/turn.js';
import { recap } from '../src/core/recap.js';
import { get } from '../src/core/registry.js';
import { FORMAT, UPGRADES } from '../src/core/save.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i * 7919 + 3);
const capsIn = (p) => p.items.filter((it) => it.id === 'oilcap');

test('each woods room, home too, holds one oilcap on grass beside a tree, toned; a mountain room none', () => {
  for (const seed of SEEDS) for (const id of ROOMS) {
    const p = beginPlace(id, seed), caps = capsIn(p);
    if (isMountain(id)) { assert.equal(caps.length, 0, `${seed} ${id}`); continue; }
    assert.equal(caps.length, 1, `${seed} ${id}`);
    const [c] = caps;
    assert.equal(p.room.map[c.y][c.x], '.');
    assert.ok(besideTree(p.room.map, c.x, c.y), `${seed} ${id}: beside a tree`);
    assert.notDeepEqual({ x: c.x, y: c.y }, p.start);
    assert.equal(p.items.filter((it) => it.x === c.x && it.y === c.y).length, 1, 'alone on its tile');
    assert.ok(c.tone && Number.isInteger(c.tone.hue));
  }
});

test('the same seed lays the same oilcap; it grows back after a day, as in the caves', () => {
  assert.deepEqual(capsIn(beginPlace(HOME_ID, 11)), capsIn(beginPlace(HOME_ID, 11)));
  assert.equal(get('oilcap').regrow, 300);
});

test('an older save: unseen woods rooms get their oilcap; seen, taken from or stood in stay', () => {
  assert.equal(FORMAT, 24); assert.equal(UPGRADES[23], recap);
  for (const seed of SEEDS.slice(0, 8)) {
    const w = makeWorld('first', seed), bare = (p) => ({ ...p, items: p.items.filter((it) => it.id !== 'oilcap') });
    const woods = ROOMS.filter((id) => !isMountain(id) && id !== w.place), [a, b, c] = woods, hill = ROOMS.find(isMountain);
    const away = { ...w.elsewhere, [a]: bare(w.elsewhere[a]), [b]: { ...bare(w.elsewhere[b]), seen: [1] }, [c]: { ...bare(w.elsewhere[c]), taken: [{ x: 1, y: 1 }] } };
    const up = recap({ ...w, elsewhere: away });
    assert.deepEqual(capsIn(up.elsewhere[a]), capsIn(w.elsewhere[a]), `seed ${seed}: unseen gets its oilcap`);
    assert.deepEqual(up.elsewhere[b], away[b], 'seen stays');
    assert.deepEqual(up.elsewhere[c], away[c], 'taken from stays');
    assert.deepEqual(up.elsewhere[hill], away[hill], 'a mountain room stays');
    assert.deepEqual(capsIn(recap(up).elsewhere[a]).length, 1, 'never a second');
  }
});
