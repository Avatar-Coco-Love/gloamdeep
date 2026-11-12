import { show, roomM, turn, stairs } from './prep.mjs';
let noP = 0;
for (const seed of [2, 6, 26, 42]) { let s = stairs.goToPlace(turn.newJourney(seed, 'gentle'), roomM.peddlerRoom(seed)); console.log(seed, s.place, JSON.stringify(s.people)); console.log(show(s)); }
for (let seed = 1; seed <= 2000; seed++) { const s = stairs.goToPlace(turn.newJourney(seed, 'gentle'), roomM.peddlerRoom(seed)); if (!s.people.some((p) => p.id === 'peddler')) { noP++; if (noP < 5) console.log('none', seed); } }
console.log('no peddler in', noP, 'of 2000');
