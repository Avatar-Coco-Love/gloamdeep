// § sound: the Sound switch, Off until picked, flips to On and back (D-178, D-255).
// The sounds themselves are silent until their files are in (D-773).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { soundText, nextSound, loadSettings } from '../src/core/settings.js';
import { biteSound } from '../src/core/enemies.js';

test('Sound starts Off and flips to On and back', () => {
  assert.equal(soundText(undefined), 'Sound: Off');
  assert.equal(loadSettings().sound, 'off'); // no localStorage here
  assert.equal(nextSound('off'), 'on');
  assert.equal(soundText('on'), 'Sound: On');
  assert.equal(nextSound('on'), 'off');
});

// § bite sound: a rat's bite sounds of teeth; the gloamling's is silent for now (D-259)

test("A rat's bite sounds of teeth, a gloamling's of nothing", () => {
  const bite = (id) => ({ type: 'bite', id, hurt: 1 });
  assert.equal(biteSound([bite('rat')]), 'teeth');
  assert.equal(biteSound([bite('gloamling')]), undefined);
  assert.equal(biteSound([bite('gloamling'), bite('rat')]), undefined); // the gloamling's line shows
  assert.equal(biteSound([bite('gloamling'), bite('rat'), { type: 'fall' }]), 'teeth');
  assert.equal(biteSound([{ type: 'step' }]), undefined);
});

// § lantern click: one metal click, higher for on and lower for off, as loud as a step's peak (D-775)
import { FILES } from '../src/render/sound.js';

test("The lantern's click is higher for on than for off", () => {
  const { files, gain, pitch, pitchOf } = FILES.lantern;
  assert.deepEqual(files, ['kenney-rpg-audio/metalClick.ogg']);
  assert.equal(gain, 0.5);
  assert.equal(pitch, 0); // the same each time
  assert.equal(pitchOf(true), 1.12);
  assert.equal(pitchOf(false), 0.89);
});
