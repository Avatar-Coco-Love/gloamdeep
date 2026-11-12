import { serve, open, shot, keys, line, readSave, readProfiles } from './lib.mjs';
const s = await serve();
for (const kind of ['phone', 'pc']) {
  const { browser, page, errors } = await open(s.url, kind);
  await shot(page, `out/smoke-${kind}-1.png`);
  await keys(page, 'Enter'); await shot(page, `out/smoke-${kind}-2.png`);
  await keys(page, 'Enter'); await shot(page, `out/smoke-${kind}-3.png`);
  console.log(kind, 'line:', await line(page), 'errors:', errors.length, JSON.stringify(await readProfiles(page))?.slice(0, 200));
  await browser.close();
}
s.close();
