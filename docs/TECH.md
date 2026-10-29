# Tech

These rules are settled (D-003). The file and folder layout was confirmed
at build plan step 7 (D-039).

## Hard rules
- Vanilla HTML, CSS and JavaScript. No frameworks, no build step. Opening
  `index.html` through any static server must work.
- No external assets: no image, audio or font files, and nothing loaded from
  a CDN. Visuals use Canvas 2D, sound uses Web Audio. One exception:
  `share.png`, the picture a shared link shows, drawn by the game's code
  through `tools/sharecard.js`, never by hand (D-425).
- Phone first, landscape only (D-377): a phone held upright is asked to turn (`src/input/upright.js`). Tap targets are at least 44 px.
  Touch, mouse and keyboard all work (Pointer Events for tap and click).
- 60 fps on a mid-range phone. Avoid allocating memory every frame. The
  style study's per-pixel lighting runs on a 176 × 208 canvas, so keep the
  native resolution small. The room's canvas fills the screen at about 11
  tiles tall (D-381), about 400 × 190 on a wide phone; the menus keep their
  own 176 × 221 canvas over it.
- `localStorage` is wrapped in try/catch, and the game works without it.
- Respect `prefers-reduced-motion`.
- No blue flash on tap (D-011). Set `-webkit-tap-highlight-color:
  transparent` on the page, and don't let taps select text on the game
  screen. Keep a visible focus outline for keyboard users. Style study 1
  still shows the flash, because it is frozen.

## Architecture
- **Built to grow (D-261).** The game may become vast. Add content as
  registry data, not special cases in the rules; keep systems talking
  through each turn's events (D-263, D-267): a rule notes what happened
  with `note()` (`src/core/events.js`) and other parts read
  `state.events`, never guess it from the state; and keep saves upgradable.
- **State is separate from drawing.** The game rules work on plain data and
  never touch the DOM. Rendering and input are thin layers on top. This is
  what lets dev tools and tests change the game safely.
- **One content registry.** Every tile, item, enemy and NPC is one data
  entry: its id, name, how it is drawn and how it behaves. Menus, the dev
  spawn tool and saves all read from the registry. The save
  (`src/core/save.js`, D-238) writes the whole state. When the state's
  shape changes, raise its `FORMAT` and add one step to `UPGRADES`, from
  the old number to the new, with a test (D-266); never edit a merged step.
  The profiles (`src/core/profile.js`, D-268) have their own `FORMAT` and
  `UPGRADES`, the same way. Nothing keeps its own
  hand-written list.
- **Seeded RNG.** All randomness comes from one seeded generator, so a
  seed reproduces a run exactly ("load seed 4127 and watch the bug happen").
  It is `src/core/rng.js`, arriving with the generated rooms (D-147,
  D-148); only the page's boot uses `Math.random`, to pick the first seed.
- **Turn rules are pure functions:** `(state, action) → new state`. That
  makes them easy to test and to undo in dev mode.

## Layout (D-039)
```
index.html          page shell and canvas
package.json        only for `npm test` (no dependencies)
src/main.js         boot, moving the hero, and the main loop
src/input/screens.js  the title, menus, map and Seed Explorer (D-235)
src/input/profilescreens.js  a new profile's name and look, Rename, Look (D-421)
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
tests/              node --test, for core/ only
tools/playtest.js   packs the game into one page for playtests (D-073);
                    not part of the game, which has no build step
tools/soundboard.js packs the game's sounds into a page of buttons (D-256)
tools/sharecard.js  draws share.png, the share card (D-425); needs Playwright
```
ES modules (`<script type="module">`). Tests use Node's built-in test
runner, with no dependencies.

## Adding content (D-363)
Content is registry data first. A new row goes in `docs/CONTENT.md`, its
word in `GLOSSARY.md`, and its numbers in `DECISIONS.md`. The dev spawn
tool, the creature list, saves and the bag read the registry by
themselves. Each kind also touches:

- **A creature:** its entry in `src/core/enemies.js` (hearts, bite, ways,
  line ids); its lines in `src/core/lines.js`; its sprite in
  `src/render/sprites.js`, added to `SPRITES` and to `FLASHES` (the hit
  flash), and to `COLOURS` with a registry `colours` count if it has colour sets (D-373); where it lives in `src/core/room.js` (like `lampmothRooms`) or
  `src/core/cave.js`; a sound, if its own, in `src/render/sound.js` (and
  the sound board). Only a new way touches `src/core/behaviours.js` and
  `src/core/creatureturn.js`, and a new way is its own step.
- **A find:** its entry in `src/core/items.js` (stack `max`, `regrow`,
  what it does); its lines in `lines.js`; its sprite in `sprites.js`;
  where it lies in `cave.js` (`finds`), `woods.js` or `room.js`.
- **A tile:** its entry in `src/core/tiles.js` with a new `letter`; its
  drawing in `src/render/tiles.js` (and `sprites.js`); where it stands in
  `cave.js`, `woods.js` or `room.js`; a `mine` tile's lines in `lines.js`.
- **Every kind:** a test, `tests/<id>.test.js`; and the counts in
  `tests/registry.test.js` and the room tests, where they change.

## Versioning in code
Once code exists, `src/core/version.js` exports `VERSION`, and it must match
the top `CHANGELOG.md` entry. Add a test that checks this. The in-game
Version history (`src/core/history.js` and its files, one per minor
version) holds every changelog line; `tests/history.test.js` checks it
word for word (D-254).

## Home screen (D-375)
`src/render/appicon.js` adds the app card (a web app manifest, built in
`src/core/install.js`) and the icons as data URLs at boot, so there are
no files. No service worker: nothing is cached, so the game loads fresh
as before. On iPhone, a home-screen web app keeps its own storage, so its
saves are apart from Safari's; Android's share Chrome's.
