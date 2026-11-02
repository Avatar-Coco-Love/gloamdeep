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

## 0.3.43 (2026-11-02)
- Fixed: now and then a dungeon room deep down came out as a small crypt room instead, so its openings and stairs didn't line up. Those rooms are now made properly; every other room stays exactly as it was.
- A journey saved with one of those crypt rooms has just that room made again, once. If you were in it, you stand on that floor's stairs up.
- Decisions: D-585. Questions closed: Q-078.

## 0.3.42 (2026-11-02)
- Smaller shallow floors: the caves on depths 2 to 4 are now 13 × 15 tiles and the warrens on 5 to 7 are 15 × 17, so the stairs are closer and the oil goes further. The dungeon from depth 8 stays 17 × 20. Fewer chambers and tunnels fill the smaller rooms; what lies in them stays the same, and still pools turn up a little less often.
- The peddler on depth 3 is always there: his room is made again until his ring of rubble fits.
- A journey saved before this has its caves, warrens and dungeon made again at the new sizes, once, from the same seed. If you were down there, you stand on that floor's stairs up; a bag you left there waits on them; a peddler you freed stays freed.
- Decisions: D-584. Questions raised: Q-078.

## 0.3.41 (2026-11-02)
- Plans only, nothing you see has changed: boons. Each time you set out from the home waystone, you will pick 1 of 3 random boons, small helps for light and oil, hearts and fighting, finding things or getting around, kept until you are home again. They come right after the waystones, and the list of boons is shown first.
- Decisions: D-583.
