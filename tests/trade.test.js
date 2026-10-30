// § trade: the peddler at home buys creature materials, one at a time, for trade coins,
// free, kept on a fall in Normal and gone with the world in Hardcore (step 13a, D-494)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom } from '../src/core/room.js';
import { makeState, makeWorld } from '../src/core/turn.js';
import { fall } from '../src/core/fall.js';
import { buyerAt, sell, coins, priceOf, slotWords, wares, buy, cantBuy, wareWords } from '../src/core/trade.js';
import { readJourney, journeyText } from '../src/core/save.js';

const COMMON = ['ratTail', 'mothDust', 'stinger', 'mimicGlass', 'gloamWisp'], RARE = ['venomSac', 'mimicHeart', 'gloamEye'];
const at = (bag, home = true) => ({ ...makeState(makeRoom(['#####', '#...#', '#####']), { x: 1, y: 1 }), bag, people: [{ id: 'peddler', x: 2, y: 1, home }] });

test('a common material sells for 1 coin, a rare one for 5, and nothing else is bought', () => {
  for (const id of COMMON) assert.equal(priceOf(id), 1, id);
  for (const id of RARE) assert.equal(priceOf(id), 5, id);
  for (const id of ['flask', 'stone', 'copperOre', 'wood', 'oilcap', 'heartcap', 'knife']) assert.equal(priceOf(id), 0, id);
});

test('he buys only at home', () => {
  assert.ok(buyerAt(at([]), 2, 1));
  assert.equal(buyerAt(at([], false), 2, 1), undefined);
  assert.equal(buyerAt(at([]), 3, 1), undefined);
});

test('selling takes one from the stack, adds its price, and passes no turn', () => {
  const s = at([{ id: 'stone', n: 3 }, { id: 'ratTail', n: 2 }, { id: 'gloamEye', n: 1 }]);
  assert.equal(coins(s), 0);
  const one = sell(s, 1);
  assert.deepEqual(one.bag, [{ id: 'stone', n: 3 }, { id: 'ratTail', n: 1 }, { id: 'gloamEye', n: 1 }]);
  assert.equal(coins(one), 1);
  assert.equal(one.turn, s.turn);
  assert.deepEqual(one.events, [{ type: 'sell', id: 'ratTail', coins: 1 }]);
  const two = sell(sell(one, 1), 1); // the tail's slot empties, the eye moves up and sells
  assert.deepEqual(two.bag, [{ id: 'stone', n: 3 }]);
  assert.equal(coins(two), 7);
  assert.equal(sell(two, 0), two); // stone isn't bought
  assert.equal(sell(two, 4), two); // an empty slot
  assert.equal(slotWords(s, 0), 'Stone, 3 carried, not bought');
  assert.equal(slotWords(s, 2), 'Gloam Eye, 1 carried, sells for 5 coins');
});

test('coins are kept on a fall and in a save; a save from before has none; Hardcore starts over with none', () => {
  const rich = { ...makeWorld('first', 3, 'normal'), coins: 12, bag: [{ id: 'ratTail', n: 1 }] };
  assert.equal(coins(fall(rich)), 12);
  assert.equal(readJourney(journeyText(rich)).state.coins, 12);
  const { coins: _none, ...old } = rich;
  assert.equal(coins(old), 0);
  assert.equal(coins(fall({ ...rich, mode: 'hardcore' })), 0);
});

// § buying (step 13b, D-495): a flask for 3 coins, a torch for 2, never running out
test('he sells a flask for 3 coins and a torch for 2', () => {
  assert.deepEqual(wares(), [{ id: 'flask', price: 3 }, { id: 'bagTorch', price: 2 }]);
});

test('buying takes its price, adds one to the bag, passes no turn, and never runs out', () => {
  const s = { ...at([{ id: 'flask', n: 4 }]), coins: 10 };
  const one = buy(s, 0);
  assert.deepEqual(one.bag, [{ id: 'flask', n: 5 }]);
  assert.equal(coins(one), 7);
  assert.equal(one.turn, s.turn);
  assert.deepEqual(one.events, [{ type: 'buy', id: 'flask', coins: 3 }]);
  const two = buy(buy(one, 0), 1); // a full stack of flasks starts a new one
  assert.deepEqual(two.bag, [{ id: 'flask', n: 5 }, { id: 'flask', n: 1 }, { id: 'bagTorch', n: 1 }]);
  assert.equal(coins(two), 2);
  assert.equal(wareWords(two, 1), 'Torch. It costs 2 coins.');
});

test('too few coins or no room in the bag, and nothing is bought', () => {
  const poor = { ...at([]), coins: 2 };
  assert.equal(cantBuy(poor, 0), 'coins');
  assert.equal(buy(poor, 0), poor);
  assert.equal(cantBuy(poor, 1), null);
  const full = { ...at(['stone', 'wood', 'ratTail', 'oilcap', 'heartcap', 'mothDust'].map((id) => ({ id, n: 1 }))), coins: 9 };
  assert.equal(cantBuy(full, 1), 'room');
  assert.equal(buy(full, 1), full);
  assert.equal(wareWords(full, 1), 'Torch. It costs 2 coins. Your bag has no room for it.');
  assert.equal(cantBuy(full, 2), 'none');
});
