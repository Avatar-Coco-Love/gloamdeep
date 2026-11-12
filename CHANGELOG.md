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

## 0.3.304 (2026-11-12)
- No change in play. In daylight, the whole room you stand in is still remembered at once, the parts off the screen too, so a room you only stepped into shows in full on the map. That is likely what looked like unseen rooms showing; no room never entered was found on the map.
- Decisions: D-859. Questions raised: Q-097. Bugs closed: B-004.

## 0.3.303 (2026-11-12)
- A mole now notices you only within 5 steps, by day or night. Before, in daylight, a mole saw you from anywhere in the woods room. Once it is after you it keeps coming from farther, and a bite or a hit still makes it notice. Its Bestiary page says "within 5 steps".
- Decisions: D-858. Questions raised: Q-096.

## 0.3.302 (2026-11-12)
- Fixed: a burrowed mole can no longer trap you. A mole under the earth that can't come any closer, blocked by a tree, a rock or another creature, now comes up where it is, with its usual line, and chases on foot from then on, so you can hit it. Before, it could lie stuck under the earth in your way for good.
- Decisions: D-857. Bugs fixed: B-003.
