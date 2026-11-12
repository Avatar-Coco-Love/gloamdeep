// § campfire (D-757, Q-088's first step): one campfire on the surface, in one of Hearthwood's 8
// rooms outside home, blazing, embers or cold ashes; burning, it glows; ashes are lit with the
// lantern's oil from the Light the fire? card
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { makeRoom, SKY, tileAt, PLACES } from '../src/core/room.js';
import { makeState, step, kindle, canKindle, sit, canSit, panelBeside, maxHealth } from '../src/core/turn.js';
import { TAKE_ASKS, kindleMenu, sitMenu } from '../src/core/menu.js';
import { campfireOf, FIRE_ROOMS, LEVELS, IN } from '../src/core/campfire.js';
import { HOME_ID, ROOMS } from '../src/core/hearthwood.js';
import { glowsIn } from '../src/core/stairs.js';
import { markAt } from '../src/core/map.js';
import { joinedFrom, depthIn } from '../src/core/woods.js';
import { OIL } from '../src/core/oil.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i * 7919 + 3);
const fireIn = (map) => { for (let y = 0; y < map.length; y++) for (let x = 0; x < map[y].length; x++) if ('DEa'.includes(map[y][x])) return { x, y, ch: map[y][x] }; return null; };

test('the Campfire is in the registry, its three levels with their lines', () => {
  assert.deepEqual(LEVELS.map((id) => get(id).name), ['Campfire', 'Campfire', 'Campfire']);
  for (const id of LEVELS) { const t = get(id); assert.equal(t.kind, 'tile'); assert.equal(t.solid, true); assert.equal(t.blocksLight, false); assert.equal(t.fire, true); }
  assert.equal(LINES.campfireHigh.text, 'A campfire, burning high.');
  assert.equal(LINES.campfireCoals.text, 'The coals still glow.');
  assert.equal(LINES.campfireAshes.text, 'Cold ashes.');
  assert.ok(LINES.campfireLit);
});

test('one campfire a seed, in one of the 8 rooms outside home, on open ground, never cutting the room', () => {
  assert.equal(FIRE_ROOMS.length, 8); assert.ok(!FIRE_ROOMS.includes(HOME_ID));
  const levels = new Set(), rooms = new Set();
  for (const seed of SEEDS) {
    const { room, level } = campfireOf(seed);
    levels.add(level); rooms.add(room);
    for (const id of ROOMS) {
      const made = PLACES[id].make(null, seed), at = fireIn(made.map);
      if (id !== room) { assert.equal(at, null, `${seed} ${id}`); continue; }
      assert.ok(at, `${seed} ${id}`);
      assert.equal(at.ch, get(level).letter);
      assert.ok(depthIn(at.x, at.y) >= IN);
      assert.notDeepEqual({ x: at.x, y: at.y }, made.start);
      assert.ok(!made.items.some((t) => t.x === at.x && t.y === at.y));
      assert.ok(joinedFrom(made.map.map((l) => l.split('')), made.start));
    }
  }
  assert.equal(levels.size, 3); assert.ok(rooms.size >= 6);
});

test('a burning one glows, blazing 3 tiles, embers 2, in the torch colour; ashes none; none is stairs on the map', () => {
  const room = makeRoom(['TTTTT', 'T.D.T', 'T.E.T', 'T.a.T', 'TTTTT'], SKY, 'woods');
  assert.deepEqual(glowsIn(room, null).map((g) => g.r / 16), [3, 2]);
  assert.equal(get('campfire').glow.cr, get('torch').cr);
  for (const y of [1, 2, 3]) assert.notEqual(markAt(room, null, 2, y), 'stairs');
});

test('a burning one opens Sit by the fire?, its first words on the line, No picked; Yes grey with full hearts, not stiff and Warmed as long', () => {
  const s = makeState(makeRoom(['TTTTT', 'T..DT', 'TTTTT'], SKY, 'woods'), { x: 2, y: 1 });
  assert.deepEqual(panelBeside(s, 'right'), { x: 3, y: 1 });
  assert.deepEqual(TAKE_ASKS.campfire, ['Sit by the fire?', 'Someone was here not long ago.']);
  assert.deepEqual(TAKE_ASKS.campfireEmbers, ['Sit by the fire?', 'Whoever sat here is gone.']);
  assert.equal(get('campfire').says, 'campfireHigh'); assert.equal(get('campfireEmbers').says, 'campfireCoals');
  assert.deepEqual(sitMenu(true).map((l) => [l.text, !!l.dim]), [['Yes', false], ['No', false]]);
  assert.equal(sitMenu(false)[0].dim, true);
  assert.equal(canSit({ ...s, warmed: 60 }, 3, 1), false); // full hearts, not stiff, Warmed as long (D-845)
  assert.equal(canSit(s, 3, 1), true); // its warmth alone helps
  assert.equal(canSit({ ...s, health: 2 }, 3, 1), true);
  assert.equal(canSit({ ...s, stiff: 5 }, 3, 1), true);
  assert.equal(canSit({ ...s, health: 2 }, 2, 1), false);
});

test('Yes: blazing gives 2 hearts and ends stiff, burning down to embers; embers 1, down to ashes; in a turn, with its line', () => {
  const s = { ...makeState(makeRoom(['TTTTT', 'T..DT', 'TTTTT'], SKY, 'woods'), { x: 2, y: 1 }), health: 1, stiff: 10 };
  const sat = sit(s, 3, 1);
  assert.equal(sat.health, 3); assert.equal(sat.stiff, 0);
  assert.equal(tileAt(sat.room, 3, 1).id, 'campfireEmbers');
  assert.equal(sat.turn, s.turn + 1);
  assert.equal(shownLine(sat).text, 'You sit by the fire and warm up.');
  assert.ok(sat.events.some((e) => e.type === 'sit' && e.id === 'campfireEmbers'));
  const again = sit(sat, 3, 1);
  assert.equal(again.health, 4); assert.equal(tileAt(again.room, 3, 1).id, 'campfireAshes');
  const nearlyFull = { ...s, health: maxHealth(s) - 1, stiff: 0 };
  assert.equal(sit(nearlyFull, 3, 1).health, maxHealth(s)); // never above full
  const well = { ...s, health: maxHealth(s), stiff: 0, warmed: 60 };
  assert.equal(sit(well, 3, 1), well);
});

test('cold ashes open the Light the fire? card, No picked; Yes grey with an empty lantern', () => {
  const s = makeState(makeRoom(['TTTTT', 'T..aT', 'TTTTT'], SKY, 'woods'), { x: 2, y: 1 });
  assert.deepEqual(panelBeside(s, 'right'), { x: 3, y: 1 });
  assert.deepEqual(TAKE_ASKS.campfireAshes, ['Light the fire?', 'No one has sat here for a long time.']);
  assert.equal(get('campfireAshes').says, 'campfireAshes');
  assert.deepEqual(kindleMenu(true).map((l) => [l.text, !!l.dim]), [['Yes', false], ['No', false]]);
  assert.equal(kindleMenu(false)[0].dim, true);
  assert.equal(canKindle(s, 3, 1), true);
  assert.equal(canKindle({ ...s, oil: 0 }, 3, 1), false);
  assert.equal(canKindle(s, 2, 1), false);
});

test('Yes lights it into embers for one turn of oil, in a turn, with its line; with no oil nothing changes', () => {
  const s = { ...makeState(makeRoom(['TTTTT', 'T..aT', 'TTTTT'], SKY, 'woods'), { x: 2, y: 1 }), lit: false, oil: 0.5 };
  const lit = kindle(s, 3, 1);
  assert.equal(tileAt(lit.room, 3, 1).id, 'campfireEmbers');
  assert.equal(lit.turn, s.turn + 1);
  assert.ok(Math.abs(lit.oil - (0.5 - OIL.burn)) < 1e-9); // the lantern off: only the fire's turn of oil
  assert.equal(shownLine(lit).text, 'The fire catches.');
  assert.ok(lit.events.some((e) => e.type === 'kindle' && e.id === 'campfireEmbers'));
  const dry = { ...s, oil: 0 };
  assert.equal(kindle(dry, 3, 1), dry);
});
