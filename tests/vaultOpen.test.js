// § the door opening (L1 step 3, D-895): the last brazier lit, the sealed door sinks open for good,
// "The stone door sinks open."; left with a brazier still cold, a vault's lit braziers go cold
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { shownLine } from '../src/core/lines.js';
import { makeRoom, tileAt } from '../src/core/room.js';
import { makeState, kindle } from '../src/core/turn.js';
import { arrive } from '../src/core/stairs.js';
import { openVault, coolVault } from '../src/core/vault.js';

const MAP = ['###k###', '#.....#', '#.j.j.#', '#######'];
const at = (map = MAP) => ({ ...makeState(makeRoom(map, undefined, 'crypt'), { x: 3, y: 2 }), oil: 1 });
const away = (room) => ({ room, lights: [], enemies: [], items: [], people: [], taken: [], seen: [] });
const leave = (s) => arrive(s, 'elsewhere', away(makeRoom(['###', '#.#', '###'], undefined, 'crypt')), { x: 1, y: 1 }).elsewhere[s.place].room;

test('the Open door: walked through, light passing', () => {
  const t = get('openDoor');
  assert.equal(t.name, 'Open door'); assert.ok(!t.solid && !t.blocksLight);
});

test('one brazier lit, the door stays sealed; the second, and it sinks open, with its line', () => {
  const one = kindle(at(), 2, 2);
  assert.equal(tileAt(one.room, 3, 0).id, 'sealedDoor');
  assert.equal(shownLine(one).text, 'The brazier catches.');
  const both = kindle(one, 4, 2);
  assert.equal(tileAt(both.room, 3, 0).id, 'openDoor');
  assert.equal(shownLine(both).text, 'The stone door sinks open.');
  assert.ok(both.events.some((e) => e.type === 'open'));
  assert.equal(both.turn, one.turn + 1);
});

test('left unsolved, its lit brazier is cold again; left open, all stays lit for good', () => {
  const one = kindle(at(), 2, 2);
  assert.equal(tileAt(leave(one), 2, 2).id, 'brazier');
  const both = kindle(one, 4, 2), kept = leave(both);
  assert.equal(tileAt(kept, 3, 0).id, 'openDoor');
  assert.deepEqual([tileAt(kept, 2, 2).id, tileAt(kept, 4, 2).id], ['brazierLit', 'brazierLit']);
});

test('a room with no sealed door is never changed: a campfire, or braziers alone', () => {
  const room = makeRoom(['#####', '#l.j#', '#####'], undefined, 'crypt');
  assert.equal(openVault(room), room); assert.equal(coolVault(room), room);
});
