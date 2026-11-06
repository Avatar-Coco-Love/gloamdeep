// § rod: the Wooden Rod, fishing's first step (D-609): made at the workbench, held in the
// Tool slot, swapped with the pick there; held, water says its line, free
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, withTile, tileAt } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, step } from '../src/core/turn.js';
import { hold } from '../src/core/bagturn.js';
import { benchMakes } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';

test('the Wooden Rod is a tool on the bench: 2 Wood and 2 Spider Silk, dim with too few', () => {
  const rod = get('rod');
  assert.equal(rod.name, 'Wooden Rod');
  assert.equal(rod.tool, true);
  const made = benchMakes([{ id: 'wood', n: 2 }, { id: 'spiderSilk', n: 2 }]).find((m) => m.item === 'rod');
  assert.deepEqual(made, { item: 'rod', cost: [{ id: 'wood', n: 2, have: 2 }, { id: 'spiderSilk', n: 2, have: 2 }], dim: false });
  assert.equal(benchMakes([{ id: 'wood', n: 2 }]).find((m) => m.item === 'rod').dim, true);
});

test('Make takes its cost, a turn, straight into an empty Tool slot; too few or one carried is free', () => {
  const s = { ...makeState(makeRoom(FIRST_ROOM)), bag: [{ id: 'wood', n: 3 }, { id: 'spiderSilk', n: 2 }] };
  const made = makeAt(s, 'rod');
  assert.deepEqual(made.bag, [{ id: 'wood', n: 1 }]);
  assert.equal(made.tool, 'rod');
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a wooden rod.');
  const short = makeAt({ ...s, bag: [{ id: 'wood', n: 1 }] }, 'rod');
  assert.equal(short.turn, s.turn);
  assert.equal(shownLine(short).text, 'You need 2 Wood and 2 Spider Silk.');
  const again = makeAt({ ...made, bag: [{ id: 'wood', n: 2 }, { id: 'spiderSilk', n: 2 }] }, 'rod');
  assert.equal(shownLine(again).text, 'You already carry a wooden rod.');
});

test('Hold on the rod swaps it with the pick in the Tool slot, a turn', () => {
  const s = { ...makeState(makeRoom(FIRST_ROOM)), bag: [{ id: 'rod', n: 1 }], tool: 'pick' };
  const held = hold(s, 0);
  assert.equal(held.tool, 'rod');
  assert.deepEqual(held.bag, [{ id: 'pick', n: 1 }]);
  assert.equal(held.turn, s.turn + 1);
  assert.equal(shownLine(held).text, 'You hold the wooden rod.');
});

// The hero at 5,11 in the first room, water just above
const beside = (tool) => ({ ...makeState(withTile(makeRoom(FIRST_ROOM), 5, 10, get('water'))), hero: { x: 5, y: 11 }, tool });

test('bumping a cave pool with the rod held casts, a turn; without it, nothing (D-618)', () => {
  const s = step(beside('rod'), 'up');
  assert.equal(s.turn, 1);
  assert.equal(tileAt(s.room, 5, 10).id, 'water');
  assert.deepEqual(s.hero, { x: 5, y: 11 });
  assert.equal(shownLine(s).text, 'You cast the line.');
  for (const tool of [null, 'pick']) assert.equal(step(beside(tool), 'up').float, null);
});
