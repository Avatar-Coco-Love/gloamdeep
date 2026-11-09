// § bones: the bone rat comes back (step 0.3.183, D-731). Beaten, it falls into a pile of bones that
// stands up whole 3 turns later, unless the hero steps onto it to scatter it; only that beats it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, wait, nextMoves, creatureList, itemAt } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The hero at 5,11 and a bone rat one hit from beaten on 5,10, struck down into its pile
const fell = (seed = 1, s = makeState(room)) => step({ ...s, seed, hero: { x: 5, y: 11 }, items: [],
  enemies: [{ id: 'boneRat', x: 5, y: 10, health: 1, chasing: true }] }, 'up');
const waits = (s, n) => { for (let i = 0; i < n; i++) s = wait(s); return s; };
const seeds = Array.from({ length: 400 }, (_, i) => i + 1);

test('the bone rat rises after 3 turns, with its lines (D-731)', () => {
  const m = get('boneRat');
  assert.equal(m.rises, 3);
  for (const id of [m.falls, m.stirsSay, m.scatters]) assert.ok(LINES[id], id);
});

test('beaten, it lies as a pile: no beat event, no drop, no experience', () => {
  const n = fell();
  assert.equal(n.enemies[0].pile, 3);
  assert.equal(n.enemies[0].health, undefined);
  assert.ok(!n.events.some((e) => e.type === 'beat'));
  assert.deepEqual(n.items, []);
  assert.equal(n.xp, 0);
});

test('a pile bites no one, has no next move and is not on the creature list', () => {
  const n = fell(), w = wait(n);
  assert.equal(w.health, n.health);
  assert.deepEqual(nextMoves(n), []);
  assert.deepEqual(creatureList(n), []);
});

test('it counts 3, 2, 1, says the bones stir on its last turn, then stands up whole and chasing', () => {
  const n = fell(), one = waits(n, 1), two = waits(n, 2), three = waits(n, 3);
  assert.equal(one.enemies[0].pile, 2);
  assert.equal(two.enemies[0].pile, 1);
  assert.equal(two.line.id, 'boneRatStirs');
  const up = three.enemies[0];
  assert.equal(up.pile, undefined);
  assert.equal(up.chasing, true);
  assert.deepEqual([up.x, up.y], [5, 10]);
  assert.equal(three.health, n.health, 'standing up takes its turn');
  assert.equal(wait(three).health, n.health - 1, 'it bites on the next');
});

test('stepping onto the pile scatters it: the hero moves there, beaten, worth 4, with its rattle', () => {
  const NO = seeds.find((seed) => !step(fell(seed), 'up').bag.length);
  const n = step(fell(NO), 'up');
  assert.deepEqual(n.enemies, []);
  assert.deepEqual(n.hero, { x: 5, y: 10 });
  assert.equal(n.xp, 4);
  assert.ok(n.events.some((e) => e.type === 'beat' && e.id === 'boneRat'));
  assert.ok(n.events.some((e) => e.type === 'scatter' && e.id === 'boneRat'));
  assert.equal(n.line.id, 'boneRatScatters');
});

test('scattered, it drops a Rat Bone about 1 time in 2, taken at once; a full bag leaves it', () => {
  const got = seeds.filter((seed) => step(fell(seed), 'up').bag.some((b) => b.id === 'ratBone')).length;
  assert.ok(got > 160 && got < 240, `${got} of 400`);
  const YES = seeds.find((seed) => step(fell(seed), 'up').bag.length);
  assert.equal(shownLine(step(fell(YES), 'up')).text, 'You pick up the rat bone.');
  const stacks = Array.from({ length: 6 }, () => ({ id: 'ratBone', n: 20 }));
  const f = step(fell(YES, { ...makeState(room), bag: stacks }), 'up');
  assert.equal(itemAt(f, 5, 10).id, 'ratBone');
});

test('it comes back whole every time it is beaten', () => {
  let s = waits(fell(), 3);
  assert.equal(s.enemies[0].pile, undefined);
  for (let i = 0; i < 3; i++) s = step(s, 'up');
  assert.equal(s.enemies[0].pile, 3);
});
