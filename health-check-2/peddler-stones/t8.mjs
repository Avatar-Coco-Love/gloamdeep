import { atHome, show, turn, stairs, mouth, roomM, nearHomeStone } from './prep.mjs';
import { core } from '../lib.mjs';
const hw = await core('homeward'), rs = await core('resettle');
// 1) old save: Peddler at home in 'woods', hero standing in the stone's room on the spot he'd take
let s = nearHomeStone(1, 3); // 3 south of plate = (8,11), the tile he takes
s = { ...s, elsewhere: { ...s.elsewhere, woods: { ...s.elsewhere.woods, people: [{ id: 'peddler', x: 5, y: 5, home: true, greeted: true }] } } };
const r = rs.resettle(s);
console.log('hero', r.hero, 'people here', JSON.stringify(r.people));
// 2) a creature or a light on the spot when he goes home
let t = nearHomeStone(1, 6);
t = { ...t, enemies: [{ id: 'rat', x: 8, y: 11, health: 2 }], lights: [...t.lights] };
console.log('with creature on spot ->', JSON.stringify(hw.goHome(t, 'peddler').people));
const lights = await core('lights'); console.log(Object.keys(lights).slice(0, 20).join(','));
