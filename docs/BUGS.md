# Bugs the owner noticed

Things the owner saw in play that look wrong, or ideas that came with
them (D-852). Each has its own number, B-001 on, never reused. Claude
looks into one at a time: finds the cause, offers 2 or 3 fixes with a
recommendation, and builds only the owner's pick. A fixed bug's entry
moves to `archive/BUGS-FIXED.md` word for word, with the version that
fixed it. The owner's ideas here are not decisions until picked.

Format: `B-xxx · date noticed · title`, then what the owner saw, in
their words where possible, and any ideas they gave.

---

## Found by the sixteenth audit's bug hunt (D-910)

Read in the code from 0.3.314 to 0.3.352 and checked with small scripts.
The owner picked all five as steps, in this order, each fix still the
owner's pick at its step. The fixes offered are the hunt's, the first
one recommended.

All five are fixed, 0.3.354 to 0.3.358, and kept in
`archive/BUGS-FIXED.md`.

## Found by the seventeenth audit's bug hunt (D-951)

Read in the code from 0.3.354 to 0.3.392 and checked with small scripts
and the code. Which to fix, and in what order, is the owner's pick; each
fix is still the owner's pick at its step. The fixes offered are the
hunt's, the first one recommended.

- **F-6 · A catch at half owes no extra snuff.** When the blow that takes
  the Lampeater to half its hearts lands on a catch's first turn, the
  catch is not counted as begun after half (D-947), so it owes 1 snuff,
  not 2: fewer snuffs and gloamlings than the rule says
  (`snuff.js:30` reads `was.halved`, set only on line 29). Fixes: check
  `next.halved` there; or set half before the turn's blows.
- **F-7 · The spear flashes on a Lampeater its blow sank into.** The
  spear's second tile (and the Warden's Fist's knock) gives no `sank`
  mark, so the Lampeater in the dark behind a gloamling flashes white and
  sounds a hit while taking none (D-941) (`turn.js:188`, `main.js`'s
  `app.hit`). Fixes: `strike` reports `sank` for the one behind too, left
  out of the flash; or no flash for any creature whose hearts didn't drop.
- **F-8 · After the #lampeater link, nothing is saved in that tab.**
  `app.benchLink` is set once and never cleared, so a New journey or a
  profile picked after the link's fight is never saved
  (`main.js:589`, `main.js:135`). Fixes: clear it in `newJourney` and
  when a profile loads; or reload the page without the link on leaving
  the fight.

Seen but not confirmed: the Lampeater's drink, breath or burning ring may
show for one turn on coming back into the arena; a fall on the turn it
gets free loses the snuff it owed; the Boss tab replaces a real
journey's gear for good (a dev jump, D-948, maybe as meant).
