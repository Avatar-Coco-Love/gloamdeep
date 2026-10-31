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

## 0.3.0 (2026-10-31)
- The Look card's Eyes tab now shows each eye colour as a big square of colour with its name, instead of a tiny hero whose eyes were hard to see. Your hero above still shows the eyes you pick.
- The game moves to version 0.3: stage 0.2's last steps are all done, so the world stage now has its own numbers, starting here.
- Decisions: D-527, D-528.

## 0.2.235 (2026-10-31)
- On the Look card, the tabs and choices now stretch across the whole card, and the heroes in the choices are twice as big when there is room. On tall phones your hero grows bigger and its lit stone floor fills the space that used to be empty.
- Decisions: D-526.

## 0.2.234 (2026-10-31)
- The big hero on the name and Look cards now stands on the crypt's own stone floor, lit warm around it and fading into the card with no frame, and the light flickers like your lantern. With Motion set to Reduced, the light stays steady.
- Decisions: D-525.

## 0.2.233 (2026-10-31)
- When you make a new hero, the name card shows your hero big over the letters, with the name you type over it, and two dots in the top bar show it is the first of two steps; on the Look card both dots are lit. Rename shows your hero too. Going back from the Look card to the name keeps the look you picked.
- Decisions: D-524.

## 0.2.232 (2026-10-31)
- The Look card looks more like the first drawing of it: your hero is much bigger, the tabs sit between your hero and the choices, and RANDOM and OK are two big buttons side by side across the bottom.
- Decisions: D-523.

## 0.2.231 (2026-10-31)
- The Look card has a RANDOM button at the left of OK. Each press gives your hero a whole new look, its cloak, eyes, trim and clothes all at once, and with the arrows you can keep pressing it until you like what you see. It works when making a hero and in Change look.
- Decisions: D-522.

## 0.2.230 (2026-10-31)
- Your hero's look is now one LOOK card with four tabs across its top: Cloak, Eyes, Trim and Clothes. The big hero shows everything you pick, and every choice shows your whole hero wearing it, with its name. OK finishes from any tab. With the arrows, go up onto the tabs and left or right to switch.
- Decisions: D-521.

## 0.2.229 (2026-10-31)
- The first step of the new hero creator: the Cloak card shows your hero big on a lit floor, its name over it and the cloak's name under it. The six cloaks below are smaller, each hero at its real size with its name. On a wide screen the big hero stands at the left of them.
- Decisions: D-520.

## 0.2.228 (2026-10-31)
- Behind the scenes: the seventh tidy-up, nothing in the game changed. The code that picks, makes, renames and deletes a profile has its own file now, ready for the new hero creator.
- Behind the scenes: tidy-ups now come every 40 versions instead of 20, as the size checks already keep the notes small in between.
- Decisions: D-518, D-519.

## 0.2.227 (2026-10-31)
- Behind the scenes: the look currency is named Glints. Feats will pay them, and they will be spent in the Look card, where a locked look shows with a lock.
- Behind the scenes: making a hero gets one Look card after the name, the hero shown big with tabs for cloak, eyes, trim and clothes, each choice named, and a Random button. It will be built in small steps after the next tidy-up.
- Decisions: D-516, D-517.
