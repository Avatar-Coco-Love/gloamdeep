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

## 0.3.62 (2026-11-05)
- A few faint pale motes now drift slowly in your lantern light, straight toward the floor's stairs down, even through walls, like a draft. They only show where the light falls, and stop once you have seen the stairs. None with the lantern out, or with reduced motion on.
- Decisions: D-605.

## 0.3.61 (2026-11-05)
- The boon you hold is no longer named on the panel. Its card's picture, in its colour, now shows in a small square under the panel, and the creature list moves down under it. Tap it, or put the mouse over it, to see the boon's name and what it does. No turn passes.
- A line at the bottom too long for the screen now wraps onto two rows instead of running off the edge.
- Decisions: D-604.

## 0.3.60 (2026-11-05)
- The home waystone no longer offers a boon on the step that wakes it, so you see it wake. Step off the plate and back on for your boon.
- The boon card is now three cards side by side. Each shows its kind's picture and colour at its top (an amber flame for light and oil, a red heart for hearts and fighting, a bone-white gem for finding things, violet footsteps for getting around), then its name and its line. The chosen card lifts and turns gold. Left and Right choose too.
- Decisions: D-603.
