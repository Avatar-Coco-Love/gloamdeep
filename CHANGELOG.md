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

## 0.3.258 (2026-11-10)
- New look: the Growth tree's rows are twigs. Each row is a twig across Light, Body and Hands, its number at the left, and each upgrade a small picture tile on it, side by side: Tough now sits beside the heart, not above it. A bought tile glows, the heart shows how many you bought in its corner, and its name and words are on the right when picked, as before. The arrow keys read a row: Left and Right walk its tiles across the limbs, Up and Down change row. When there are more rows than fit, the tree scrolls by a swipe or the wheel.
- Decisions: D-812.

## 0.3.257 (2026-11-10)
- Behind the scenes: the Growth tree is getting ready to grow. Its upgrades are now one list, each with its cost, how many times it can be bought and its look, and your save keeps one record of what you bought. Nothing you see changes: your hearts, Tough and Steady Wick stay yours. Next, the tree's new look, its rows as twigs with small picture tiles side by side; then the Hands upgrade.
- Decisions: D-811.

## 0.3.256 (2026-11-10)
- New: the Mole Claw Pick, the Mole Claw's first use. The workbench's BUILD tab makes it from 1 Mole Claw, 2 Wood and 2 Stone: the Stone Pick's handle with a mole's pale claw as its head. Hold it in the Tool slot and it does all the Stone Pick does, faster: a copper vein breaks in 2 bumps, not 4, and rubble clears in 2, not 3. Your Stone Pick stays yours; swap them in the Tool slot as you would the rod.
- Mole Claw now says "A mole claw, for a mole claw pick."
- Decisions: D-810.
