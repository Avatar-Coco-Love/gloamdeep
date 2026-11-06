# Tech, part 2: the layout

`TECH.md` continued, under its rules. "Layout (D-039)" moved here word for
word at 0.3.72, the ninth audit (D-617), as that page neared 8 KB.

## Layout (D-039)
```
index.html          page shell and canvas
package.json        only for `npm test` (no dependencies)
src/main.js         boot, moving the hero, and the main loop
src/slots.js        picking, making, renaming and deleting a profile (D-519)
src/input/screens.js  the title, menus, map and Seed Explorer; in play the travel, strike and boon cards (D-235)
src/input/profilescreens.js  a new profile's name and look, Rename, Look (D-421)
src/input/explorerscreens.js the Seed Explorer, the ways to play, the seed pad (D-468)
src/input/cardscreens.js  the bag, Drop, setting down, the bench, chest, bed and trade cards (D-570)
src/input/cards/    a card's keys, taps and picks, one file each, in table.js (D-573)
src/render/frame.js   draws each frame from the shared `app` (D-235)
src/core/           rules, state, rng, registry, noise (no DOM);
                    one file per content kind, gathered by registry.js (D-048)
src/core/turn.js    the turn rules' front door: the hero's step, hit, torch
                    and mining, and every other turn rule passed on from
                    state.js, endturn.js, creatureturn.js, fall.js and
                    bagturn.js (D-362)
src/render/         drawing, lighting, sprites, and sound (D-255)
src/input/          tap, mouse, keyboard
src/dev/            dev mode (see DEV-TOOLS.md)
tests/              node --test, for core/ (and input/ files that load without a page, D-570)
tools/playtest.js   packs the game into one page for playtests (D-073);
                    not part of the game, which has no build step
tools/soundboard.js packs the game's sounds into a page of buttons (D-256)
tools/sharecard.js  draws share.png, the share card (D-425); needs Playwright
tools/perf.js       times play on a simulated slow phone (D-430); Playwright
tools/release.js    the record-keeping tool: VERSION, history, archive (D-572)
```
ES modules (`<script type="module">`). Tests use Node's built-in test
runner, with no dependencies.
