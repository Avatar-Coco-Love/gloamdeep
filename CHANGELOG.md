# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.3.js` (D-254, D-528).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- `0.3.x`: stage 0.3, the world (D-168), from 0.3.0, once stage 0.2's
  last steps were done (D-528).
- `0.4.0`: when the way to depth 9 opens, chapter 1 done (D-954).
- Later minor versions (`0.5`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.426 (2026-11-18)
- Card buttons are easier to tap on a phone: MAKE, STORE, TAKE, SELL, DRINK, DROP and the rest now take a tap a little above or below them, 44 px tall as they should be. On a small card, DROP sits a touch higher.
- Choosing a draught (or a heartcap or oilcap) in the bag no longer hides its "Now" picture under its look line.
- "Leap which way?" goes away as soon as you leap or let the leap go.
- On a new journey's first day, no mole comes out in the room you start in; the bunny still does, and the mole comes the next day.
- Decisions: D-986, D-987. D-981 to D-983 moved to the archive, word for word.

## 0.3.425 (2026-11-18)
- No change in play. The tests: a quick run, `npm run quick`, checks a tenth of the biggest seed sweeps while Claude works, and `npm test` still checks every seed before each handoff; two tests that broke at every save change now don't.
- New tests can share their setups (`tests/fixtures.js`), and the place beyond's tests have their own file, named for what they test.
- Scripts can now read the running game (`window.gloamdeep`), so `tools/perf.js` really reaches play: before, it timed the opening screen. Walking on the surface now reads 57 ms a frame on a slow phone, for the frame-budget step (H-73).
- Decisions: D-985.

## 0.3.424 (2026-11-18)
- No change in play. Less code to read: the game's biggest file, its 530 text lines, is split by topic into four smaller files, and the title's screens and cards moved out of the frame-drawing file; a new test stops any other code file passing 20 KB.
- The 14 small files that bring an older save up to date now sit together in their own folder and share one helper instead of 8 copies; the little tile helpers copied into 12 files live once in `tile.js`.
- Where the Lampeater is named in the code is written down for when a second boss is planned. The playbook of how we work keeps growing, ready for your next game.
- Decisions: D-983, D-984.
