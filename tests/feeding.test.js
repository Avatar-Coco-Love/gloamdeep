// § feeding: garden step 6 (D-569), Bat Guano fed to a sprout from its card's Feed, so it
// grows in half the time, counted from planting; once is enough, and picked it needs more
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, tileAt, withTile } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, plant, feed, canFeed, pick, wait, takeDown } from '../src/core/turn.js';
import { TAKE_ASKS, gardenMenu } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { DAY_TURNS } from '../src/core/daytime.js';
import { journeyText, readJourney } from '../src/core/save.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const home = (bag, tile = 'plot') => {
  const s = makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 });
  return { ...s, room: withTile(s.room, 3, 2, get(tile)), bag, lit: false }; // unlit, so the oil lasts
};
const planted = (guano = 2) => plant(home([{ id: 'gloamberrySeed', n: 1 }, { id: 'batGuano', n: guano }]), 3, 2);
const waitFor = (s, n) => { for (let i = 0; i < n; i++) s = wait(s); return s; };

test('Feed spreads 1 guano on the sprout, a turn, with its line, the flecks showing', () => {
  const s = planted(), done = feed(s, 3, 2);
  assert.equal(tileAt(done.room, 3, 2).id, 'fedSprout');
  assert.deepEqual(done.bag, [{ id: 'batGuano', n: 1 }]);
  assert.equal(done.turn, s.turn + 1);
  assert.equal(shownLine(done).text, 'You feed the soil with guano.');
  assert.ok(done.events.some((e) => e.type === 'feed' && e.id === 'batGuano'));
  assert.deepEqual(done.planted, s.planted, 'the planting clock is kept');
});

test('a fed sprout grows in half the time, counted from planting', () => {
  assert.equal(get('fedSprout').grows.turns, DAY_TURNS / 2);
  const s = feed(planted(), 3, 2); // a turn after planting
  assert.equal(tileAt(waitFor(s, DAY_TURNS / 2 - 3).room, 3, 2).id, 'fedSprout');
  assert.equal(tileAt(waitFor(s, DAY_TURNS / 2 - 2).room, 3, 2).id, 'berryBed');
});

test('fed late, past half the time, it grows at once', () => {
  const s = waitFor(planted(), DAY_TURNS / 2 + 5);
  assert.equal(tileAt(s.room, 3, 2).id, 'sprout');
  assert.equal(tileAt(feed(s, 3, 2).room, 3, 2).id, 'berryBed');
});

test('with no guano, or fed already, Feed is dim and changes nothing', () => {
  const none = plant(home([{ id: 'gloamberrySeed', n: 1 }]), 3, 2);
  assert.equal(canFeed(none, 3, 2), false);
  assert.equal(feed(none, 3, 2), none);
  const fed = feed(planted(), 3, 2);
  assert.equal(canFeed(fed, 3, 2), false);
  assert.equal(feed(fed, 3, 2), fed);
  const empty = home([{ id: 'batGuano', n: 1 }]);
  assert.equal(canFeed(empty, 3, 2), false, 'an empty bed is not fed');
  assert.deepEqual(gardenMenu(false, false, false).map((l) => [l.text, !!l.dim]), [['Feed', true], ['Deconstruct', false]]);
  assert.deepEqual(gardenMenu(false, false, true).map((l) => [l.text, !!l.dim]), [['Feed', false], ['Deconstruct', false]]);
  assert.deepEqual(gardenMenu(true).map((l) => l.text), ['Plant', 'Deconstruct']);
});

test('the fed sprout is the same bed: solid, its card and note, taken down with its seed', () => {
  assert.equal(get('fedSprout').solid, true);
  assert.deepEqual(TAKE_ASKS.fedSprout, ['Garden bed', 'A sprout grows here.']);
  const fed = feed(planted(1), 3, 2), down = takeDown(fed, 3, 2);
  assert.equal(tileAt(down.room, 3, 2).id, 'floor');
  assert.deepEqual(down.bag.map((s) => s.id).sort(), ['gardenBed', 'gloamberrySeed']);
});

test('picked, the fed bed goes back to a plain sprout that needs feeding again', () => {
  const grown = waitFor(feed(planted(), 3, 2), DAY_TURNS / 2);
  assert.equal(tileAt(grown.room, 3, 2).id, 'berryBed');
  const picked = pick(grown, 3, 2);
  assert.equal(tileAt(picked.room, 3, 2).id, 'sprout');
  assert.equal(canFeed(picked, 3, 2), true);
});

test('a fed sprout keeps in a save', () => {
  const fed = feed(planted(), 3, 2), back = readJourney(journeyText(fed));
  assert.equal(tileAt(back.state.room, 3, 2).id, 'fedSprout');
});
