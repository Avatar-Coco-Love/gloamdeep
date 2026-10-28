# Steering and the stats line (D-404, D-406 to D-412)

Moved unchanged from `docs/DECISIONS.md` at 0.2.161 (D-413), when it
neared 12 KB: easier steering, tap to walk, the arrow pad, and the stats
line in Settings, all built. These are still in force unless marked
superseded. Grep for an ID or topic; never read this whole.

---

**D-404 · 2026-10-28 · Easier steering** (the owner's picks) Taps step
the wrong way too often; swipes are accurate and stay. An on-screen arrow
pad and "tap a tile, walk there" are both wanted, each one a player can
turn on or off, working side by side. Mock-ups come first (Q-067).

**D-406 · 2026-10-28 · The arrow pad and tap to walk** (the owner's picks,
from pressable [mock-ups](https://claude.ai/artifact/29z7Ued7aTpeNtKaE7yhg1); builds D-404, answers part of Q-067)
The arrow pad (A) is one round glass disc 128 px across in the room's
bottom left corner, the twin of the round map: each quarter is one arrow,
a 9 × 9 pixel icon in the stone grey, gold while pressed. A press steps
once; held, it keeps walking at the held pace (D-044). Tap a tile and the
hero walks there at once (F), gold dots on each tile of the way and
corner marks on the tile (D). A tap while walking stops the hero, and
stopping costs no turn (the owner's addition). At first tap to walk is
on and the pad off; today's one-step tap goes.

**D-407 · 2026-10-28 · Steering's details** (the owner's picks,
recommended; answers part of Q-067) The walk to a tapped tile stops by
itself when a creature comes into view; the owner's idea: a Settings
choice to stop instead when a creature notices the hero. The switches are
named Arrow pad and Tap to walk. The version number shows only on the
title and the pause menu, not in play. Tap to walk is built first, then
the pad.

**D-408 · 2026-10-28 · How tap to walk fits** (the owner's picks, all
recommended but the third; builds D-406, D-407, answers part of Q-067)
A held finger on a tile does the same as a tap to walk, so there is one
way of walking (replaces D-219's held walk). Settings' Controls line
becomes three switches: Swipe, Tap to walk, Arrow pad. The walk stops
by itself when a creature or a find comes into view. A tap on unknown
dark walks as far as remembered ground goes, then stops. Built with tap
to walk: a Settings choice to stop when a creature notices the hero
instead of on sight, on sight at first. How to play gets a line saying
the arrow pad can be turned on in Settings.

**D-409 · 2026-10-28 · Tap to walk's words and pace** (the owner's picks,
both recommended; answers Q-067) The stop choice in Settings reads "Stop
walking", On sight at first or When noticed. A walk goes at the held pace,
4 steps a second, to be tried in the playtest. Built in 0.2.157, with the
build's own choices (not asked; the owner may change them): a tap on a
tile beside the hero steps there once, so it still bites, mines or opens;
a tap far off on a wall or creature walks to the nearest tile it can
reach; a key, a swipe or Space ends a walk and acts; a held finger while
walking walks anew; a card or menu ends a walk; the Arrow pad switch
comes with the pad.

**D-410 · 2026-10-28 · A bite stops the walk** (the owner's pick) A walk
to a tapped tile stops, with the "!", when a creature bites the hero,
whichever Stop walking choice is set. Built in 0.2.158.

**D-411 · 2026-10-28 · The arrow pad's details** (the owner's picks, all
recommended; builds D-406 to D-408) A held quarter steps at once, then 4
steps a second. How to play's Walk line ends "Arrow pad in Settings", or
"or the arrow pad" once it is on. The pad fades like the round map while
the hero or a creature is under it. Built in 0.2.159, with the build's own
choices (not asked; the owner may change them): a thumb slid onto another
quarter turns that way at once; the pad's middle presses nothing; a press
ends a walk to a tapped tile; Arrow pad sits under Tap to walk in
Settings; the version number shows on every title screen.

**D-412 · 2026-10-28 · The stats line in Settings** (the owner's picks,
all recommended, at their partner's wish; builds on D-382) Settings gets a Stats
line switch, off at first. On, a short line at the game's normal pixel
size sits bottom left in play: fps, turn, time of day, xp, the hero's
tile and the seed (the panel already shows hearts, oil and depth). Built
in 0.2.160, with the build's own choices (not asked; the owner may change
them): the switch is Settings' last line; while the arrow pad shows, the
line sits just above it; the dev drawer's Stats switch, when on, shows
the full small line instead.
