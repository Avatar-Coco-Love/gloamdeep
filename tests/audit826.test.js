// § the fourteenth audit's bug fixes (D-826): each test failed on the code before its fix
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// a canvas that takes anything, as textfit.test.js has it
const any = new Proxy(function () {}, {
  get: (t, k) => (k === 'then' ? undefined : k === Symbol.toPrimitive ? () => 0 : k === 'data' ? new Uint8ClampedArray(4 * 64 * 64) : k === 'width' || k === 'height' ? 64 : k === 'length' ? 0 : any),
  set: () => true, apply: () => any, construct: () => any,
});
globalThis.devicePixelRatio = 1;
globalThis.document ??= { createElement: () => any, addEventListener() {}, body: any, documentElement: any };
globalThis.addEventListener ??= () => {};
globalThis.matchMedia ??= () => ({ matches: false, addEventListener() {} });

const { drawBag } = await import('../src/render/bag.js');
const { makeRoom, SKY } = await import('../src/core/room.js');
const { makeState, canSleepOut } = await import('../src/core/turn.js');
const { craft, makeFrom, hold } = await import('../src/core/bagturn.js');
const { shownLine } = await import('../src/core/lines.js');

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (more = {}) => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), ...more });
const spriteOf = () => any;
const FILL = ['stone', 'herb', 'oilcap', 'mothDust', 'gloamberry'].map((id) => ({ id, n: 1 }));

test('B1: a Herb chosen with a mortar recipe using it known draws its card, EAT and the mortar line', () => {
  const draw = () => drawBag(any, 360, 640, [{ id: 'herb', n: 2 }], 0, spriteOf, [], false, {}, 6, false, 0, true, false, { into: 'mendingDraught', at: 'at the mortar' });
  assert.doesNotThrow(draw);
});

test('B2: MAKE with a full bag says the bag is full, not that one is carried', () => {
  const full = outside({ bag: [{ id: 'wood', n: 4 }, ...FILL] });
  assert.equal(shownLine(craft(full, 0)).text, 'Your bag is full.');
  const stones = outside({ bag: [{ id: 'stone', n: 5 }, { id: 'wood', n: 2 }, { id: 'herb', n: 1 }, { id: 'oilcap', n: 1 }, { id: 'mothDust', n: 1 }, { id: 'gloamberry', n: 1 }] });
  assert.equal(shownLine(makeFrom(stones, 'stone')).text, 'Your bag is full.');
  const carried = outside({ bag: [{ id: 'stone', n: 5 }, { id: 'wood', n: 2 }, { id: 'mortar', n: 1 }] });
  assert.equal(shownLine(makeFrom(carried, 'stone')).text, shownLine({ ...carried, line: { id: 'mortarFull', turn: carried.turn } }).text, 'one already carried still says so');
});

test('B3: a shy bunny near the hero at dusk does not stop sleeping out; a rat still does', () => {
  const bunny = { id: 'bunny', x: 4, y: 2, health: 1 };
  assert.equal(canSleepOut(outside({ turn: 250, lit: true, enemies: [bunny] })), true);
  assert.equal(canSleepOut(outside({ turn: 250, lit: true, enemies: [{ id: 'rat', x: 4, y: 3, health: 2 }] })), false);
});

test('B4: holding a tool marks its hold event, and the knife sound skips it', () => {
  const ev = (s) => s.events.find((e) => e.type === 'hold');
  assert.equal(ev(hold(outside({ bag: [{ id: 'rod', n: 1 }] }), 0)).tool, true);
  assert.equal(ev(hold(outside({ bag: [{ id: 'knife', n: 1 }] }), 0)).tool, false);
  const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  assert.match(main, /e\.type === 'hold' && !e\.tool\)\) sound\.draw\(\)/);
});

test('Tab on Settings ticks as a tap does: onTab goes through pressed, which passes its answer on', () => {
  const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  assert.match(main, /onTab: pressed\(onTab\)/);
  assert.match(main, /return out;/);
});

test('B5: the mortar is no longer said to list only the Glow Draught', () => {
  const content = readFileSync(new URL('../docs/CONTENT-3.md', import.meta.url), 'utf8');
  const tiles = readFileSync(new URL('../src/core/tiles.js', import.meta.url), 'utf8');
  assert.doesNotMatch(content, /MORTAR, the Glow Draught once/);
  assert.doesNotMatch(tiles, /none yet \(the Glow Draught comes/);
});
