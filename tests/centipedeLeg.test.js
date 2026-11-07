// § centipedeLeg: the centipede's common material (D-654)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

test('the Centipede Leg is a bag find in stacks of 20, sold for 1, with its lines', () => {
  const e = get('centipedeLeg');
  assert.equal(e.name, 'Centipede Leg'); assert.equal(e.kind, 'item'); assert.equal(e.bag, true);
  assert.equal(e.max, 20); assert.equal(e.sells, 1);
  for (const line of [e.says, e.look, e.full]) assert.ok(LINES[line], line);
});
