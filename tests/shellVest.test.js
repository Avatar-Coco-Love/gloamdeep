// § shell vest: the bench's two tabs, BUILD and GEAR (D-800), and the Shell Vest, the Crab Shell's
// first use (D-799, D-801): made on GEAR, worn as armour, a bite or strike of 2 or more hurting 1
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt } from '../src/core/turn.js';
import { enemiesAct } from '../src/core/creatureturn.js';
import { stingTurn } from '../src/core/sting.js';
import { BENCH_TABS, BENCH_MAKES, benchMakes, benchTabOf, stationMakes } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { wear, bluntOf, blunted } from '../src/core/worn.js';
import { benchAt } from '../src/render/benchpanel.js';
import { cardAt } from '../src/render/bag.js';
import { tabAt } from '../src/render/bagtabs.js';

const start = (bag) => ({ ...makeState(makeRoom(FIRST_ROOM)), bag });
const SHELL = { armour: ['shellVest'] };

test('the bench has two tabs, BUILD and GEAR, each one of its makes in one tab only (D-800)', () => {
  assert.deepEqual(BENCH_TABS.map((t) => t.text), ['BUILD', 'GEAR']);
  assert.deepEqual(benchTabOf('gear').makes, ['copperWick', 'ratVest', 'shellVest', 'wispCharm', 'heartCharm', 'centipedeCharm', 'echoCharm']);
  assert.equal(new Set(BENCH_MAKES).size, BENCH_MAKES.length);
  assert.equal(benchTabOf('nonsense').id, 'build');
  const bench = get('bench');
  assert.deepEqual(stationMakes(bench, [], 6).map((m) => m.item), ['chest', 'pick', 'bed', 'pouch', 'gardenBed', 'rod', 'shelf', 'furBedroll', 'boneHook']);
  assert.equal(stationMakes(bench, [], 6, [], new Set(), 'gear')[2].item, 'shellVest');
});

test('a tap on BUILD or GEAR turns the tab; elsewhere in the title row is nothing (D-800)', () => {
  const vw = 360, vh = 176, card = cardAt(vw, vh), tabs = BENCH_TABS;
  assert.deepEqual(benchAt(card.x + 14, card.y + 9, vw, vh, true), { tab: 'build' });
  assert.equal(tabAt(card, card.x + 64, card.y + 9, tabs), 'gear');
  assert.equal(tabAt(card, card.x + 200, card.y + 9, tabs), null);
  assert.equal(benchAt(card.x + 14, card.y + 9, vw, vh), null, 'untabbed, the title is nothing');
});

test('the Shell Vest is the GEAR tab\'s third slot: 4 Crab Shell and 1 Wood; Make takes it, a turn', () => {
  assert.equal(get('shellVest').name, 'Shell Vest');
  const gear = (bag) => benchMakes(bag, 6, [], benchTabOf('gear').makes)[2];
  assert.deepEqual(gear([{ id: 'crabShell', n: 4 }, { id: 'wood', n: 1 }]), { item: 'shellVest', cost: [{ id: 'crabShell', n: 4, have: 4 }, { id: 'wood', n: 1, have: 1 }], dim: false });
  assert.equal(gear([{ id: 'crabShell', n: 3 }, { id: 'wood', n: 1 }]).dim, true);
  const s = start([{ id: 'crabShell', n: 5 }, { id: 'wood', n: 1 }]), made = makeAt(s, 'shellVest');
  assert.deepEqual(made.bag, [{ id: 'crabShell', n: 1 }, { id: 'shellVest', n: 1 }]);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a shell vest.');
  assert.equal(shownLine(makeAt(start([{ id: 'crabShell', n: 3 }]), 'shellVest')).text, 'You need 4 Crab Shell and 1 Wood.');
});

test('Wear puts it on in the Rat Hide Vest\'s place, the vest back in the bag, free', () => {
  const s = { ...start([{ id: 'shellVest', n: 1 }]), worn: { armour: ['ratVest'] } };
  const n = wear(s, 0);
  assert.deepEqual(n.worn, SHELL);
  assert.deepEqual(n.bag, [{ id: 'ratVest', n: 1 }]);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'You put on the shell vest.');
  assert.equal(bluntOf(n), 1);
  assert.equal(bluntOf(s), 0);
});

test('worn, a blow of 2 or more hurts 1 less, never below 1; a blow of 1 is the same', () => {
  const s = { ...start([]), worn: SHELL };
  assert.deepEqual([1, 2, 3].map((n) => blunted(s, n)), [1, 1, 2]);
  assert.deepEqual([1, 2, 3].map((n) => blunted(start([]), n)), [1, 2, 3]);
});

test('worn, the rim lurker\'s bite hurts 1, not 2; a rat\'s still 1', () => {
  const s = start([]), { x, y } = s.hero, bite = (state, id) => enemiesAct({ ...state, health: 5, enemies: [{ id, x: x + 1, y, health: 3 }] }).health;
  assert.equal(bite(s, 'rimLurker'), 3);
  assert.equal(bite({ ...s, worn: SHELL }, 'rimLurker'), 4);
  assert.equal(bite({ ...s, worn: SHELL }, 'rat'), 4);
});

test('worn, the scorpion\'s strike hurts 1, not 2', () => {
  const s = start([]), { x, y } = s.hero, raised = { id: 'scorpion', x: x + 2, y, health: 1, raised: { dx: -1, dy: 0 } };
  const room = { ...s.room };
  const struck = (state) => stingTurn({ ...state, room, health: 5, enemies: [raised] }).health;
  assert.equal(struck(s), 3);
  assert.equal(struck({ ...s, worn: SHELL }), 4);
});
