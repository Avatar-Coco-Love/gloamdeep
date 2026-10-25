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

## 0.2.109 (2026-10-25)
- Tidying, with nothing in the game changed: the notes Claude reads at the start of each conversation are shorter, and older changelog entries and finished build steps moved to the archive. This Version history still holds every version.
- A check now fails when a notes file grows past its size limit, and an audit like this one comes every 20 versions. The next is at 0.2.129.
- Decisions: D-336, D-337.

## 0.2.108 (2026-10-25)
- A fall now leaves the world as it was. You still wake at the first room's start with full hearts and the starting oil, but every room stays as you left it: the same seed and layouts, rats where they were, torches still lit, your set-down workbench and stash chest in place with what the chest holds, and the map of every room you found.
- Settled for later: stacks by kind (20 of Wood, Stone, oilcaps and heartcaps, 5 of flasks and potions), several stacks of a kind in the bag and in a chest, and three ways to play: Gentle keeps your bag after a fall, Normal leaves it where you fell, and Hardcore is one life. Until the modes come, a fall keeps your bag.
- Decisions: D-332 to D-335. Questions closed: Q-058.

## 0.2.107 (2026-10-25)
- On a stash chest's panel, the gold frame now reaches the bag's row too: Down from the chest's second row goes to the bag, and Down again to Close.
- Press Enter or Space, or click or tap, on a filled slot and its whole stack moves to the other side: from the bag into the chest, or out of the chest into the bag. It joins a stack of its kind when all of it fits there, or takes the next empty slot. It takes no turn and says nothing.
- When it can't all go, the line says "Your bag is full." or "The chest is full.", and nothing moves. Each chest keeps its own things, kept in your save. A fall loses a chest set down, and what it held, as its room begins again.
- Decisions: D-331. A question for the owner: Q-058.

## 0.2.106 (2026-10-25)
- Walk into a stash chest you set down, or click or tap it from beside it, to open it. The room dims behind a box headed STASH CHEST, with its 12 empty slots in two rows, the bag's 6 slots under them, and Close. Opening it takes no turn.
- Arrows or a tap move a gold frame over the chest's slots; Down past the second row reaches Close. Close, Esc, P or a tap outside the box closes it. The slots are empty for now: putting things in and taking them out comes next.
- Decisions: D-330.

## 0.2.105 (2026-10-25)
- Choose the stash chest in the bag and press Set down, and it goes down the workbench's way: the free sides beside you are marked, and an arrow, a swipe, or a click or tap on a mark sets it there. A turn passes and the line says "You set down the stash chest."
- It goes only on the surface, on empty ground away from the room's edge, and never where it would cut the room in two. Set down, you can't walk through it, but light passes over it. Walking into it does nothing yet; opening it comes next.
- Decisions: none new; this builds D-329.

## 0.2.104 (2026-10-25)
- Wood's first line in the bag now says "Three make a workbench.", so it is plain that 3 Wood make something, as oilcaps say they make a flask.
- How to play has a fourth page, Crafting, after Keyboard: choose a stack in the bag and press Make; 3 oilcaps make an oil flask, 3 Wood a workbench, and you walk into a workbench to make more there.
- Setting the stash chest down is settled for next time: the workbench's way. Older decisions move to an archive file.
- Decisions: D-327, D-328, D-329.
