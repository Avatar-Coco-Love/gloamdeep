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

## 0.3.168 (2026-11-09)
- The free pick is shown once now, not on every look: locked looks keep LOCK, and "1 FREE PICK" shows in gold at the top of the Look card while yours waits. Try a locked look on to see its price, or that it can be your one free pick, and press FREE to take it.
- The Carriage lamp and the Zebra pattern are now free for everyone. If you bought one, its Glints come back; if you took one as your free pick, the pick waits for you again.
- Decisions: D-715.

## 0.3.167 (2026-11-08)
- The free pick: every profile may take one locked look free. On the Look card each locked look reads FREE in gold while the pick waits; try one on and press FREE to take it. The rest go back to LOCK.
- Not taken when you make a hero? It waits for Change Look. Profiles made before this version get one too.
- Decisions: D-714.

## 0.3.166 (2026-11-08)
- The sixth teaching goal: at level 2, "Spend your ember" and "Tap here, then Growth." show under the hearts panel, ahead of any other goal waiting. Buy a heart or Tough in the Journal's Growth tab and the goal turns gold with its reward once you close the Journal.
- If you have already spent an ember on this journey, the goal is ticked quietly and pays its reward.
- Fixed: 0.3.165 stopped the game from starting (a stray bracket); a new test now checks every code file for such typos.
- Decisions: D-713.
