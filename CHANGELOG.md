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

## 0.3.453 (2026-11-21)
- New: the Peddler's talk box. Home on the surface, bumping him opens a
  small card with his face and a line, and two buttons: SHOP opens his
  card, BYE goes back to play.
- His lines take turns by day; past depth 3, and once the Lampeater is
  beaten, a line about each joins them. By night he has his own line.
- Decisions: D-1017.

## 0.3.452 (2026-11-21)
- New: the Peddler's gift. Home on the surface, the first time you bump
  him with room in your bag, he gives you a Homestone, free. His card
  stays shut that time; your next bump opens it.
- With a full bag, or 3 Homestones already carried, he says he has a
  gift and his card opens as ever. He keeps it for a later bump when you
  have room.
- Decisions: D-1016.

## 0.3.451 (2026-11-21)
- New: the Homestone, a way home. Once the home waystone is woken, the
  workbench's GEAR tab makes one from 5 Duskstar and 5 Stone. USE it in
  the bag and it carries you onto the home waystone's plate, as waystone
  travel does: free, and the creatures there can't move before you do.
  It goes one way only, and is used up. Not with a creature so near.
- You can carry at most 3 Homestones.
- Decisions: D-1015.
