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

## 0.3.163 (2026-11-08)
- The fourth teaching goal: once the waystone is found, "Wake the waystone" and "Step on the plate in its middle." show under the hearts panel. Step on the plate to wake it and the goal turns gold with its reward.
- If you have already woken the waystone's plate, the goal is ticked quietly and pays its reward.
- Decisions: D-710.

## 0.3.162 (2026-11-08)
- The third teaching goal: on reaching the woods, "Find the waystone" and "Old standing stones, near home." show under the hearts panel. Walk within 4 tiles of the stone and it turns gold with its reward.
- If you have already woken the waystone's plate, the goal is ticked quietly and pays its reward.
- Decisions: D-709.

## 0.3.161 (2026-11-08)
- The second teaching goal: once "Beat a rat" is done, "Go home to the woods" shows under the hearts panel. Deeper down it says "Take the stairs up to the crypt.", in the crypt "Leave by the gap in the crypt wall." Reach the woods and it turns gold with its reward, rolled as the rat's is.
- If you have already been to the woods this journey, the goal is ticked quietly and pays its reward.
- Decisions: D-708.
