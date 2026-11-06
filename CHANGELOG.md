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

## 0.3.81 (2026-11-06)
- The dev panel's Oil section has an Endless oil switch. While it is on, the lantern never runs down: turns burn no oil, and an oil tick still drinks, with its line, sip and flicker, but takes none. The oil stays where it was, so a dim lantern stays dim. It stays on in this game until you switch it off; a new game starts with it off.
- Decisions: D-626.

## 0.3.80 (2026-11-06)
- The dev panel's Hero section has a God mode switch. While it is on, creatures still bite, with their line, sound and red flash, but take no hearts, so you never fall. It stays on in this game until you switch it off; a new game starts with it off.
- Decisions: D-625.

## 0.3.79 (2026-11-06)
- Spawn in the dev panel is a grid of pictures now, one for every creature, find, tile, torch and person, under its kind's heading; the picked one's name shows above them.
- A search box over the grid narrows it with each letter typed, so anything is a few taps away.
- Decisions: D-624. D-617 and D-618 moved to the archive, word for word.
