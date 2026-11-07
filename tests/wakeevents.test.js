// § wake events: a waystone's plate and a mimic waking send different events (R1, D-661),
// so only the waystone rings its bells and kindles its rune (D-591); a mimic wakes with
// no sound (D-368)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, makeWorld, step, FIRST_START } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';

const types = (s) => s.events.map((e) => e.type);
const room = makeRoom(FIRST_ROOM);

for (const id of ['flaskMimic', 'herbMimic']) {
  test(`a bumped ${id} sends 'wake', never the waystone's 'stoneWake'`, () => {
    const s = { ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id, x: 5, y: 10, asleep: true }] };
    const out = step(s, 'up');
    assert.deepEqual(out.events.filter((e) => e.type === 'wake'), [{ type: 'wake', id }]);
    assert.ok(!types(out).includes('stoneWake'));
  });
}

test("a waystone's plate stepped on sends 'stoneWake' at the plate, never 'wake'", () => {
  const w = goToPlace(makeWorld('first', 5), 'woods');
  let at = null;
  for (let y = 0; y < w.room.rows && !at; y++) { const x = w.room.map[y].indexOf('Z'); if (x >= 0) at = { x, y }; }
  const out = step({ ...w, hero: { x: at.x, y: at.y + 1 }, enemies: [], events: [] }, 'up');
  assert.deepEqual(out.events.filter((e) => e.type === 'stoneWake'), [{ type: 'stoneWake', ...at }]);
  assert.ok(!types(out).includes('wake'));
});
