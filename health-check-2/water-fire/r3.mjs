import { turn, stairs, base, core } from './mk.mjs';
const lines = await core('lines'), so = await core('sleepout'), room = await core('room'), reg = await core('registry'), fs = await core('fireside'), sl = await core('sleep');
const L = (s) => s.line ? `"${lines.LINES[s.line.id]?.text ?? (lines.LINES[s.line.id]?.texts || [])[s.line.n ?? 0] ?? s.line.id}" t${s.line.turn}` : '-';
const night = base({ hero: { x: 10, y: 8 }, turn: 180, enemies: [], health: 2, bag: [] });
console.log('canSleepOut night', so.canSleepOut(night), 'day', so.canSleepOut({ ...night, turn: 100 }), 'turn 169', so.canSleepOut({ ...night, turn: 169 }), '170', so.canSleepOut({ ...night, turn: 170 }), '299', so.canSleepOut({ ...night, turn: 299 }), '300', so.canSleepOut({ ...night, turn: 300 }));
// creatures
for (const [id, extra] of [['bunny', {}], ['bunny', { chasing: true }], ['rat', {}], ['rat', { asleep: true }], ['mole', {}], ['lureWisp', {}], ['gloamling', {}]]) {
  if (!reg.get(id)) { console.log('no creature', id); continue; }
  for (const d of [1, 3, 8]) { const s = { ...night, lit: true, oil: 1, enemies: [{ id, x: 10 + d, y: 8, health: reg.get(id).health ?? 1, ...extra }] }; process.stdout.write(`${id}${JSON.stringify(extra)} d${d}: ${so.canSleepOut(s) ? 'can' : 'no:' + so.noSleepOut(s)}  `); }
  console.log();
}
// creature in the dark (lantern off) not chasing
{ const s = { ...night, lit: false, enemies: [{ id: 'rat', x: 12, y: 8, health: 2 }] }; console.log('rat 2 away, lantern off, night:', so.canSleepOut(s)); }
// poisoned sleeper
{ const s = { ...night, poisoned: 6, health: 3, mode: 'normal' }; const w = turn.sleepOut(s); console.log('poisoned 6 sleeps out: hp', w.health, 'poisoned', w.poisoned, L(w)); const b = sl.sleep({ ...s }, 9, 8); console.log('poisoned in bed: hp', b.health, 'poisoned', b.poisoned); }
// stiff + bedroll
{ const s = { ...night, stiff: 12, bag: [{ id: 'furBedroll', n: 1 }] }; const w = turn.sleepOut(s); console.log('stiff 12 then bedroll night: stiff', w.stiff, 'hp', w.health, L(w)); }
// bedroll full health; hp 4 of 5
for (const hp of [4, 5, 6]) { const w = turn.sleepOut({ ...night, health: hp, bag: [{ id: 'furBedroll', n: 1 }] }); console.log('bedroll hp', hp, '->', w.health); }
// bedroll in chest doesn't count; laid out beside counts
{ const r = room.withTile(night.room, 9, 8, reg.get('bedroll')); const s = { ...night, room: r }; console.log('laid beside warm:', so.warm(s), 'campAsks left', so.campAsks(s, 'left'), 'day campAsks', so.campAsks({ ...s, turn: 50 }, 'left'), 'panelBeside day', JSON.stringify(turn.panelBeside({ ...s, turn: 50 }, 'left')), 'night', JSON.stringify(turn.panelBeside(s, 'left')));
  const w = turn.sleepOut(s); console.log(' slept beside: hp', w.health, 'stiff', w.stiff, L(w), 'bedroll still', w.room.map[8][9]);
  const diag = { ...night, room: room.withTile(night.room, 9, 7, reg.get('bedroll')) }; console.log(' diagonal warm:', so.warm(diag)); }
// sit while fall on same turn (poison) - warmed kept?
{ const r = room.withTile(night.room, 9, 8, reg.get('campfire')); const s = { ...night, turn: 20, room: r, health: 1, poisoned: 6, mode: 'normal' }; let w = s; for (let i = 0; i < 6 && w.fell === s.fell; i++) { w = fs.canSit(w, 9, 8) ? fs.sit(w, 9, 8) : turn.wait(w); console.log('  sit/wait', i, 'hp', w.health, 'pois', w.poisoned, 'warmed', w.warmed, 'fell changed', w.fell !== s.fell, L(w)); } }
// stiff misses rate
{ const st = await core('stiff'); let m = 0; for (let t = 0; t < 3000; t++) if (st.misses({ ...night, stiff: 5, turn: t })) m++; console.log('stiff miss rate', (m / 3000).toFixed(3)); }
// sit ends stiff; canSit only-stiff
{ const r = room.withTile(night.room, 9, 8, reg.get('campfireEmbers')); const s = { ...night, turn: 20, room: r, health: 5, stiff: 9, warmed: 60 }; console.log('canSit only stiff', fs.canSit(s, 9, 8)); const w = fs.sit(s, 9, 8); console.log(' after: stiff', w.stiff, 'warmed', w.warmed, 'tile', w.room.map[8][9]); }
// gold heart by bedroll (H-01 known) skip. Sleep-out + float
