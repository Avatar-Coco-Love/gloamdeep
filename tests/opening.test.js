// § opening card (D-628): a new journey opens on its first words, then play
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { OPENING, OPENING_BUTTON, openingWords } from '../src/core/opening.js';
import { openingAt } from '../src/render/openingcard.js';
import { textWidth } from '../src/render/font.js';
import { W, H } from '../src/render/screen.js';
import { PAD } from '../src/render/bag.js';
import { modeCard } from '../src/input/cards/mode.js';
import { openingCard } from '../src/input/cards/opening.js';
import { MODE_MENU } from '../src/core/menu.js';

test('the words: three sentences, then Begin, and the same for the screen reader', () => {
  assert.deepEqual(OPENING, ['You wake among the trees of Hearthwood.', 'Your lantern is cold; keep its oil for the dark.', 'Something waits below.']); // D-735
  assert.equal(OPENING_BUTTON, 'Begin');
  assert.ok(openingWords().startsWith(OPENING.join(' ')));
});

test('picking a way to play opens the first words, not play', () => {
  const shown = [], made = [];
  const card = modeCard({ screen: 'mode', chosen: 0 }, { newJourney: (id) => made.push(id) }, (sc) => shown.push(sc), { menuOf: () => MODE_MENU, titleAt: () => {} });
  card.pick(0);
  assert.deepEqual(made, [MODE_MENU[0].id]);
  assert.deepEqual(shown, ['opening']);
});

test('Enter, a tap anywhere or Esc begins; a held press and an arrow do nothing', () => {
  const shown = [], card = openingCard({}, {}, (sc) => shown.push(sc));
  card.dir('down'); card.tap(5, 5, true);
  assert.deepEqual(shown, []);
  card.pick(0); card.tap(5, 5, false); card.close();
  assert.deepEqual(shown, ['play', 'play', 'play']);
});

test('the card fits the smallest screen and the widest, every line inside it', () => {
  for (const [vw, vh] of [[W, H], [400, 220]]) {
    const card = openingAt(vw, vh);
    assert.ok(card.x >= 0 && card.y >= 0 && card.x + card.w <= vw && card.y + card.h <= vh, `${vw}×${vh}`);
    for (const line of card.lines.flat()) assert.ok(textWidth(line) <= card.w - 2 * PAD, line);
    assert.equal(card.lines.flat().join(' '), OPENING.join(' '));
  }
});

// § the boons card (D-712): once after the first boon, and again from the Quests tab
import { ABOUT_BOONS, ABOUT_BOONS_BUTTON, aboutBoonsWords } from '../src/core/opening.js';
import { aboutBoonsCard } from '../src/input/cards/opening.js';
import { journalAt } from '../src/render/journal.js';
import { journalCard } from '../src/input/cards/journal.js';
import { questsWords } from '../src/core/goals.js';

test('the boons card: its three lines (D-706) and Go, the same for the screen reader', () => {
  assert.deepEqual(ABOUT_BOONS, ['That is a boon: a small help for one trip down.', 'It lasts until you come back to the waystone, or you fall.', 'Its mark sits under your hearts. Each time you set out, pick a new one.']);
  assert.equal(ABOUT_BOONS_BUTTON, 'Go');
  assert.ok(aboutBoonsWords().startsWith(ABOUT_BOONS.join(' ')));
});

test('the boons card goes back to play after the pick, and to the Journal when opened from it', () => {
  for (const [from, to] of [['play', 'play'], ['journal', 'journal']]) {
    const shown = [], card = aboutBoonsCard({ boonsFrom: from }, {}, (sc) => shown.push(sc));
    card.dir('left'); card.tap(5, 5, true);
    card.pick(0); card.tap(5, 5, false); card.close();
    assert.deepEqual(shown, [to, to, to]);
  }
});

test('the boons card fits the smallest screen and the widest, every line inside it', () => {
  for (const [vw, vh] of [[W, H], [400, 220]]) {
    const card = openingAt(vw, vh, ABOUT_BOONS, ABOUT_BOONS_BUTTON);
    assert.ok(card.x >= 0 && card.y >= 0 && card.x + card.w <= vw && card.y + card.h <= vh, `${vw}×${vh}`);
    for (const line of card.lines.flat()) assert.ok(textWidth(line) <= card.w - 2 * PAD, line);
    assert.equal(card.lines.flat().join(' '), ABOUT_BOONS.join(' '));
  }
});

// Where the Quests tab's row for a goal is: scan the card for the spot journalAt names it
function rowSpot(goals, id) {
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x += 4) if (journalAt(x, y, W, H, 'quests', null, null, {}, null, goals)?.quest === id) return [x, y];
  return null;
}

test('on the Quests tab, a tap or Enter on the done "Take a boon" shows the boons card; not while it waits', () => {
  const done = { rat: { done: true, paid: 'flask' }, boon: { done: true, paid: 'herb' } };
  const shown = [], app = { tab: 'quests', profiles: { current: 0, slots: [{ name: 'A', goals: done }] } };
  const card = journalCard(app, { spoken: {} }, (sc) => shown.push(sc), { journalPageWords: () => '', closeJournal: () => shown.push('closed') });
  const at = rowSpot(done, 'boon');
  assert.ok(at, 'the row is found');
  card.tap(...at, false);
  assert.deepEqual(shown, ['aboutBoons']);
  assert.equal(app.boonsFrom, 'journal');
  card.tap(...rowSpot(done, 'rat'), false); // another goal's row does nothing
  card.pick(0);
  assert.deepEqual(shown, ['aboutBoons', 'aboutBoons']);
  app.profiles.slots[0].goals = { boon: { done: false } };
  card.pick(0);
  assert.deepEqual(shown, ['aboutBoons', 'aboutBoons']);
  assert.match(questsWords(done), /Enter shows what boons are/);
  assert.doesNotMatch(questsWords({ boon: { done: false } }), /Enter shows/);
});
