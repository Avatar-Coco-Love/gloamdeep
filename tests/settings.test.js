// § settings: the Swipe, Tap to walk, Arrow pad, Stop walking, Motion, Seed, Lantern and Stats lines (D-179, D-190, D-191, D-210, D-408, D-412)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextOnOff, swipeText, tapText, nextTap, padText, padShown, statsText, statsShown, nextStop, stopText, swipesWalk, tapsWalk, tapsStep, loadSettings, saveSettings, stillMotion, motionText, nextMotion, seedText, lanternText, nextLantern } from '../src/core/settings.js';

test('Swipe flips On and Off; Stop walking flips On sight and When noticed (D-408)', () => {
  assert.equal(nextOnOff('on'), 'off');
  assert.equal(nextOnOff('off'), 'on');
  assert.equal(swipeText('off'), 'Swipe: Off');
  assert.equal(nextStop('sight'), 'noticed');
  assert.equal(stopText('noticed'), 'Stop walking: When noticed');
  assert.equal(stopText('sight'), 'Stop walking: On sight');
});

test('the Arrow pad switch is off at first and shows the pad only when on; a kept pick comes back (D-406)', () => {
  assert.equal(padText('off'), 'Arrow pad: Off');
  assert.equal(padText('on'), 'Arrow pad: On');
  assert.ok(!padShown({}) && !padShown({ pad: 'off' }) && padShown({ pad: 'on' }));
  const kept = { 'gloamdeep-settings': '{"pad":"big"}' };
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    assert.equal(loadSettings().pad, 'off');
    saveSettings({ pad: 'on' });
    assert.equal(loadSettings().pad, 'on');
  } finally { delete globalThis.localStorage; }
});

test('Swipe off stops swipes walking; Tap is Off, Step or Walk (D-449)', () => {
  assert.ok(swipesWalk({ swipe: 'on', tap: 'walk' }) && tapsWalk({ swipe: 'on', tap: 'walk' }) && !tapsStep({ tap: 'walk' }));
  assert.ok(!swipesWalk({ swipe: 'off', tap: 'walk' }) && tapsWalk({ swipe: 'off', tap: 'walk' }));
  assert.ok(swipesWalk({ swipe: 'on', tap: 'off' }) && !tapsWalk({ swipe: 'on', tap: 'off' }) && !tapsStep({ tap: 'off' }));
  assert.ok(tapsStep({ tap: 'step' }) && !tapsWalk({ tap: 'step' }));
});

test('the Tap line goes Off, Step, Walk and round; Left goes back (D-449)', () => {
  assert.deepEqual(['off', 'step', 'walk'].map((t) => tapText(t)), ['Tap: Off', 'Tap: Step', 'Tap: Walk']);
  assert.deepEqual(['off', 'step', 'walk'].map((t) => nextTap(t)), ['step', 'walk', 'off']);
  assert.deepEqual(['off', 'step', 'walk'].map((t) => nextTap(t, true)), ['walk', 'off', 'step']);
});

test('the Stats line switch is off at first and shows the short line only when on; a kept pick comes back (D-412)', () => {
  assert.equal(statsText('off'), 'Stats line: Off');
  assert.equal(statsText('on'), 'Stats line: On');
  assert.ok(!statsShown({}) && !statsShown({ stats: 'off' }) && statsShown({ stats: 'on' }));
  const kept = { 'gloamdeep-settings': '{"stats":"big"}' };
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    assert.equal(loadSettings().stats, 'off');
    saveSettings({ stats: 'on' });
    assert.equal(loadSettings().stats, 'on');
  } finally { delete globalThis.localStorage; }
});

test('with no storage, Swipe is on, Tap on Step and the pad off; a strange value kept goes back, and it stops on sight; the old Controls pick carries over', () => {
  assert.deepEqual(loadSettings(), { swipe: 'on', tap: 'step', pad: 'off', stop: 'sight', motion: null, seed: null, lantern: 'hand', flasks: 'hand', sound: 'off', stats: 'off' }); // no localStorage here
  saveSettings({ swipe: 'off' }); // does not throw
  const kept = { 'gloamdeep-settings': '{"swipe":"fly","stop":"never"}' };
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    assert.equal(loadSettings().swipe, 'on');
    assert.equal(loadSettings().stop, 'sight');
    saveSettings({ tap: 'off', stop: 'noticed' });
    assert.equal(loadSettings().tap, 'off');
    assert.equal(loadSettings().stop, 'noticed');
    kept['gloamdeep-settings'] = '{"controls":"tap"}';
    assert.equal(loadSettings().swipe, 'off', 'Tap only was swipes off');
    kept['gloamdeep-settings'] = '{"controls":"swipe"}';
    assert.equal(loadSettings().tap, 'off', 'Swipe only was taps off');
  } finally { delete globalThis.localStorage; }
});

test('Tap to walk went off once for everyone (D-422); settings kept before Tap keep its pick, On as Walk (D-449)', () => {
  const kept = { 'gloamdeep-settings': '{"tapwalk":"on"}' };
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    assert.equal(loadSettings().tap, 'off', 'an On kept before D-422 is dropped');
    kept['gloamdeep-settings'] = '{"tapwalk":"on","taps":2}';
    assert.equal(loadSettings().tap, 'walk', 'an On kept after D-422 is Walk');
    kept['gloamdeep-settings'] = '{"tapwalk":"off","taps":2}';
    assert.equal(loadSettings().tap, 'off', 'an Off stays Off');
    kept['gloamdeep-settings'] = '{"sound":"on","taps":2}';
    assert.equal(loadSettings().tap, 'off', 'kept settings without Tap to walk were Off');
    for (const t of ['step', 'walk', 'off']) { saveSettings({ ...loadSettings(), tap: t }); assert.equal(loadSettings().tap, t); }
  } finally { delete globalThis.localStorage; }
});

test('Motion follows the device until picked; then the pick wins, either way', () => {
  assert.equal(stillMotion(null, false), false);
  assert.equal(stillMotion(null, true), true);
  assert.equal(motionText(null, true), 'Motion: Reduced');
  assert.equal(nextMotion(null, true), 'full');
  assert.equal(stillMotion('full', true), false);
  assert.equal(nextMotion(null, false), 'reduced');
  assert.equal(stillMotion('reduced', false), true);
  assert.equal(motionText('full', false), 'Motion: Full');
});

test('a kept Motion choice comes back; a strange one follows the device', () => {
  const kept = { 'gloamdeep-settings': '{"swipe":"off","motion":"wobbly"}' };
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    assert.equal(loadSettings().motion, null);
    saveSettings({ swipe: 'off', motion: 'reduced' });
    assert.deepEqual(loadSettings(), { swipe: 'off', tap: 'off', pad: 'off', stop: 'sight', motion: 'reduced', seed: null, lantern: 'hand', flasks: 'hand', sound: 'off', stats: 'off' });
  } finally { delete globalThis.localStorage; }
});

test('the Seed line reads Random or the typed seed; from the pause menu Random names this journey', () => {
  assert.equal(seedText(null), 'Seed: Random');
  assert.equal(seedText(4071), 'Seed: 4071');
  assert.equal(seedText(null, 4071), 'Seed: Random (this one 4071)');
  assert.equal(seedText(12, 4071), 'Seed: 12');
});

test('a kept seed comes back; one out of 1 to 99999 is Random', () => {
  const kept = { 'gloamdeep-settings': '{"seed":100000}' };
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    assert.equal(loadSettings().seed, null);
    saveSettings({ motion: null, seed: 4071 });
    assert.equal(loadSettings().seed, 4071);
  } finally { delete globalThis.localStorage; }
});

test('Lantern starts By hand and flips to By itself and back', () => {
  assert.equal(lanternText(undefined), 'Lantern: By hand');
  assert.equal(nextLantern('hand'), 'self');
  assert.equal(lanternText('self'), 'Lantern: By itself');
  assert.equal(nextLantern('self'), 'hand');
});
