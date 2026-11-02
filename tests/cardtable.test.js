// § card table (D-573, D-575): every card screen in the table answers a pick, an arrow, a tap
// and Esc or P, and a tap outside its card or Esc takes its own way back: play, or for the
// title's asks the title or their own close
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CARD_TABLE, makeCards } from '../src/input/cards/table.js';
import { ASKS } from '../src/input/cards/ask.js';
import { SURE_MENU, MODE_FIRST } from '../src/core/menu.js';
import { askCardAt } from '../src/render/askcard.js';
import { view } from '../src/render/screen.js';

const ASK = ['Start over?', 'Your saved journey is lost.']; // any question and note
// The helpers from cardscreens.js and screens.js, each noting its call; askOf and menuOf answer
const made = (screen) => {
  const shown = [], calls = [];
  const helpers = new Proxy({}, { get: (_, k) => (k === 'askOf' ? () => ASK : k === 'menuOf' ? () => SURE_MENU : (...a) => { calls.push([k, ...a]); }) });
  const app = { screen, tab: 'sell', chosen: 0, bench: { x: 1, y: 1 }, state: { bag: [] } };
  return { app, shown, calls, cards: makeCards(app, { spoken: { textContent: '' } }, (sc, at) => shown.push(at === undefined ? sc : [sc, at]), helpers) };
};
// Where Esc, the cross and a tap outside lead, when not back to play: a helper's call
const BACK = { sure: ['titleAt', 'new'], drop: ['closeDrop', false], easier: ['closeEasier', false] };

test('the table holds the bag, place, bench, chest and trade cards, and the four asks', () => {
  assert.deepEqual(Object.keys(CARD_TABLE).sort(), ['bag', 'bed', 'bench', 'chest', 'drop', 'easier', 'place', 'sure', 'trade']);
  for (const id of ASKS) assert.ok(CARD_TABLE[id], id);
});

for (const id of Object.keys(CARD_TABLE)) {
  test(`the ${id} card answers a pick, an arrow, a tap and Esc`, () => {
    const card = made(id).cards[id];
    for (const k of ['pick', 'dir', 'tap', 'close']) assert.equal(typeof card[k], 'function', k);
  });
  if (id === 'place') continue; // setting down has its own checks below: a tap anywhere goes to tapSide
  const back = BACK[id];
  test(`a tap outside the ${id} card, or Esc, goes ${back ? `to ${back[0]}` : 'back to play'}`, () => {
    const { shown, calls, cards } = made(id);
    const went = () => (back ? calls.filter((c) => c[0] === back[0]) : shown);
    const one = back ?? 'play';
    cards[id].tap(-10, -10, false);
    assert.deepEqual(went(), [one]);
    cards[id].tap(-10, -10, true); // a held press does nothing
    assert.deepEqual(went(), [one]);
    cards[id].close();
    assert.deepEqual(went(), [one, one]);
    if (back) assert.deepEqual(shown, []);
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

test('an ask: an arrow moves between YES and NO, a tap on a button picks it', () => {
  const { app, shown, calls, cards } = made('sure');
  cards.sure.dir('right');
  assert.equal(app.chosen, 1);
  cards.sure.dir('left');
  assert.equal(app.chosen, 0);
  // a point on each button, found by the ask card's own layout
  const on = (line) => { for (let y = 0; y < view.h; y++) for (let x = 0; x < view.w; x++) { const at = askCardAt(x, y, view.w, view.h, ...ASK, SURE_MENU); if (at?.line === line) return [x, y]; } };
  cards.sure.tap(...on(1), false); // NO: back to the title, on New journey
  assert.equal(app.chosen, 1);
  assert.deepEqual(calls, [['titleAt', 'new']]);
  cards.sure.tap(...on(0), false); // YES: the way to play asked
  assert.equal(app.chosen, 0);
  assert.deepEqual(shown, [['mode', MODE_FIRST]]);
});
