// § card screens: the peddler's Sell side says each bag slot with its price (D-494, D-570);
// before 0.3.32 the bag's own slotWords hid trade.js's, and every slot was read "Empty"
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCardScreens } from '../src/input/cardscreens.js';

test('on the Sell tab, the frame on a slot says what it is, how many, and its price', () => {
  const spoken = { textContent: '' };
  const app = { tab: 'sell', chosen: 0, state: { bag: [{ id: 'stone', n: 3 }, { id: 'gloamEye', n: 1 }] } };
  const { pickTrade } = createCardScreens(app, { spoken }, () => {}, () => []);
  pickTrade(0);
  assert.equal(spoken.textContent, 'Stone, 3 carried, not bought');
  pickTrade(1);
  assert.equal(spoken.textContent, 'Gloam Eye, 1 carried, sells for 5 coins');
  pickTrade(2);
  assert.equal(spoken.textContent, 'Empty');
  pickTrade(-1);
  assert.equal(spoken.textContent, 'Tabs, Sell open');
});

// § the dim SELL (H-42, D-878): a press that sells nothing leaves the frame; the last of a
// stack sold, the next slides in under it (Q-102)
test('SELL on an empty slot or one he does not buy sells nothing and leaves the frame', () => {
  const spoken = { textContent: '' }, calls = [];
  const app = { tab: 'sell', chosen: 3, state: { bag: [{ id: 'gloamEye', n: 1 }, { id: 'stone', n: 3 }] } };
  const ui = { spoken, refuse: () => calls.push('refuse'), sell: () => calls.push('sell') };
  const { tradeChosen } = createCardScreens(app, ui, () => {}, () => []);
  tradeChosen();
  assert.equal(app.chosen, 3);
  app.chosen = 1;
  tradeChosen();
  assert.equal(app.chosen, 1);
  assert.deepEqual(calls, ['refuse', 'refuse']);
});

test('the last of a stack sold, the frame stays and the next stack is under it', () => {
  const spoken = { textContent: '' };
  const app = { tab: 'sell', chosen: 0, state: { bag: [{ id: 'gloamEye', n: 1 }, { id: 'stone', n: 3 }] } };
  const ui = { spoken, refuse: () => {}, sell: () => { app.state = { bag: app.state.bag.slice(1) }; } };
  const { tradeChosen } = createCardScreens(app, ui, () => {}, () => []);
  tradeChosen();
  assert.equal(app.chosen, 0);
  assert.equal(spoken.textContent, 'Stone, 3 carried, not bought');
});
