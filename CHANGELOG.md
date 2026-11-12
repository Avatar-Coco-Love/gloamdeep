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

## 0.3.309 (2026-11-12)
- Stepping on a find with no room in your bag now always says why: "Your bag is full.", or its own line when you carry some of it, like "You can't carry more wood."
- A second workbench, chest or other one-of-a-kind piece from your lost bag, a stash chest or a stack you set down now says "You already carry a workbench." (or its own line), not "Your bag is full." when it isn't.
- Decisions: D-864.

## 0.3.308 (2026-11-12)
- The gold heart from sleeping in your bed now stays when you take a boon, when a boon ends, when you sit by a campfire and when you wake warm in your fur bedroll. Only a bite or a fall takes it.
- The Growth tree's Heart tile counts only the hearts you have grown, never a boon's: no more "Hearts 12 of 10".
- Decisions: D-863.

## 0.3.307 (2026-11-12)
- No change in play. The dev tools' four findings became a step. Both health checks' steps now go in one order, 19 steps grouped by what they share, the things most players notice first, and no new content until they are done. Five things seen with no decision to measure against became open questions, each asked at its step.
- Decisions: D-862. Questions raised: Q-098 to Q-102.
