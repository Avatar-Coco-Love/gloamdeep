import { core } from './h.mjs';
const turn = await core('turn'), stairs = await core('stairs'), room = await core('room');
let st = stairs.goToDepth(turn.newJourney(4127, 'gentle'), Number(process.argv[2] || 3));
console.log(st.place, 'hero', st.hero, 'lit', st.lit, 'lantern', st.lantern, Object.keys(st).join(' '));
st.room.map.forEach((l, y) => console.log(String(y).padStart(2), l));
console.log('enemies', JSON.stringify(st.enemies)); console.log('items', JSON.stringify(st.items)); console.log('lights', JSON.stringify(st.lights), 'people', JSON.stringify(st.people));
console.log(Object.keys(st.room).join(' '), JSON.stringify(st.room.doors ?? st.room.ways ?? null));
const ids = new Set(); for (let y = 0; y < st.room.rows; y++) for (let x = 0; x < st.room.cols; x++) ids.add(room.tileAt(st.room, x, y).id + (room.tileAt(st.room, x, y).solid ? '(solid)' : ''));
console.log([...ids].join(' '));
