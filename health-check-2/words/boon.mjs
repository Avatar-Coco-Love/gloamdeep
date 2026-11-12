import { core } from '../lib.mjs';
const turn = await core('turn'), stairs = await core('stairs'), mouth = await core('mouth'), boon = await core('boon'), state = await core('state');
console.log(Object.keys(stairs).join(','));
for (const seed of [4127, 77, 12345]) {
  let st = turn.newJourney(seed, 'normal');
  const sh = mouth.stoneHome(seed);
  st = { ...st, boon: 'stoutHeart' };
  console.log('seed', seed, 'start place', st.place, 'home', boon.HOME, 'stoneHome', sh);
  const room = await core('room'), hw = await core('hearthwood');
  const fresh = (p) => st.elsewhere?.[p] || stairs.freshPlace?.(p, seed);
  for (const to of [boon.HOME, sh]) {
    try { const there = fresh(to); const out = stairs.arrive(st, to, there, there.room.start ?? { x: 5, y: 5 }); console.log('  arrive', to, '-> boon', out.boon); } catch (e) { console.log('  err', to, e.message.slice(0, 100)); }
  }
}
