// node sheet.mjs out.png cols scale cropX,cropY,cropW,cropH files...
import { createRequire } from 'node:module'; import { readFileSync } from 'node:fs';
const { chromium } = createRequire('/opt/')('playwright');
const [out, cols, scale, crop, ...files] = process.argv.slice(2);
const [cx, cy, cw, ch] = crop.split(',').map(Number);
const b = await chromium.launch(); const rows = Math.ceil(files.length / cols);
const W = cw * scale, H = ch * scale;
const p = await b.newPage({ viewport: { width: Math.ceil(W * cols + 4 * cols), height: Math.ceil((H + 4) * rows) } });
const html = files.map((f) => `<div style="display:inline-block;width:${W}px;height:${H}px;overflow:hidden;margin:2px"><img src="data:image/png;base64,${readFileSync(f).toString('base64')}" style="image-rendering:pixelated;transform-origin:0 0;transform:scale(${scale}) translate(${-cx}px,${-cy}px)"></div>`).join('');
await p.setContent(`<body style="margin:0;background:#f0f;font-size:0;line-height:0">${html}</body>`);
await p.screenshot({ path: out }); await b.close();
