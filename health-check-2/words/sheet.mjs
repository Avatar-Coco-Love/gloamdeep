// node sheet.mjs out.png cols scale file1 file2 ...
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
let pw; try { pw = require('playwright'); } catch { pw = createRequire('/opt/')('playwright'); }
const [out, cols, scale, ...files] = process.argv.slice(2);
const b = await pw.chromium.launch(); const pg = await b.newPage();
const imgs = files.map((f) => `<img src="data:image/png;base64,${readFileSync(f).toString('base64')}" style="zoom:${scale};display:block">`);
await pg.setContent(`<body style="margin:0;background:#000"><div id="g" style="display:grid;grid-template-columns:repeat(${cols},max-content);gap:4px;width:max-content">${imgs.join('')}</div></body>`);
await pg.waitForTimeout(300);
await (await pg.$('#g')).screenshot({ path: out });
await b.close();
