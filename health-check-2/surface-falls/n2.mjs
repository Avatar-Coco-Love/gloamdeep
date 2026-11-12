import { turn, stairs } from './h.mjs';
let j = { ...turn.newJourney(4127, 'normal'), god: true };
j = stairs.goToPlace(j, 'woods:2,0'); j = { ...j, hero: { x: 2, y: 13 }, enemies: [] };
j = turn.step(j, 'left');
// walk out the bottom path: put the hero on its inner tile and step down twice
const walkOut = (s) => { s = { ...s, hero: { x: 9, y: 18 }, enemies: [] }; s = turn.step(s, 'down'); return turn.step(s, 'down'); };
const walkIn = (s) => { s = { ...s, hero: { x: 9, y: 1 }, enemies: [] }; s = turn.step(s, 'up'); return turn.step(s, 'up'); };
for (const n of [290, 294, 300, 600]) {
  let a = walkOut(j); const left = a.place;
  while (a.turn < n) a = turn.wait({ ...a, enemies: [] });
  const b = walkIn(a);
  console.log('left to', left, 'back in', b.place, 'at turn', b.turn, '(picked at 1): stones', JSON.stringify(b.items.filter((i) => i.id === 'stone').map((i) => i.x + ',' + i.y)), 'taken', JSON.stringify(b.taken));
}
