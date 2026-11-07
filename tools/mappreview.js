// § map preview: one page that draws any seed's floor from the game's real
// generation code, for the private map preview Artifact every generation step's PR
// gets (D-646). Like the Seed Explorer (D-214): the seed shown, Reseed, Back, a typed
// seed and a depth picker; on top, the way to the stairs, creatures and finds marked, halls and large rooms tinted,
// a line of numbers, and a panel for the room tapped. Not part of the game, which has
// no build step. No dependencies.
//
//   node tools/mappreview.js out.html
//
// The page's code is tools/mappreview/page.js, packed with the game's modules by
// tools/pack.js, as the playtest is.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, packScript } from './pack.js';

const VERSION = readFileSync(join(ROOT, 'src/core/version.js'), 'utf8').match(/'([^']+)'/)[1];

// § page: one dark look, the game's own colours (ART-DIRECTION.md), system fonts only
const page = (code) => `<title>Gloamdeep Map Preview</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
/* Layout: one column, the map as wide as the screen allows, controls above, numbers and the room below */
:root {
  --bg: #0e0c16; --panel: #1a1726; --line: #2e2a40; --fg: #e8e2d4; --dim: #9a93ab;
  --ember: #f39a3b; --gold: #ffd66b; --violet: #a58ce0;
  --mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color-scheme: dark;
}
body { background: var(--bg); color: var(--fg); font-family: var(--body); line-height: 1.45;
  padding-block: 16px 32px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
main { max-width: 760px; margin: 0 auto; display: grid; gap: 14px; }
header { display: grid; gap: 2px; }
h1 { margin: 0; font: 600 1.05rem var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--ember); }
.sub { margin: 0; color: var(--dim); font-size: .85rem; }
.bar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
form { display: flex; gap: 8px; align-items: center; }
label.seed { font: 600 .8rem var(--mono); letter-spacing: .08em; color: var(--gold); }
input[type=number] { width: 7.5em; font: 600 1rem var(--mono); color: var(--gold); background: var(--panel); border: 1px solid var(--line); border-radius: 4px; padding: 6px 8px; font-variant-numeric: tabular-nums; }
button { font: 600 .82rem var(--mono); letter-spacing: .06em; color: var(--fg); background: var(--panel); border: 1px solid var(--line); border-radius: 4px; padding: 7px 10px; cursor: pointer; min-height: 36px; }
button:hover { border-color: var(--ember); }
button:disabled { opacity: .4; cursor: default; }
button[aria-pressed=true] { background: var(--ember); color: var(--bg); border-color: var(--ember); }
button.go { color: var(--bg); background: var(--gold); border-color: var(--gold); }
:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
#depths { display: flex; flex-wrap: wrap; gap: 6px; }
.marks { display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: .88rem; }
.marks label { display: flex; gap: 6px; align-items: center; cursor: pointer; }
h2 { margin: 0; font: 600 .95rem var(--mono); letter-spacing: .06em; color: var(--violet); }
.frame { background: #000; border: 1px solid var(--line); border-radius: 6px; padding: 8px; overflow: hidden; }
canvas { display: block; width: 100%; height: auto; image-rendering: pixelated; cursor: crosshair; }
ul#numbers { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; font: .8rem var(--mono); font-variant-numeric: tabular-nums; }
ul#numbers li { background: var(--panel); border: 1px solid var(--line); border-radius: 3px; padding: 3px 7px; }
#biome, .hint { margin: 0; color: var(--dim); font-size: .85rem; }
#room { background: var(--panel); border: 1px solid var(--line); border-radius: 6px; padding: 10px 12px; }
dl { margin: 0; display: grid; grid-template-columns: max-content 1fr; gap: 4px 12px; font-size: .88rem; }
dt { font: 600 .75rem var(--mono); letter-spacing: .06em; text-transform: uppercase; color: var(--dim); padding-top: 2px; }
dd { margin: 0; min-width: 0; overflow-wrap: anywhere; }
.legend { display: flex; flex-wrap: wrap; gap: 4px 14px; font-size: .8rem; color: var(--dim); margin: 0; padding: 0; list-style: none; }
.legend i { display: inline-block; width: 10px; height: 10px; margin-right: 5px; vertical-align: -1px; border: 1px solid #000; }
.legend i.box { background: transparent; border: 2px solid var(--gold); }
</style>
<main>
  <header>
    <h1>Gloamdeep map preview</h1>
    <p class="sub">Version ${VERSION}. Every floor drawn from the game's own code, all revealed. Keys: R reseed, B back, arrows change the depth.</p>
  </header>
  <div class="bar">
    <form id="seedform"><label class="seed" for="seed">SEED</label><input id="seed" type="number" min="1" max="99999" inputmode="numeric"><button type="submit">Show</button></form>
    <button id="reseed" class="go" type="button">Reseed</button>
    <button id="back" type="button">Back</button>
  </div>
  <div id="depths" role="group" aria-label="Depth"></div>
  <div class="marks">
    <label><input id="way" type="checkbox" checked> The way to the stairs</label>
    <label><input id="creatures" type="checkbox" checked> Creatures</label>
    <label><input id="finds" type="checkbox" checked> Finds</label>
    <label><input id="labels" type="checkbox" checked> Joins from the stairs up</label>
    <label><input id="shapes" type="checkbox" checked> Halls and large rooms tinted</label>
  </div>
  <h2 id="heading">Depth</h2>
  <div class="frame"><canvas id="map" aria-label="The floor's map"></canvas></div>
  <ul class="legend">
    <li><i class="box"></i>a room on the way</li><li><i style="background:#ff5a4a"></i>creature</li><li><i style="background:#f39a3b"></i>flask</li>
    <li><i style="background:#6fc06a"></i>herb</li><li><i style="background:#e0c060"></i>oilcap</li><li><i style="background:#e0607a"></i>heartcap</li>
    <li><i style="background:#d8d2c0"></i>other find</li><li><i style="background:#7fd8ff"></i>person</li><li><i style="background:#a58ce0"></i>stairs</li>
    <li><i style="background:#a6e0e4"></i>doorway</li><li><i style="background:#3f5175"></i>pool</li>
    <li><i style="background:rgba(127,216,255,.45)"></i>hall</li><li><i style="background:rgba(165,140,224,.55)"></i>large room</li>
  </ul>
  <ul id="numbers"></ul>
  <p id="biome"></p>
  <section id="room"></section>
</main>
${code}`;

const out = process.argv[2];
if (!out) {
  console.error('usage: node tools/mappreview.js out.html');
  process.exit(1);
}
const { code, modules } = packScript('tools/mappreview/page.js');
writeFileSync(out, page(code));
console.log(`map preview: ${modules} modules → ${out}`);
