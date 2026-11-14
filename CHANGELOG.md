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

## 0.3.353 (2026-11-14)
- The sixteenth audit. Nothing in the game changes. The pictures of the finds you carry move out of the biggest picture file into their own, and 0.3.251 to 0.3.300 of the Version history into theirs, word for word.
- Docs: two finished decisions and the playbook's newest lessons move to the archive or their own page, word for word; Waiting on the owner is shorter. A bug hunt over the code since the last audit comes next, as a list to pick from. The next audit is at 0.3.393.
- Decisions: D-910. D-897 and D-903 moved to the archive, word for word.

## 0.3.352 (2026-11-14)
- In the bag, a draught now shows its turns under its rows: its own mark from under the hearts, twice as big, "Now" over "After". The rim shows the time left, as it does at the top of the screen.
- "After" is always full, as drinking one again starts its 60 turns over. With none working, "Now" shows the mark with its rim dark.
- Like the other pictures, it's left out where it would reach the buttons.
- Decisions: D-909.

## 0.3.351 (2026-11-14)
- In the bag, a find that heals or fills the lantern now shows your hearts or oil "Now" and "After" under its rows, twice the size of the ones at the top of the screen. What it adds is pale.
- What would pass the top shows faint past the end, so a potion at nearly full hearts, or a flask in a nearly full lantern, shows what it would waste. At full hearts, all of an herb's hearts show faint.
- A boon counts: with Kind Herbs, "After" shows the extra heart. A minnow or cavefish shows hearts and oil side by side, one under the other where the card is narrow, and is left out where it would reach the buttons.
- Decisions: D-908.
