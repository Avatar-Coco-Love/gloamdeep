// rules-only checks: stone regrow, dusk/dawn changeover in a mountain room
import { turn, stairs } from './h.mjs';
const ids = (s) => s.enemies.map((e) => e.id + '@' + e.x + ',' + e.y + (e.day ? ' day' : '') + (e.night ? ' night' : '')).join('; ');
let j = { ...turn.newJourney(4127, 'normal'), god: true };
j = stairs.goToPlace(j, 'woods:2,0'); j = { ...j, hero: { x: 2, y: 13 } };
j = turn.step(j, 'left'); console.log('picked: turn', j.turn, 'bag', JSON.stringify(j.bag), 'taken', JSON.stringify(j.taken), 'stones left', j.items.filter((i) => i.id === 'stone').length);
let a = stairs.goToPlace(j, 'woods:2,1');
for (let i = 0; i < 298; i++) a = turn.wait(a);
let b = stairs.goToPlace(a, 'woods:2,0'); b = turn.wait(b);
console.log('back at turn', b.turn, '(picked at 1): stones', JSON.stringify(b.items.filter((i) => i.id === 'stone')), 'taken', JSON.stringify(b.taken));
for (let i = 0; i < 6; i++) a = turn.wait(a);
b = stairs.goToPlace(a, 'woods:2,0'); b = turn.wait(b);
console.log('back at turn', b.turn, ': stones', JSON.stringify(b.items.filter((i) => i.id === 'stone')), 'taken', JSON.stringify(b.taken));
// changeover while standing in the room
let c = stairs.goToPlace({ ...turn.newJourney(4127, 'normal'), god: true }, 'woods:2,0'); c = { ...c, hero: { x: 8, y: 14 }, turn: 178 };
let last = '';
for (let i = 0; i < 420; i++) { c = turn.wait(c); const now = ids(c); if (now !== last) { console.log(' turn', c.turn, '(' + (c.turn % 300) + ')', now || '(none)', c.line?.turn === c.turn ? '| line ' + c.line.id : ''); last = now; } }
