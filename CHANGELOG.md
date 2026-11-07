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

## 0.3.120 (2026-11-07)
- The trapped peddler calls for help again the first time you dig at his rubble. Before, the cave walls round him counted as dug-out heaps, so in most journeys he went straight to "Keep digging!".
- Decisions: D-668.

## 0.3.119 (2026-11-07)
- Falling with the fishing line out now reels it in. Before, the float stayed on the water and fish kept biting it after you woke, even from across the room.
- Decisions: D-667.

## 0.3.118 (2026-11-07)
- After you take the Stone Pick or the Wooden Rod off, Make no longer makes a second one: it says you already carry one, and nothing is used up.
- Wearing a charm or vest that is the same as one you already wear now says "You already have …" and changes nothing, so two Heart Charms can't stretch the oil. Two different charms are still worn together.
- Decisions: D-666.
