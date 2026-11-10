// § spitproof: the Spitproof Draught (D-802), made at the mortar from 2 Grub Skin and 1 Herb;
// drunk from the bag, any time, for 60 turns a spit grub's glob splashes off and hurts nothing
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, eat, wait, makeAt, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { spitproofLeft, spitproofSlept } from '../src/core/spitproof.js';
import { stationMakes } from '../src/core/menu.js';
import { fall } from '../src/core/fall.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, bag, ...more });
const parts = [{ id: 'grubSkin', n: 3 }, { id: 'herb', n: 1 }];
// A spit grub up the hero's column, 4 tiles away, with the lantern lit: its glob reaches the hero on the fourth wait
const facing = (more) => ({ ...carrying([], more), items: [], enemies: [{ id: 'spitGrub', x: 5, y: 7 }] });
const waits = (s, n) => { for (let i = 0; i < n; i++) s = wait(s); return s; };

test('the Spitproof Draught is a made find of 5 a stack, drunk, with its lines', () => {
  const e = get('spitproofDraught');
  assert.equal(e.name, 'Spitproof Draught'); assert.equal(e.kind, 'item'); assert.equal(e.max, 5); assert.equal(e.verb, 'DRINK');
  assert.deepEqual(e.spitproof, { turns: 60 }); assert.deepEqual(e.bench.of, { grubSkin: 2, herb: 1 });
  for (const line of ['spitproofMake', 'spitproofShort', 'spitproofFull', 'spitproofDrink', 'spitproofLook', 'spitproofSplash', 'spitproofEnds', 'spitproofHeld']) assert.ok(LINES[line], line);
});

test('the mortar shows it once Grub Skin and Herb have both been held, last', () => {
  const tile = get('mortarStand');
  assert.equal(tile.makes.at(-1), 'spitproofDraught');
  assert.deepEqual(stationMakes(tile, parts, 6, [], new Set(['grubSkin'])), []);
  const [m] = stationMakes(tile, parts, 6, [], new Set(['grubSkin', 'herb']));
  assert.equal(m.item, 'spitproofDraught'); assert.equal(m.dim, false);
});

test('made at the mortar it takes 2 Grub Skin and 1 Herb, a turn, with its line; too few, free', () => {
  const n = makeAt(carrying(parts), 'spitproofDraught');
  assert.deepEqual(n.bag, [{ id: 'grubSkin', n: 1 }, { id: 'spitproofDraught', n: 1 }]);
  assert.equal(n.turn, 1); assert.equal(shownLine(n).text, 'You make a Spitproof Draught.');
  const short = makeAt(carrying([{ id: 'grubSkin', n: 1 }, { id: 'herb', n: 1 }]), 'spitproofDraught');
  assert.equal(short.turn, 0); assert.equal(shownLine(short).text, 'You need 2 Grub Skin and 1 Herb.');
});

test('drunk at full health it runs 60 turns, healing nothing, then the line', () => {
  const n = eat(carrying([{ id: 'spitproofDraught', n: 2 }]), 0);
  assert.equal(spitproofLeft(n), 60); assert.equal(n.turn, 1); assert.deepEqual(n.bag, [{ id: 'spitproofDraught', n: 1 }]);
  const t = waits(n, 60);
  assert.equal(spitproofLeft(t), 0); assert.equal(shownLine(t).text, 'Your skin feels dry again.');
});

test('while it works a glob splashes off the hero, hurting nothing; without it, it hits for 1', () => {
  const plain = waits(facing({ health: 5 }), 4);
  assert.equal(plain.health, 4); assert.equal(plain.line.id, 'spitGrubHit');
  const proof = waits(facing({ health: 5, spitproof: 30 }), 4);
  assert.equal(proof.health, 5); assert.equal(proof.line.id, 'spitproofSplash');
  assert.ok(!proof.events.some((e) => e.type === 'bite'));
  assert.ok(proof.events.some((e) => e.type === 'splash' && e.x === 5 && e.y === 11));
  assert.ok(!proof.globs.some((g) => g.y > 11)); // it broke on the hero, flying no farther
  assert.equal(spitproofLeft(proof), 26);
});

test('drunk again it goes back to 60, never more', () => {
  assert.equal(spitproofLeft(eat(carrying([{ id: 'spitproofDraught', n: 2 }], { spitproof: 30 }), 0)), 60);
});

test('a night uses its turns, and a fall ends it', () => {
  assert.equal(spitproofLeft(spitproofSlept({ spitproof: 50 }, 20)), 30);
  assert.equal(spitproofLeft(spitproofSlept({ spitproof: 50 }, 49)), 0);
  assert.equal(spitproofLeft(fall(carrying([], { spitproof: 40 }))), 0);
});
