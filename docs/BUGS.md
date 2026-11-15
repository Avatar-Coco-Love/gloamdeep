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

**B-009 · 2026-11-15 · Lines at the bottom stay too long** "Any message
that appears on the bottom stays for too long." The owner's idea: rather
than always wait for a number of turns (or another trigger), it goes
after a few seconds of real time, whichever comes first.

**B-010 · 2026-11-15 · Things overlap on a big PC screen** On a PC, in
Microsoft Edge full screen at 1920 × 1080, some of the screen overlaps.
One example: in the bag, with Healing Herb picked, the green flask's
picture sits right over the word DROP.

**B-011 · 2026-11-15 · A felled tree's wood falls in three spots** The
owner doesn't like that a felled tree drops its wood on three different
tiles, when wood can stack. The owner's idea: items stack on the ground,
and one tile can hold several kinds at once ("I drop 5 wood, 3 rat
tails, and 4 healing herbs in the same spot, they will all be there").
How to show that a tile holds more than one kind is open. Today one tile
holds one stack, and a drop onto a find swaps them (D-546).

## Found by the sixteenth audit's bug hunt (D-910)

Read in the code from 0.3.314 to 0.3.352 and checked with small scripts.
The owner picked all five as steps, in this order, each fix still the
owner's pick at its step. The fixes offered are the hunt's, the first
one recommended.

All five are fixed, 0.3.354 to 0.3.358, and kept in
`archive/BUGS-FIXED.md`.
