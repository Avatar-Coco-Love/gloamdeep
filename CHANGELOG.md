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

## 0.3.63 (2026-11-05)
- A new creature, the oil tick, now turns up from depth 3 down: a round tick swollen with amber oil. It chases you, and beside you it drinks 5% of your lantern's oil instead of biting, about 3 turns of light, even with the lantern off. Once the lantern is empty, it bites for 1.
- As it drinks, the oil bar flickers pale, you hear a wet sip, and the line says "The oil tick drinks your oil."
- It has 2 hearts. Beaten, it may leave a Tick Shell, which the peddler buys for 1 coin, and now and then an Oil Bladder, for 5; their recipes come later.
- The plan for creatures: about 12 to 15 kinds for each biome; new ways for creatures next, light and oil ones first; then every creature's next move shown, the bestiary and trophies, packs, and creatures that vary.
- Decisions: D-606, D-607.

## 0.3.62 (2026-11-05)
- A few faint pale motes now drift slowly in your lantern light, straight toward the floor's stairs down, even through walls, like a draft. They only show where the light falls, and stop once you have seen the stairs. None with the lantern out, or with reduced motion on.
- Decisions: D-605.

## 0.3.61 (2026-11-05)
- The boon you hold is no longer named on the panel. Its card's picture, in its colour, now shows in a small square under the panel, and the creature list moves down under it. Tap it, or put the mouse over it, to see the boon's name and what it does. No turn passes.
- A line at the bottom too long for the screen now wraps onto two rows instead of running off the edge.
- Decisions: D-604.
