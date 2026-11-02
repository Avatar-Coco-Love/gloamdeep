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

## 0.3.32 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 1. The bag, Drop, setting down, and the workbench, chest, bed and peddler cards moved into their own file of the code.
- For screen readers: on the peddler's Sell side, each bag slot is read with its name, how many and its price again, not "Empty". It had been wrong since 0.2.219.
- Tests run faster (22 s to 16 s), two unused pieces of code are gone, and the notes for making changes are tidier.
- Decisions: D-570, D-571.

## 0.3.31 (2026-11-02)
- Feed your garden now: walk into a sprout and its card shows FEED and DECONSTRUCT. Feed puts 1 Bat Guano on the soil. It takes a turn.
- A fed sprout shows a few flecks of guano on its soil and grows in 150 turns from planting instead of 300. Fed after that, it grows at once.
- Once is enough: with no guano, or already fed, Feed is dim. After picking, the sprout needs feeding again. Taken down, the guano is spent.
- Water doesn't matter to the garden yet; it waits for a way to carry water.
- Decisions: D-569.

## 0.3.30 (2026-11-02)
- Pick your garden's berries now: walk into a grown garden bed and its card shows PICK and DECONSTRUCT. Pick gives 3 Gloamberries, one more than a wild bush. It takes a turn.
- After picking, the bed holds a sprout again, and it grows new berries 300 turns later. Plant a seed once and pick again and again.
- With a full bag you keep nothing and the berries stay on the bush. With room for only some, the rest drop on the ground nearby, as at a wild bush.
- Decisions: D-568.

## 0.3.29 (2026-11-02)
- A planted sprout grows now: 300 turns after planting it becomes a small gloamberry bush with ripe berries. Every turn counts, on the surface and below.
- The grown bed's card says "Gloamberries grow here." Picking the berries comes at the next step.
- Deconstruct a grown bed and the bed and its seed come back, as with a sprout.
- Dev mode: the Room section has a new Grow button that grows every planted garden bed at once.
- Decisions: D-567.
