// § oil tick: the first light way; beside the hero it drinks 5% oil instead of biting (step 0.3.63, D-606)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt } from '../src/core/room.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { biteSound, drinkSound } from '../src/core/enemies.js';
import { stopsWalk } from '../src/core/walk.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and the creatures given; `oil` the lantern's
const at = (enemies, oil = 1) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies, oil });
const tick = (x, y) => ({ id: 'oilTick', x, y });
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} is not ${b}`);
// What a wait burns alone, with no one beside the hero
const burnt = (oil) => oil - wait(at([], oil)).oil;

test('an oil tick has 2 hearts, a bite of 1, drinks 5%, only chases, and drops a Tick Shell or rarely an Oil Bladder', () => {
  const m = get('oilTick');
  assert.equal(m.name, 'Oil tick'); assert.equal(m.health, 2); assert.equal(m.bite, 1); assert.equal(m.drinks, 0.05);
  assert.deepEqual(m.ways, ['chases']);
  assert.equal(m.drops, 'tickShell'); assert.equal(m.rare, 'oilBladder');
  for (const id of [m.hurt, m.die, m.bites, m.drinksSay]) assert.ok(LINES[id], id);
  assert.equal(get('tickShell').name, 'Tick Shell'); assert.equal(get('tickShell').sells, 1); assert.equal(get('tickShell').max, 20);
  assert.equal(get('oilBladder').name, 'Oil Bladder'); assert.equal(get('oilBladder').sells, 5); assert.equal(get('oilBladder').max, 20);
});

test('it joins the pool from depth 3, never leaving, and not before', () => {
  assert.ok(!poolAt(2).includes('oilTick'));
  for (const d of [3, 4, 5, 9]) assert.ok(poolAt(d).includes('oilTick'), d);
});

test('beside the hero it drinks 5% of the oil and takes no heart, with its line and its sip', () => {
  const s = at([tick(5, 10)]), n = wait(s);
  assert.equal(n.health, s.health);
  near(n.oil, s.oil - burnt(s.oil) - 0.05);
  assert.equal(n.line.id, 'oilTickDrinks');
  assert.deepEqual(n.events.filter((e) => e.type === 'drink'), [{ type: 'drink', id: 'oilTick', oil: 0.05 }]);
  assert.ok(!n.events.some((e) => e.type === 'bite'));
  assert.equal(drinkSound(n.events), 'sip'); assert.equal(biteSound(n.events), undefined);
  assert.ok(stopsWalk(s, n), 'a drink stops a walk');
});

test('it drinks with the lantern off too, the oil being in the tank', () => {
  const s = { ...at([tick(5, 10)]), lit: false }, n = wait(s);
  assert.equal(n.health, s.health);
  near(n.oil, wait({ ...at([], s.oil), lit: false }).oil - 0.05);
});

test('with only a little oil left it drinks the rest, and with none it bites for 1, of teeth', () => {
  const low = wait(at([tick(5, 10)], 0.04 + burnt(0.04)));
  assert.equal(low.oil, 0); assert.equal(low.line.id, 'oilEmpty'); // the drink empties it: the gutter's line wins (H-11, D-872)
  const s = at([tick(5, 10)], 0), n = wait(s);
  assert.equal(n.health, s.health - 1); assert.equal(n.oil, 0);
  assert.equal(n.line.id, 'oilTickBite');
  assert.equal(biteSound(n.events), 'teeth'); assert.equal(drinkSound(n.events), undefined);
});

test('two ticks drink 5% each, and a rat beside them still bites', () => {
  const s = at([tick(5, 10), tick(4, 11), { id: 'rat', x: 6, y: 11 }]), n = wait(s);
  near(n.oil, s.oil - burnt(s.oil) - 0.1);
  assert.equal(n.health, s.health - 1);
  assert.equal(n.line.id, 'oilTickDrinks'); // the first beside the hero speaks
});

test('two lantern hits beat it, worth 3', () => {
  let s = at([tick(5, 10)]);
  s = step(s, 'up');
  assert.equal(s.enemies[0].health, 1); assert.equal(s.line.id, 'oilTickDrinks'); // its drink, like a bite, replaces the hurt line (D-117)
  const n = step(s, 'up');
  assert.deepEqual(n.enemies, []);
  assert.equal(n.line.id, 'oilTickDie');
  assert.equal(n.xp, 3);
});
