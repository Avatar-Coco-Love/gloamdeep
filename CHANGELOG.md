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

## 0.3.281 (2026-11-11)
- New: as a bite, a glob or poison leaves you on your last heart, your heart beats: a soft lub-dub, twice, the second fainter, a moment after the blow or the poison's throb. It plays once, and again only after a heart has come back and gone again. A fall, which wakes you at full hearts, doesn't play it.
- New: Settings' Fighting list gains Last heart.
- Notes: sounds all around come next, drips in caves first, then music.
- Decisions: D-835.

## 0.3.280 (2026-11-11)
- New: as the oil falls under 20% and "The flame is getting low." is said, the lantern sputters twice, the second softer and lower: a short piece of the crackle it makes when the oil runs out. Like the line, it plays once, and again only after the oil has gone back above 20%, so with a flask in the bag it plays only when none is left.
- New: Settings' Steps list gains Oil runs low.
- Notes: the other "Maybe" sounds come next, one step each: a heartbeat at the last heart, sounds all around, music. Weather comes after them: rain, fog, what they do to you, and creatures that come with them.
- Decisions: D-834.

## 0.3.279 (2026-11-11)
- New: every sound the game needs now plays. The gloamling bites with a low breath and a snap, a lampmoth with a papery flutter, a warden with grinding stone.
- New: the creatures' own sounds: a rat pack's squeaks, a mimic's jolt as it wakes, a warden's stone shifting, a scorpion's tail rattling up, a mole's earth as it digs and comes up, a bone rat's bones falling and standing, a glob spat and its splat.
- New: a fall slides and thuds, and you wake with a breath; a new floor rumbles far off, a new room rings a small note; a waystone's bells, its hum as you travel, a boon's chime, the line's plop, a fish's splash, a long breath as you sleep.
- New: a herb or heartcap crunches, a potion gulps; a person leaving or arriving shimmers; making something clinks with tools; "You can't carry more" tocks; the run's end falls slowly.
- New: Settings' lists gain Falling and New rooms (Steps), Creatures (Fighting), Eating, Making and Places (Finds) and Run ends (Menus).
- Decisions: D-833. Claude's picks, by the owner's go-ahead; ask for any swap.
