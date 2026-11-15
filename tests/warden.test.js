// § warden: the old-city warden (D-692), a stone guard made by Underhearth's people, asleep as a
// statue beside the locket; a bump wakes it, it chases for 6 turns, then stands still again
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get, asleepAtFirst } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { makeState, step } from '../src/core/turn.js';
import { makeRoom, SKY } from '../src/core/room.js';
import { withRelic, RELIC_GUARD } from '../src/core/relic.js';
import { poolAt } from '../src/core/room.js';

const map = ['TTTTTTTT', 'T......T', 'T......T', 'T......T', 'TTTTTTTT'];
const room = makeRoom(map, SKY, 'woods');
const at = (enemy) => ({ ...makeState(room, { x: 1, y: 2 }, [], []), enemies: [enemy] });

test('the Warden is in the registry: 4 health, a bite of 1, slams, sleeps as itself, with its lines', () => {
  const e = get('warden');
  assert.equal(e.name, 'Warden'); assert.equal(e.kind, 'enemy');
  assert.equal(e.health, 4); assert.equal(e.bite, 1); assert.deepEqual(e.ways, ['slams']);
  assert.equal(e.sleeps, true); assert.equal(e.looksLike, undefined); assert.equal(e.awakeTurns, 6);
  assert.ok(asleepAtFirst(e)); assert.ok(e.acts && e.fights);
  for (const line of ['wardenWakes', 'wardenHurt', 'wardenSettles', 'wardenDie', 'wardenBite', 'wardenRaises', 'wardenMisses']) assert.ok(LINES[line], line);
});

test('it guards the locket, asleep, and never comes in the pool', () => {
  assert.equal(RELIC_GUARD, 'warden');
  const r = withRelic(5, { map, start: { x: 1, y: 2 }, items: [], enemies: [], people: [] });
  assert.deepEqual(r.enemies.map((e) => [e.id, e.asleep]), [['warden', true]]);
  assert.ok(!poolAt(Infinity).includes('warden'));
});

test('a bump wakes it with no harm and its line; then it chases', () => {
  const s = step(at({ id: 'warden', x: 2, y: 2, asleep: true }), 'right');
  const w = s.enemies[0];
  assert.ok(!w.asleep); assert.equal(w.health ?? 4, 4); assert.equal(s.line.id, 'wardenWakes');
  assert.equal(s.hearts, at({ id: 'warden', x: 2, y: 2, asleep: true }).hearts);
});

// § harder (D-937): blows ring off its stone until its slam misses; then, open, each blow does 1
// less (never below 1) till it next acts; once cracked it never stands still again
test('awake and shut, every blow rings off its stone: no hurt, no flash, its line', () => {
  let s = at({ id: 'warden', x: 2, y: 2, chasing: true });
  s = step(s, 'right');
  assert.equal(s.enemies[0].health ?? 4, 4);
  assert.ok(s.events.some((e) => e.type === 'hit' && e.rang));
  assert.equal(LINES.wardenRings.text, 'Your blow rings off the stone.');
  assert.equal(LINES.wardenMisses.text, "The warden's fists sink into the floor!");
});

test('a missed slam leaves it open through its rest; the knife does 1 through its skin', () => {
  let s = { ...at({ id: 'warden', x: 2, y: 2, chasing: true, raised: { dx: -1, dy: 0 } }), held: 'knife', lit: true, oil: 99 };
  s = step(s, 'up'); // out of the way: the fists sink into the floor
  assert.equal(s.enemies[0].open, true); assert.equal(s.line.id, 'wardenMisses');
  s = step(s, 'down'); // back beside it, still stuck
  assert.equal(s.enemies[0].open, true);
  s = step(s, 'right'); // the blow lands, then it pulls free and raises its fists again
  assert.equal(s.enemies[0].health, 3);
  assert.ok(!s.enemies[0].open); assert.ok(s.enemies[0].raised);
});

test('four openings beat it, with the lantern alone', () => {
  let s = { ...at({ id: 'warden', x: 2, y: 2, asleep: true }), lit: true, oil: 99 };
  s = step(s, 'right'); s = step(s, 'right'); // wakes; rings off as its fists go up
  for (let i = 0; i < 4 && s.enemies.length; i++) for (const d of ['up', 'down', 'right']) s = step(s, d);
  assert.equal(s.enemies.length, 0);
});

test('a sting rings off it too while it is shut', async () => {
  const { hitFoe } = await import('../src/core/enemies.js');
  const s = at({ id: 'warden', x: 2, y: 2, chasing: true });
  assert.equal(hitFoe(s, s.enemies[0], 1), s);
  const o = at({ id: 'warden', x: 2, y: 2, chasing: true, open: true });
  assert.equal(hitFoe(o, o.enemies[0], 1).enemies[0].health, 3);
});

test('cracked, it never stands still again; whole, it settles after its 6 turns', () => {
  const far = (health) => ({ ...makeState(room, { x: 1, y: 1 }, [], []), enemies: [{ id: 'warden', x: 6, y: 3, chasing: true, awake: 1, ...(health && { health }) }] });
  assert.ok(step(far(), 'down').enemies[0].asleep);
  assert.ok(!step(far(3), 'down').enemies[0].asleep);
});
