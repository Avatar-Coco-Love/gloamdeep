// § woodkinds (D-756, D-733's step 5): the woods round home grow thick, as before, or as glades
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROOMS, HOME_ID, ROUND_HOME, kindsOf, kindOf, isMountain } from '../src/core/hearthwood.js';
import { beginPlace } from '../src/core/room.js';
import { generateWoods } from '../src/core/woods.js';
import { makeWorld } from '../src/core/turn.js';
import { fresh } from '../src/core/stairs.js';
import { regrove } from '../src/core/regrove.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);
const openOf = (map) => map.join('').split('').filter((c) => c === '.').length;

test('the 5 woods rooms round home each have a kind, at least one thick and one glade; home and the mountains none', () => {
  assert.deepEqual([...ROUND_HOME].sort(), ROOMS.filter((id) => id !== HOME_ID && !isMountain(id)).sort());
  for (const seed of SEEDS) {
    const kinds = kindsOf(seed), list = Object.values(kinds);
    assert.deepEqual(Object.keys(kinds).sort(), [...ROUND_HOME].sort());
    assert.ok(list.includes('thick') && list.includes('glade'), `seed ${seed}`);
    assert.ok(list.every((k) => ['thick', 'woods', 'glade'].includes(k)));
    assert.equal(kindOf(seed, HOME_ID), 'woods');
  }
});

test('the kinds differ: thick woods have the least open ground, glades the most', () => {
  const sum = { thick: 0, woods: 0, glade: 0 };
  for (const seed of SEEDS) for (const kind of Object.keys(sum)) sum[kind] += openOf(generateWoods(seed * 7919, null, { stone: false, kind }).map);
  assert.ok(sum.thick < sum.woods && sum.woods < sum.glade, JSON.stringify(sum));
});

test('a woods room without a kind grows as it always did', () => {
  for (const seed of SEEDS.slice(0, 10)) assert.deepEqual(generateWoods(seed), generateWoods(seed, null, { kind: 'woods' }));
});

test('every woods room round home, each kind, keeps at least its fewest open tiles', () => {
  for (const seed of SEEDS) for (const id of ROUND_HOME) {
    const min = kindOf(seed, id) === 'thick' ? 60 : 100;
    assert.ok(openOf(beginPlace(id, seed).room.map) >= min, `seed ${seed} ${id} ${kindOf(seed, id)}`);
  }
});

test('an older save: unseen woods rooms round home grow as their kinds; seen, taken from or stood in stay', () => {
  for (const seed of SEEDS.slice(0, 8)) {
    const w = makeWorld('first', seed), old = (p) => ({ ...p, room: { ...p.room, map: p.room.map.map((l, y) => (y === 5 ? l.replace(/\./, ',') : l)) } });
    const [a, b, c] = ROUND_HOME.filter((id) => id !== w.place);
    const away = { ...w.elsewhere, [a]: old(w.elsewhere[a]), [b]: { ...old(w.elsewhere[b]), seen: [1] }, [c]: { ...old(w.elsewhere[c]), taken: [{ x: 1, y: 1 }] } };
    const up = regrove({ ...w, elsewhere: away });
    assert.deepEqual(up.elsewhere[a].room, fresh(a, seed).room, `seed ${seed}: unseen made again`);
    assert.deepEqual(up.elsewhere[b], away[b], 'seen stays');
    assert.deepEqual(up.elsewhere[c], away[c], 'taken from stays');
    assert.equal(up.room, w.room, 'the room stood in stays');
  }
});
