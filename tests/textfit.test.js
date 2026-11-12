// § text fit (D-743): every card drawn at phone sizes, held upright and sideways, with every
// item, creature, goal, boon and version, and no line of words may leave its card or land on
// another. New content whose words don't fit fails here, not on a phone.
import { test } from 'node:test';
import assert from 'node:assert/strict';

// § a canvas that takes anything: the cards draw through it, and only their words are watched
const any = new Proxy(function () {}, {
  get: (t, k) => (k === 'then' ? undefined : k === Symbol.toPrimitive ? () => 0 : k === 'data' ? new Uint8ClampedArray(4 * 64 * 64) : k === 'width' || k === 'height' ? 64 : k === 'length' ? 0 : any),
  set: () => true, apply: () => any, construct: () => any,
});
globalThis.devicePixelRatio = 1;
globalThis.document = { createElement: () => any, addEventListener() {}, body: any, documentElement: any };
globalThis.addEventListener = () => {};
globalThis.matchMedia = () => ({ matches: false, addEventListener() {} });

const R = '../src/';
const { watchText, textWidth } = await import(R + 'render/font.js');
const B = await import(R + 'render/bag.js');
const { drawJournal } = await import(R + 'render/journal.js');
const { TABS } = await import(R + 'core/journal.js');
const { GOALS, howOf } = await import(R + 'core/goals.js');
const { STARTS } = await import(R + 'core/starts.js');
const { ALL, BOONS } = await import(R + 'core/registry.js');
const { ITEMS } = await import(R + 'core/items.js');
const M = await import(R + 'core/menu.js');
const { drawBenchPanel } = await import(R + 'render/benchpanel.js');
const { drawMakeCard } = await import(R + 'render/makecard.js');
const { bagMakes } = await import(R + 'core/bagmake.js');
const { drawChestPanel } = await import(R + 'render/chestpanel.js');
const { drawBoons, boonsLayout } = await import(R + 'render/boons.js');
const H = await import(R + 'render/history.js');
const { HISTORY, loadHistory } = await import(R + 'core/history.js');
await loadHistory(); // loaded only when Version history opens (D-868)
const { drawHowTo } = await import(R + 'render/howto.js');
const { HOWTO_PAGES } = await import(R + 'core/howto.js');
const { drawSettingsCard } = await import(R + 'render/settingscard.js');
const { LOUD_KINDS } = await import(R + 'core/settings.js');
const { drawPauseCard } = await import(R + 'render/pausecard.js');
const { drawWays } = await import(R + 'render/ways.js');
const { drawAskCard } = await import(R + 'render/askcard.js');
const { drawOpening } = await import(R + 'render/openingcard.js');
const { drawGoalLine } = await import(R + 'render/goalline.js');

const UPRIGHT = [[176, 380], [180, 390], [195, 422], [206, 457]];
const SIDEWAYS = [[380, 176], [390, 180], [400, 190], [422, 195], [340, 255], [360, 270]];
const SIZES = [...UPRIGHT, ...SIDEWAYS];
const END = 1e6; // a list scrolled as far down as it goes

// § check: draw, then each line of words must sit inside `box` (in by `inset` at the sides), and
// no two may overlap; gives the problems found, one line each
function fits(label, box, draw, inset = 4) {
  const lines = [], bad = [];
  watchText((l) => { if (l.text.trim()) lines.push(l); });
  try { draw(); } finally { watchText(null); }
  for (const l of lines) {
    if (l.x < box.x + inset || l.x + l.w > box.x + box.w - inset || l.y < box.y || l.y + l.h > box.y + box.h) bad.push(`${label}: "${l.text}" leaves its card`);
  }
  for (let i = 0; i < lines.length; i++) for (let j = i + 1; j < lines.length; j++) {
    const a = lines[i], b = lines[j];
    if (a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h - 2 && b.y < a.y + a.h - 2) bad.push(`${label}: "${a.text}" over "${b.text}"`);
  }
  return bad;
}
const none = (bad) => assert.deepEqual([...new Set(bad)].slice(0, 5), []);

const enemies = ALL.filter((e) => e.kind === 'enemy');
const book = Object.fromEntries(enemies.map((e) => [e.id, { met: 123, beaten: 45 }]));
const goals = Object.fromEntries(GOALS.map((g, i) => [g.id, { done: i % 2 === 0, paid: 'herb' }]));
const records = new Proxy({}, { get: () => 12345 });
const places = ['woods', 'crypt-1', 'first'], starts = [null, ...Object.keys(STARTS)];

test('every Journal tab and creature page fits its card, at its top and scrolled to its end', () => {
  const bad = [];
  for (const [vw, vh] of SIZES) {
    const card = B.cardAt(vw, vh), L = `${vw}×${vh}`;
    for (const t of TABS) for (const place of places) for (const start of starts) for (const first of [0, END]) {
      bad.push(...fits(`${L} ${t.id}`, card, () => drawJournal(any, vw, vh, records, 99999, { place, start, xp: 99999, seed: 4294967295 }, t.id, 0, true, undefined, book, {}, 3, null, [], goals, 999, first)));
    }
    for (const e of enemies) for (const beaten of [0, 3]) for (const first of [0, END]) {
      bad.push(...fits(`${L} page ${e.id}`, card, () => drawJournal(any, vw, vh, records, 0, {}, 'bestiary', 0, true, undefined, { [e.id]: { met: 999, beaten } }, {}, 0, e.id, [], {}, 0, first)));
    }
  }
  none(bad);
});

test('the bag, its Make tab, workbench and stash chest fit their cards with every item chosen (D-787)', () => {
  const bad = [], spriteOf = () => any;
  for (const [vw, vh] of SIZES) {
    const L = `${vw}×${vh}`, card = B.cardAt(vw, vh);
    for (const size of [6, 9, 12]) for (const id of Object.keys(ITEMS)) {
      bad.push(...fits(`${L} bag ${size} ${id}`, B.cardAt(vw, vh, B.bagShape(size).detail), () => B.drawBag(any, vw, vh, [{ id, n: 99 }], 0, spriteOf, [], false, {}, size, true, 0, true, true, ITEMS[id].craft?.into ?? null)));
      bad.push(...fits(`${L} chest ${size} ${id}`, card, () => drawChestPanel(any, vw, vh, [{ id, n: 99 }], [{ id, n: 99 }], 0, spriteOf, 0, true, size)));
    }
    const makes = M.benchMakes([], 6, []);
    makes.forEach((m, i) => bad.push(...fits(`${L} bench ${i}`, card, () => drawBenchPanel(any, vw, vh, makes, i, spriteOf, {}, 0, true))));
    const known = bagMakes({ bag: [], known: Object.keys(ITEMS) });
    known.forEach((m, i) => bad.push(...fits(`${L} make ${i}`, card, () => drawMakeCard(any, vw, vh, known, i, spriteOf, {}))));
    bad.push(...fits(`${L} make none`, card, () => drawMakeCard(any, vw, vh, [], 0, spriteOf, {})));
  }
  none(bad);
});

test('every boon\'s words fit inside its own card', () => {
  const bad = [], ids = Object.keys(BOONS);
  for (const [vw, vh] of SIZES) for (const id of ids) {
    const offer = [id, ids[(ids.indexOf(id) + 1) % ids.length], ids[(ids.indexOf(id) + 2) % ids.length]];
    const { cards } = boonsLayout(vw, vh, offer);
    bad.push(...fits(`${vw}×${vh} boons ${id}`, { x: 0, y: 0, w: vw, h: vh }, () => drawBoons(any, vw, vh, offer, 0), 1));
    cards.forEach((k, i) => {
      for (const l of k.name) if (textWidth(l) > k.w - 2) bad.push(`${vw}×${vh} boon ${offer[i]}: "${l}" leaves its card`);
      for (const l of k.words) if (4 + textWidth(l) > k.w - 2) bad.push(`${vw}×${vh} boon ${offer[i]}: "${l}" leaves its card`);
    });
  }
  none(bad);
});

test('the version history, how to play, settings, pause, ways, ask and opening cards fit', () => {
  const bad = [], all = new Set(HISTORY.map((e) => e.v));
  const settings = { swipe: 'on', tap: 'walk', pad: 'on', stop: 'noticed', seed: 'random', lantern: 'self', flasks: 'self', sound: 'on', loud: 100, loudSteps: 100, loudFight: 100, loudFinds: 100, loudMenus: 100, muted: ['tap'], stats: 'on', marks: 'on' };
  const asks = [...Object.values(M.TAKE_ASKS), M.SHELVE_ASK, [M.SURE_HEADING, M.SURE_NOTE], ['Delete Wwwwwwwwwwww?', M.DROP_NOTE], [M.easeHeading('easy'), M.EASE_NOTE], [M.ENDED_HEADING, '']];
  for (const [vw, vh] of SIZES) {
    const L = `${vw}×${vh}`, card = B.cardAt(vw, vh), screen = { x: 0, y: 0, w: vw, h: vh };
    const rows = H.historyRows(all, H.historyLayout(vw, vh).bodyW);
    for (let s = 0; s < rows.length * H.ROW_H; s += 997) bad.push(...fits(`${L} history`, card, () => H.drawHistory(any, vw, vh, rows, all, s, 0, 0, true)));
    for (const p of HOWTO_PAGES) for (const st of [settings, { ...settings, swipe: 'off', tap: 'step', pad: 'off' }]) bad.push(...fits(`${L} howto ${p}`, card, () => drawHowTo(any, vw, vh, p, st, 0, true)));
    for (const mode of [null, 'hardcore']) for (const { id } of M.SETTINGS_TABS) bad.push(...fits(`${L} settings ${id}`, card, () => drawSettingsCard(any, vw, vh, M.settingsMenu(settings, false, mode ? 4294967295 : null, mode, id), 0, 0, true, id))); // each tab, as the game draws it (D-820)
    for (const { kind } of LOUD_KINDS) bad.push(...fits(`${L} settings list ${kind}`, card, () => drawSettingsCard(any, vw, vh, M.settingsMenu(settings, false, null, null, 'sound', kind), 0, 0, true, 'sound', kind))); // each kind's list (D-824)
    bad.push(...fits(`${L} pause`, card, () => drawPauseCard(any, vw, vh, M.PAUSE_MENU, 0, M.pauseFacts({ place: 'crypt-12', seed: 4294967295, mode: 'hardcore', xp: 99999 }), 0, true)));
    bad.push(...fits(`${L} ways`, card, () => drawWays(any, vw, vh, M.MODE_MENU, 0, 0, true)));
    for (const [h, n] of asks) bad.push(...fits(`${L} ask ${h}`, screen, () => drawAskCard(any, vw, vh, h, n, M.SURE_MENU, 0), 1));
    bad.push(...fits(`${L} opening`, screen, () => drawOpening(any, vw, vh), 1));
  }
  none(bad);
});

test('the goal line under the hearts stays inside the width it is given, every goal, place and start', () => {
  const bad = [];
  for (const maxW of [90, 120, 170]) for (const g of GOALS) for (const place of places) for (const start of starts) for (const done of [false, true]) {
    const line = { goal: g.goal, how: done ? '+2 Healing Herbs' : howOf(g, place, start), done };
    bad.push(...fits(`goal ${g.id} in ${maxW}`, { x: 4, y: 4, w: maxW, h: 100 }, () => drawGoalLine(any, line, 4, 4, 1, maxW), 0));
  }
  none(bad);
});
