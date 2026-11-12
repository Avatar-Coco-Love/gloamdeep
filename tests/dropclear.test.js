// § drops clear of creatures (R7 of D-660's findings): a spill never lands under a creature or person
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step } from '../src/core/turn.js';
import { spread } from '../src/core/spread.js';
import { get } from '../src/core/registry.js';

const room = makeRoom(FIRST_ROOM);
const base = { ...makeState(room), hero: { x: 5, y: 11 }, items: [] };

test('spread skips tiles with a creature or a person on them, sides before corners', () => {
  const s = { ...base, enemies: [{ id: 'rat', x: 4, y: 10 }], people: [{ id: 'peddler', x: 6, y: 10 }] };
  assert.deepEqual(spread(s, 5, 10, 2, true), [{ x: 5, y: 10 }, { x: 5, y: 9 }]);
});

test('with every tile round taken, the rest of the spill lies on the next ring out, nearest first (D-869)', () => {
  const around = [[0, 1], [-1, 0], [1, 0], [0, -1], [-1, 1], [1, 1], [-1, -1], [1, -1]].map(([dx, dy]) => ({ x: 5 + dx, y: 10 + dy }));
  const s = { ...base, hero: { x: 5, y: 11 }, enemies: around.slice(1, 5).map((t) => ({ id: 'rat', ...t })),
    people: around.slice(5).map((t) => ({ id: 'peddler', ...t })) };
  assert.deepEqual(spread(s, 5, 10, 2, true), [{ x: 5, y: 10 }, { x: 5, y: 8 }]); // its own tile, then 2 straight up
});

test('a beaten creature\'s rare drop never lands under another creature (snapcaps never move), and the common lies where it fell', () => {
  const foe = 'flaskMimic', { drops, rare } = get(foe);
  const beat = (seed) => step({ ...base, seed, enemies: [{ id: foe, x: 5, y: 10, health: 1, chasing: true },
    { id: 'snapcap', x: 4, y: 10, health: 2 }, { id: 'snapcap', x: 6, y: 10, health: 2 }] }, 'up');
  const runs = Array.from({ length: 1000 }, (_, i) => beat(i + 1)).filter((n) => n.items.some((it) => it.id === rare));
  assert.ok(runs.length > 20, `${runs.length} rare drops`);
  for (const n of runs) {
    for (const it of n.items) assert.ok(!n.enemies.some((e) => e.x === it.x && e.y === it.y), `${it.id} under a creature`);
    const c = n.items.find((it) => it.id === drops);
    if (c) assert.deepEqual([c.x, c.y], [5, 10]);
  }
});
