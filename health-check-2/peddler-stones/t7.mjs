import { atPeddler, show, turn, stairs, mouth, roomM } from './prep.mjs';
import { core } from '../lib.mjs';
const a = atPeddler(7); let s = { ...a.state, hero: { x: 7, y: 9 } };
for (let i = 0; i < 3; i++) { s = turn.step(s, 'left'); console.log('corner', i, s.line?.text ?? JSON.stringify(s.line), JSON.stringify(s.people)); }
s = turn.step(s, 'left'); s = turn.step(s, 'up'); console.log('step in corner, bump up (6,8) straight heap', JSON.stringify(s.line), s.hero);
s = turn.step(s, 'up'); s = turn.step(s, 'up'); console.log(JSON.stringify(s.line), JSON.stringify(s.people));
// dig another heap beside him after freed
// leave room first: go to another place
const s2 = stairs.goToDepth(s, 2); const e = turn.wait(s2);
console.log('after leaving: home room people', JSON.stringify(e.elsewhere[mouth.stoneHome(7)]?.people), 'old room', JSON.stringify(e.elsewhere[roomM.peddlerRoom(7)].people));
// Hardcore fall?
