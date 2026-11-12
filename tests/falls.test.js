// § falls: what a fall's turn keeps and where it wakes (health check step 15, D-879): a draught
// drunk (H-17) or a fire sat by (H-56) on the turn of a fall is lost to it; a fall with something
// set down on the journey's first tile wakes on the nearest open tile beside it (H-16)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES, tileAt, withTile } from '../src/core/room.js';
import { makeState, eat, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { sit } from '../src/core/fireside.js';
import { wakeSpot } from '../src/core/waking.js';

const room = makeRoom(FIRST_ROOM);
const base = (more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, ...more });

test('each draught drunk on the turn poison fells the hero is lost to the fall (H-17)', () => {
  for (const [id, key] of [['glowDraught', 'glow'], ['slowburn', 'slowburn'], ['mendingDraught', 'mending'], ['spitproofDraught', 'spitproof'], ['shadeDraught', 'shade']]) {
    const s = base({ health: 1, poisoned: 1, bag: [{ id, n: 1 }] }), n = eat(s, 0);
    assert.notEqual(n.fell, s.fell, id); assert.equal(n[key], 0, id);
  }
});

test('a draught drunk on a turn without a fall still starts whole', () => {
  const n = eat(base({ bag: [{ id: 'glowDraught', n: 1 }] }), 0);
  assert.equal(n.glow, get('glowDraught').glow.turns);
});

test('sitting by a fire on the turn of a fall leaves no Warmed (H-56); without a fall, it does', () => {
  const s = { ...makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES), hero: { x: 3, y: 10 }, health: 1, poisoned: 1 };
  const f = { ...s, room: withTile(s.room, 4, 10, get('campfireEmbers')) }, n = sit(f, 4, 10);
  assert.notEqual(n.fell, f.fell); assert.equal(n.warmed, 0);
  const g = base(), lit = { ...g, room: withTile(g.room, 6, 11, get('campfire')), health: 3 };
  assert.equal(sit(lit, 6, 11).warmed, 60);
});

test('a bench on the journey\'s first tile: the fall wakes on the nearest open tile beside it (H-16)', () => {
  const s = base(), { hero } = s.home, benched = { ...s, room: withTile(s.room, hero.x, hero.y, get('bench')) };
  const w = wakeSpot(benched);
  assert.equal(w.place, s.home.place); assert.notDeepEqual(w.hero, hero);
  assert.equal(tileAt(benched.room, w.hero.x, w.hero.y).solid, false);
  assert.equal(Math.abs(w.hero.x - hero.x) + Math.abs(w.hero.y - hero.y), 1);
  assert.deepEqual(wakeSpot(s).hero, hero); // nothing there: on its tile, as before
});
