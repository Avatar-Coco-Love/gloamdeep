import { core } from '../lib.mjs';
const turn = await core('turn'); const cf = await core('campfire'); const stairs = await core('stairs');
const st = turn.newJourney(4127, 'gentle');
console.log(Object.keys(st).join(' '));
console.log(st.place, JSON.stringify(st.hero), st.turn, st.oil, st.lit, st.tool, JSON.stringify(st.bag));
console.log(st.room.map.join('\n'));
console.log(JSON.stringify(st.room).slice(0,300));
console.log(cf.campfireOf(4127));
console.log(Object.keys(st.elsewhere||{}));
for (const d of [2,3,4]) { const s2 = stairs.goToDepth(st, d); console.log(d, s2.place, JSON.stringify(s2.hero)); console.log(s2.room.map.join('\n')); }
