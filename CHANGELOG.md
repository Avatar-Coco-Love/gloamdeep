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

## 0.3.290 (2026-11-12)
- New: sit by a campfire. Bumping a burning campfire now asks "Sit by the fire?". Yes takes a turn: a blazing fire gives 2 hearts back and embers 1, never above full, and stiffness from sleeping out goes away. The fire burns down a level as you sit, blazing to embers and embers to cold ashes, which your lantern's oil can light again.
- Notes: Yes is grey when you are at full hearts and not stiff, so a fire isn't used up for nothing.
- Decisions: D-844.

## 0.3.289 (2026-11-12)
- New: fallen branches chop too. The first bump chops like a tree, and the bump that snaps it plays one more chop, then a light wooden knock as it breaks.
- New: Settings' Stone breaks line covers a branch snapping too.
- Decisions: D-843.

## 0.3.288 (2026-11-11)
- New: chopping sounds. Each bump on a tree chops like an axe biting into wood, and the last bump fells it: one more chop, a slow low creak, then a heavy crash as it lands.
- New: Settings' Digging line covers chopping too, and Stone breaks covers a tree falling.
- Decisions: D-842.
