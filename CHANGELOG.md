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

## 0.3.75 (2026-11-06)
- Waystones are smaller, 3 × 3 instead of 5 × 5, and sit on the grid: each corner stone stands in its own tile.
- They look older too: each stone a little different, with a rough top, moss and a crack, grass at its foot in the woods, and flagstones with rounded corners set into the ground.
- The home waystone now stands 2 tiles north of the woods' middle, so the middle is still at the foot of its south arm. In a saved game every waystone is made 3 × 3 where it stands, asleep or woken as it was.
- Decisions: D-620. D-610 moved to the archive, word for word.

## 0.3.74 (2026-11-06)
- The light works out its shadows only when a light moves or the room changes, not every frame: standing still, it takes about 15% less time on a slow phone. The picture is exactly the same.
- Behind the scenes: the research pages are kept in the docs, two nearly full docs are split, and five docs that no longer matched the game are fixed.
- Decisions: D-619.

## 0.3.73 (2026-11-06)
- Cave pools can be fished now: with the Wooden Rod held, bump a cave pool's water to cast, wait for the nibble and the bite, and strike in the light, just as at the pond at home.
- A cave pool's fish is the Blind Cavefish: pale and eyeless, bone and cream with a faint pink gill. Poured it gives the lantern 20% of a tank, eaten it heals 1 heart, and the peddler pays 2 coins. Its strike zone is a fifth of the bar, a little smaller than the minnow's quarter.
- "Fishing comes soon." is gone. Finds caught in pools come at a later step.
- Decisions: D-618.
