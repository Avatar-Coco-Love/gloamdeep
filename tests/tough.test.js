// § tough: Body's second upgrade, 1 ember, bought once, above Heart in the first row; with it a
// hurting bite poisons only about 1 time in 2, by the seeded dice (D-657)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, wait, FIRST_START } from '../src/core/turn.js';
import { embers, canBuy, buy, buyAt, told, upgradeAt, START_PICK } from '../src/core/growth.js';
import { poisonLeft, shrugs } from '../src/core/poison.js';
import { UPGRADES, grown } from '../src/core/upgrades.js';

const room = makeRoom(FIRST_ROOM);
const TOUGH = { col: 1, row: 0, slot: 1 };
const at = (enemies, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies, ...more });

test('Tough sits above the heart in Body\'s first row', () => {
  assert.equal(upgradeAt(TOUGH), UPGRADES.tough);
  assert.equal(upgradeAt(START_PICK), UPGRADES.heart);
});

test('Tough costs 1 ember, is bought once, and its button goes', () => {
  const s = { xp: 10, health: 5 };
  assert.equal(told(s, TOUGH).button.can, true);
  assert.equal(told({ xp: 0, health: 5 }, TOUGH).button.can, false);
  const n = buyAt(s, TOUGH);
  assert.equal(grown(n, 'tough'), 1);
  assert.equal(embers(n), 0);
  assert.equal(canBuy({ ...n, xp: 60 }, 'tough'), false);
  assert.equal(buy(n, 'tough'), n);
  assert.equal(told(n, TOUGH).button, null);
  assert.equal(told(n, TOUGH).value, 'Bought');
  assert.equal(n.health, 5, 'no heart and no turn');
});

test('without Tough every hurting bite poisons; with it about 1 in 2, the same each time for the same seed and turn', () => {
  let poisoned = 0, without = 0;
  for (let seed = 1; seed <= 200; seed++) {
    const s = at([{ id: 'centipede', x: 5, y: 10 }], { seed });
    if (poisonLeft(wait(s)) > 0) without++;
    const t = wait({ ...s, grown: { tough: 1 } });
    if (poisonLeft(t) > 0) poisoned++;
    assert.equal(poisonLeft(wait({ ...s, grown: { tough: 1 } })), poisonLeft(t));
  }
  assert.equal(without, 200);
  assert.ok(poisoned > 70 && poisoned < 130, `${poisoned} of 200`);
  assert.equal(shrugs({ seed: 7, turn: 3 }), false, 'never without Tough');
});
