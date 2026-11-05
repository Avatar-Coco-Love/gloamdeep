// § card table (D-573, D-575, D-576, D-577): every card screen in the table answers a pick, an arrow,
// a tap and Esc or P, and a tap outside its card or Esc takes its own way back: play, or for the
// title's asks the title or their own close, or for the menus and pages their own (none on the title);
// the profile and map screens (D-578) their own too, and a card's typed keys and page
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CARD_TABLE, makeCards } from '../src/input/cards/table.js';
import { ASKS } from '../src/input/cards/ask.js';
import { SURE_MENU, MODE_FIRST, titleMenu, PAUSE_MENU, MODE_MENU, easeMenu, ENDED_MENU, settingsMenu } from '../src/core/menu.js';
import { loadSettings, swipeText } from '../src/core/settings.js';
import { MENUS } from '../src/input/cards/menu.js';
import { askCardAt } from '../src/render/askcard.js';
import { view } from '../src/render/screen.js';
import { historyRows, historyLayout } from '../src/render/history.js';
import { HISTORY } from '../src/core/history.js';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS } from '../src/core/room.js';
import { makeState, maxHealth, HERO_HEALTH } from '../src/core/turn.js';
import { START_PICK } from '../src/core/growth.js';
import { slotLines, slotsAt } from '../src/render/slots.js';
import { SLOTS } from '../src/core/profile.js';
import { NAME_PAD } from '../src/core/namepad.js';
import { nameCardAt } from '../src/render/namepad.js';
import { PAD } from '../src/core/seedpad.js';
import { seedCardAt } from '../src/render/seedpad.js';
import { LOOK_PADS } from '../src/core/looks.js';
import { lookCardAt } from '../src/render/cloak.js';

const ASK = ['Start over?', 'Your saved journey is lost.']; // any question and note
// Each screen's lines, as screens.js's menuOf gives them: a journey saved, Settings from the title
const settings = loadSettings();
const LINES = { title: titleMenu(true), paused: PAUSE_MENU, settings: settingsMenu(settings), mode: MODE_MENU, ways: easeMenu('normal'), ended: ENDED_MENU };
// The helpers from cardscreens.js and screens.js, each noting its call; askOf and menuOf answer
const made = (screen) => {
  const shown = [], calls = [], ui = { spoken: { textContent: '' }, reduceMotion: { matches: false }, mapMoves: () => ({ dragged: () => false }) };
  // The profiles shown with a title to go back to; the map's card (render/map.js needs a page) all window, nothing outside it but 'out'
  const answers = { askOf: () => ASK, menuOf: (sc) => LINES[sc] ?? SURE_MENU, slotsBack: () => true, linesNow: () => slotLines(null), win: () => ({ x: 0, y: 0, w: view.w, h: view.h }), mapCardAt: (x, y) => (x < 0 || y < 0 ? 'out' : null) };
  const helpers = new Proxy({}, { get: (_, k) => answers[k] ?? ((...a) => { calls.push([k, ...a]); }) });
  const app = { screen, tab: 'sell', chosen: 0, bench: { x: 1, y: 1 }, state: { bag: [] }, settings, saved: true, page: 'basics', opened: new Set(), scroll: 0 };
  app.rows = historyRows(app.opened, historyLayout(view.w, view.h).bodyW); // as openHistory makes them
  return { app, ui, shown, calls, cards: makeCards(app, ui, (sc, at) => shown.push(at === undefined ? sc : [sc, at]), helpers) };
};
// Where Esc, the cross and a tap outside lead, when not back to play: a helper's call
const BACK = { sure: ['titleAt', 'new'], drop: ['closeDrop', false], easier: ['closeEasier', false], settings: ['closeSettings'], ways: ['closeWays'], mode: ['titleAt', 'new'], howto: ['closeHowTo'], history: ['closeHistory'], journal: ['closeJournal'], slots: ['titleAt', 'profiles'], name: ['closeName'], cloak: ['closeCloak'], seed: ['closePad'], explore: ['closeExplorer'] };

test('the table holds the bag, place, bench, chest and trade cards, the four asks, the six menus, the three pages and the profile and map screens', () => {
  assert.deepEqual(Object.keys(CARD_TABLE).sort(), ['bag', 'bed', 'bench', 'boons', 'chest', 'cloak', 'drop', 'easier', 'ended', 'explore', 'history', 'howto', 'journal', 'map', 'mode', 'name', 'paused', 'place', 'seed', 'settings', 'slots', 'sure', 'title', 'trade', 'travel', 'ways']);
  for (const id of [...ASKS, ...MENUS]) assert.ok(CARD_TABLE[id], id);
});

for (const id of Object.keys(CARD_TABLE)) {
  test(`the ${id} card answers a pick, an arrow, a tap and Esc`, () => {
    const card = made(id).cards[id];
    for (const k of ['pick', 'dir', 'tap', 'close']) assert.equal(typeof card[k], 'function', k);
  });
  if (id === 'place' || id === 'title' || id === 'ended') continue; // setting down, the title and the journey's end have their own checks below
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

test('the title: Esc or P do nothing; the journey ends: Esc or P go to the title, on Continue', () => {
  const title = made('title');
  title.cards.title.close();
  assert.deepEqual([title.shown, title.calls], [[], []]);
  const ended = made('ended');
  ended.cards.ended.tap(5, 0, false); // above its lines: nothing
  ended.cards.ended.close();
  assert.deepEqual([ended.shown, ended.calls.filter((c) => c[0] === 'titleAt')], [[], [['titleAt', 'continue']]]);
});

for (const id of MENUS) {
  test(`the ${id} menu: Up and Down move the flame`, () => {
    const { app, cards } = made(id);
    cards[id].dir('down');
    assert.equal(app.chosen, 1);
    cards[id].dir('up');
    assert.equal(app.chosen, 0);
  });
}

test('Settings: Left or Right on a switch changes it and says its new words', () => {
  const { app, ui, cards } = made('settings');
  const was = app.settings.swipe;
  cards.settings.dir('right');
  assert.notEqual(app.settings.swipe, was);
  assert.equal(ui.spoken.textContent, swipeText(app.settings.swipe));
  assert.equal(app.chosen, 0);
  cards.settings.dir('left');
  assert.equal(app.settings.swipe, was);
});

test('how to play: Left and Right turn its tab and say it, Up and Down do nothing, Enter turns to the next', () => {
  const { app, ui, cards } = made('howto');
  cards.howto.dir('right');
  const next = app.page;
  assert.notEqual(next, 'basics');
  assert.ok(ui.spoken.textContent);
  cards.howto.dir('left');
  assert.equal(app.page, 'basics');
  cards.howto.dir('down');
  assert.equal(app.page, 'basics');
  cards.howto.pick(0);
  assert.equal(app.page, next);
});

test('version history: Down chooses the next version, Right opens it, Left closes it, Page Down scrolls', () => {
  const { app, ui, cards } = made('history');
  cards.history.dir('down');
  assert.equal(app.chosen, 1);
  assert.ok(ui.spoken.textContent.includes(HISTORY[1].v));
  cards.history.dir('right');
  assert.ok(app.opened.has(HISTORY[1].v));
  cards.history.dir('left');
  assert.equal(app.opened.size, 0);
  cards.history.page(1);
  assert.ok(app.scroll > 0);
});

test('the journal: Right turns to Growth, and Enter there buys the heart', () => {
  const { app, calls, cards } = made('journal');
  app.tab = 'records';
  app.growthPick = START_PICK;
  app.state = { ...makeState(makeRoom(FIRST_ROOM), undefined, FIRST_LIGHTS, []), xp: 10 }; // an ember to spend
  cards.journal.dir('right');
  assert.equal(app.tab, 'growth');
  cards.journal.pick(0);
  assert.equal(maxHealth(app.state), HERO_HEALTH + 1);
  assert.equal(calls.filter((c) => c[0] === 'journalPageWords').length, 2); // its words said each time
  cards.journal.dir('left'); // Left past Light: back to Records
  cards.journal.dir('left');
  assert.equal(app.tab, 'records');
});

// A point on the screen layer where a card's own layout function finds `want`
const where = (at, want) => { for (let y = 0; y < view.h; y++) for (let x = 0; x < view.w; x++) if (want(at(x, y))) return [x, y]; };

test('profiles: with no title yet a tap outside and Esc stay; Esc first cancels picking; a tap on a box plays it or names it', () => {
  const { app, ui, calls, shown, cards } = made('slots');
  const helpers = { slotsBack: () => false, linesNow: () => slotLines(app.picking), slotsWords: () => 'words', titleAt: (id) => calls.push(['titleAt', id]), openName: (i, re) => calls.push(['openName', i, re]), openCloak: () => {} };
  const slots = makeCards(app, ui, (sc) => shown.push(sc), helpers).slots;
  slots.tap(-10, -10, false);
  slots.close();
  assert.deepEqual(calls, []);
  app.picking = 'rename';
  slots.close(); // Cancel
  assert.equal(app.picking, null);
  assert.equal(ui.spoken.textContent, 'words');
  app.profiles = { slots: [null, { name: 'Ash' }, null] };
  ui.useSlot = (i) => calls.push(['useSlot', i]);
  slots.tap(...where((x, y) => slotsAt(x, y, view.w, view.h, slotLines(null), false), (at) => at === 0), false);
  slots.tap(...where((x, y) => slotsAt(x, y, view.w, view.h, slotLines(null), false), (at) => at === 1), false);
  assert.deepEqual(calls, [['openName', 0, false], ['useSlot', 1]]);
  assert.deepEqual(shown, ['title']);
  app.chosen = 0;
  slots.dir('down');
  assert.equal(app.chosen, 1);
  slots.tap(...where((x, y) => slotsAt(x, y, view.w, view.h, slotLines(null), false), (at) => at === 'rename'), false); // Rename picked
  assert.equal(app.chosen, SLOTS + slotLines(null).findIndex((l) => l.id === 'rename'));
  assert.equal(app.picking, 'rename');
});

test('the name pad and the seed pad: an arrow moves the flame, a typed key presses it with the flame on OK, a tap on a key presses it', () => {
  for (const [id, keys, press, at, good, bad] of [['name', NAME_PAD, 'pressName', nameCardAt, 'a', '7'], ['seed', PAD, 'pressKey', seedCardAt, '7', 'a']]) {
    const { app, calls, cards } = made(id);
    cards[id].dir('right');
    assert.equal(app.chosen, 1, id);
    assert.equal(cards[id].type(good), true, id);
    assert.equal(cards[id].type('backspace'), true, id);
    assert.equal(cards[id].type(bad), false, id);
    assert.equal(app.chosen, keys.findIndex((k) => k.id === 'ok'), id);
    const tapped = where((x, y) => at(x, y, view.w, view.h), (a) => a?.key === 2);
    cards[id].tap(...tapped, false);
    assert.equal(app.chosen, 2, id);
    assert.deepEqual(calls.filter((c) => c[0] === press), [[press, good], [press, 'del'], [press, keys[2].id]], id);
  }
});

test('the look card: an arrow moves the flame, a tap on a choice picks it where it is', () => {
  const { app, calls, cards } = made('cloak');
  app.lookTab = 'cloak';
  cards.cloak.dir('right');
  cards.cloak.tap(...where((x, y) => lookCardAt(x, y, view.w, view.h, 'cloak'), (a) => a?.key === 1), false);
  assert.deepEqual(calls, [['moveLookBy', 'right'], ['pressLook', 1, true]]);
  assert.ok(LOOK_PADS.cloak[1]);
});

test(`the map: arrows scroll it and swipes don't, Page Up and Down turn a floor, the Explorer's R, T and B press its row`, () => {
  const { app, calls, cards } = made('map');
  cards.map.dir('left');
  cards.map.dir('up', 'swipe'); // a swipe is a drag, which pans by itself
  cards.map.page(-1);
  cards.map.page(1);
  assert.equal(cards.map.type('r'), false); // only in the Explorer
  app.screen = 'explore';
  assert.deepEqual(['r', 't', 'b', 'x'].map((k) => cards.explore.type(k)), [true, true, true, false]);
  assert.deepEqual(calls, [['panMap', -8, 0], ['turnFloor', 'up'], ['turnFloor', 'down'], ['pressBar', 'reseed'], ['pressBar', 'type'], ['pressBar', 'back']]);
});

test('the bag: C makes and X drops; a card with no keys of its own has no type', () => {
  const { calls, cards } = made('bag');
  assert.deepEqual(['c', 'x', 'q'].map((k) => cards.bag.type(k)), [true, true, false]);
  assert.deepEqual(calls, [['useChosen', true], ['dropChosen']]);
  assert.equal(cards.paused.type, undefined);
});
