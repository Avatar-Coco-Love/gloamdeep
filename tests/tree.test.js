// § tree: trees off the edge are chopped, 4 bumps for 3 Wood, leaving a stump (W3, D-317)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, tileAt, withTile, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step } from '../src/core/turn.js';
import { formOf } from '../src/core/tiles.js';
import { regrow } from '../src/core/regrow.js';
import { markAt } from '../src/core/map.js';
import { clearLine } from '../src/core/sight.js';
import { LINES } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';

const shown = (s) => (LINES[s.line.id].texts ? LINES[s.line.id].texts[s.line.i] : LINES[s.line.id].text);
const bumps = (s, k, dir = 'up') => { for (let i = 0; i < k; i++) s = step(s, dir); return s; };

test('a tree is chopped in 4 bumps for 3 Wood, leaves a stump, back in 900 turns', () => {
  const t = get('tree'), s = get('stump');
  assert.deepEqual([t.mine.hits, t.mine.drops, t.mine.n, t.mine.leaves, t.regrow, t.on], [4, 'wood', 3, 'stump', 900, 'stump']);
  assert.deepEqual([s.solid, s.blocksLight, s.forms], [false, false, 3]);
  const forms = new Set();
  for (let x = 0; x < 30; x++) forms.add(formOf(s, x, 3));
  assert.deepEqual([...forms].sort(), [0, 1, 2]);
});

// The hero starts at 5,11 in the first room; a tree on 5,10 is just above.
const beside = (bag = []) => ({ ...makeState(withTile(makeRoom(FIRST_ROOM), 5, 10, get('tree'))), hero: { x: 5, y: 11 }, bag });
const form = formOf(get('stump'), 5, 10);

test('bumps 1 to 3 say their lines, a turn each, and it stands', () => {
  let s = beside();
  for (const [i, line] of ['You hack at the tree.', 'Chips fly from the trunk.', 'The tree groans.'].entries()) {
    s = step(s, 'up');
    assert.equal(s.turn, i + 1);
    assert.equal(shown(s), line);
    assert.equal(tileAt(s.room, 5, 10).id, 'tree');
    assert.deepEqual(s.hero, { x: 5, y: 11 });
  }
});

test('the fourth fells it to a stump, 3 Wood in the stump\'s look into the bag', () => {
  const s = bumps(beside(), 4);
  assert.equal(s.turn, 4);
  assert.equal(tileAt(s.room, 5, 10).id, 'stump');
  assert.deepEqual(s.bag, [{ id: 'wood', n: 3, form }]);
  assert.equal(shown(s), 'The tree falls. You take wood.');
  assert.deepEqual(s.room.chips, {});
  assert.deepEqual(s.taken.map((t) => t.id), ['tree']);
  assert.ok(s.events.some((e) => e.type === 'take' && e.id === 'wood'));
});

test('the stump is walked over, the view passes it, the map shows it open', () => {
  const s = step(bumps(beside(), 4), 'up');
  assert.deepEqual(s.hero, { x: 5, y: 10 });
  assert.ok(clearLine(s.room, { x: 5, y: 11 }, { x: 5, y: 9 }));
  assert.notEqual(markAt(s.room, null, 5, 10), 'wall');
});

test('with room for 1, it still falls, and 2 sticks lie on the stump and the nearest open tile', () => {
  const s = bumps(beside([{ id: 'wood', n: 2, form: 0 }]), 4);
  assert.equal(tileAt(s.room, 5, 10).id, 'stump');
  assert.deepEqual(s.bag, [{ id: 'wood', n: 3, form }]);
  const left = s.items.filter((it) => it.id === 'wood');
  assert.equal(left.length, 2);
  assert.ok(left.every((it) => it.once && it.form === form && !tileAt(s.room, it.x, it.y).solid));
  assert.ok(left.some((it) => it.x === 5 && it.y === 10));
  assert.ok(!left.some((it) => it.x === 5 && it.y === 11)); // never under the hero
  assert.equal(new Set(left.map((it) => `${it.x},${it.y}`)).size, 2);
});

test('with 3 Wood carried, the fourth bump holds, free, with its line', () => {
  const s = bumps(beside([{ id: 'wood', n: 3 }]), 4);
  assert.equal(s.turn, 3);
  assert.equal(tileAt(s.room, 5, 10).id, 'tree');
  assert.equal(shown(s), "You can't carry more wood.");
});

test('a tree on the room\'s edge is never chopped', () => {
  const room = withTile(makeRoom(FIRST_ROOM), 5, 12, get('tree'));
  const s = bumps({ ...makeState(room), hero: { x: 5, y: 11 } }, 4, 'down');
  assert.equal(s.turn, 0);
  assert.equal(tileAt(s.room, 5, 12).id, 'tree');
});

test('bumping an edge tree says its two lines in turn, free (D-321)', () => {
  const room = withTile(makeRoom(FIRST_ROOM), 5, 12, get('tree'));
  let s = { ...makeState(room), hero: { x: 5, y: 11 } };
  const said = [];
  for (let i = 0; i < 3; i++) { s = step(s, 'down'); said.push(shown(s)); }
  assert.deepEqual(said, ['The forest will not yield.', 'These trees are too old to fell.', 'The forest will not yield.']);
  assert.equal(s.turn, 0);
});

test('a stump grows back into a tree on its own tile after 900 turns, out of sight', () => {
  const s = bumps(beside(), 4), was = s.taken[0], away = { ...s, hero: { x: 2, y: 2 } };
  assert.equal(regrow({ ...away, turn: was.at + 899 }, true).taken.length, 1);
  const back = regrow({ ...away, turn: was.at + 900 }, true);
  assert.equal(tileAt(back.room, 5, 10).id, 'tree');
  assert.equal(back.taken.length, 0);
});

test('it waits while something lies on the stump, or growing would cut the room', () => {
  const s = bumps(beside(), 4), was = s.taken[0], away = { ...s, hero: { x: 2, y: 2 }, turn: was.at + 900 };
  const lying = regrow({ ...away, items: [{ id: 'wood', x: 5, y: 10 }] }, true);
  assert.equal(tileAt(lying.room, 5, 10).id, 'stump');
  // walls either side of the stump: a tree there would split the room's left from its right
  let room = s.room;
  for (let y = 1; y < room.rows - 1; y++) if (y !== 10) room = withTile(room, 5, y, get('wall'));
  const cut = regrow({ ...away, room }, true);
  assert.equal(tileAt(cut.room, 5, 10).id, 'stump');
  assert.equal(cut.taken.length, 1);
});
