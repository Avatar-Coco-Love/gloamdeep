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

// § steps below: stone with an echo below, packed earth in the burrows, grass above (D-776)
import { stepOf } from '../src/render/sound.js';

test('The steps change with the ground', () => {
  assert.equal(stepOf(true, undefined), 'footstep');
  assert.equal(stepOf(undefined, 'crypt'), 'stoneStep');
  assert.equal(stepOf(false, 'rock'), 'stoneStep');
  assert.equal(stepOf(false, 'dungeon'), 'stoneStep');
  assert.equal(stepOf(false, 'earth'), 'earthStep');
  assert.equal(stepOf(false, undefined), 'stoneStep');
  assert.ok(FILES.stoneStep.echo && FILES.stoneStep.files[0].includes('concrete'));
  assert.equal(FILES.stoneStep.gain, 0.1);
  assert.equal(FILES.earthStep.muffle, 1400);
  assert.deepEqual(FILES.earthStep.files, FILES.footstep.files);
});

// § fighting: a muffled punch for the lantern, a knife's slice with a weapon in hand,
// and a soft heavy thud a moment after the hit when a creature is beaten (D-777)
test('The hit sounds by what is in hand, and the beaten thud comes after it', () => {
  assert.equal(FILES.hit.as(false), 'lanternHit');
  assert.equal(FILES.hit.as(true), 'knifeHit');
  assert.ok(FILES.lanternHit.files.every((f) => f.includes('impactPunch_medium')));
  assert.deepEqual(FILES.knifeHit.files, ['kenney-rpg-audio/knifeSlice.ogg', 'kenney-rpg-audio/knifeSlice2.ogg']);
  assert.ok(FILES.beaten.files.every((f) => f.includes('impactSoft_heavy')));
  for (const v of ['lanternHit', 'knifeHit', 'beaten']) assert.equal(FILES[v].gain, 0.25); // as loud as a step
  assert.equal(FILES.beaten.after, 0.12);
});
