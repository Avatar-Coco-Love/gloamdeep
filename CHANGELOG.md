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
- Later minor versions (`0.4`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.294 (2026-11-12)
- New: feed a campfire. A burning fire's card now shows Sit and Add wood. Add wood takes 1 Wood and a turn and brings embers back up to blazing, so you can sit by it again for the bigger gift.
- Change: the burning fire's card is now called Campfire, with Sit in place of Yes. Add wood is grey with no Wood, or when the fire is already blazing. Cold ashes are still lit with your lantern's oil.
- Decisions: D-849.

## 0.3.293 (2026-11-12)
- Change: the poisoned and stiff marks now show their time left on the square's edge too, as the draughts do. A full edge is 6 turns for poisoned and 20 for stiff.
- Change: bad marks, poisoned and stiff, now sit on a dark red square, so good and bad are easy to tell apart at a glance.
- Decisions: D-848.

## 0.3.292 (2026-11-12)
- Change: a tree no longer creaks as it falls. The last chop is followed by one heavy wooden thud half a second later, at its natural pitch.
- Change: the marks for Warmed and the draughts no longer show a number. Instead the square's edge lights up in the mark's colour and runs down like a clock from the top middle as the time goes. A full edge means that effect's longest time, so Warmed from embers starts half lit. Tap the mark to hear the exact turns left.
- Decisions: D-846, D-847. D-841 moved to the archive, word for word.
