# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.2.js` (D-254).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- Later minor versions (`0.3`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.2.207 (2026-10-30)
- Nothing in the game changes. The sixth audit: the Version history's 0.2.121 to 0.2.186 move word for word from history-0.2.js into their own file, history-0.2-3.js.
- Docs: CHANGELOG.md keeps its newest 3 entries, the rest moved to archive/CHANGELOG-STAGE-0.2-1.md; finished decisions D-491 and D-492 moved to the archive; the build plan's ticked steps 9 to 12 moved to archive/PROGRESS-LOG.md. The next audit is at 0.2.227.
- Decisions: D-493.

## 0.2.206 (2026-10-30)
- Free the peddler and he goes straight home: he stands in the woods on the surface, on the open tile nearest their middle, and turns to face you.
- Bump him there and he speaks, his home lines taking turns. No turn passes.
- Nothing you set down, and nothing that grows back, goes on his tile. Rescuing the first person is done; the audit comes next.
- Decisions: D-492.

## 0.2.205 (2026-10-30)
- Dig the rubble around the trapped peddler on depth 3 to free him. Each heap takes 3 bumps, a turn each, and no tool; he calls out as you dig, his lines taking turns.
- Clear any one heap and he is free: he thanks you and is gone from the room, heading home. The rest of the rubble stays, and you can still dig it.
- Cleared rubble gives no stone and never comes back. Rubble with no one behind it is dug the same, with its own lines.
- Decisions: D-491.
