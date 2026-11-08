# Tech, part 2: the layout and adding content

`TECH.md` continued, under its rules. "Layout (D-039)" moved here word for
word at 0.3.72, the ninth audit (D-617), as that page neared 8 KB.
"Adding content (D-363)" followed at 0.3.152, the eleventh audit (D-699).

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
src/input/touch.js    in play: a tap, a held finger, walk on, and the mouse over a mark (D-660)
src/input/queue.js    which turns wait in line for the slide: only those taken in play (D-680)
src/render/frame.js   draws each frame from the shared `app` (D-235)
src/render/panelsize.js  the hearts and oil panel's width, for the wrench and tests (D-682)
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
tools/pack.js       the packer the playtest and the map preview share
tools/mappreview.js any seed's floors drawn from the real code, for a
                    generation step's map preview Artifact (D-646)
tools/mappreview/page.js  the map preview's page half, drawn in the browser (D-646)
tools/make.js       the maker: writes every empty piece of a new creature,
                    find, tile or person (D-621, D-622)
tools/soundboard.js packs the game's sounds into a page of buttons (D-256)
tools/sharecard.js  draws share.png, the share card (D-425); needs Playwright
tools/perf.js       times play on a simulated slow phone (D-430); Playwright
tools/release.js    the record-keeping tool: VERSION, history, archive (D-572)
```
ES modules (`<script type="module">`). Tests use Node's built-in test
runner, with no dependencies.

## Adding content (D-363)
Content is registry data first. A new row goes in `docs/CONTENT.md`, its
word in `GLOSSARY.md`, and its numbers in `DECISIONS.md`. The dev spawn
tool, the creature list, saves and the bag read the registry by
themselves. Each kind also touches:

- **A creature:** its entry in `src/core/enemies.js` (hearts, bite, ways,
  line ids, `acts` and `fights` for its Bestiary page, D-631, D-632); its lines in `src/core/lines.js`; its picture in
  `src/render/pictures.js` (D-617), its sprite in `src/render/sprites.js`, added to `SPRITES` and to `FLASHES` (the hit
  flash), and to `COLOURS` with a registry `colours` count if it has colour sets (D-373); where it lives in `src/core/room.js` (its `POOL` entry, like `{ id: 'lampmoth', from: 2 }`; a mimic through `mimicRooms`) or
  `src/core/cave.js`; a sound, if its own, in `src/render/sound.js` (and
  the sound board). Only a new way touches `src/core/behaviours.js` and
  `src/core/creatureturn.js`, and a new way is its own step.
- **A find:** its entry in `src/core/items.js` (stack `max`, `regrow`,
  what it does); its lines in `lines.js`; its picture in `pictures.js`, its sprite in `sprites.js`;
  where it lies in `cave.js` (`finds`), `woods.js` or `room.js`.
- **A tile:** its entry in `src/core/tiles.js` with a new `letter`; its
  drawing in `src/render/tiles.js` (and `sprites.js`); where it stands in
  `cave.js`, `woods.js` or `room.js`; a `mine` tile's lines in `lines.js`.
- **A person:** its entry in `src/core/people.js` (its `calls` line); its
  lines in `lines.js`; its picture in `pictures.js`, its sprite in `sprites.js`, drawn facing left; where
  it stands in `cave.js` (like `withTrapped`) or `room.js`; its row in
  `CONTENT-2.md` (D-490), or `CONTENT-3.md` for tiles, lights and places (D-618).
- **Every kind:** a test, `tests/<id>.test.js`; and the counts in
  `tests/registry.test.js` and the room tests, where they change.
  `npm test` runs the checker, `tests/checker.test.js` (D-621): it names
  any piece above still missing, and the file to fix.
- **The maker** (D-622): `node tools/make.js creature glowWorm "Glow worm"`
  (or `find`, `tile`, `person`; `--check` first to see the plan) writes
  every piece above, empty: blanks marked `/* blank */` or `// blank:`,
  the grey "?" picture, a creature `from: Infinity` (dev tools only). The
  checker then names each blank left. Fill each and drop its mark; a
  sound, a way or a place of its own is still written by hand.
