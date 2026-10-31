// § gloamberry: one gloamberry bush in each woods room; a bump picks 2 Gloamberries and
// leaves it bare, and it fills again on its own tile 300 turns later (step 13b, D-531)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateWoods } from '../src/core/woods.js';
import { makeRoom, tileAt, withTile, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step } from '../src/core/turn.js';
import { eat } from '../src/core/bagturn.js';
import { regrow } from '../src/core/regrow.js';
import { get } from '../src/core/registry.js';

const SEEDS = Array.from({ length: 300 }, (_, i) => i + 1);
const bushes = (map) => map.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === 'G' ? [{ x, y }] : [])));

// A room with a full bush just right of the hero
function besideBush(extra = {}) {
  const s = makeState(makeRoom(FIRST_ROOM));
  const { x, y } = s.hero;
  const room = withTile(withTile(s.room, x + 1, y, get('berryBush')), x, y, get('floor'));
  return { ...s, room, ...extra };
}

test('the bush is solid, light passes over it, and one bump gives 2 Gloamberries, leaving it bare', () => {
  const b = get('berryBush');
  assert.deepEqual([b.kind, b.name, b.solid, b.blocksLight, b.regrow, b.on], ['tile', 'Gloamberry bush', true, false, 300, 'bareBush']);
  assert.deepEqual([b.mine.hits, b.mine.drops, b.mine.n, b.mine.leaves], [1, 'gloamberry', 2, 'bareBush']);
  const bare = get('bareBush');
  assert.deepEqual([bare.solid, bare.blocksLight, bare.regrow], [true, false, undefined]);
});

test('every woods room holds 1 bush, off the edge, the start and the sticks, never cutting the room', () => {
  for (const seed of SEEDS) {
    const w = generateWoods(seed, seed % 2 ? null : { tile: { x: 0, y: 9 }, dir: 'left' }), found = bushes(w.map);
    assert.equal(found.length, 1, `seed ${seed}`);
    const [at] = found;
    assert.ok(at.x > 0 && at.y > 0 && at.x < w.map[0].length - 1 && at.y < w.map.length - 1);
    assert.ok(!(at.x === w.start.x && at.y === w.start.y));
    assert.ok(!w.items.some((it) => it.x === at.x && it.y === at.y));
  }
});

test('with room for 1, the other berry lies on an open tile beside the bare bush', () => {
  const bag = [...Array.from({ length: 11 }, () => ({ id: 'flask', n: 5 })), { id: 'gloamberry', n: 19 }];
  const s = besideBush({ bag }), n = step(s, 'right'), { x, y } = s.hero;
  assert.deepEqual(n.bag.at(-1), { id: 'gloamberry', n: 20 });
  const left = n.items.filter((it) => it.id === 'gloamberry');
  assert.equal(left.length, 1);
  assert.ok(!tileAt(n.room, left[0].x, left[0].y).solid);
  assert.ok(Math.abs(left[0].x - (x + 1)) <= 1 && Math.abs(left[0].y - y) <= 1);
});

test('bumping a full bush passes a turn, puts 2 Gloamberries in the bag and leaves a bare bush', () => {
  const s = besideBush(), n = step(s, 'right'), { x, y } = s.hero;
  assert.equal(n.turn, s.turn + 1);
  assert.deepEqual(n.hero, s.hero);
  assert.deepEqual(n.bag.find((o) => o.id === 'gloamberry'), { id: 'gloamberry', n: 2 });
  assert.equal(tileAt(n.room, x + 1, y).id, 'bareBush');
  assert.equal(n.line.id, 'gloamberryTake');
  assert.ok(n.taken.some((t) => t.id === 'berryBush' && t.x === x + 1 && t.y === y));
});

test('a bare bush bumped says it is bare, free', () => {
  const s = besideBush(), n = step(s, 'right'), again = step(n, 'right');
  assert.equal(again.turn, n.turn);
  assert.equal(again.line.id, 'bushBare');
  assert.deepEqual(again.bag, n.bag);
});

test('with no room in the bag the bush keeps its berries, free', () => {
  const full = Array.from({ length: 12 }, () => ({ id: 'flask', n: 5 }));
  const s = besideBush({ bag: full }), n = step(s, 'right');
  assert.equal(n.turn, s.turn);
  assert.equal(n.line.id, 'gloamberryFull');
  assert.equal(tileAt(n.room, s.hero.x + 1, s.hero.y).id, 'berryBush');
});

test('the bare bush fills again on its own tile after 300 turns, not before', () => {
  const s = besideBush(), n = step(s, 'right'), { x, y } = s.hero;
  const early = regrow({ ...n, turn: n.turn + 299 }, true);
  assert.equal(tileAt(early.room, x + 1, y).id, 'bareBush');
  const late = regrow({ ...n, turn: n.turn + 300 }, true);
  assert.equal(tileAt(late.room, x + 1, y).id, 'berryBush');
  assert.ok(!late.taken.some((t) => t.id === 'berryBush'));
});

test('a gloamberry is eaten from the bag for 1 heart, a turn, only when hurt', () => {
  const s = { ...besideBush(), bag: [{ id: 'gloamberry', n: 2 }] };
  const hurt = { ...s, health: s.health - 2 }, n = eat(hurt, 0);
  assert.equal(n.health, hurt.health + 1);
  assert.equal(n.turn, hurt.turn + 1);
  assert.deepEqual(n.bag, [{ id: 'gloamberry', n: 1 }]);
  assert.equal(n.line.id, 'gloamberryEat');
  assert.equal(eat(s, 0).line.id, 'notHurt');
  assert.equal(get('gloamberry').max, 20);
});
