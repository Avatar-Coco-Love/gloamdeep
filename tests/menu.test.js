// § menu: the title screen's and pause menu's lines, and moving between them
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TITLE_MENU, PAUSE_MENU, titleMenu, SURE_MENU, SURE_HEADING, SURE_NOTE, MODE_MENU, MODE_HEADING, MODE_FIRST, settingsMenu, moveChoice, pauseFacts } from '../src/core/menu.js';
import { pauseCardAt, SPLIT } from '../src/render/pausecard.js';
import { cardAt, PAD } from '../src/render/bag.js';
import { settingsCardAt } from '../src/render/settingscard.js';
import { waysAt } from '../src/render/ways.js';
import { lineAt, pauseTop, LINE_GAP } from '../src/render/menu.js';
import { SCREEN_H, W } from '../src/render/screen.js';
import { textWidth } from '../src/render/font.js';

test('the title menu offers New journey first, then Journal (D-270), How to play, Settings, Profiles (D-271), and the Seed Explorer last (D-214)', () => {
  assert.deepEqual(TITLE_MENU.map((l) => l.id), ['new', 'journal', 'howto', 'settings', 'profiles', 'explore']);
});

test('Continue shows, first, only while a journey is saved (D-178, D-238)', () => {
  assert.deepEqual(titleMenu(false).map((l) => l.id), ['new', 'journal', 'howto', 'settings', 'profiles', 'explore']);
  assert.deepEqual(titleMenu(true).map((l) => l.id), ['continue', 'new', 'journal', 'howto', 'settings', 'profiles', 'explore']);
});

test('Start over? asks Yes or No, and its words fit the picture (D-238)', () => {
  assert.deepEqual(SURE_MENU.map((l) => l.id), ['yes', 'no']);
  for (const words of [SURE_HEADING, SURE_NOTE]) assert.ok(textWidth(words) <= W);
});

test('New journey asks the way to play: Gentle, Normal picked, Hardcore, each with a note that fits (D-334, MO1)', () => {
  assert.deepEqual(MODE_MENU.map((l) => l.id), ['gentle', 'normal', 'hardcore']);
  assert.equal(MODE_MENU[MODE_FIRST].id, 'normal');
  for (const words of [MODE_HEADING, ...MODE_MENU.map((l) => l.note)]) assert.ok(textWidth(words) <= W, words);
});

test('Up and Down move the choice and stop at the ends', () => {
  assert.equal(moveChoice(0, 'down', 3), 1);
  assert.equal(moveChoice(2, 'down', 3), 2);
  assert.equal(moveChoice(0, 'up', 3), 0);
  assert.equal(moveChoice(1, 'left', 3), 1);
});

test('the pause menu offers Resume, Journal (D-270), Settings, How to play, then Back to title, and nothing that does not work yet', () => {
  assert.deepEqual(PAUSE_MENU.map((l) => l.id), ['resume', 'journal', 'settings', 'howto', 'title']);
});

test('Settings shows Swipe, Tap to walk, Stop walking, Motion, Seed and the rest, Version history last, each switch with its name and value apart (D-389)', () => {
  assert.deepEqual(settingsMenu({ swipe: 'off', tapwalk: 'on', stop: 'sight', motion: null, seed: null }).map((l) => l.text), ['Swipe: Off', 'Tap to walk: On', 'Stop walking: On sight', 'Motion: Full', 'Seed: Random', 'Lantern: By hand', 'Flasks: By hand', 'Sound: Off', 'Version history']);
  assert.equal(settingsMenu({ motion: null }, true)[3].text, 'Motion: Reduced');
  assert.deepEqual(['name', 'value'].map((k) => settingsMenu({ seed: null }, false, 99999)[4][k]), ['Seed', 'Random (this one 99999)']);
});

test('the settings card: a tap across a row picks it, the button opens Version history, the cross or outside goes back, and every row fits (D-389)', () => {
  const vw = 422, vh = 195, card = cardAt(vw, vh), menu = settingsMenu({ seed: null }, false, 99999, 'gentle'), n = menu.length - 1;
  assert.deepEqual(settingsCardAt(card.x + 20, card.y + 32, vw, vh, menu), { line: 0 });
  const step = Math.min(16, Math.floor((card.button.y - 6 - card.y - 30) / n)); // closer on a short card
  assert.deepEqual(settingsCardAt(card.x + card.w - 30, card.y + 30 + (n - 1) * step + 4, vw, vh, menu), { line: n - 1 });
  assert.equal(settingsCardAt(card.x + PAD + 4, card.button.y + 4, vw, vh, menu), 'history');
  assert.equal(settingsCardAt(card.close.x, card.close.y, vw, vh, menu), 'close');
  assert.equal(settingsCardAt(2, 2, vw, vh, menu), 'out');
  const names = Math.max(...menu.slice(0, -1).map((l) => textWidth(l.name)));
  for (const l of [...menu.slice(0, -1), ...settingsMenu({ stop: 'noticed' }).slice(0, -1)]) assert.ok(PAD + 8 + names + 20 + textWidth(l.value) + PAD <= card.w, l.text);
});

test('with a heading, the heading and lines still sit inside the picture', () => {
  const top = pauseTop(6, true); // Settings: Controls, Motion, Seed, Lantern, Flasks, Back
  assert.ok(top - LINE_GAP > 0 && top + 5 * LINE_GAP < SCREEN_H);
});

test('a tap picks the line under it, near it, or none', () => {
  const top = pauseTop(2);
  assert.ok(top > 0 && top + LINE_GAP < SCREEN_H);
  assert.equal(lineAt(top + 2, 2, top), 0);
  assert.equal(lineAt(top + LINE_GAP + 2, 2, top), 1);
  assert.equal(lineAt(0, 2, top), -1);
});

test('in play, Settings has the way to play under the seed; only an easier one changes it (MO4, D-346)', async () => {
  const { modeText, easier, easeMenu, easeMode, HARDER_NOTE, EASE_NOTE, easeHeading } = await import('../src/core/menu.js');
  assert.deepEqual(settingsMenu({ seed: null }, false, 7, 'normal').map((l) => l.id).slice(4, 6), ['seed', 'mode']);
  assert.ok(!settingsMenu({ seed: null }).some((l) => l.id === 'mode'));
  for (const id of ['gentle', 'normal', 'hardcore']) assert.ok(textWidth(modeText(id)) + 2 * 8 <= W, id);
  assert.equal(modeText('hardcore'), 'Way to play: Hardcore');
  assert.ok(easier('hardcore', 'normal') && easier('normal', 'gentle') && easier('hardcore', 'gentle'));
  assert.ok(!easier('gentle', 'normal') && !easier('normal', 'normal') && !easier('normal', 'hardcore'));
  assert.deepEqual(easeMenu('normal').map((l) => !!l.dim), [false, false, true]);
  assert.deepEqual(easeMenu('gentle').map((l) => !!l.dim), [false, true, true]);
  assert.equal(easeMode({ mode: 'hardcore' }, 'gentle').mode, 'gentle');
  assert.equal(easeMode({ mode: 'gentle' }, 'hardcore').mode, 'gentle');
  for (const words of [HARDER_NOTE, EASE_NOTE, easeHeading('gentle'), easeHeading('normal')]) assert.ok(textWidth(words) <= W, words);
});

test('the pause card: a tap across the left picks a line, the cross or outside resumes, the right picks none (D-388)', () => {
  const vw = 422, vh = 195, card = cardAt(vw, vh), n = PAUSE_MENU.length;
  assert.deepEqual(pauseCardAt(card.x + 20, card.y + 36, vw, vh, n), { line: 0 });
  assert.deepEqual(pauseCardAt(card.x + SPLIT - 2, card.y + 34 + 4 * 22 + 4, vw, vh, n), { line: 4 });
  assert.equal(pauseCardAt(card.x + SPLIT + 20, card.y + 36, vw, vh, n), null);
  assert.equal(pauseCardAt(card.close.x, card.close.y, vw, vh, n), 'close');
  assert.equal(pauseCardAt(2, 2, vw, vh, n), 'out');
});

test("the pause card's facts: the seed, the way to play, the depth and the level (D-388)", () => {
  assert.deepEqual(pauseFacts({ seed: 48213, mode: 'normal', place: 'first', xp: 0 }), [['Seed', '48213'], ['Way to play', 'Normal'], ['Depth', 'Surface'], ['Level', '1']]);
  assert.equal(pauseFacts({ seed: 7, mode: 'gentle', place: 'depth3', xp: 0 })[2][1], '3');
});

test('the way to play card: a tap on a way or its note picks it, the cross or outside goes back (D-396)', async () => {
  const { easeMenu, HARDER_NOTE } = await import('../src/core/menu.js');
  assert.deepEqual(easeMenu('normal').map((l) => l.note === HARDER_NOTE), [false, false, true]);
  const vw = 180, vh = 320, card = cardAt(vw, vh), x = card.x + PAD + 20;
  assert.deepEqual(waysAt(x, card.y + 31, vw, vh, MODE_MENU), { line: 0 }); // Gentle's name
  assert.deepEqual(waysAt(x, card.y + 43, vw, vh, MODE_MENU), { line: 0 }); // its note
  assert.deepEqual(waysAt(x, card.y + 61, vw, vh, MODE_MENU), { line: 1 }); // Normal's name
  assert.equal(waysAt(x, card.y + card.h - 20, vw, vh, MODE_MENU), null); // under the rows
  assert.equal(waysAt(card.close.x, card.close.y, vw, vh, MODE_MENU), 'close');
  assert.equal(waysAt(1, 1, vw, vh, MODE_MENU), 'out');
});
