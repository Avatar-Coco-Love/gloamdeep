// § the boss tune (Q-112, D-961): "Ludum Dare 28 08" while the Lampeater's way in is sealed, starting
// at once at full with the door, fetched ahead in the quiet; beaten, it fades and the dungeon's comes back
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { newJourney } from '../src/core/state.js';
import { bench } from '../src/core/bossbench.js';
import { quietHere, bossTuneHere } from '../src/core/beaten.js';
import { step } from '../src/core/turn.js';
import { MUSIC, kindOf, createSound } from '../src/render/sound.js';
import { settingsMenu } from '../src/core/menu.js';

test('its file, as loud to the ear as the others, at once; its own line, Lampeater, after Dungeon', () => {
  assert.equal(MUSIC.lampeater.file, 'abstraction-music-loops/Ludum Dare 28 08.ogg');
  assert.ok(existsSync(`sounds/packs/${MUSIC.lampeater.file}`));
  assert.equal(MUSIC.lampeater.gain, 0.27);
  assert.equal(MUSIC.lampeater.now, true);
  assert.equal(kindOf('lampeater'), 'music');
  assert.deepEqual(settingsMenu({ muted: ['lampeater'] }, false, null, null, 'sound', 'music').map((l) => l.text).slice(-3), ['Dungeon: On', 'Lampeater: Off', 'Version history']);
});

test('quiet before the seal, the boss tune from the seal, none once beaten', () => {
  for (const seed of [1, 4, 9]) {
    let s = bench(newJourney(seed), 'middling');
    assert.equal(quietHere(s), true);
    assert.equal(bossTuneHere(s), false);
    s = step(s, 'up');
    assert.ok(s.events.some((e) => e.type === 'seal'));
    assert.equal(bossTuneHere(s), true);
    const won = { ...s, enemies: s.enemies.filter((e) => e.id !== 'lampeater') };
    assert.equal(bossTuneHere(won), false);
    assert.equal(quietHere(won), false);
  }
});

test('fetched ahead, it starts now at full, with no quiet and no fade in', async () => {
  const started = [], set = [], got = [], node = () => ({ connect: (n) => n ?? node(), gain: { value: 1, setValueAtTime: (v, t) => set.push([v, t]), linearRampToValueAtTime: (v, t) => set.push(['ramp', v, t]), cancelScheduledValues() {} }, delayTime: {}, frequency: {} });
  const fake = { window: globalThis.window, fetch: globalThis.fetch, addEventListener: globalThis.addEventListener };
  const heard = {};
  globalThis.window = { AudioContext: class { constructor() { this.state = 'running'; this.currentTime = 5; this.destination = node(); }
    createDelay() { return node(); } createBiquadFilter() { return node(); } createGain() { return node(); }
    createBufferSource() { return { connect: (n) => n, start: (t) => started.push(t), stop() {} }; }
    decodeAudioData() { return Promise.resolve({}); } resume() {} } };
  globalThis.fetch = (u) => { got.push(u); return Promise.resolve({ arrayBuffer: () => Promise.resolve() }); };
  globalThis.addEventListener = (type, fn) => { heard[type] = fn; };
  try {
    const s = createSound(() => true);
    heard.pointerdown();
    s.music(null, 'lampeater');
    assert.ok(got.at(-1).endsWith(encodeURI(MUSIC.lampeater.file)));
    await new Promise((r) => setTimeout(r, 10));
    s.music('lampeater');
    assert.deepEqual(started, [5]);
    assert.ok(set.every((x) => x[0] !== 'ramp'));
  } finally { Object.assign(globalThis, fake); }
});
