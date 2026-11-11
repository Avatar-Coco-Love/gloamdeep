// § sound: the Sound switch, Off until picked, flips to On and back (D-178, D-255).
// The sounds themselves are silent until their files are in (D-773).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { soundText, nextSound, loadSettings, saveSettings, loudText, nextLoud, LOUD_KINDS, kindText, loudOf } from '../src/core/settings.js';
import { biteSound } from '../src/core/enemies.js';

test('Sound starts Off and flips to On and back', () => {
  assert.equal(soundText(undefined), 'Sound: Off');
  assert.equal(loadSettings().sound, 'off'); // no localStorage here
  assert.equal(nextSound('off'), 'on');
  assert.equal(soundText('on'), 'Sound: On');
  assert.equal(nextSound('on'), 'off');
});

// § loudness (D-822): 0% to 100% in steps of 10%, 100% until picked; a pick goes up, round
// from 100% to 0%; Left and Right stop at the ends; a kept loudness that isn't a step is dropped
test('Loudness starts at 100%, steps by 10%, and is kept', () => {
  assert.equal(loadSettings().loud, 100); // no localStorage here
  assert.equal(loudText(70), 'Loudness: 70%');
  assert.equal(nextLoud(60), 70);
  assert.equal(nextLoud(100), 0);
  assert.equal(nextLoud(0, 'left'), 0);
  assert.equal(nextLoud(50, 'left'), 40);
  assert.equal(nextLoud(100, 'right'), 100);
  assert.equal(nextLoud(90, 'right'), 100);
  const kept = {};
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    saveSettings({ ...loadSettings(), loud: 30 });
    assert.equal(loadSettings().loud, 30);
    for (const bad of [35, -10, 110, '50']) { kept['gloamdeep-settings'] = JSON.stringify({ loud: bad }); assert.equal(loadSettings().loud, 100); }
  } finally { delete globalThis.localStorage; }
});

// § kinds (D-823): Steps, Fighting, Finds and Menus under Loudness, each 100% until picked and
// kept; a kind plays at Loudness times its share; every sound the game asks for has a kind
test('the four kinds: their lines, their loudness together with Loudness, and every sound in one', async () => {
  const { kindOf, KIND_SOUND, VOICES, FILES } = await import('../src/render/sound.js');
  assert.deepEqual(LOUD_KINDS.map(({ id }) => kindText(id, 100)), ['Steps: 100%', 'Fighting: 100%', 'Finds: 100%', 'Menus: 100%']);
  for (const { id } of LOUD_KINDS) assert.equal(loadSettings()[id], 100);
  assert.equal(loudOf({ loud: 50, loudSteps: 50 }, 'steps'), 0.25);
  assert.equal(loudOf({ loud: 100, loudMenus: 0 }, 'menus'), 0);
  assert.equal(loudOf({ loud: 80 }, 'fight'), 0.8);
  for (const v of [...VOICES, ...Object.keys(FILES)]) assert.ok(kindOf(v), `${v} has a kind`);
  assert.equal(kindOf('lantern'), 'steps');
  assert.equal(kindOf('sip'), 'fight');
  assert.equal(kindOf('bells'), 'finds');
  assert.equal(kindOf('cardOpen'), 'menus');
  for (const { kind } of LOUD_KINDS) assert.equal(kindOf(KIND_SOUND[kind]), kind); // each kind is heard by its own sound
  const kept = {};
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    saveSettings({ ...loadSettings(), loudFight: 40 });
    assert.equal(loadSettings().loudFight, 40);
    kept['gloamdeep-settings'] = JSON.stringify({ loudFinds: 45 });
    assert.equal(loadSettings().loudFinds, 100);
  } finally { delete globalThis.localStorage; }
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

// § menus: a soft tick for a tap, a page flip as a card opens or closes, a low tock when
// a dim pick can't be done (D-819)
import { cardTurn } from '../src/render/sound.js';

test('The menus tick, turn a page and tock', () => {
  assert.deepEqual(FILES.tap.files, ['kenney-interface-sounds/tick_002.ogg']);
  assert.equal(FILES.tap.gain, 0.12); // half a step's peak
  assert.equal(FILES.card.as(true), 'cardOpen');
  assert.equal(FILES.card.as(false), 'cardClose');
  assert.ok(FILES.cardOpen.files[0].endsWith('bookFlip3.ogg') && FILES.cardClose.files[0].endsWith('bookFlip2.ogg'));
  assert.ok(FILES.refuse.files[0].includes('impactWood_light') && FILES.refuse.pitchOf() === 0.75);
});

test("The bag's sounds: a cloth pat, a knife drawn, a wooden knock (D-820)", () => {
  assert.equal(FILES.pat.files.length, 4);
  assert.ok(FILES.pat.files.every((f) => /kenney-rpg-audio\/cloth[1-4]\.ogg/.test(f)));
  assert.deepEqual(FILES.draw.files, ['kenney-rpg-audio/drawKnife3.ogg']);
  assert.equal(FILES.thunk.files.length, 5);
  assert.ok(FILES.thunk.files.every((f) => f.includes('impactWood_medium')));
});

test('A card opens on top, and closes back to what is under it', () => {
  let t = cardTurn(['play'], 'paused');
  assert.deepEqual(t, { trail: ['play', 'paused'], open: true });
  t = cardTurn(t.trail, 'settings');
  assert.equal(t.open, true);
  t = cardTurn(t.trail, 'paused'); // Back
  assert.deepEqual(t, { trail: ['play', 'paused'], open: false });
  assert.deepEqual(cardTurn(t.trail, 'play'), { trail: ['play'], open: false }); // Resume
  assert.equal(cardTurn(['play', 'bag'], 'place').open, false); // the bag closes to set a tile down
  assert.equal(cardTurn(['slots'], 'title').open, false); // the slot card closes onto the title
  assert.equal(cardTurn(['title'], 'journal').open, true);
});

// § each sound On or Off (D-824): a list opened from each kind's line, only the sounds heard so far,
// each named by what happens; Off is kept, a strange kept name dropped; an Off sound stays silent
test("Each kind's list: its loudness first, then its heard sounds On or Off", async () => {
  const { SOUND_LINES, soundsOf, voiceText, toggleMuted, isMuted } = await import('../src/core/settings.js');
  const { kindOf } = await import('../src/render/sound.js');
  const { settingsMenu, kindListTab } = await import('../src/core/menu.js');
  for (const { voice, kind } of SOUND_LINES) {
    assert.equal(kindOf(voice), kind, voice); // in its own kind's list
    assert.ok(FILES[voice].files || FILES[voice].as, `${voice} is heard`);
  }
  const heard = Object.keys(FILES).filter((v) => FILES[v].files && !['cardOpen', 'cardClose'].includes(v)); // the card's two are its Page turn
  for (const v of heard) assert.ok(SOUND_LINES.some((l) => l.voice === v), `${v} has a line`); // every heard sound
  assert.deepEqual(soundsOf('steps').map((l) => l.name), ['Grass', 'Stone', 'Earth', 'Lantern']);
  assert.deepEqual(settingsMenu({ muted: ['earthStep'] }, false, null, null, 'sound', 'steps').map((l) => l.text),
    ['Steps: 100%', 'Grass: On', 'Stone: On', 'Earth: Off', 'Lantern: On', 'Version history']);
  assert.equal(settingsMenu({}, false, null, null, 'sound').find((l) => l.id === 'loudFight').value, '100% >'); // a kind's line opens its list
  assert.equal(kindListTab('fight').text, 'SOUND · FIGHTING');
  assert.equal(voiceText('refuse', true), "Can't: Off");
  const s = { muted: toggleMuted({}, 'pat') };
  assert.ok(isMuted(s, 'pat'));
  assert.deepEqual(toggleMuted(s, 'pat'), []);
  const kept = {};
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = v; } };
  try {
    saveSettings({ ...loadSettings(), muted: ['pat', 'tap'] });
    assert.deepEqual(loadSettings().muted, ['pat', 'tap']);
    kept['gloamdeep-settings'] = JSON.stringify({ muted: ['pat', 'nothing', 3] });
    assert.deepEqual(loadSettings().muted, ['pat']);
    kept['gloamdeep-settings'] = JSON.stringify({ muted: 'pat' });
    assert.deepEqual(loadSettings().muted, []);
  } finally { delete globalThis.localStorage; }
});
