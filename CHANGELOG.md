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

## 0.3.161 (2026-11-08)
- The second teaching goal: once "Beat a rat" is done, "Go home to the woods" shows under the hearts panel. Deeper down it says "Take the stairs up to the crypt.", in the crypt "Leave by the gap in the crypt wall." Reach the woods and it turns gold with its reward, rolled as the rat's is.
- If you have already been to the woods this journey, the goal is ticked quietly and pays its reward.
- Decisions: D-708.

## 0.3.160 (2026-11-08)
- The first teaching goal: once you see a rat, "Beat a rat" and "Walk into it to strike." show under the hearts panel. Beat one and the line turns gold for 3 turns with what it paid, rolled from an oil flask, 2 healing herbs, 3 oilcaps, a Glint or a healing potion. A find that doesn't fit your bag is set at your feet.
- The Journal has a fifth tab, Quests, listing each goal, the done ones with their reward. Tapping the goal line opens it. A rat beaten before this version ticks the goal quietly and pays its reward.
- Decisions: D-707.

## 0.3.159 (2026-11-08)
- Nothing in the game changed. The first six teaching goals now have their words, each a goal and one line saying how, such as "Beat a rat" and "Walk into it to strike." Each appears at its own moment: going home once a rat is beaten, spending your ember as soon as you reach level 2.
- The goal will sit under the hearts panel and open the Journal when tapped. Done, it turns gold and says what it paid, rolled from an oil flask, herbs, oilcaps, a Glint or a potion. The first boon you pick will open a card saying what boons are.
- Decisions: D-706. Questions closed: Q-087.
