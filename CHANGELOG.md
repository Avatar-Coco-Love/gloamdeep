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

## 0.3.272 (2026-11-11)
- The fourteenth audit. Nothing in the game changes. The Version history's newest file is split again, word for word: 0.3.201 to 0.3.250 move to history-0.3-4.js.
- Docs: finished decisions and the playbook's newest lines moved to the archive or their own files, word for word; the finds' and sounds' lists, near their cap, split in two; the waiting list's later questions on one line, so a conversation starts by reading less. A bug hunt's findings come next. The next audit is at 0.3.312.
- Decisions: D-826. D-782, D-783 and D-822 to D-825 moved to the archive, word for word.

## 0.3.271 (2026-11-11)
- New: digging sounds. Each bump on a deposit, a copper vein or rubble clinks like a pick on stone, with the cave's echo, and the last bump crumbles: a deeper clink, then small stones tumbling.
- New: a stash chest creaks as it opens, before its page turns, and closes with a wooden knock just after its page.
- New: on Settings' Sound tab, Finds' list has three more lines, each On or Off: Digging, Stone breaks and Chest.
- Decisions: D-825. D-821 moved to the archive, word for word.

## 0.3.270 (2026-11-11)
- New: on Settings' Sound tab, each kind's line (Steps, Fighting, Finds, Menus) shows > after its loudness, and a tap or Enter opens its list: the kind's loudness first, then each of its sounds On or Off. Steps: Grass, Stone, Earth and Lantern; Fighting: Lantern hit, Knife hit and Beaten; Finds: Into the bag, Weapon drawn and Tile set down; Menus: Tick, Page turn and Can't. Only the sounds the game plays so far are listed; each new one joins its list. A sound turned On plays itself so you hear it. The list's title, SOUND · STEPS, sits where the tabs were; the close button, Esc or a tap on the title goes back to the Sound tab. Left and Right on the Sound tab still change a kind's loudness.
- Decisions: D-824. D-820 moved to the archive, word for word.
