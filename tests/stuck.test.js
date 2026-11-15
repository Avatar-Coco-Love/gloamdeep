// § stuck (D-937): the warden's look and moments as its fists sink and as blows ring off it:
// stooped while open, a jolt and chips as it lands, a grey spark for a blow that rings
import { test } from 'node:test';
import assert from 'node:assert/strict';

const any = new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => 0 : any), apply: () => any });
globalThis.document ??= { createElement: () => ({ getContext: () => any }), addEventListener() {}, body: any, documentElement: any };
const { drawEnemies, JOLT_MS } = await import('../src/render/sprites.js');
const { drawSpark, drawChips, SPARK_MS, CHIPS_MS } = await import('../src/render/stuck.js');
const { WARDEN, WARDEN_STUCK } = await import('../src/render/pictures.js');

// What one frame draws: each sprite with where, and each pixel filled
function frame(draw) {
  const drawn = [], dots = [];
  const c = new Proxy({}, { get: (o, k) => (k === 'drawImage' ? (img, x, y) => drawn.push({ img, x, y }) : k === 'fillRect' ? (x, y) => dots.push([x, y]) : () => {}), set: () => true });
  draw(c);
  return { drawn, dots };
}
const warden = { id: 'warden', x: 3, y: 2, awake: 4, chasing: true };
const sprite = (e, t = 0, still = false, sunk = null) => frame((c) => drawEnemies(c, [e], t, still, [], (o) => o, null, sunk)).drawn[0];

test('its picture stuck: 16 rows of 16, stooped below its standing head', () => {
  const rows = [...WARDEN_STUCK.rows]; while (rows.length < 16) rows.unshift('');
  assert.equal(rows.length, 16);
  assert.ok(rows.every((r) => r === '' || r.length === 16));
  assert.equal(WARDEN_STUCK.rows.findIndex((r) => r) - WARDEN.rows.findIndex((r) => r), 2, 'its head bowed two pixels lower');
});

test('open, it is drawn stuck, its own picture; shut, as before', () => {
  assert.notEqual(sprite({ ...warden, open: true, rests: 2 }).img, sprite(warden).img);
  assert.equal(sprite({ ...warden, open: true, rests: 2, facing: 'left' }).img, sprite({ ...warden, open: true, rests: 1, facing: 'left' }).img);
  assert.notEqual(sprite({ ...warden, open: true, facing: 'left' }).img, sprite({ ...warden, open: true }).img, 'mirrored facing left');
});

test('as its fists land it jolts a pixel down, for JOLT_MS; not with reduced motion', () => {
  const open = { ...warden, open: true, rests: 2 }, sunk = { x: 3, y: 2, start: 1000 };
  const rest = sprite(open).y;
  assert.equal(sprite(open, 1000, false, sunk).y, rest + 1);
  assert.equal(sprite(open, 1000 + JOLT_MS, false, sunk).y, rest);
  assert.equal(sprite(open, 1000, true, sunk).y, rest);
  assert.equal(sprite(open, 1000, false, { ...sunk, x: 4 }).y, rest, 'only the one that sank');
});

test('its stone chips spring from both fists for CHIPS_MS, then none', () => {
  const sunk = { x: 3, y: 2, start: 0 };
  const mid = frame((c) => drawChips(c, sunk, CHIPS_MS / 2)).dots;
  assert.equal(mid.length, 4);
  assert.deepEqual([...new Set(mid.map(([x]) => x - 48))].sort((a, b) => a - b), [0, 2, 13, 15]);
  assert.ok(mid.every(([, y]) => y < 2 * 16 + 11), 'up off the floor');
  assert.equal(frame((c) => drawChips(c, sunk, CHIPS_MS)).dots.length, 0);
  assert.equal(frame((c) => drawChips(c, null, 10)).dots.length, 0);
});

test('a blow that rings: a grey cross with a white heart, then four flecks, gone by SPARK_MS', () => {
  const spark = { x: 3, y: 2, start: 0 };
  assert.equal(frame((c) => drawSpark(c, spark, 10)).dots.length, 9);
  assert.equal(frame((c) => drawSpark(c, spark, 120)).dots.length, 4);
  assert.equal(frame((c) => drawSpark(c, spark, SPARK_MS)).dots.length, 0);
  assert.deepEqual(frame((c) => drawSpark(c, spark, 10)).dots[0], [3 * 16 + 8, 2 * 16 + 6], 'on the warden, where the blow falls');
});

test("a blow that rings off its stone clinks instead of the hit's punch; a blow that lands hits", async () => {
  const { createHearing } = await import('../src/hearing.js');
  const heard = [];
  const sound = new Proxy({}, { get: (o, v) => () => heard.push(v) });
  const { hear } = createHearing({ state: { room: { dark: {} }, place: 'depth1' } }, sound, {});
  hear([{ type: 'hit', id: 'warden', held: null, rang: true }]);
  assert.deepEqual(heard, ['ring']);
  heard.length = 0;
  hear([{ type: 'hit', id: 'warden', held: null }]);
  assert.deepEqual(heard, ['hit']);
});
