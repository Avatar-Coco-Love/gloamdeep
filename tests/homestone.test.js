// § homestone: an old save's home waystone clears only the sticks on the stone itself (D-589, D-664)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { withHomeStone } from '../src/core/homestone.js';
import { STONE_UP } from '../src/core/woods.js';

// A plain grass woods room, 21 × 15, with no stone yet
const COLS = 21, ROWS = 15, cx = COLS >> 1, cy = (ROWS >> 1) - STONE_UP;
const room = { cols: COLS, rows: ROWS, map: Array.from({ length: ROWS }, () => '.'.repeat(COLS)) };

test('homestone: a stick on the stone goes; a stick and a find in the ring round it stay', () => {
  const items = [
    { id: 'wood', x: cx + 1, y: cy }, // on the stone's east arm
    { id: 'wood', x: cx - 2, y: cy }, // in the ring, west
    { id: 'herb', x: cx + 2, y: cy + 2 }, // the hero's find in the ring, south-east
  ];
  const s = withHomeStone({ place: 'woods', hero: { x: 1, y: 1 }, room, items, people: [], lights: [] });
  assert.equal(s.room.map[cy][cx], 'Z'); // the stone stands where a new game puts it
  assert.deepEqual(s.items, items.slice(1));
});
