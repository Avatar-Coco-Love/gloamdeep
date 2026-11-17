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
- `0.4.0`: when the way to depth 9 opens, chapter 1 done (D-954).
- Later minor versions (`0.5`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.414 (2026-11-17)
- Nothing changes in the game yet: the Lampeater's next steps are planned, with the gloamlings working alongside it.
- While it comes for you, or stands calling at a brazier, its gloamlings will take the tiles beside you away from it, leaving its side open; it calls from cold braziers when it breaks free, up to 6 gloamlings at once; and its snuffs come at 2/3 and 1/3 of its hearts instead of at half.
- Decisions: D-972. Questions closed: Q-116. D-967 moved to the archive, word for word.

## 0.3.413 (2026-11-17)
- The Lampeater's fight is harder from the start: a gloamling now waits beside each of the arena's 4 braziers, on the side toward the wall, and hunts you through the dark as soon as you walk in.
- They are the arena's own, like the ones that crawl from a snuffed brazier: they drop nothing, count for nothing, crumble when the Lampeater is beaten, and are all back if you fall or leave before then.
- Decisions: D-971. D-968 moved to the archive, word for word.

## 0.3.412 (2026-11-17)
- Past each Leap gap, in the corner you leap into, a dark archway now stands in the wall. Step onto it ("You go through the archway.") and you come out in a room of its own beyond.
- For now that room is empty: plain walls and floor in the floor's own look. Step back onto its archway to return to the same spot. Its look, creatures and finds come in the next steps.
- On the map the room isn't drawn yet; while you are in it, the map shows you at the archway. Rooms you have already been in stay as they were. The map preview marks each archway in gold.
- Decisions: D-970. D-965 and D-966 moved to the archive, word for word.
