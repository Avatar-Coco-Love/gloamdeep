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

## 0.3.87 (2026-11-06)
- A creature's Bestiary page now ends with how to fight it, under a gold heading, once you have beaten 3 of them. Before that it says in grey how many more to beat: "Beat 2 more to learn how to fight it." Each creature has a tip or two of its own, such as waiting for it to step up to you so you strike first.
- Decisions: D-632. D-623 moved to the archive, word for word.

## 0.3.86 (2026-11-06)
- Each creature in the Bestiary has its own page: tap its row, or pick it with Up or Down and press Enter. The page shows its drawing twice as big, its name and counts, and, once you have beaten one, a sentence or two on how it acts. Before that it says "Beat one to learn how it acts." Esc, the round cross or Left goes back to the table.
- Decisions: D-631. D-622 moved to the archive, word for word.

## 0.3.85 (2026-11-06)
- The Journal has a third tab, Bestiary, after Growth: a table of the creatures you have met, each with its drawing, its name, and how many you have met and beaten. A creature counts as met the first time your light reaches it; a mimic or a snapcap only once it shows itself, and one beaten in the dark counts too. The counts stay with your profile through falls and new journeys, starting from zero now.
- Decisions: D-630. D-621 moved to the archive, word for word.
