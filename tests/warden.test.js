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

test('the Warden is in the registry: 4 health, a bite of 1, chases, sleeps as itself, with its lines', () => {
  const e = get('warden');
  assert.equal(e.name, 'Warden'); assert.equal(e.kind, 'enemy');
  assert.equal(e.health, 4); assert.equal(e.bite, 1); assert.deepEqual(e.ways, ['chases']);
  assert.equal(e.sleeps, true); assert.equal(e.looksLike, undefined); assert.equal(e.awakeTurns, 6);
  assert.ok(asleepAtFirst(e)); assert.ok(e.acts && e.fights);
  for (const line of ['wardenWakes', 'wardenHurt', 'wardenSettles', 'wardenDie', 'wardenBite']) assert.ok(LINES[line], line);
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

test('awake, four lantern swings beat it', () => {
  let s = at({ id: 'warden', x: 2, y: 2, chasing: true });
  for (let i = 0; i < 4 && s.enemies.length; i++) s = step(s, 'right');
  assert.equal(s.enemies.length, 0);
});
