// § the hallway's quiet (Q-112, D-960): no music in the hallway and the arena while the Lampeater is
// unbeaten; the boss bench's lower start, below the hallway, for the whole way up
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { newJourney } from '../src/core/state.js';
import { bench, arenaPlace } from '../src/core/bossbench.js';
import { quietHere, hallPlace } from '../src/core/beaten.js';
import { tileAt } from '../src/core/room.js';
import { step } from '../src/core/turn.js';

const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
// The steps from the hero to the room's way up on its top edge, by the floor (a plain search)
function wayUp(s) {
  const goal = (x, y) => y === 0 && !tileAt(s.room, x, y).solid;
  const seen = new Map([[`${s.hero.x},${s.hero.y}`, null]]), queue = [[s.hero.x, s.hero.y]];
  while (queue.length) {
    const [x, y] = queue.shift();
    if (goal(x, y)) { const path = []; let k = `${x},${y}`; while (seen.get(k)) { const [d, from] = seen.get(k); path.unshift(d); k = from; } return path; }
    for (const [d, [dx, dy]] of Object.entries(DIRS)) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= s.room.cols || ny >= s.room.rows || seen.has(`${nx},${ny}`) || tileAt(s.room, nx, ny).solid) continue;
      seen.set(`${nx},${ny}`, [d, `${x},${y}`]); queue.push([nx, ny]);
    }
  }
  return null;
}
const walkUp = (s) => { for (const d of [...wayUp(s), 'up']) s = step(s, d); return s; };

test('below, it starts one tile under the way up into the hallway, that room empty and still with music', () => {
  for (let seed = 1; seed <= 12; seed++) {
    const s = bench(newJourney(seed), 'middling', false, true);
    assert.equal(s.hero.y, 1);
    assert.equal(tileAt(s.room, s.hero.x, 0).solid, false);
    assert.equal(s.enemies.length, 0);
    assert.equal(s.sealSeen, false);
    assert.equal(quietHere(s), false);
  }
});

test('the whole way up: the warning, the quiet, the seal and the cutscene; beaten, the music is back', () => {
  for (const seed of [1, 4, 9]) {
    let s = step(step(bench(newJourney(seed), 'lean', true, true), 'up'), 'up');
    assert.equal(s.place, hallPlace(seed));
    assert.equal(s.line?.id, 'hallWarning');
    assert.equal(quietHere(s), true);
    s = walkUp(s);
    assert.equal(s.place, arenaPlace(seed));
    assert.equal(quietHere(s), true);
    assert.equal(s.enemies.find((e) => e.id === 'lampeater').health, 6); // at half, kept while it waited
    s = step(s, 'up');
    assert.equal(s.events.find((e) => e.type === 'seal')?.first, true);
    const won = { ...s, enemies: s.enemies.filter((e) => e.id !== 'lampeater') };
    assert.equal(quietHere(won), false);
    const back = step(step({ ...won, room: { ...won.room, map: won.room.map.map((r) => r.split(get('sealedDoor').letter).join('.')) } }, 'down'), 'down');
    assert.equal(back.place, hallPlace(seed));
    assert.equal(quietHere(back), false);
  }
});

test('the bot\'s bench is unchanged: the arena\'s way in (D-958)', () => {
  assert.equal(bench(newJourney(3), 'middling').place, arenaPlace(3));
});
