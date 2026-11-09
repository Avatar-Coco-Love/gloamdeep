// § oldlocket: an old save that already holds the locket room, with no locket, has it laid there once (D-716)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld } from '../src/core/turn.js';
import { fresh } from '../src/core/stairs.js';
import { locketRoom } from '../src/core/room.js';
import { UPGRADES, FORMAT } from '../src/core/save.js';
import { withOldLocket } from '../src/core/oldlocket.js';

const SEED = 7, id = locketRoom(SEED);
const bare = (p) => ({ ...p, items: p.items.filter((i) => i.id !== 'locket'), enemies: p.enemies.filter((e) => e.id !== 'warden') });
const lockets = (p) => p.items.filter((i) => i.id === 'locket');
// A save from before 0.3.143: the hero has been in the locket room, which has neither
const old = () => { const w = makeWorld('first', SEED); return { ...w, elsewhere: { ...w.elsewhere, [id]: bare(fresh(id, SEED)) } }; };

test('oldlocket: the room seen before the locket gets it and its warden, where a new game lays them', () => {
  assert.ok(FORMAT >= 19);
  const s = UPGRADES[18](old()), p = s.elsewhere[id], want = fresh(id, SEED);
  assert.deepEqual(lockets(p), lockets(want));
  assert.deepEqual(p.enemies.find((e) => e.id === 'warden'), want.enemies.find((e) => e.id === 'warden'));
  assert.deepEqual(p.room, old().elsewhere[id].room); // the room stays as it is
  assert.deepEqual(withOldLocket(s), s); // once
});

test('oldlocket: nothing changes while the locket is somewhere, or the room was never made', () => {
  const o = old(), never = makeWorld('first', SEED);
  assert.deepEqual(withOldLocket(never), never);
  for (const s of [
    { ...o, bag: [{ id: 'locket', n: 1 }] },
    { ...o, elsewhere: { ...o.elsewhere, first: { items: [{ id: 'lostbag', x: 1, y: 1, holds: [{ id: 'locket', n: 1 }] }] } } },
    { ...o, room: { ...o.room, map: o.room.map.map((l, y) => (y === 1 ? l.slice(0, 1) + 'N' + l.slice(2) : l)) } },
  ]) assert.deepEqual(withOldLocket(s), s);
  const kept = { ...o, elsewhere: { ...o.elsewhere, [id]: fresh(id, SEED) } }; // a room made since has its own
  assert.deepEqual(withOldLocket(kept), kept);
});

test('oldlocket: a hero standing in the room keeps their tile; the locket lies elsewhere', () => {
  const o = old(), p = o.elsewhere[id], at = lockets(fresh(id, SEED))[0];
  const elsewhere = { ...o.elsewhere }; delete elsewhere[id];
  const s = withOldLocket({ ...o, ...p, place: id, hero: { x: at.x, y: at.y }, elsewhere });
  const [l] = lockets(s);
  assert.ok(l && !(l.x === at.x && l.y === at.y));
  assert.deepEqual(s.hero, { x: at.x, y: at.y });
});
