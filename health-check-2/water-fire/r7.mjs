import { turn, stairs, base, core } from './mk.mjs';
const lines = await core('lines'), parts = await core('parts'), fishing = await core('fishing'), cf = await core('campfire'), reg = await core('registry'), room = await core('room');
const T = (s) => s.line ? (lines.LINES[s.line.id]?.text ?? (lines.LINES[s.line.id]?.texts || [])[s.line.n ?? 0] ?? s.line.id) : '-';
const b = base({ hero: { x: 10, y: 8 }, turn: 20, enemies: [] });
// hook fit
let s = { ...b, bag: [{ id: 'boneHook', n: 1 }] }; let f = parts.fit(s, 0); console.log('fit no rod:', T(f), 'turn+', f.turn - s.turn, JSON.stringify(f.parts));
s = { ...b, tool: 'rod', bag: [{ id: 'boneHook', n: 1 }] }; f = parts.fit(s, 0); console.log('fit rod held:', T(f), 'turn+', f.turn - s.turn, JSON.stringify(f.parts), JSON.stringify(f.bag));
console.log('zones', fishing.zoneWidth({ fish: 'pondMinnow' }, b), fishing.zoneWidth({ fish: 'pondMinnow' }, f), fishing.zoneWidth({ fish: 'blindCavefish' }, f));
const made = turn.makeAt({ ...f, bag: [{ id: 'ratBone', n: 3 }, { id: 'spiderSilk', n: 1 }] }, 'boneHook'); console.log('make 2nd hook while fitted:', T(made));
// rod make
let m = turn.makeAt({ ...b, bag: [{ id: 'wood', n: 2 }, { id: 'spiderSilk', n: 2 }] }, 'rod'); console.log('rod made:', T(m), 'tool', m.tool, JSON.stringify(m.bag));
m = turn.makeAt({ ...b, bag: [{ id: 'wood', n: 1 }] }, 'rod'); console.log('rod short:', T(m));
m = turn.makeAt({ ...b, bag: [{ id: 'bunnyFur', n: 3 }] }, 'furBedroll'); console.log('bedroll short:', T(m));
// set down below ground
const cave = { ...stairs.goToDepth(turn.newJourney(4128, 'gentle'), 2), hero: { x: 4, y: 7 }, enemies: [], bag: [{ id: 'mortar', n: 1 }, { id: 'bagCampfire', n: 1 }, { id: 'furBedroll', n: 1 }] };
for (const i of [0, 1, 2]) console.log('set down in cave', cave.bag[i].id, ':', T(turn.setDown(cave, i, 'right')));
// campfire spread over seeds
const rooms = {}, levels = {}; for (let seed = 1; seed <= 3000; seed++) { const c = cf.campfireOf(seed); rooms[c.room] = (rooms[c.room] || 0) + 1; levels[c.level] = (levels[c.level] || 0) + 1; } console.log(JSON.stringify(rooms), JSON.stringify(levels));
let none = 0; for (let seed = 1; seed <= 150; seed++) { const j = turn.newJourney(seed, 'normal'); const c = cf.campfireOf(seed); const p = j.place === c.room ? j : { room: j.elsewhere[c.room]?.room }; if (!p.room?.map.some((l) => /[DEa]/.test(l))) none++; } console.log('seeds of 150 with no campfire in its room:', none);
console.log('FIRE glow', JSON.stringify(reg.get('campfire').glow), JSON.stringify(reg.get('campfireEmbers').glow));
// deconstruct mortar with one carried / full bag
const h = { ...b, room: room.withTile(b.room, 9, 8, reg.get('mortarStand')) };
console.log('take down:', T(turn.takeDown({ ...h, bag: [] }, 9, 8)), '| carried:', T(turn.takeDown({ ...h, bag: [{ id: 'mortar', n: 1 }] }, 9, 8)), '| full:', T(turn.takeDown({ ...h, bag: Array.from({ length: 6 }, () => ({ id: 'stone', n: 20 })) }, 9, 8)));
// glow with empty lantern
const boon = await core('boon'); console.log('reach oil .5', boon.lanternReach({ ...b, oil: 0.5 }), 'glow', boon.lanternReach({ ...b, oil: 0.5, glow: 5 }), 'glow+wide', boon.lanternReach({ ...b, oil: 0.5, glow: 5, boon: 'wideGlow' }), 'empty', boon.lanternReach({ ...b, oil: 0, glow: 5 }));
