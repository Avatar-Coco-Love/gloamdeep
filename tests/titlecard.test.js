// § title card: the title laid out like a phone game's (D-401)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { titleLayout, titleCardAt, chipOf } from '../src/render/titlecard.js';
import { titleMenu } from '../src/core/menu.js';

const VW = 506, VH = 234; // a sideways phone's title scene
const chip = chipOf('Profile 1', 3);
const ids = (menu, x, y, vw = VW, vh = VH) => menu[titleCardAt(x, y, vw, vh, menu, chip)]?.id ?? null;

test('the big button reads CONTINUE while a journey is saved, New journey a line under it', () => {
  const saved = titleLayout(VW, VH, titleMenu(true), chip);
  assert.deepEqual(saved.slice(0, 2).map((b) => [b.id, b.kind, b.word]), [['continue', 'button', 'CONTINUE'], ['new', 'line', 'New journey']]);
  const fresh = titleLayout(VW, VH, titleMenu(false), chip);
  assert.deepEqual([fresh[0].id, fresh[0].kind, fresh[0].word], ['new', 'button', 'NEW JOURNEY']);
});

test('Journal, How to play and Settings sit top right, the chip top left, the Explorer bottom left', () => {
  const menu = titleMenu(true);
  assert.equal(ids(menu, 382, 20), 'journal');
  assert.equal(ids(menu, 434, 20), 'howto');
  assert.equal(ids(menu, 486, 38), 'settings'); // its name under it picks it too
  assert.equal(ids(menu, 30, 20), 'profiles');
  assert.equal(ids(menu, 20, 210), 'explore');
  assert.equal(ids(menu, 70, 210), 'explore'); // its name beside it
  assert.equal(ids(menu, 253, 176), 'continue');
  assert.equal(ids(menu, 253, 197), 'new');
  assert.equal(ids(menu, 253, 100), null); // the hero picks nothing
});

test('on a squarer screen the round buttons go down the right, clear of the name', () => {
  const rounds = titleLayout(341, 256, titleMenu(false), chip).filter((b) => ['journal', 'howto', 'settings'].includes(b.id));
  assert.equal(new Set(rounds.map((b) => b.mx)).size, 1);
  assert.deepEqual(rounds.map((b) => b.my), [20, 60, 100]);
});
