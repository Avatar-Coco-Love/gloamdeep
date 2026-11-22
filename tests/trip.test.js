// § the waystone trip (D-1022): about 2 s, the sparks leaving, the dark, the far stone empty, the
// sparks gathering; with reduced motion the stairs' quick fade, no sparks
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TRIP_MS, TRIP_STILL_MS, tripTimes, tripAt, sparkAt } from '../src/render/trip.js';

test('about 2 s, in its four parts, the dark at the middle of the fade', () => {
  assert.equal(TRIP_MS, 2000);
  const tt = tripTimes(1000, false);
  assert.deepEqual([tt.mid, tt.end, tt.fade, tt.trip.start], [1850, 3000, 150, 1000]);
  assert.deepEqual([0, 699, 700, 999, 1000, 1299, 1300, 1999].map((d) => tripAt(tt.trip, 1000 + d).phase),
    ['leave', 'leave', 'dark', 'dark', 'empty', 'empty', 'gather', 'gather']);
  assert.equal(tripAt(tt.trip, 3000), null);
});

test('with reduced motion: no sparks, the quick fade', () => {
  const tt = tripTimes(0, true);
  assert.equal(TRIP_STILL_MS, 400);
  assert.deepEqual([tt.mid, tt.end, tt.trip], [200, 400, undefined]);
});

test('a pixel stays home, lifts and rises, then is gone; the head lifts first', () => {
  const head = { x: 8, y: 1, r: 0.5, s: 0.5 }, foot = { x: 8, y: 15, r: 0.5, s: 0.5 };
  assert.equal(sparkAt(foot, 0).home, true);
  assert.deepEqual([sparkAt(foot, 0).x, sparkAt(foot, 0).y], [8, 15]);
  assert.ok(!sparkAt(head, 0.45).home && sparkAt(foot, 0.05).home);
  assert.ok(sparkAt(head, 0.6).y < head.y);
  assert.ok(sparkAt(head, 1).a < 1e-9);
  assert.ok(sparkAt(foot, 1).a < 0.01);
});
