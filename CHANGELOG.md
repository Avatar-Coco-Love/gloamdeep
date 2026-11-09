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

## 0.3.173 (2026-11-09)
- Creatures and oil flasks made with the dev tools' Spawn no longer count toward your Records or Feats. Beating a spawned creature still gives experience and drops, and it is still met in the Bestiary, but its beaten count stays. Pouring a spawned flask adds nothing to Flasks poured.
- Decisions: D-720.

## 0.3.172 (2026-11-09)
- Fixed: reaching two Feats in one turn now shows both in one note, such as "Feat reached: Beaten 10, Flasks 5. +2 Glints."
- Fixed: a Feat note no longer hides that turn's own line, such as a level-up or "The locket kept…". That line shows first, and the Feat note follows on your next move.
- Decisions: D-719.

## 0.3.171 (2026-11-09)
- Bats, lampmoths and lure wisps now fly over water, cave pools and the pond alike. Walk into one hovering over water to strike it, with the rod held or not; anything it drops lands on the nearest dry ground.
- Decisions: D-718.
