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

## 0.3.428 (2026-11-18)
- A Lampeater blow that reaches a phase and burns your last oil no longer has it hang back while it breathes on a brazier; it hangs back afterwards, as it should.
- A gloamling waiting in a snuffed brazier you light again now comes out, instead of waiting there for good and counting toward the six.
- A Warden's slam that takes your last heart by a doorway no longer slides you into the next room: you fall where you were struck.
- Behind a Leap gap there is now only the cache and the Archway: creatures and other finds that stood there move to the near side, or aren't made when there's no room.
- After a dev jump, the dev stats line says "jumped: no goals or records".
- Once you've learnt Leap, How to play shows it: the Leap button (or J), then a way.
- Decisions: D-989. D-984 and D-985 moved to the archive, word for word.

## 0.3.427 (2026-11-18)
- Since 0.3.424 the dark below ground was not being drawn: rooms showed fully lit, and the little marks for poison, draughts and the rest went missing. Both are back, and a new test checks every code file for names it forgets to bring in.
- The Shovel no longer digs out a stump with Wood lying on it: you walk onto it instead, so the Wood isn't lost and the tree still grows back.
- A line along the bottom of the screen that would cover your hero now sits just above them instead.
- Turning Sound On uses much less memory: each sound file is loaded once, not once for every sound that shares it.
- tools/perf.js now also times a dark room and the Lampeater's arena: walking in the dark is over the frame budget, 17 ms a frame on a slow phone (H-73).
- Decisions: D-988.

## 0.3.426 (2026-11-18)
- Card buttons are easier to tap on a phone: MAKE, STORE, TAKE, SELL, DRINK, DROP and the rest now take a tap a little above or below them, 44 px tall as they should be. On a small card, DROP sits a touch higher.
- Choosing a draught (or a heartcap or oilcap) in the bag no longer hides its "Now" picture under its look line.
- "Leap which way?" goes away as soon as you leap or let the leap go.
- On a new journey's first day, no mole comes out in the room you start in; the bunny still does, and the mole comes the next day.
- Decisions: D-986, D-987. D-981 to D-983 moved to the archive, word for word.
