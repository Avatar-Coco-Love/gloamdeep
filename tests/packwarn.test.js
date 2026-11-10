// § pack's warning: a rat pack that notices the hero says one of its lines (D-766)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, wait, FIRST_START } from '../src/core/turn.js';
import { shownLine as shown, LINES } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The first room with the lantern lit, so a rat in its light 3 tiles off notices; god mode
const at = (enemies, lit = true) => ({ ...makeState(room, FIRST_START, [], []), lit, god: true, hero: { x: 6, y: 7 }, enemies });
const pack = (o = {}) => [{ id: 'rat', x: 3, y: 7, pack: 1, ...o }, { id: 'rat', x: 3, y: 9, pack: 1 }, { id: 'rat', x: 2, y: 8, pack: 1 }];

test('a pack that notices the hero says its warning, in amber', () => {
  const n = wait(at(pack()));
  assert.ok(n.enemies.every((e) => e.chasing), 'the pack comes');
  assert.equal(n.line.id, 'ratPack');
  assert.equal(shown(n).text, 'The pack closes in!');
  assert.equal(LINES.ratPack.warn, true);
});

test('the three lines take turns, each time the pack notices anew', () => {
  const said = [];
  let s = at(pack());
  for (let i = 0; i < 4; i++) {
    s = wait({ ...s, hero: { x: 6, y: 7 }, enemies: pack(), line: null });
    said.push(shown(s).text);
  }
  assert.deepEqual(said, [...LINES.ratPack.texts, LINES.ratPack.texts[0]]);
});

test('a pack already coming says nothing more', () => {
  const n = wait(wait(at(pack())));
  assert.equal(n.told.ratPack, 1);
});

test('a lone rat, or the last of a pack, stays silent', () => {
  const lone = wait(at([{ id: 'rat', x: 3, y: 7 }]));
  assert.ok(lone.enemies[0].chasing);
  assert.notEqual(lone.line?.id, 'ratPack');
  const last = wait(at([{ id: 'rat', x: 3, y: 7, pack: 1 }]));
  assert.notEqual(last.line?.id, 'ratPack');
});

test('a bite on the turn the pack notices keeps its own line', () => {
  const n = wait(at([{ id: 'rat', x: 6, y: 6, pack: 1 }, { id: 'rat', x: 2, y: 2, pack: 1 }], false));
  assert.equal(n.line.id, 'ratBite');
  assert.ok(n.enemies.every((e) => e.chasing));
});
