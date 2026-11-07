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
- Phone first, held upright or sideways (D-505): the room shows about 11 tiles across the short side; a card on a view taller than wide (`isTall`, `render/bag.js`) stacks its sides; on a squarer screen held sideways a card in play is drawn smaller, at least 340 game pixels across (`cardZoom`, `render/screen.js`, D-671). Tap targets are at least 44 px.
  Touch, mouse and keyboard all work (Pointer Events for tap and click).
- 60 fps on a mid-range phone. Avoid allocating memory every frame. The
  style study's per-pixel lighting runs on a 176 × 208 canvas, so keep the
  native resolution small. The room's canvas fills the screen at about 11
  tiles tall (D-381), about 400 × 190 on a wide phone; the menus keep their
  own 176 × 221 canvas over it.
- **Frame budget (D-430):** 16.7 ms a frame in all, for 60 fps; the
  light at most 8 ms of it. `node tools/perf.js` times play on a simulated
  slow phone (the processor 4× slower); a PR that changes drawing runs it
  before and after and gives both. At 0.2.168: about 20 ms a frame, the
  light 16.5 ms, about 45 fps. At 0.2.171 (another day, the same machine
  slower): walking about 27 ms a frame, the light 19.5 ms, about 31 fps. At 0.3.32:
  walking 18.5 ms a frame, the light 12.1 ms, 43 fps; standing 46 fps. At
  0.3.74 (another machine, faster): standing 60 fps, about 10 ms a frame,
  the light 8.5 ms, 7.3 ms with the kept shadows (D-619); walking 59 fps,
  11 ms a frame, the light 7.5 ms either way.
- Under a card the room is drawn once and kept, drawn again only when what
  it shows changes (`render/hold.js`, D-686).
- `localStorage` is wrapped in try/catch, and the game works without it.
- Respect `prefers-reduced-motion`.
- A canvas drawn once and kept is drawn through `render/wipe.js` (`keep`, or `onWipe` to empty a cache), so it comes back after Android wipes it in the background (D-588).
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
  D-148); only `randomSeed` in `src/main.js` uses `Math.random`, for a new
  journey's seed, the Seed Explorer's Reseed and the look card's RANDOM,
  never the rules.
- **Turn rules are pure functions:** `(state, action) → new state`. That
  makes them easy to test and to undo in dev mode.

## Layout (D-039)
Moved to `TECH-2.md` word for word at 0.3.72 (D-617): where every file
lives.

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
