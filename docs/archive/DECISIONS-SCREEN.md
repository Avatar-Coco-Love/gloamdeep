# The home screen, a tools menu later, landscape only (D-375 to D-377)

Moved unchanged from `docs/DECISIONS.md` at 0.2.136 (D-386), when it
passed 12 KB: installing on a phone's home screen, a tools menu kept for
later with the research split, and playing sideways, full screen. These
are still in force unless marked superseded. Grep for an ID or topic;
never read this whole.

---

**D-375 · 2026-10-26 · On the home screen** (the owner's picks) The game
can be installed on a phone's home screen and opens full screen. Installing
only: no offline copy, so loading, saving and updates work as before
(offline play could be its own step later). Only the browser offers it;
the game shows no prompt of its own, so one ignored offer stays quiet. The
icon is the lantern switch's lit lantern alone, no floor or backdrop
([mock-up](https://claude.ai/artifact/PQUdYNRLtotU44CkkgR8Lz)). On iPhone the installed game keeps its own saves,
apart from Safari's; noted in `TECH.md`, nothing built for it.

**D-376 · 2026-10-27 · A tools menu later; research split** (the owner's
picks, recommended) A combat sandbox and a seeded puzzle tester, the
owner's notes from the Into the Breach talk, are kept for later; built,
the Seed Explorer's title line becomes a tools menu for all three. The
games, bosses and talks move to `RESEARCH-GAMES.md`.

**D-377 · 2026-10-27 · Landscape only, full screen** (the owner's picks,
recommended; supersedes `TECH.md`'s portrait and landscape) The game plays
sideways on every screen, full screen. A phone held upright pauses the game
and shows a picture asking to turn it. On Android, tapping Play also goes
full screen and locks sideways; installed, the game opens sideways by
itself. Installing stays optional (D-375); iPhone browsers can't lock
sideways, so the picture covers them. One day it loads like other games:
a maker's name, then the menu (Q-063, skipped for now). Built in 0.2.130.
