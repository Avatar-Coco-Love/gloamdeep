// § moments (D-833): the rest's sounds, read from what changed in a turn
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { moments, carryMore } from '../src/render/moments.js';
import { FILES } from '../src/render/sound.js';

const base = { place: 'depth1', enemies: [], line: null };
const at = (after, events, before = base) => moments(before, { ...before, ...after }, events).map(([v, a]) => (a === undefined ? v : `${v}:${a}`));

test('a fall, a new floor, a room found, travel, eating, people and sleep each have their sound', () => {
  assert.deepEqual(at({}, [{ type: 'fall' }, { type: 'found' }]), ['fall']); // no room note under a fall
  assert.deepEqual(at({ place: 'depth2' }, [{ type: 'enter' }, { type: 'found' }]), ['floor']);
  assert.deepEqual(at({}, [{ type: 'enter' }, { type: 'found' }]), ['room']);
  assert.deepEqual(at({ place: 'depth3' }, [{ type: 'travel' }, { type: 'enter' }]), ['hum']);
  assert.deepEqual(at({}, [{ type: 'eat', id: 'potion' }]), ['eat:true']);
  assert.deepEqual(at({}, [{ type: 'eat', id: 'heartcap' }]), ['eat:false']);
  assert.deepEqual(at({}, [{ type: 'leave', id: 'x' }]), ['shimmer']);
  assert.deepEqual(at({}, [{ type: 'sleep' }]), ['breath']);
});

test("the creatures' own sounds: pack, waking, tail, burrows, bones, globs", () => {
  assert.deepEqual(at({ line: { id: 'ratPack', turn: 1 } }, []), ['pack']);
  assert.deepEqual(at({}, [{ type: 'wake', id: 'warden' }]), ['statue']);
  assert.deepEqual(at({}, [{ type: 'wake', id: 'herbMimic' }]), ['jolt']);
  assert.deepEqual(at({}, [{ type: 'raise' }]), ['tail']);
  const mole = { id: 'mole', x: 1, y: 1 };
  assert.deepEqual(at({ enemies: [{ ...mole, under: true }] }, [], { ...base, enemies: [mole] }), ['burrow:false']);
  assert.deepEqual(at({ enemies: [{ ...mole, dug: true }] }, [], { ...base, enemies: [{ ...mole, under: true }] }), ['burrow:true']);
  const rat = { id: 'boneRat', x: 2, y: 2 };
  assert.deepEqual(at({ enemies: [{ ...rat, pile: 3 }] }, [{ type: 'beat' }], { ...base, enemies: [rat] }), ['bonesFall']);
  assert.deepEqual(at({ enemies: [rat] }, [], { ...base, enemies: [{ ...rat, pile: 1 }] }), ['bonesStand']);
  assert.deepEqual(at({ enemies: [] }, [{ type: 'scatter' }], { ...base, enemies: [{ ...rat, pile: 1 }] }), []); // scattered: the rattle, not standing
  assert.deepEqual(at({}, [{ type: 'spit' }, { type: 'splash' }]), ['spit', 'splat']);
});

test('"You can\'t carry more" plays the Can\'t tock; every moment is a sound with files', () => {
  assert.ok(carryMore('flaskFull') && !carryMore('bagFull') && !carryMore(null));
  assert.deepEqual(at({ line: { id: 'potionFull', turn: 1 } }, []), ['refuse']);
  for (const v of ['fall', 'wake', 'floor', 'room', 'hum', 'eat', 'shimmer', 'breath', 'pack', 'statue', 'jolt', 'tail', 'burrow', 'bonesFall', 'bonesStand', 'spit', 'splat', 'tools', 'ended', 'bells', 'chime', 'plop', 'splash', 'gloam', 'flutter', 'grind']) assert.ok(FILES[v]?.files || FILES[v]?.as, v);
});

test("the warden's fists sink into the floor: a thud as it opens, once (D-937, A6)", () => {
  const w = { id: 'warden', x: 3, y: 2 };
  assert.deepEqual(at({ enemies: [{ ...w, open: true, rests: 2 }] }, [], { ...base, enemies: [w] }), ['sink']);
  assert.deepEqual(at({ enemies: [{ ...w, open: true, rests: 1 }] }, [], { ...base, enemies: [{ ...w, open: true, rests: 2 }] }), []); // still open: no second thud
  assert.deepEqual([FILES.sink.files[0].split('/')[1], FILES.sink.pitchOf()], ['impactPunch_heavy_000.ogg', 0.7]);
  assert.deepEqual(FILES.sink.with.map(([v]) => v), ['sinkRumble', 'sinkKnock']);
  assert.deepEqual([FILES.sinkRumble.files[0].split('/').pop(), FILES.sinkRumble.pitchOf()], ['Earth-021.ogg', 0.8]);
  assert.deepEqual([FILES.sinkKnock.files[0].split('/')[1], FILES.sinkKnock.pitchOf()], ['impactMining_000.ogg', 0.72]);
});

test("a blow that rings off the warden's stone clinks: light metal, once, a quarter lower than Making (D-937)", () => {
  assert.ok(FILES.ring.files.every((f) => /impactMetal_light_00[0-4]\.ogg$/.test(f)) && !FILES.ring.with);
  assert.equal(FILES.ring.pitchOf(), 0.75);
  assert.equal(FILES.tools.pitchOf, undefined); // Making's taps stay at their own pitch, two of them
});
