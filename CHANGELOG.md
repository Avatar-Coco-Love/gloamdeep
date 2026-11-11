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

## 0.3.284 (2026-11-11)
- New: music in the rock caves. On floors 2 to 4 a calm, dark, slow tune plays non-stop under the drips, looping with no break and carrying on from floor to floor. Going down from the surface fades the surface's tune out over 2 seconds, and the caves' starts a second later, fading in; going back up swaps them the same way.
- New: Music's list in Settings has a second line, Rock caves, to turn that tune On or Off.
- Notes: the tune is "The Vile Grove" from Abstraction's free Music Loop Bundle (CC0), picked by ear from a board of 8. Other places below are still quiet, one step each.
- Decisions: D-838.

## 0.3.283 (2026-11-11)
- New: music. On the surface, by day and by night and at home too, a calm, slow tune plays non-stop, looping with no break. Going down the stairs fades it out over 2 seconds; coming back up starts it again a second later, fading in. Nothing plays on the title or below ground, for now.
- New: Settings' Sound tab has a fifth kind, Music, starting at 50%; its list has one line, Surface, to turn the tune On or Off.
- Notes: the tune is "Ludum Dare 30 06" from Abstraction's free Music Loop Bundle (CC0), picked by ear from a board of 8. Music for the places below comes next, one step each.
- Decisions: D-837.

## 0.3.282 (2026-11-11)
- New: the rock caves (floors 2 to 4) drip. While you play there, a drop of water falls somewhere around you every 8 to 16 seconds, a little left or right, echoing off the walls like your steps. Leaving the caves, or opening a card or menu, stops them.
- New: Settings' Places line, under Finds, turns the drips On or Off with the rest of the places' sounds.
- Notes: more sounds all around come next (wind, birds, crickets), then music.
- Decisions: D-836.
