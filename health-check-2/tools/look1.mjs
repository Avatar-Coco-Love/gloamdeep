import { serve, open, shot, keys, said, readProfiles, OUT, slotTap, nameTap, lookTap, find, tap } from './h.mjs';
const s = await serve();
for (const kind of ['phone', 'pc']) {
  const { browser, page, errors } = await open(s.url, kind);
  const o = (n) => `${OUT}look1-${kind}-${n}.png`;
  await shot(page, o('0slots'));
  await slotTap(page, 1); // empty slot 2 -> name pad
  console.log(kind, 'after slot:', (await said(page)).slice(0, 80));
  await shot(page, o('1name'));
  const m = await find(page, 'render/namepad.js', 'nameCardAt', { key: 0 }, [false]);
  console.log(kind, 'key A size', m.w.toFixed(0), m.h.toFixed(0), 'view', JSON.stringify(m.view), 'k', m.k);
  for (const ch of 'ABCDEFGHIJKLMN') await nameTap(page, ch);
  console.log(kind, 'typed 14:', await said(page));
  await shot(page, o('2name12'));
  for (let i = 0; i < 9; i++) await nameTap(page, 'del');
  await nameTap(page, 'space'); await nameTap(page, 'space');
  await nameTap(page, 'digits'); await shot(page, o('3digits'));
  for (const ch of '12') await nameTap(page, ch, true);
  await nameTap(page, 'space', true);
  console.log(kind, 'entry:', JSON.stringify(await said(page)));
  await nameTap(page, 'ok', true);
  console.log(kind, 'look:', await said(page));
  await shot(page, o('4look'));
  for (const tab of ['cloak', 'eyes', 'trim', 'clothes', 'lamp', 'head']) {
    const p = await lookTap(page, 'cloak', tab, 0, true);
    console.log(kind, 'tab', tab, 'size', p.w.toFixed(0), p.h.toFixed(0), '|', (await said(page)).slice(0, 120));
    await shot(page, o('5tab-' + tab));
  }
  await browser.close();
  console.log(kind, 'errors', errors);
}
s.close();
