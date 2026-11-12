import { turn, stairs, base, core } from './mk.mjs';
const room = await core('room'), reg = await core('registry'), fs = await core('fireside');
const b = base({ hero: { x: 10, y: 8 }, turn: 20, health: 1, mode: 'normal', bag: [] });
const r = room.withTile(b.room, 9, 8, reg.get('campfireEmbers'));
const rat = (x, y) => ({ id: 'rat', x, y, health: 2, chasing: true });
const s = { ...b, room: r, enemies: [rat(11, 8), rat(10, 7), rat(10, 9)] };
const w = fs.sit(s, 9, 8);
console.log('sat with 3 rats beside: fell', w.fell !== s.fell, 'hp', w.health, 'warmed', w.warmed, 'place', w.place, 'line', w.line?.id);
