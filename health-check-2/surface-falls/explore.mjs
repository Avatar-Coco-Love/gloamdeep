import { core } from '../lib.mjs';
const turn = await core('turn'), lp = await core('lamppost'), camp = await core('camp'), hw = await core('hearthwood'), cf = await core('campfire'), mouth = await core('mouth');
const seed = +process.argv[2] || 4127;
const st = turn.newJourney(seed, 'normal');
console.log('seed', seed, 'start', st.place, JSON.stringify(st.hero), 'lamp', lp.lamppostRoom(seed), 'camp', camp.campRoom(seed), 'fire', JSON.stringify(cf.campfireOf(seed)), 'mouth', JSON.stringify(mouth.mouthOf(seed)), 'stoneHome', mouth.stoneHome(seed));
for (const id of hw.ROOMS) {
  if (!(hw.isMountain(id) || id === lp.lamppostRoom(seed)) && !process.argv[3]) continue;
  const p = id === st.place ? st : st.elsewhere[id];
  console.log(id, 'items', JSON.stringify(p.items), 'enemies', JSON.stringify(p.enemies), 'start', JSON.stringify(p.room.start));
  console.log(p.room.map.map((l, y) => String(y).padStart(2) + ' ' + l).join('\n'));
}
