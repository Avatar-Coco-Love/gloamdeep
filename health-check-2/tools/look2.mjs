import { serve, open, shot, keys, said, readProfiles, OUT, slotTap, nameTap, lookTap, find, tap, core, inject } from './h.mjs';
const turn = await core('turn');
const s = await serve();
const P = async (page) => { const p = (await readProfiles(page)).profiles.slots[0]; return JSON.stringify({ look: p.look, bought: p.bought, gift: p.gift, glints: p.glints }); };
for (const kind of ['phone', 'pc']) {
  const st = turn.newJourney(4127, 'gentle');
  const { browser, page, errors } = await open(s.url, kind, await inject(st, { profile: { glints: 7 } }));
  const o = (n) => `${OUT}look2-${kind}-${n}.png`;
  const log = async (what) => console.log(kind, what, '|', (await said(page)).slice(0, 150), '|', await P(page));
  await slotTap(page, 'look'); await shot(page, o('0picking'));
  await slotTap(page, 0, 'look');
  await log('open'); await shot(page, o('1open'));
  // try locked cow
  await lookTap(page, 'cloak', 'cow'); await log('try cow'); await shot(page, o('2trycow'));
  await lookTap(page, 'cloak', 'random'); await log('FREE cow'); await shot(page, o('3freecow'));
  await lookTap(page, 'cloak', 'camo'); await log('try camo'); await shot(page, o('4trycamo'));
  await lookTap(page, 'cloak', 'random'); await log('BUY camo'); await shot(page, o('5boughtcamo'));
  await lookTap(page, 'cloak', 'lamp', 0, true);
  await lookTap(page, 'lamp', 'dish'); await log('try dish'); await shot(page, o('6trydish'));
  await lookTap(page, 'lamp', 'random'); await log('BUY dish');
  await lookTap(page, 'lamp', 'head', 0, true);
  await lookTap(page, 'head', 'helm'); await log('try helm, 1 glint'); await shot(page, o('7tryhelm'));
  await lookTap(page, 'head', 'random'); await log('BUY helm dim'); await shot(page, o('8dim'));
  await lookTap(page, 'head', 'ok'); await log('OK while trying helm'); await shot(page, o('9afterok'));
  // enter play: tap slot 0, then title -> continue
  await slotTap(page, 0); await shot(page, o('10title'));
  await keys(page, 'Enter'); await page.waitForTimeout(500); await shot(page, o('11play'));
  await log('play');
  await browser.close();
  console.log(kind, 'errors', errors);
}
s.close();
