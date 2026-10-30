// § vest: the Rat Hide Vest, the first armour piece, made at the workbench and worn from the bag (D-484)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt } from '../src/core/turn.js';
import { enemiesAct } from '../src/core/creatureturn.js';
import { benchMakes } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { wear, wornOf, glanceOf } from '../src/core/worn.js';

const start = (bag) => ({ ...makeState(makeRoom(FIRST_ROOM)), bag });

test('the Rat Hide Vest is the bench\'s fourth slot: 4 Rat Tail and 1 Wood, dim with too few', () => {
  assert.equal(get('ratVest').name, 'Rat Hide Vest');
  const vest = benchMakes([{ id: 'ratTail', n: 4 }, { id: 'wood', n: 1 }])[3];
  assert.deepEqual(vest, { item: 'ratVest', cost: [{ id: 'ratTail', n: 4, have: 4 }, { id: 'wood', n: 1, have: 1 }], dim: false });
  assert.equal(benchMakes([{ id: 'ratTail', n: 3 }, { id: 'wood', n: 1 }])[3].dim, true);
});

test('Make takes its cost for a vest, a turn; too few, one carried or one worn is free', () => {
  const s = start([{ id: 'ratTail', n: 5 }, { id: 'wood', n: 1 }]);
  const made = makeAt(s, 'ratVest');
  assert.deepEqual(made.bag, [{ id: 'ratTail', n: 1 }, { id: 'ratVest', n: 1 }]);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a rat hide vest.');
  assert.equal(shownLine(makeAt(start([{ id: 'ratTail', n: 3 }]), 'ratVest')).text, 'You need 4 Rat Tail and 1 Wood.');
  const more = [{ id: 'ratTail', n: 4 }, { id: 'wood', n: 1 }];
  assert.equal(shownLine(makeAt({ ...made, bag: [...made.bag, ...more] }, 'ratVest')).text, 'You already have a rat hide vest.');
  const worn = makeAt({ ...s, bag: more, worn: { armour: 'ratVest' } }, 'ratVest');
  assert.equal(worn.turn, s.turn);
  assert.equal(shownLine(worn).text, 'You already have a rat hide vest.');
});

test('Wear puts the vest on from the bag, free, with its line', () => {
  const s = start([{ id: 'stone', n: 2 }, { id: 'ratVest', n: 1 }]);
  assert.deepEqual(wornOf(s), {});
  assert.equal(glanceOf(s), 0);
  const n = wear(s, 1);
  assert.deepEqual(n.worn, { armour: 'ratVest' });
  assert.deepEqual(n.bag, [{ id: 'stone', n: 2 }]);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'You put on the rat hide vest.');
  assert.equal(glanceOf(n), 0.25);
  assert.equal(wear(s, 0), s, 'stone is not worn');
});

test('worn, about 1 in 4 bites glance off and hurt nothing, with the glance line; never without it', () => {
  const s = start([]), { x, y } = s.hero;
  const bitten = (state, turn) => enemiesAct({ ...state, turn, health: 3, enemies: [{ id: 'rat', x: x + 1, y, health: 2 }] });
  let glanced = 0;
  for (let turn = 0; turn < 400; turn++) {
    assert.equal(bitten(s, turn).health, 2, 'bare, every bite hurts');
    const b = bitten({ ...s, worn: { armour: 'ratVest' } }, turn);
    if (b.health === 3) { glanced++; assert.equal(shownLine(b).text, 'The bite glances off your vest.'); }
    else assert.equal(b.health, 2);
  }
  assert.ok(glanced > 70 && glanced < 130, `${glanced} of 400 glanced`);
});
