import { serve, open, shot, keys, line, readSave, inject, core, tap } from '../lib.mjs';
export { serve, open, shot, keys, line, readSave, inject, core, tap };
export const turn = await core('turn');
export const stairs = await core('stairs');
export const OUT = new URL('./out/', import.meta.url).pathname;
// base surface state, seed 4127, start room woods:2,2 with pond at 7..9,3
export function base(over = {}) { const st = turn.newJourney(4127, 'gentle'); return { ...st, ...over }; }
export async function run(kinds, state, fn, opts) {
  const s = await serve();
  for (const kind of kinds) {
    const { browser, page, errors } = await open(s.url, kind, await inject(state, opts));
    try { for (let i = 0; i < 4 && /^(Gloamdeep\.|Profiles\.)/.test(await line(page)); i++) { await keys(page, 'Enter'); await page.waitForTimeout(400); } await fn(page, kind, errors); } catch (e) { console.log(kind, 'ERR', e.message); }
    const errs = errors.filter((e) => !/willReadFrequently/.test(e)); if (errs.length) console.log(kind, 'page errors:', errs);
    await browser.close();
  }
  s.close();
}
export const sv = async (page) => (await readSave(page))?.state;
