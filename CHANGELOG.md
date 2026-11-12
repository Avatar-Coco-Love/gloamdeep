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

## 0.3.299 (2026-11-12)
- New: your own campfire. A campfire you set down is yours: its card says "You laid these stones." when cold, "Your fire still glows." as embers and "Your fire burns well." blazing. Fires you find keep their own words.
- New: your cold ashes' card shows Yes, Take up and No. Take up takes a turn and puts the Campfire back in your bag whole: "You take up the stones." Carrying one already, it says "You already carry a campfire." A burning fire has to burn down first.
- Decisions: D-854.

## 0.3.298 (2026-11-12)
- Nothing changes in the game yet. Your own campfire is settled: a fire you built gets its own words ("You laid these stones.", "Your fire still glows.", "Your fire burns well."), and once cold it can be taken back into the bag. Building it is the next step.
- Decisions: D-853.

## 0.3.297 (2026-11-12)
- Nothing changes in the game. A new bug list keeps track of what you notice in play, so a new conversation finds it: the Peddler missing at home, sleeping ending a fight, a burrowed mole trapping you, and unseen rooms showing on the map by day.
- Decisions: D-852.
