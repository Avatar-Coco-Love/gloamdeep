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

// § bite sound: a rat's bite sounds of teeth; the gloamling's of a low breath and a snap (D-259, D-833)

test("A rat's bite sounds of teeth, a gloamling's of its own", () => {
  const bite = (id) => ({ type: 'bite', id, hurt: 1 });
  assert.equal(biteSound([bite('rat')]), 'teeth');
  assert.equal(biteSound([bite('gloamling')]), 'gloam');
  assert.equal(biteSound([bite('gloamling'), bite('rat')]), 'gloam'); // the first's, whose line shows
  assert.equal(biteSound([bite('gloamling'), bite('rat'), { type: 'fall' }]), 'gloam');
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

// § digging and chests (D-825): stone clinks, and crumbles with stones tumbling as it breaks;
// a chest creaks open and knocks shut; a tree's chops are not stone
test('Digging clinks and crumbles, and a chest creaks and knocks (D-825)', async () => {
  const { get } = await import('../src/core/registry.js');
  assert.ok(['deposit', 'vein', 'rubble'].every((id) => get(id).clinks));
  assert.ok(!get('tree').clinks && !get('branch').clinks);
  assert.ok(FILES.clink.files.every((f) => /impactMining_00[0-4]\.ogg$/.test(f)) && FILES.clink.echo);
  assert.equal(FILES.crumble.pitchOf(), 0.75);
  assert.deepEqual(FILES.crumble.with.map(([v]) => v), ['patter', 'patter', 'patter']);
  assert.equal(FILES.chest.as(true), 'chestOpen');
  assert.equal(FILES.chest.as(false), 'chestClose');
  assert.deepEqual(FILES.chestOpen.files, ['kenney-rpg-audio/creak1.ogg']);
  assert.ok(FILES.chestClose.files.every((f) => /impactWood_heavy/.test(f)));
});

// § home (D-828): coins for a sale, a book on wood for the shelf, two soft earth steps for a
// seed, the bag's pat dulled for guano; each Finds, each with its own On and Off line
test('Home sounds: coins, the shelf, planting and feeding (D-828)', async () => {
  const { SOUND_LINES } = await import('../src/core/settings.js');
  const { kindOf } = await import('../src/render/sound.js');
  assert.deepEqual(FILES.coins.files, ['kenney-rpg-audio/handleCoins.ogg']);
  assert.ok(FILES.shelf.files.every((f) => /bookPlace[1-3]\.ogg$/.test(f)) && FILES.shelf.files.length === 3);
  assert.deepEqual(FILES.sow.files, FILES.earthStep.files);
  assert.equal(FILES.sow.muffle, 1400);
  assert.deepEqual(FILES.sow.with, [['sowAgain', 0.13]]);
  assert.deepEqual(FILES.feed.files, FILES.pat.files);
  assert.equal(FILES.feed.muffle, 1400);
  for (const v of ['coins', 'shelf', 'sow', 'sowAgain', 'feed']) assert.equal(kindOf(v), 'finds');
  for (const v of ['coins', 'shelf', 'sow', 'feed']) assert.ok(SOUND_LINES.some((l) => l.voice === v && l.kind === 'finds'));
});

// § the lantern and the light (D-830): the elemental pack's glugs, a fading crackle, a whoosh, a fire
// catching; each only part of its file, fading out; the oil running out is its own event
test('The lantern and the light: pour, gutter, torch and campfire (D-830)', async () => {
  const { SOUND_LINES } = await import('../src/core/settings.js');
  const { kindOf } = await import('../src/render/sound.js');
  const { makeState, wait } = await import('../src/core/turn.js');
  const { makeRoom, FIRST_ROOM } = await import('../src/core/room.js');
  const { setOil, OIL } = await import('../src/core/oil.js');
  const pack = (f) => [`morphonaut-elemental-forces/${f.split('-')[0]}/${f}.ogg`];
  assert.deepEqual(FILES.pour.files, pack('Water-027'));
  assert.deepEqual([FILES.gutter.files, FILES.gutter.len, FILES.gutter.fade, FILES.gutter.slide], [pack('Fire-017'), 1.3, 1, 0.7]);
  assert.deepEqual([FILES.torch.files, FILES.torch.from, FILES.torch.len, FILES.torch.fade], [pack('Fire-030'), 0.1, 1.2, 0.5]);
  assert.deepEqual([FILES.kindle.files, FILES.kindle.from, FILES.kindle.len, FILES.kindle.fade], [pack('Fire-021'), 0.18, 2.4, 0.9]);
  for (const v of ['pour', 'gutter', 'torch', 'kindle']) {
    assert.equal(kindOf(v), 'steps');
    assert.ok(SOUND_LINES.some((l) => l.voice === v && l.kind === 'steps'));
    assert.ok(!FILES[v].fade || FILES[v].fade <= FILES[v].len); // the fade fits in what is heard
  }
  const out = (oil) => wait(setOil(makeState(makeRoom(FIRST_ROOM)), oil)).events.some((e) => e.type === 'oilOut');
  assert.equal(out(OIL.burn), true); // the last drop burns: the lantern gutters
  assert.equal(out(0.5), false);
  assert.equal(out(0), false); // already out: no second gutter
});

// § the oil's warning (D-834): two short sputters from the empty lantern's crackle, as the flame
// is getting low, once on the way down, and again only after the oil has gone back above 20%
test('The oil runs low: two sputters with its line (D-834)', async () => {
  const { SOUND_LINES } = await import('../src/core/settings.js');
  const { kindOf } = await import('../src/render/sound.js');
  const { makeState, wait } = await import('../src/core/turn.js');
  const { makeRoom, FIRST_ROOM } = await import('../src/core/room.js');
  const { setOil, OIL } = await import('../src/core/oil.js');
  const fire = ['morphonaut-elemental-forces/Fire/Fire-017.ogg'];
  assert.deepEqual([FILES.sputter.files, FILES.sputter.from, FILES.sputter.len, FILES.sputter.fade, FILES.sputter.gain], [fire, 0.78, 0.25, 0.1, 0.24]);
  assert.deepEqual([FILES.sputter2.files, FILES.sputter2.pitchOf(), FILES.sputter2.gain, FILES.sputter.with], [fire, 0.85, 0.17, [['sputter2', 0.32]]]);
  for (const v of ['sputter', 'sputter2']) assert.equal(kindOf(v), 'steps');
  assert.ok(SOUND_LINES.some((l) => l.voice === 'sputter' && l.kind === 'steps' && l.name === 'Oil runs low'));
  const low = (oil) => wait(setOil(makeState(makeRoom(FIRST_ROOM)), oil)).events.some((e) => e.type === 'oilLow');
  assert.equal(low(0.2), true); // the step under 20%: it sputters
  assert.equal(low(0.5), false);
  assert.equal(low(0.15), false); // already under: no second sputter
  assert.ok(OIL.burn > 0);
});

// § the fight's rest (D-831): a puff of air for a stiff miss, a dull blow for a bite that hurts, a deep
// throb twice for poison's heart, three glass notes rising for a level, each under Fighting
test("The fight's rest: miss, hurt, poison and a level (D-831)", async () => {
  const { SOUND_LINES, soundsOf } = await import('../src/core/settings.js');
  const { kindOf } = await import('../src/render/sound.js');
  const punch = [0, 1, 2, 3, 4].map((n) => `kenney-impact-sounds/impactPunch_heavy_00${n}.ogg`);
  assert.deepEqual(FILES.miss.files, [12, 13, 14].map((n) => `morphonaut-elemental-forces/Wind/Wind-0${n}.ogg`));
  assert.deepEqual([FILES.hurt.files, FILES.hurt.gain, FILES.hurt.pitchOf(), FILES.hurt.muffle, FILES.hurt.after], [punch, 0.32, 0.9, 900, 0.25]);
  assert.deepEqual([FILES.poison.files, FILES.poison.pitchOf(), FILES.poison.muffle, FILES.poison.with], [punch, 0.6, 400, [['poisonAgain', 0.35]]]);
  assert.ok(FILES.poisonAgain.part && FILES.poisonAgain.pitchOf() === 0.57);
  assert.deepEqual(['rise', 'rise2', 'rise3'].map((v) => [FILES[v].files[0].split('/')[1], FILES[v].pitchOf?.() ?? 1, FILES[v].wait]),
    [['impactGlass_light_000.ogg', 1, 0.55], ['impactGlass_light_001.ogg', 1.26, 0.55], ['impactGlass_light_002.ogg', 1.5, 0.55]]); // rising, after the beaten thud
  for (const v of ['miss', 'hurt', 'poison', 'poisonAgain', 'rise', 'rise2', 'rise3']) assert.equal(kindOf(v), 'fight');
  for (const v of ['miss', 'hurt', 'poison', 'rise']) assert.ok(SOUND_LINES.some((l) => l.voice === v));
  assert.deepEqual(soundsOf('fight').map((l) => l.name).slice(0, 7), ['Lantern hit', 'Knife hit', 'Beaten', 'Stiff miss', 'Hurt', 'Poison', 'Level']);
});

// § the creatures' bites (D-832): one for each kind, a quarter second after the hero's swing, its parts too
test("The creatures' bites: one for each kind, after the swing, one line in Settings (D-832)", async () => {
  const { soundsOf } = await import('../src/core/settings.js');
  const { kindOf } = await import('../src/render/sound.js');
  const { ENEMIES } = await import('../src/core/enemies.js');
  const bites = ['teeth', 'glass', 'sting', 'hiss', 'squeak', 'snuffle', 'snap', 'rustle', 'rattle', 'sip', 'gloam', 'flutter', 'grind'];
  for (const k of Object.values(ENEMIES)) for (const v of [k.sound, k.sips].filter(Boolean)) assert.ok(bites.includes(v), `${k.id}'s ${v} is heard`);
  for (const v of bites) {
    assert.equal(FILES[v].after, 0.25, v);
    for (const [part] of FILES[v].with ?? []) assert.ok(FILES[part].part && kindOf(part) === 'fight', part);
    assert.equal(kindOf(v), 'fight');
  }
  assert.deepEqual(FILES.teeth.with, [['teeth2', 0.07]]); // a quick double nip
  assert.deepEqual(FILES.rattle.with.map(([, at]) => at), [0.05, 0.1, 0.16]); // a clatter of bones
  assert.equal(FILES.sip.files[0], 'morphonaut-elemental-forces/Water/Water-038.ogg');
  assert.deepEqual(soundsOf('fight').map((l) => l.name).slice(7), ['Bites', 'Creatures']); // one line for them all, and one for the creatures' own (D-833)
  const { BITES, isMuted } = await import('../src/core/settings.js');
  assert.deepEqual(BITES, bites);
  for (const v of bites) assert.ok(isMuted({ muted: ['bites'] }, v) && !isMuted({}, v));
  assert.ok(!isMuted({ muted: ['bites'] }, 'hurt')); // the blow has its own line
  assert.equal(FILES.bites.as(), 'teeth'); // turned On, it plays the rat's
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
  const heard = Object.keys(FILES).filter((v) => FILES[v].files && !FILES[v].part); // a part, such as the card's two, is heard in its own sound's line
  const { GROUPS } = await import('../src/core/settings.js');
  for (const v of heard) assert.ok(SOUND_LINES.some((l) => l.voice === v) || Object.values(GROUPS).some((g) => g.includes(v)), `${v} has a line`); // every heard sound, the grouped under one (D-832, D-833)
  for (const g of Object.keys(GROUPS)) assert.ok(SOUND_LINES.some((l) => l.voice === g) && FILES[g].as, `${g}'s line plays one of its own`);
  assert.deepEqual(soundsOf('steps').map((l) => l.name), ['Grass', 'Stone', 'Earth', 'Lantern', 'Flask poured', 'Oil runs low', 'Oil runs out', 'Torch lit', 'Campfire lit', 'Falling', 'New rooms']);
  assert.deepEqual(settingsMenu({ muted: ['earthStep'] }, false, null, null, 'sound', 'steps').map((l) => l.text),
    ['Steps: 100%', 'Grass: On', 'Stone: On', 'Earth: Off', 'Lantern: On', 'Flask poured: On', 'Oil runs low: On', 'Oil runs out: On', 'Torch lit: On', 'Campfire lit: On', 'Falling: On', 'New rooms: On', 'Version history']);
  assert.ok(isMuted({ muted: ['creatures'] }, 'statue') && isMuted({ muted: ['places'] }, 'shimmer') && !isMuted({ muted: ['places'] }, 'eat'));
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
