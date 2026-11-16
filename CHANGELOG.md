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

## 0.3.399 (2026-11-16)
- The first time on a journey the Lampeater's way in seals behind you, a short cutscene of about 3 seconds: the camera zooms in on the door as it rises out of the floor, glides up to the Lampeater, whose eyes flare as it swells, then zooms back out to you.
- Black bars slide in at the top and bottom, and the panel, map, lantern and arrow pad fade out till it ends. Taps and keys do nothing while it plays, so it can't be skipped by accident.
- Every later time, the door just rises out of the floor. With reduced motion the shots cut instead of gliding.
- Dev: the boss bench now starts you in the arena's doorway, where walking in from the hallway puts you, so your first step up seals the door, and the cutscene plays every time you use it. The bot now wins 34% of fights as Lean (26% from one step further in) and 97% as Middling.
- Decisions: D-957, D-958. Questions: Q-112's cutscene answered; the boss's name and health bar is next. D-953 and D-954 moved to the archive, word for word.

## 0.3.398 (2026-11-16)
- One step into the Lampeater's arena, past its way in, a sealed door rises behind you: "The way behind you seals." Standing in the doorway, you can still turn back.
- Coming up the hallway while the Lampeater is unbeaten, a warning: "The seal hall: once in, no way back."
- Beat it and both doors sink open; fall, and the way in is open again when you come back.
- Decisions: D-956. Questions: part of Q-112 answered. D-952 moved to the archive, word for word.

## 0.3.397 (2026-11-16)
- Beating the Lampeater now reaches a Feat of its own, Lampeater, paying 3 Glints once. It says "Feat reached: Lampeater. +3 Glints." on your next move after the door sinks.
- The Feats tab shows it on its own row below the others, with one mark that turns gold once it's beaten, and only once you have met the Lampeater. A Lampeater beaten before this counts too.
- Decisions: D-955. D-950 moved to the archive, word for word.
