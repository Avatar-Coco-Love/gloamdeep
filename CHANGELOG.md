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

## 0.3.67 (2026-11-06)
- Fishing is easier to follow: with the line out, bump the water again to wait a turn. The float stays where it is, so keep bumping until something bites, then bump once more to pull.
- While a line is out, the flask button beside the lantern reads WAIT, and PULL in amber when a fish bites. A tap does the same as bumping the water. The flask comes back once the line is in.
- Planned next for fishing: a nibble turn before each bite, with a plop and a splash, then a short timed strike when a fish bites, played with the world paused.
- Decisions: D-612. D-579 and D-587 moved to the archive, word for word.

## 0.3.66 (2026-11-06)
- The Pond Minnow's first use: choose it in the bag and press POUR, like a flask. It takes a turn and gives the lantern 15% of a tank, never past full.
- Only by hand: the flask button and "Flasks: By itself" still pour only flasks, Deep Pour makes only flasks pour more, and Records' "Flasks poured" counts only flasks.
- Decisions: D-611. D-588 moved to the archive, word for word.

## 0.3.65 (2026-11-06)
- Fishing at the pond at home: with the Wooden Rod held, bump the water to cast, a turn. A small red-and-white float lands on that tile and bobs gently.
- Each turn the line waits, a fish bites about 1 time in 6: a "!" over the float, which dips, and "Something bites!". Bump the water again on your next turn to catch a Pond Minnow, a small silver fish, into the bag in stacks of 20. Too slow, and it gets away, the float still waiting.
- Walking off, or holding another tool, reels the line in. With the bag full, the minnow slips away. Cave pools still say "Fishing comes soon."
- Decisions: D-610. D-607 moved to the archive, word for word.
