// § branch: one fallen branch in each woods room, two bumps for 2 Wood (W2, D-316)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateWoods } from '../src/core/woods.js';
import { makeRoom, tileAt, withTile, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step } from '../src/core/turn.js';
import { formOf } from '../src/core/tiles.js';
import { regrow } from '../src/core/regrow.js';
import { markAt } from '../src/core/map.js';
import { clearLine } from '../src/core/sight.js';
import { LINES } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';

const SEEDS = Array.from({ length: 300 }, (_, i) => i + 1);
const branches = (map) => map.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === 'F' ? [{ x, y }] : [])));
const shown = (s) => (LINES[s.line.id].texts ? LINES[s.line.id].texts[s.line.i] : LINES[s.line.id].text);

// Every open tile of a woods map, the mouth too, walkable from the start
function joined(w) {
  const walk = (x, y) => w.map[y]?.[x] === '.' || w.map[y]?.[x] === 'M';
  let all = 0;
  w.map.forEach((row, y) => [...row].forEach((_, x) => { if (walk(x, y)) all++; }));
  const seen = new Set([`${w.start.x},${w.start.y}`]), queue = [w.start];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = t.x + dx, y = t.y + dy;
      if (walk(x, y) && !seen.has(`${x},${y}`)) { seen.add(`${x},${y}`); queue.push({ x, y }); }
    }
  }
  return seen.size === all;
}

test('a fallen branch is a solid tile light passes over, mined in 2 bumps for 2 Wood, back in 900 turns', () => {
  const b = get('branch');
  assert.equal(b.kind, 'tile');
  assert.equal(b.name, 'Fallen branch');
  assert.equal(b.solid, true);
  assert.equal(b.blocksLight, false);
  assert.equal(b.regrow, 900);
  assert.equal(b.near, 2);
  assert.deepEqual([b.mine.hits, b.mine.drops, b.mine.n], [2, 'wood', 2]);
});

test('every woods room holds 1 branch, off the start and the sticks, never cutting the room', () => {
  const forms = new Set();
  for (const seed of SEEDS) {
    const w = generateWoods(seed, seed % 2 ? null : { tile: { x: 0, y: 9 }, dir: 'left' }), found = branches(w.map);
    assert.equal(found.length, 1, `seed ${seed}`);
    const [at] = found;
    assert.ok(![w.start, ...w.items].some((o) => o.x === at.x && o.y === at.y));
    assert.ok(joined(w), `seed ${seed} is cut in two`);
    forms.add(formOf(get('branch'), at.x, at.y));
  }
  assert.deepEqual([...forms].sort(), [0, 1, 2]);
});

test('no stick lies on the branch', () => {
  for (const seed of SEEDS.slice(0, 20)) {
    const w = generateWoods(seed);
    for (const it of w.items) assert.equal(w.map[it.y][it.x], '.');
  }
});

test('the map outlines a branch, and the view passes over it', () => {
  const room = withTile(makeRoom(FIRST_ROOM), 5, 10, get('branch'));
  assert.equal(markAt(room, null, 5, 10), 'wall');
  assert.ok(clearLine(room, { x: 5, y: 11 }, { x: 5, y: 9 }));
});

// The hero starts at 5,11 in the first room; a branch on 5,10 is just above.
const beside = (bag = []) => ({ ...makeState(withTile(makeRoom(FIRST_ROOM), 5, 10, get('branch'))), hero: { x: 5, y: 11 }, bag });
const form = formOf(get('branch'), 5, 10);

test('the first bump creaks, a turn, and it stands', () => {
  const s = step(beside(), 'up');
  assert.equal(s.turn, 1);
  assert.equal(shown(s), 'The branch creaks.');
  assert.equal(tileAt(s.room, 5, 10).id, 'branch');
  assert.deepEqual(s.hero, { x: 5, y: 11 });
});

test('the second breaks it to floor, 2 Wood in its look into the bag, lines in turn', () => {
  const s = step(step(beside(), 'up'), 'up');
  assert.equal(s.turn, 2);
  assert.equal(tileAt(s.room, 5, 10).id, 'floor');
  assert.deepEqual(s.bag, [{ id: 'wood', n: 2, form }]);
  assert.equal(shown(s), 'The branch snaps. You take wood.');
  assert.deepEqual(s.room.chips, {});
  assert.ok(s.events.some((e) => e.type === 'take' && e.id === 'wood'));
  assert.ok(!s.items.some((it) => it.x === 5 && it.y === 10));
  assert.deepEqual(s.taken.map((t) => t.id), ['branch']);
});

test('with room for 1 Wood it still breaks, and the other lies there as a stick that never grows back', () => {
  let s = step(step(beside([{ id: 'wood', n: 2, form: 0 }]), 'up'), 'up');
  assert.equal(tileAt(s.room, 5, 10).id, 'floor');
  assert.deepEqual(s.bag, [{ id: 'wood', n: 3, form }]);
  const left = s.items.find((it) => it.x === 5 && it.y === 10);
  assert.deepEqual(left, { id: 'wood', x: 5, y: 10, form, once: true });
  s = step({ ...s, bag: [] }, 'up'); // picked up
  assert.deepEqual(s.bag, [{ id: 'wood', n: 1, form }]);
  assert.ok(!s.taken.some((t) => t.id === 'wood'));
});

test('with 3 Wood carried, the second bump holds, free, with its line', () => {
  const s = step(step(beside([{ id: 'wood', n: 3 }]), 'up'), 'up');
  assert.equal(s.turn, 1);
  assert.equal(tileAt(s.room, 5, 10).id, 'branch');
  assert.equal(shown(s), "You can't carry more wood.");
  assert.deepEqual(s.bag, [{ id: 'wood', n: 3 }]);
});

test('a broken branch grows back within 2 steps after 900 turns', () => {
  const s = step(step(beside(), 'up'), 'up'), was = s.taken[0];
  assert.equal(regrow({ ...s, turn: was.at + 899 }, true).taken.length, 1);
  const back = regrow({ ...s, turn: was.at + 900 }, true), found = branches(back.room.map);
  assert.equal(found.length, 1);
  assert.ok(Math.abs(found[0].x - 5) <= 2 && Math.abs(found[0].y - 10) <= 2);
  assert.equal(back.taken.length, 0);
});
