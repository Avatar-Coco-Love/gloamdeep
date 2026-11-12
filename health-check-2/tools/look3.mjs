import { serve, open, openAt, shot, keys, said, readProfiles, OUT, slotTap, nameTap, lookTap, find, tap, core, inject } from './h.mjs';
const turn = await core('turn');
const s = await serve();
const P = async (page, i = 0) => { const p = (await readProfiles(page))?.profiles.slots[i]; return p ? JSON.stringify({ name: p.name, look: p.look, bought: p.bought, gift: p.gift }) : 'none'; };
{ // PC keyboard, new profile in slot 2
  const { browser, page, errors } = await open(s.url, 'pc');
  const o = (n) => `${OUT}look3-pc-${n}.png`;
  const log = async (what) => console.log('pc', what, '|', (await said(page)).slice(0, 170), '|', await P(page, 1));
  await keys(page, 'ArrowDown Enter', 150); await log('name pad');
  await page.keyboard.type('te ss  9', { delay: 60 }); await log('typed "te ss  9"');
  await page.keyboard.type('abcdefgh', { delay: 40 }); await log('typed more');
  await keys(page, 'Backspace Backspace Backspace', 80); await log('3 backspace');
  await keys(page, 'ArrowDown ArrowDown ArrowDown ArrowDown ArrowRight ArrowRight ArrowRight ArrowRight ArrowRight ArrowRight ArrowRight ArrowRight', 60);
  await shot(page, o('0name'));
  await keys(page, 'Enter', 200); await log('look');
  await keys(page, 'ArrowDown ArrowDown', 120); await log('down2 (zebra?)');
  await keys(page, 'ArrowRight', 120); await log('right (cow tried)');
  await keys(page, 'ArrowDown', 120); await log('down (stars tried)');
  await keys(page, 'ArrowDown', 120); await log('down (FREE btn)'); await shot(page, o('1freebtn'));
  await keys(page, 'Enter', 150); await log('enter: take'); await shot(page, o('2took'));
  await keys(page, 'ArrowLeft', 120); await log('left: RANDOM');
  await keys(page, 'Enter', 150); await log('roll 1'); await keys(page, 'Enter', 150); await log('roll 2'); await shot(page, o('3rolled'));
  await keys(page, 'ArrowUp', 120); await log('up from RANDOM');
  await keys(page, 'ArrowUp ArrowUp ArrowUp ArrowUp', 120); await log('up to tabs');
  await keys(page, 'ArrowRight ArrowRight ArrowRight ArrowRight ArrowRight ArrowRight', 120); await log('tabs right x6'); await shot(page, o('4headtab'));
  await keys(page, 'Escape', 200); await log('esc -> name'); await shot(page, o('5backname'));
  await keys(page, 'Enter', 200); await log('enter -> look again'); await shot(page, o('6lookagain'));
  // go OK: Down to choices... press End? walk: Down x6 reaches foot, Right to OK
  await keys(page, 'ArrowDown ArrowDown ArrowDown ArrowDown ArrowDown ArrowDown ArrowRight ArrowRight', 100); await log('on OK?');
  await keys(page, 'Enter', 400); await log('made'); await shot(page, o('7title'));
  await keys(page, 'ArrowDown ArrowDown ArrowDown ArrowDown Enter', 150); await log('profiles'); await shot(page, o('8profiles'));
  console.log('pc errors', errors); await browser.close();
}
{ // phone: new hero, no free pick taken, RANDOM, back out; then change look cancel
  const st = turn.newJourney(4127, 'gentle');
  const { browser, page, errors } = await open(s.url, 'phone', await inject(st, { profile: { look: { cloak: 'rust' } } }));
  const o = (n) => `${OUT}look3-phone-${n}.png`;
  const log = async (what, i = 1) => console.log('phone', what, '|', (await said(page)).slice(0, 170), '|', await P(page, i));
  await slotTap(page, 1); await nameTap(page, 'A'); await nameTap(page, 'ok');
  await lookTap(page, 'cloak', 'random'); await log('roll'); await lookTap(page, 'cloak', 'random'); await log('roll'); await shot(page, o('0rolled'));
  await lookTap(page, 'cloak', 'tiger'); await log('try tiger');
  await tapOnClose(page, 'cloak'); await log('cross -> name'); await shot(page, o('1name'));
  await tapOn2(page, 'render/namepad.js', 'nameCardAt', 'close', [false]); await log('cross -> slots'); await shot(page, o('2slots'));
  // change look on slot 0, pick moss, cross
  await slotTap(page, 'look'); await slotTap(page, 0, 'look');
  await lookTap(page, 'cloak', 'moss'); await log('picked moss', 0);
  await tapOnClose(page, 'cloak'); await log('cross', 0); await shot(page, o('3slots-after-cancel'));
  // again, try tiger then tap outside? then OK with locked tried
  await slotTap(page, 'look'); await slotTap(page, 0, 'look');
  await lookTap(page, 'cloak', 'eyes', 0, true); await lookTap(page, 'eyes', 'sky'); await lookTap(page, 'eyes', 'ok'); await log('eyes sky ok', 0);
  await shot(page, o('4slots-sky'));
  console.log('phone errors', errors); await browser.close();
}
{ // small phone 320x568: scroll
  const st = turn.newJourney(4127, 'gentle');
  for (const [w, h] of [[320, 568], [360, 640], [568, 320]]) {
    const { browser, page, errors } = await openAt(s.url, w, h, true, await inject(st, { profile: { glints: 3 } }));
    const o = (n) => `${OUT}look3-${w}x${h}-${n}.png`;
    await slotTap(page, 'look'); await slotTap(page, 0, 'look');
    const at = await page.evaluate(async () => { const c = await import('/src/render/cloak.js'), { view } = await import('/src/render/screen.js'); const a = c.boxesAt(view.w, view.h); return { view: { ...view }, shown: a.shown, s: a.s, named: a.named, bh: a.bh, bw: a.bw, z: a.stage.z, fits: a.fits }; });
    console.log(w, h, JSON.stringify(at));
    await shot(page, o('0'));
    // swipe up on the boxes
    const p = await find(page, 'render/cloak.js', 'lookCardAt', { key: 9 }, ['cloak', 0]); // 4th choice box
    await page.touchscreen.tap(p.x, p.y); await page.waitForTimeout(200);
    const cdp = await page.context().newCDPSession(page);
    const swipe = async (dy) => { await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: p.x, y: p.y }] }); for (let i = 1; i <= 6; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: p.x, y: p.y + dy * i / 6 }] }); await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await page.waitForTimeout(300); };
    await swipe(-60); await shot(page, o('1swipedup')); console.log(w, h, 'after swipe up |', (await said(page)).slice(0, 100));
    await swipe(-60); await shot(page, o('2swipedup2'));
    await swipe(60); await shot(page, o('3swipeddown'));
    console.log(w, h, 'errors', errors); await browser.close();
  }
}
s.close();
async function tapOnClose(page, tab) { const p = await find(page, 'render/cloak.js', 'lookCardAt', 'close', [tab, 0]); await tap(page, p.x, p.y); }
async function tapOn2(page, mod, fn, want, args) { const p = await find(page, mod, fn, want, args); await tap(page, p.x, p.y); }
