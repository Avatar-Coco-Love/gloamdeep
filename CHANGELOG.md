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

## 0.3.301 (2026-11-12)
- Fixed: you can no longer sleep a fight away. Bumping your bed at night with a creature after you now says "Not with a creature after you." and takes no turn, as sleeping out under the sky already did. A shy creature nearby, like a bunny, still doesn't stop you.
- Decisions: D-856. Bugs fixed: B-002.

## 0.3.300 (2026-11-12)
- Fixed: the Peddler is home by the waystone. Freed, he now waits in the home waystone's room, just below its middle, never on the stone itself. Before, he went to the middle room of the woods, a room away, so he seemed missing.
- In a journey saved before this, a Peddler already home moves there once, still knowing you.
- Decisions: D-855. Bugs fixed: B-001.

## 0.3.299 (2026-11-12)
- New: your own campfire. A campfire you set down is yours: its card says "You laid these stones." when cold, "Your fire still glows." as embers and "Your fire burns well." blazing. Fires you find keep their own words.
- New: your cold ashes' card shows Yes, Take up and No. Take up takes a turn and puts the Campfire back in your bag whole: "You take up the stones." Carrying one already, it says "You already carry a campfire." A burning fire has to burn down first.
- Decisions: D-854.
