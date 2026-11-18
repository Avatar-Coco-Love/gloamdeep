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

## 0.3.430 (2026-11-18)
- Nothing in the game changed: the lantern's tank slot is planned as the next new step, after the Lampeater's polish or more flowers.
- Decisions: D-991.

## 0.3.429 (2026-11-18)
- Nothing in the game changed: the docs catch up with the Lampeater's fight, its 12 hearts, phases, calls, guards and wary, and the bench's half start on 6 hearts.
- The docs no longer describe the falling floor round the Lampeater's stairs, taken out before it shipped; the Boss tab, the newest content page and which sound files to ship are written down.
- Decisions: D-990. D-979, D-986 and D-987 moved to the archive, word for word.

## 0.3.428 (2026-11-18)
- A Lampeater blow that reaches a phase and burns your last oil no longer has it hang back while it breathes on a brazier; it hangs back afterwards, as it should.
- A gloamling waiting in a snuffed brazier you light again now comes out, instead of waiting there for good and counting toward the six.
- A Warden's slam that takes your last heart by a doorway no longer slides you into the next room: you fall where you were struck.
- Behind a Leap gap there is now only the cache and the Archway: creatures and other finds that stood there move to the near side, or aren't made when there's no room.
- After a dev jump, the dev stats line says "jumped: no goals or records".
- Once you've learnt Leap, How to play shows it: the Leap button (or J), then a way.
- Decisions: D-989. D-984 and D-985 moved to the archive, word for word.
