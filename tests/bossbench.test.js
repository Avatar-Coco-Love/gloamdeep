// § boss bench: the boss test bench (D-948): just inside the arena on depth 8, the arena as it begins,
// a rough build carried; at half, the Lampeater on 6 hearts and 3 braziers lit; pressed again it
// starts over; the bot plays a fight to its end
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { get } from '../src/core/registry.js';
import { newJourney } from '../src/core/state.js';
import { bench, arenaPlace, BUILDS } from '../src/core/bossbench.js';
import { placeFor } from '../src/core/room.js';
import { step } from '../src/core/turn.js';

const boss = (s) => s.enemies.find((e) => e.id === 'lampeater');
const count = (s, id) => s.room.map.join('').split(get(id).letter).length - 1;

test('it starts just inside the arena, the Lampeater whole and the braziers cold', () => {
  const s = bench(newJourney(3), 'middling');
  assert.equal(s.place, arenaPlace(3));
  assert.deepEqual(s.hero, placeFor(s.place, 3).start);
  assert.equal(boss(s).health ?? get('lampeater').health, 12);
  assert.equal(count(s, 'brazier'), 4);
  assert.equal(count(s, 'brazierLit'), 0);
});

test('each build carries its kit, hearts full', () => {
  const lean = bench(newJourney(1), 'lean'), mid = bench(newJourney(1), 'middling'), strong = bench(newJourney(1), 'strong');
  assert.deepEqual([lean.health, mid.health, strong.health], [5, 7, 10]);
  assert.deepEqual([lean.held, mid.held, strong.held], ['knife', 'spear', 'wardenFist']);
  assert.deepEqual(mid.worn, { armour: ['ratVest'] });
  assert.deepEqual(mid.bag, [{ id: 'flask', n: 3 }, { id: 'mendingDraught', n: 1 }]);
  assert.equal(mid.oil, 1);
  assert.equal(mid.lit, true);
  assert.deepEqual(Object.keys(BUILDS), ['lean', 'middling', 'strong']);
});

test('at half it is on 6 hearts with 3 braziers lit, and owes its snuff', () => {
  const s = bench(newJourney(2), 'lean', true);
  assert.equal(boss(s).health, 6);
  assert.equal(count(s, 'brazierLit'), 3);
});

test('pressed again, in the arena, it starts over', () => {
  let s = bench(newJourney(5), 'middling', true);
  s = step(s, 'up');
  const again = bench(s, 'lean');
  assert.equal(boss(again).health ?? 12, 12);
  assert.equal(count(again, 'brazierLit'), 0);
  assert.equal(again.place, arenaPlace(5));
  assert.ok(!again.elsewhere[again.place] && !again.elsewhere.bench);
});

test('the bot plays a fight to its end, one line a fight and the sums', () => {
  const out = execFileSync('node', ['tools/bossrun.js', '2', 'middling'], { encoding: 'utf8' }).trim().split('\n');
  assert.equal(out.length, 3);
  assert.match(out[2], /^bossrun: lampeater, Middling, 2 seeds from 1: won \d\/2/);
});
