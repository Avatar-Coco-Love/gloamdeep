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

## 0.3.219 (2026-11-10)
- Nothing in the game changes. A note is kept for when bosses are designed: a boss beaten by a scorpion's sting or a glob could lose its found ability, so its big rewards may need to come whatever lands the last blow.
- Decisions: none. Questions: a note added to Q-083.

## 0.3.218 (2026-11-10)
- The scorpion's sting now hits creatures too. A creature on its marked tiles takes 2 hearts, just as you would, and the line says "The sting strikes the rat." with its name. One beaten this way leaves nothing and gives no experience. A creature in front of you doesn't shield you: every marked tile is struck. Other scorpions are hit too, and one stung with its tail up strikes no more. A mole under the earth and a pile of bones are passed over. The scorpion's Bestiary page says so.
- Decisions: D-768. D-761 moved to the archive, word for word.

## 0.3.217 (2026-11-10)
- A rat pack now warns you. The turn a pack notices you, one of its three lines shows in amber: "The pack closes in!", "Rats squeak all around you!" or "A pack of rats comes for you!", taking turns. A pack that loses you and finds you again warns again. A rat alone, or the last of a pack, stays silent, and a bite that turn keeps its own line.
- Decisions: D-767. D-760 moved to the archive, word for word.
