// § regrow: things picked grow back, each on its own clock, out of sight (D-306, D-307)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, makeWorld, step, wait, itemAt, HERO_HEALTH } from '../src/core/turn.js';
import { spawn } from '../src/core/spawn.js';
import { noteTaken, regrow } from '../src/core/regrow.js';
import { arrive } from '../src/core/stairs.js';
import { UPGRADES } from '../src/core/save.js';
import { DAY_TURNS } from '../src/core/daytime.js';

const room = makeRoom(FIRST_ROOM);
// The hero starts at 5,11, so a thing on 5,10 is one step up; then they step back down.
const takeAndStepBack = (id, more = {}) => {
  const s = spawn({ ...makeState(room), health: 2, ...more }, id, 5, 10);
  return step(step(s, 'up'), 'down');
};
// Waits until `turns` turns have passed since the taking, in the dark
const waitTill = (s, turns) => wait({ ...s, lit: false, turn: s.taken[0].at + turns - 1 });

test('a thing taken goes on the room\'s taken list with its turn', () => {
  const n = step(spawn(makeState(room), 'oilcap', 5, 10), 'up');
  assert.deepEqual(n.taken, [{ id: 'oilcap', x: 5, y: 10, at: 1 }]);
  assert.deepEqual(n.items, []);
});

test('mushrooms and herbs grow back after a day, not a turn sooner', () => {
  for (const id of ['oilcap', 'heartcap', 'herb']) {
    const s = takeAndStepBack(id);
    assert.equal(itemAt(waitTill(s, DAY_TURNS - 1), 5, 10), undefined, `${id} not yet`);
    const n = waitTill(s, DAY_TURNS);
    assert.equal(itemAt(n, 5, 10).id, id, `${id} is back`);
    assert.deepEqual(n.taken, []);
  }
});

test('a flask grows back after three days', () => {
  const s = takeAndStepBack('flask');
  assert.equal(itemAt(waitTill(s, 3 * DAY_TURNS - 1), 5, 10), undefined);
  assert.equal(itemAt(waitTill(s, 3 * DAY_TURNS), 5, 10).id, 'flask');
});

test('the knife is never on the taken list', () => {
  const n = step(spawn(makeState(room), 'knife', 5, 10), 'up');
  assert.equal(n.held, 'knife');
  assert.deepEqual(n.taken, []);
});

test('a herb left at full health is not taken', () => {
  const n = step(spawn({ ...makeState(room), health: HERO_HEALTH }, 'herb', 5, 10), 'up');
  assert.deepEqual(n.taken, []);
});

test('it comes back with the tone it had', () => {
  const tone = { hue: 5, light: -3 };
  const s = { ...makeState(room), items: [{ id: 'heartcap', x: 5, y: 10, tone }] };
  const n = waitTill(step(step(s, 'up'), 'down'), DAY_TURNS);
  assert.deepEqual(itemAt(n, 5, 10), { id: 'heartcap', x: 5, y: 10, tone });
});

test('it waits while its tile is in sight, and comes back once it is dark', () => {
  const s = takeAndStepBack('oilcap');
  const lit = wait({ ...s, lit: true, turn: s.taken[0].at + DAY_TURNS - 1 });
  assert.equal(itemAt(lit, 5, 10), undefined, 'the lantern shows the tile');
  assert.equal(lit.taken.length, 1);
  assert.equal(itemAt(wait({ ...lit, lit: false }), 5, 10).id, 'oilcap');
});

test('it waits while something stands or lies on its tile', () => {
  const s = takeAndStepBack('oilcap');
  const on = { ...s, lit: false, turn: s.taken[0].at + DAY_TURNS };
  assert.equal(regrow({ ...on, hero: { x: 5, y: 10 } }).taken.length, 1, 'the hero');
  assert.equal(regrow({ ...on, enemies: [{ id: 'rat', x: 5, y: 10 }] }).taken.length, 1, 'a rat');
  assert.equal(regrow({ ...on, items: [{ id: 'flask', x: 5, y: 10 }] }).taken.length, 1, 'an item');
  assert.equal(regrow(on).taken.length, 0);
});

test('each thing keeps its own clock', () => {
  let s = { ...makeState(room), lit: false };
  s = noteTaken({ ...s, turn: 10 }, { id: 'oilcap', x: 5, y: 10 });
  s = noteTaken({ ...s, turn: 50 }, { id: 'oilcap', x: 6, y: 10 });
  const n = regrow({ ...s, turn: 10 + DAY_TURNS });
  assert.deepEqual(n.items.map((it) => it.x), [5]);
  assert.deepEqual(n.taken.map((t) => t.x), [6]);
});

test('coming into a room, what grew while the hero was away is there, even in sight', () => {
  const w = makeWorld('first', 4127);
  const there = { ...w.elsewhere.second, taken: [{ id: 'oilcap', x: 3, y: 3, at: 0 }] };
  const n = regrow(arrive({ ...w, turn: DAY_TURNS }, 'second', there, { x: 1, y: 1 }), true);
  assert.ok(n.items.some((it) => it.id === 'oilcap' && it.x === 3 && it.y === 3));
  assert.deepEqual(n.taken, []);
  assert.deepEqual(n.elsewhere.first.taken, [], 'the room left keeps its own list');
});

test('an old save gets empty taken lists: things taken before stay gone', () => {
  const w = makeWorld('first', 4127);
  const { taken, ...old } = w;
  const elsewhere = Object.fromEntries(Object.entries(w.elsewhere).map(([id, { taken: t, ...p }]) => [id, p]));
  const n = UPGRADES[4]({ ...old, elsewhere });
  assert.deepEqual(n.taken, []);
  for (const p of Object.values(n.elsewhere)) assert.deepEqual(p.taken, []);
});

test('taking the stairs into a room, what is due there is already back', () => {
  const w = makeWorld('first', 4127);
  const second = { ...w.elsewhere.second, items: [], taken: [{ id: 'flask', x: 3, y: 3, at: 0 }] };
  const s = { ...w, hero: { x: 1, y: 2 }, turn: 3 * DAY_TURNS, elsewhere: { ...w.elsewhere, second } };
  const n = step(s, 'up');
  assert.equal(n.place, 'second');
  assert.equal(itemAt(n, 3, 3)?.id, 'flask');
  assert.deepEqual(n.taken, []);
});

// § deposits: a broken deposit grows back on its own tile after 3 days (O3)
import { withTile } from '../src/core/room.js';
import { litAt } from '../src/core/sight.js';
import { get } from '../src/core/registry.js';
import { readJourney, journeyText } from '../src/core/save.js';
const breakAndStepBack = () => {
  const s = makeState(withTile(room, 5, 10, get('deposit')));
  return step(step(step(step(s, 'up'), 'up'), 'up'), 'up'); // three bumps break it, then onto the floor it left
};

test('a broken deposit goes on the taken list with its turn', () => {
  const s = breakAndStepBack();
  assert.deepEqual(s.taken, [{ id: 'deposit', x: 5, y: 10, at: 3 }]);
  assert.deepEqual(s.room.chips, {});
});

// Every deposit on the room's map
const depositsIn = (r) => r.map.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === 'O' ? [{ x, y }] : [])));
const near2 = (d) => Math.abs(d.x - 5) <= 2 && Math.abs(d.y - 10) <= 2;

test('it grows back within 2 tiles of where it stood after three days, not a turn sooner', () => {
  const s = step(breakAndStepBack(), 'down');
  assert.deepEqual(depositsIn(waitTill(s, 3 * DAY_TURNS - 1).room), []);
  const n = waitTill(s, 3 * DAY_TURNS), found = depositsIn(n.room);
  assert.equal(found.length, 1);
  assert.ok(near2(found[0]), JSON.stringify(found[0]));
  assert.deepEqual(n.taken, []);
  assert.deepEqual(n.items, []);
});

test('it never grows back in sight, only on a dark tile near it', () => {
  const s = step(breakAndStepBack(), 'down'), on = { ...s, lit: true, turn: s.taken[0].at + 3 * DAY_TURNS };
  let grown = 0;
  for (let seed = 1; seed <= 40; seed++) {
    for (const d of depositsIn(regrow({ ...on, seed }).room)) { grown++; assert.ok(!litAt(on, d.x, d.y), `${d.x},${d.y}`); }
  }
  assert.ok(grown > 0, 'the dark corners near it take it');
});

test('it waits while no tile near it is free', () => {
  const s = breakAndStepBack(), on = { ...s, lit: false, turn: s.taken[0].at + 3 * DAY_TURNS };
  const items = [];
  for (let y = 8; y <= 12; y++) for (let x = 3; x <= 7; x++) items.push({ id: 'flask', x, y });
  assert.equal(regrow({ ...on, items }).taken.length, 1);
});

test('it never lands on the hero, a creature or an item, nor on the edge, nor cuts the room in two', () => {
  const s = breakAndStepBack(), on = { ...s, lit: false, turn: s.taken[0].at + 3 * DAY_TURNS };
  const things = [{ id: 'rat', x: 4, y: 10 }], items = [{ id: 'flask', x: 6, y: 10 }];
  for (let at = 0; at < 40; at++) {
    const n = regrow({ ...on, taken: [{ ...s.taken[0], at }], enemies: things, items });
    for (const d of depositsIn(n.room)) {
      assert.ok(near2(d));
      assert.ok(![s.hero, ...things, ...items].some((o) => o.x === d.x && o.y === d.y), `at ${at}`);
      assert.ok(d.x > 0 && d.y > 0 && d.x < room.cols - 1 && d.y < room.rows - 1);
    }
  }
});

test('the same save gives the same spot, and spots vary', () => {
  const s = breakAndStepBack(), on = { ...s, lit: false, hero: { x: 5, y: 13 }, turn: 5000 };
  const spot = (at) => JSON.stringify(depositsIn(regrow({ ...on, taken: [{ ...s.taken[0], at }] }).room));
  assert.equal(spot(3), spot(3));
  assert.ok(new Set(Array.from({ length: 20 }, (_, at) => spot(at))).size > 1);
});

test('a saved journey keeps a broken deposit\'s clock', () => {
  const s = breakAndStepBack();
  assert.deepEqual(readJourney(journeyText(s)).state.taken, s.taken);
});

test('coming into a room, a deposit that grew back while the hero was away is there', () => {
  const w = makeWorld('first', 4127);
  const there = { ...w.elsewhere.second, taken: [{ id: 'deposit', x: 3, y: 3, at: 0 }] };
  const before = depositsIn(w.elsewhere.second.room).length;
  const n = regrow(arrive({ ...w, turn: 3 * DAY_TURNS }, 'second', there, { x: 1, y: 1 }), true);
  assert.equal(depositsIn(n.room).length, before + 1);
  assert.deepEqual(n.taken, []);
});

test('in real cave rooms, a deposit grown back never cuts the room in two', async () => {
  const { placeFor, makeRoom: roomOf, tileAt } = await import('../src/core/room.js');
  const { layoutAt } = await import('../src/core/region.js');
  const joined = (r) => {
    const open = [];
    for (let y = 0; y < r.rows; y++) for (let x = 0; x < r.cols; x++) if (!tileAt(r, x, y).solid) open.push(`${x},${y}`);
    const seen = new Set([open[0]]), queue = [open[0]];
    while (queue.length) {
      const [x, y] = queue.shift().split(',').map(Number);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const k = `${x + dx},${y + dy}`;
        if (open.includes(k) && !seen.has(k)) { seen.add(k); queue.push(k); }
      }
    }
    return seen.size === open.length;
  };
  for (const seed of [1, 2, 3, 4, 5]) for (const { id } of layoutAt(seed, 2).cells) {
    const p = placeFor(id, seed), cave = roomOf(p.map), d = depositsIn(cave)[0];
    const s = { ...makeState(withTile(cave, d.x, d.y, get('floor')), p.start), seed, lit: false, turn: 900, taken: [{ id: 'deposit', x: d.x, y: d.y, at: 0 }] };
    const n = regrow(s);
    assert.equal(depositsIn(n.room).length, 3, `seed ${seed}, ${id}`);
    assert.ok(joined(n.room), `seed ${seed}, ${id}`);
  }
});
