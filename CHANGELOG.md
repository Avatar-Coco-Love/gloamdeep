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

## 0.3.53 (2026-11-05)
- Boons: stepping onto the woken home waystone's plate, with no boon held, opens a card of 3 boons, each of a different kind. Pick 1, or close the card to go without. A soft two-bell chime plays, the text line says "The waystone grants you …", and the boon's name shows on the panel under the oil bar.
- A boon lasts until you are home in the woods again, by stairs or waystone, or fall.
- Three boons work so far: Slow Wick (the lantern burns a quarter slower, and with the Copper Wick a tank lasts 100 steps), Stout Heart (2 more hearts, full as you set out) and Keen Eye (creatures drop their part 3 times in 4). The other 11 are listed, with their numbers, and come a few at a time.
- Decisions: D-596. Questions closed: Q-077.

## 0.3.52 (2026-11-05)
- The travel card's list now scrolls inside the card when the waystones don't all fit, as the version history's does. Sideways it shows 5 whole rows.
- It opens on the first woken stone you aren't standing on. Up and Down keep the chosen stone in view; a swipe, Page Up or Page Down turns a page, and a thin bar at the card's right shows where you are in the list.
- Decisions: D-595.

## 0.3.51 (2026-11-05)
- Waystones now stand asleep deeper down too: on depth 5, the top of the warrens; depth 8, the top of the dungeon; then every 4th depth, 12, 16, 20 and on. Each is placed like depth 2's, in a room the seed picks, never the one with the stairs up, near its middle.
- Step onto one and it wakes, as the others do, and you can travel to it from any woken stone.
- The travel card lists home, then every stone down to the next one below the deepest floor you have reached, that one as ???. So it grows as you go deeper.
- A journey already saved gets them too: a room of yours that should hold one is made again once, with the stone. If you are standing in it, you start on that floor's stairs up. Every other room stays exactly as it was.
- Decisions: D-594.
