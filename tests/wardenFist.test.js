// § the Warden's Fist (D-885 step 3, D-888): beaten, the warden always leaves it; held, it hits for 2
// and knocks the creature a tile back, a wall there hurting it 1, a creature there both 1.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeState, makeWorld, step } from '../src/core/turn.js';
import { makeRoom, SKY, locketRoom } from '../src/core/room.js';
import { stingTurn } from '../src/core/sting.js';
import { knockOf } from '../src/core/fist.js';
import { get } from '../src/core/registry.js';
import { shownLine } from '../src/core/lines.js';
import { FILES } from '../src/render/sound.js';
import { fresh } from '../src/core/stairs.js';
import { UPGRADES } from '../src/core/save.js';
import { withOldFist } from '../src/core/oldfist.js';

const map = ['TTTTTTTTTT', 'T........T', 'T........T', 'T........T', 'TTTTTTTTTT'];
const room = makeRoom(map, SKY, 'woods');
const at = (hx, enemies, held = 'wardenFist') => ({ ...makeState(room, { x: hx, y: 2 }, [], []), lit: true, oil: 99, held, enemies });
// A warden resting after a slam stands still, so where the Fist knocks it can be seen
const resting = (x, extra = {}) => ({ id: 'warden', x, y: 2, chasing: true, rests: 3, ...extra });
const fists = (s) => s.items.filter((i) => i.id === 'wardenFist');

test('the Fist is a held weapon that hits for 2 and knocks back 1, of stone', () => {
  const f = get('wardenFist');
  assert.equal(f.name, "Warden's Fist"); assert.equal(f.hit, 2); assert.equal(f.knocks, 1); assert.ok(f.hold);
  assert.equal(FILES.hit.as('stone'), 'stoneHit');
  assert.equal(FILES.hit.as(true), 'knifeHit');
});

test('beaten by the hero, the warden always leaves the Fist where it fell', () => {
  const s = step(at(3, [resting(4, { health: 1 })], null), 'right');
  assert.ok(!s.enemies.length);
  assert.deepEqual(fists(s), [{ id: 'wardenFist', x: 4, y: 2 }]);
});

test('beaten by a sting, with no drop and no experience, it still leaves the Fist', () => {
  const s = stingTurn(at(5, [{ id: 'warden', x: 6, y: 2, chasing: true, raised: { dx: -1, dy: 0 } }, { id: 'warden', x: 4, y: 2, health: 1 }], null));
  assert.deepEqual(fists(s), [{ id: 'wardenFist', x: 4, y: 2 }]);
});

test('held, it hits for 2 and knocks the creature a tile straight back', () => {
  const s = step(at(3, [resting(4)]), 'right');
  assert.deepEqual([s.enemies[0].x, s.enemies[0].y], [5, 2]);
  assert.equal(s.enemies[0].health, 2);
  assert.equal(s.line.id, 'wardenHurt');
});

test('into a wall: it loses 1 more, the line naming both', () => {
  const s = step(at(7, [resting(8)]), 'right');
  assert.deepEqual([s.enemies[0].x, s.enemies[0].health], [8, 1]);
  assert.equal(s.line.id, 'foeSlamInto');
  assert.equal(shownLine(s).text, 'The warden slams into the tree!');
});

test('into another creature: both lose 1, and both flash', () => {
  const s = step(at(3, [resting(4), { id: 'snapcap', x: 5, y: 2 }]), 'right');
  assert.equal(s.enemies.find((e) => e.id === 'warden').health, 1);
  assert.equal(s.enemies.find((e) => e.id === 'snapcap').health, 1);
  assert.equal(shownLine(s).text, 'The warden slams into the snapcap!');
  assert.equal(s.events.filter((e) => e.type === 'hit').length, 2);
});

test('beaten by the wall, it is the hero\'s blow: its drop and its experience', () => {
  const s = step(at(7, [resting(8, { health: 3 })]), 'right');
  assert.ok(!s.enemies.length);
  assert.deepEqual(fists(s), [{ id: 'wardenFist', x: 8, y: 2 }]);
  assert.ok(s.events.some((e) => e.type === 'beat' && e.id === 'warden'));
  assert.ok(s.xp > 0);
});

test('a person, water, one under the earth or a pile of bones only stop it', () => {
  const wet = makeRoom(['TTTTTTTTTT', 'T........T', 'T....~...T', 'T........T', 'TTTTTTTTTT'], SKY, 'woods');
  const hero = { x: 3, y: 2 }, foe = { id: 'rat', x: 4, y: 2 };
  const base = { room, hero, enemies: [foe], people: [] };
  assert.equal(knockOf({ ...base, room: wet }, foe), null);
  assert.equal(knockOf({ ...base, people: [{ id: 'peddler', x: 5, y: 2 }] }, foe), null);
  for (const o of [{ id: 'mole', x: 5, y: 2, under: true }, { id: 'boneRat', x: 5, y: 2, pile: 3 }]) assert.equal(knockOf({ ...base, enemies: [foe, o] }, foe), null);
  assert.deepEqual(knockOf(base, foe), { to: { x: 5, y: 2 } });
});

test('the room\'s edge, a doorway too, is a wall', () => {
  const open = makeRoom(['TTTTT', 'T....', 'TTTTT'], SKY, 'woods');
  assert.deepEqual(knockOf({ room: open, hero: { x: 3, y: 1 }, enemies: [], people: [] }, { id: 'rat', x: 4, y: 1 }), { wall: 'wall', x: 5, y: 1 });
});

test('an old save that beat the warden gets the Fist where it first stood, once', () => {
  const SEED = 7, id = locketRoom(SEED), w = makeWorld('first', SEED), made = fresh(id, SEED);
  const stood = made.enemies.find((e) => e.id === 'warden');
  const beaten = { ...made, enemies: made.enemies.filter((e) => e.id !== 'warden') };
  const s = UPGRADES[34]({ ...w, elsewhere: { ...w.elsewhere, [id]: beaten } });
  assert.deepEqual(fists(s.elsewhere[id]), [{ id: 'wardenFist', x: stood.x, y: stood.y }]);
  const kept = { ...w, elsewhere: { ...w.elsewhere, [id]: made } }; // the warden still there: nothing
  assert.deepEqual(withOldFist(kept), kept);
  assert.deepEqual(withOldFist(w), w); // the room never entered: nothing
});
