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

## 0.3.133 (2026-11-07)
- On a tablet held upright, a card open in play is drawn a size smaller, so the bag's words fit above Drop and Wear with a 9 or 12 slot bag. Before, they ran over the buttons. Phones are unchanged.
- Decisions: D-681. D-668 moved to the archive, word for word.

## 0.3.132 (2026-11-07)
- A press of Eat, Pour, Craft or Hold in the bag, or Make at the bench, happens at once, even while the hero is still sliding or the stairs are fading. Before, it waited until the card closed.
- Decisions: D-680. D-667 moved to the archive, word for word.

## 0.3.131 (2026-11-07)
- A creature's drops, mined finds that don't fit in the bag and berries picked from the garden bed never land under a creature or a person: they go to the next open tile, or where they came from when none is left. Before, a rare drop could lie hidden under another creature.
- Decisions: D-679. D-665 and D-666 moved to the archive, word for word.
