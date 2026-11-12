// node zoom.mjs in.png x y w h factor out.png
import { createRequire } from 'node:module'; import { readFileSync } from 'node:fs';
const { chromium } = createRequire('/opt/')('playwright');
const [inp, x, y, w, h, f, out] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: w * f, height: h * f } });
const data = readFileSync(inp).toString('base64');
await p.setContent(`<body style="margin:0;overflow:hidden"><img src="data:image/png;base64,${data}" style="image-rendering:pixelated;transform-origin:0 0;transform:scale(${f}) translate(${-x}px,${-y}px)"></body>`);
await p.screenshot({ path: out }); await b.close();
