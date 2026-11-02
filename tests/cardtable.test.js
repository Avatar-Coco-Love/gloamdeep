// § card table (D-573): every card screen in the table answers a pick, an arrow, a tap and
// Esc or P, and a tap outside its card or Esc goes back to play
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CARD_TABLE, makeCards } from '../src/input/cards/table.js';

const helpers = new Proxy({}, { get: () => () => {} }); // cardscreens.js's helpers, doing nothing
const made = () => {
  const shown = [];
  const app = { tab: 'sell', chosen: 0, bench: { x: 1, y: 1 }, state: { bag: [] } };
  return { shown, cards: makeCards(app, { spoken: { textContent: '' } }, (sc) => shown.push(sc), helpers) };
};

test('the table holds the bag, place, bench, chest and trade cards', () => {
  assert.deepEqual(Object.keys(CARD_TABLE).sort(), ['bag', 'bench', 'chest', 'place', 'trade']);
});

for (const id of Object.keys(CARD_TABLE)) {
  test(`the ${id} card answers a pick, an arrow, a tap and Esc`, () => {
    const card = made().cards[id];
    for (const k of ['pick', 'dir', 'tap', 'close']) assert.equal(typeof card[k], 'function', k);
  });
  if (id === 'place') continue; // setting down has its own checks below: a tap anywhere goes to tapSide
  test(`a tap outside the ${id} card, or Esc, goes back to play`, () => {
    const { shown, cards } = made();
    cards[id].tap(-10, -10, false);
    assert.deepEqual(shown, ['play']);
    cards[id].tap(-10, -10, true); // a held press does nothing
    assert.deepEqual(shown, ['play']);
    cards[id].close();
    assert.deepEqual(shown, ['play', 'play']);
  });
}

test('setting down: Enter does nothing, an arrow sets it, a tap goes to tapSide, Esc goes back to play', () => {
  const calls = [], shown = [];
  const app = { chosen: 0, state: { bag: [] } };
  const place = makeCards(app, {}, (sc) => shown.push(sc), { setToward: (d) => calls.push(['set', d]), tapSide: (x, y) => calls.push(['tap', x, y]) }).place;
  place.pick(0);
  assert.deepEqual(calls, []);
  place.dir('left');
  place.tap(5, 6, true); // a held press does nothing
  place.tap(5, 6, false);
  assert.deepEqual(calls, [['set', 'left'], ['tap', 5, 6]]);
  assert.deepEqual(shown, []);
  place.close();
  assert.deepEqual(shown, ['play']);
});
