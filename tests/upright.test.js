// § upright (D-505): the cards' two sides stand one above the other on a view taller than
// wide, and taps land where they are drawn; sideways nothing changes
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cardAt, isTall } from '../src/render/bag.js';
import { pauseCardAt } from '../src/render/pausecard.js';
import { chestAt } from '../src/render/chestpanel.js';
import { howtoAt } from '../src/render/howto.js';
import { settingsCardAt } from '../src/render/settingscard.js';
import { CHEST_BAG } from '../src/core/chest.js';

const UP = [195, 410], SIDE = [400, 195]; // a phone's screen layer, upright and sideways

test('a view taller than wide is upright, and the card knows it', () => {
  assert.equal(isTall(...UP), true); assert.equal(isTall(...SIDE), false);
  assert.equal(cardAt(...UP).tall, true); assert.equal(cardAt(...SIDE).tall, false);
});

test('pause: upright the facts are under the lines, so a tap there picks nothing', () => {
  assert.deepEqual(pauseCardAt(30, 44, ...UP, 5), { line: 0 });
  assert.deepEqual(pauseCardAt(150, 66, ...UP, 5), { line: 1 }); // across the whole width
  assert.equal(pauseCardAt(30, 176, ...UP, 5), null); // the facts
  assert.equal(pauseCardAt(150, 66, ...SIDE, 5), null); // sideways the facts' side
});

test('stash chest: upright the bag is under the chest, sideways beside it', () => {
  assert.deepEqual(chestAt(25, 171, ...UP), { slot: CHEST_BAG });
  assert.deepEqual(chestAt(182, 53, ...SIDE), { slot: CHEST_BAG });
  assert.deepEqual(chestAt(25, 40, ...UP), { slot: 0 });
});

test('how to play: upright the tabs take two rows, Keyboard under Basics (D-507)', () => {
  assert.deepEqual(howtoAt(30, 54, ...UP), { page: 'keyboard' });
  assert.deepEqual(howtoAt(30, 38, ...UP), { page: 'basics' });
  assert.deepEqual(howtoAt(30, 38, ...SIDE), { page: 'basics' });
});

test('settings: a value too long for the card wraps, and the next row moves down', () => {
  const menu = [{ name: 'Seed', value: 'Random (this one 67929)' }, { name: 'Sound', value: 'Off' }, { text: 'Version history' }];
  assert.deepEqual(settingsCardAt(30, 84, ...UP, menu), { line: 1 }); // a tab row lower upright (D-820)
  assert.deepEqual(settingsCardAt(30, 68, ...UP, menu), { line: 0 }); // the seed's second line
  assert.deepEqual(settingsCardAt(30, 56, ...SIDE, menu), { line: 1 });
});

test('settings: upright its four tabs take two rows, 2 and 2; sideways one (D-820)', () => {
  const menu = [{ name: 'Sound', value: 'Off' }, { text: 'Version history' }];
  assert.deepEqual(settingsCardAt(24, 12, ...UP, menu), { tab: 'controls' });
  assert.deepEqual(settingsCardAt(24, 24, ...UP, menu), { tab: 'screen' });
  assert.deepEqual(settingsCardAt(76, 24, ...UP, menu), { tab: 'sound' });
  assert.deepEqual(settingsCardAt(76, 12, ...UP, menu), { tab: 'game' });
  assert.deepEqual(settingsCardAt(160, 12, ...SIDE, menu), { tab: 'sound' });
});
