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

## 0.3.358 (2026-11-14)
- Fixed: with a screen reader, the Quests tab reads a goal done with no reward as "done." instead of "done, .".
- Decisions: D-915.

## 0.3.357 (2026-11-14)
- Fixed: a save the game can't read is now set aside once, not again on every load, so the copies can't fill the phone's storage. Nothing on screen changes.
- Decisions: D-914.

## 0.3.356 (2026-11-14)
- Fixed: Kind Herbs' card now says "All you eat, and potions, heal 1 heart more." Heartcaps and gloamberries always had the extra heart; the old words left them out.
- Decisions: D-913.
