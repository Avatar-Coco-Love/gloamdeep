import { core, inject } from '../lib.mjs';
export async function prepared(extra = {}) {
  const turn = await core('turn'), en = await core('enemies'), xp = await core('xp');
  let st = turn.newJourney(4127, 'normal');
  st = { ...st, xp: 400, growthRows: 2, ...extra.state };
  const bestiary = {};
  let i = 0;
  for (const id of Object.keys(en.ENEMIES)) { bestiary[id] = { met: 5, beaten: extra.beaten ?? 3 }; i++; }
  const goals = { rat: { done: true, paid: 'flask' }, stone: { done: true, paid: 'herb' }, wake: { done: true, paid: 'oilcap' }, boon: { done: true, paid: 'glint' }, crypt: { done: true, paid: 'potion' }, lantern: { done: true, paid: 'flask' }, oil: { done: false }, ember: { done: false } };
  const profile = { bestiary, records: { deepest: 9, beaten: 123, falls: 4, found: 57, steps: 4321, poured: 30, torches: 12 }, played: 5000, goals, glints: 1 };
  return { st, storage: await inject(st, { profile }), level: xp.levelOf(st.xp) };
}
