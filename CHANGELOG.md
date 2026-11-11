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

## 0.3.271 (2026-11-11)
- New: digging sounds. Each bump on a deposit, a copper vein or rubble clinks like a pick on stone, with the cave's echo, and the last bump crumbles: a deeper clink, then small stones tumbling.
- New: a stash chest creaks as it opens, before its page turns, and closes with a wooden knock just after its page.
- New: on Settings' Sound tab, Finds' list has three more lines, each On or Off: Digging, Stone breaks and Chest.
- Decisions: D-825. D-821 moved to the archive, word for word.

## 0.3.270 (2026-11-11)
- New: on Settings' Sound tab, each kind's line (Steps, Fighting, Finds, Menus) shows > after its loudness, and a tap or Enter opens its list: the kind's loudness first, then each of its sounds On or Off. Steps: Grass, Stone, Earth and Lantern; Fighting: Lantern hit, Knife hit and Beaten; Finds: Into the bag, Weapon drawn and Tile set down; Menus: Tick, Page turn and Can't. Only the sounds the game plays so far are listed; each new one joins its list. A sound turned On plays itself so you hear it. The list's title, SOUND · STEPS, sits where the tabs were; the close button, Esc or a tap on the title goes back to the Sound tab. Left and Right on the Sound tab still change a kind's loudness.
- Decisions: D-824. D-820 moved to the archive, word for word.

## 0.3.269 (2026-11-11)
- New: under Loudness on Settings' Sound tab, a loudness for each of four kinds: Steps (the lantern's click too), Fighting (the creatures too), Finds (the bag, waystones and fishing too) and Menus. Each starts at 100% and moves in steps of 10% as Loudness does. A kind plays at Loudness times its own share, so Loudness 50% and Steps 50% makes the steps play at 25%. Changing one plays its own sound at the new loudness: a step, a hit, a pat into the bag or the menu's tick.
- Decisions: D-823. D-819 moved to the archive, word for word.
