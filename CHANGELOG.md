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

## 0.3.124 (2026-11-07)
- When an old save from before the bigger floors is brought up to date, a deep waystone you had woken stays woken, so you can still travel to it. Before, every deep waystone went back to sleep. Saves already brought up to date stay as they are.
- Decisions: D-672. D-657 moved to the archive, word for word.

## 0.3.123 (2026-11-07)
- On a tablet held sideways or a near-square PC window, the cards in play (the bag, pause menu, Journal, workbench, stash chest and peddler) are now drawn a little smaller, so everything fits on the card as it does on a phone held sideways. Before, words and boxes ran past the card's edge. Play itself keeps its size, and phones look the same as before.
- Decisions: D-671. Questions closed: Q-064. D-656 moved to the archive, word for word.

## 0.3.122 (2026-11-07)
- With a screen reader, opening the bag, the map or the pause menu while a message is showing now reads the card's own words. Before, a moment later the message took their place. A message said while the card is open is still read out.
- Decisions: D-670. D-655 moved to the archive, word for word.
