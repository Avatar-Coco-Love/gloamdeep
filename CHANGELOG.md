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

## 0.3.36 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 5. The bed's card and the three questions that ask Yes or No (Start over?, Delete…? and the easier way to play) now have their own small files in the card table, sharing their arrows and taps.
- Decisions: D-575.

## 0.3.35 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 4. The bag's card and setting something down now have their own small files too, in the same table as the workbench, chest and peddler.
- Decisions: D-574.

## 0.3.34 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 3. The workbench, chest and peddler cards each have their own small file for their keys, taps and picks, and the game looks them up in a table, so a new card is one file.
- Decisions: D-573.
