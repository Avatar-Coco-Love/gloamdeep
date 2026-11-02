// § picking: garden step 5 (D-568), Pick on the grown bed's card gives 3 Gloamberries and
// the bed goes back to a sprout that grows again
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, tileAt, withTile } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, pick, canPick, wait } from '../src/core/turn.js';
import { gardenMenu } from '../src/core/menu.js';
import { DAY_TURNS } from '../src/core/daytime.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const home = (bag, tile = 'berryBed') => {
  const s = makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 });
  return { ...s, room: withTile(s.room, 3, 2, get(tile)), bag, lit: false };
};

test('Pick: 3 Gloamberries, a turn, its line, the bed a sprout again with its clock restarted', () => {
  const s = home([]), p = pick(s, 3, 2);
  assert.deepEqual(p.bag, [{ id: 'gloamberry', n: 3 }]);
  assert.equal(p.turn, s.turn + 1);
  assert.equal(p.line.id, 'gardenBedPick');
  assert.equal(tileAt(p.room, 3, 2).id, 'sprout');
  assert.deepEqual(p.planted, { [`${s.place}:3,2`]: s.turn });
  let later = p; for (let i = 0; i < DAY_TURNS; i++) later = wait(later);
  assert.equal(tileAt(later.room, 3, 2).id, 'berryBed');
});

test('the card: Pick in Plant\'s place once grown, only then', () => {
  assert.equal(canPick(home([]), 3, 2), true);
  assert.equal(canPick(home([], 'sprout'), 3, 2), false);
  assert.equal(canPick(home([], 'plot'), 3, 2), false);
  assert.deepEqual(gardenMenu(false, true).map((l) => [l.text, !!l.dim]), [['Pick', false], ['Deconstruct', false]]);
});

test('no room: the wild bush\'s line, free, the berries kept; room for fewer, the rest nearby', () => {
  const full = Array.from({ length: 6 }, () => ({ id: 'gloamberry', n: 20 })), s = home(full), p = pick(s, 3, 2);
  assert.equal(p.turn, s.turn);
  assert.equal(p.line.id, 'gloamberryFull');
  assert.equal(tileAt(p.room, 3, 2).id, 'berryBed');
  const most = [...full.slice(1), { id: 'gloamberry', n: 19 }], q = pick(home(most), 3, 2);
  assert.equal(q.bag[5].n, 20);
  assert.deepEqual(q.items.filter((o) => o.id === 'gloamberry').map((o) => [o.x, o.y]), [[3, 3], [4, 2]]);
  assert.equal(tileAt(q.room, 3, 2).id, 'sprout');
});
