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

All three are fixed in 0.3.394 (D-952) and kept in
`archive/BUGS-FIXED.md`.

Seen but not confirmed: the Lampeater's drink, breath or burning ring may
show for one turn on coming back into the arena; a fall on the turn it
gets free loses the snuff it owed; the Boss tab replaces a real
journey's gear for good (a dev jump, D-948, maybe as meant).

## Found by the eighteenth audit (D-995)

F-9 found while measuring the light again, F-10 by the bug hunt over
the code from 0.3.394 to 0.3.432, both checked with small scripts.
Which to fix, and when, is the owner's pick; each fix is still the
owner's pick at its step. The fixes offered are Claude's and the hunt's,
the first one recommended. F-10 is fixed in 0.3.438 (D-1001) and kept in
`archive/BUGS-FIXED.md`.

- **F-9 · A bump on the surface stalls the screen.** Each chop or dig
  bump, and anything else that changes the room (the first turn's
  `day` too), repaints the whole woods room and its border
  (`frame.js:195-205`, `drawRoom`, `drawBeyond`): about 0.1 s on
  Claude's machine, 0.4 s on the simulated slow phone. It is why
  perf.js's surface walk read 57 ms (H-73): it was chopping a tree.
  Fixes: repaint only the tiles that changed, and their neighbours; or
  keep the grass and rock painted once and draw the changed tiles over.

Seen but not confirmed: a beating blow that also brings a level shows
"Level N." in place of "The Lampeater fades. Something glows."
(`endturn.js:54`; the test allows it, maybe as meant); poison taking the
last heart on the step that picks up the find may open the card over
the fall; a save made during the cutscene never plays it again.

## Found at the third health check's steps

**B-013 · 2026-11-18 · DECONSTRUCT under the bag's slots, on the smallest view**
Found while testing H-68 (0.3.426), not seen in play: on the stash
chest's card on the smallest upright view (176 × 221 game px), the
bag's last rows of slots lie over DECONSTRUCT, so most taps on it pick
a slot. A phone's view is bigger; whether any phone gets so small is
not known. To look into at its own step.
