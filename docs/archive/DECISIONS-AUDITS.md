# The audits (D-336, D-362, D-392, D-421, D-468, D-493)

Moved unchanged from `docs/DECISIONS.md` at 0.2.228, the seventh audit
(D-519), as it neared 12 KB: the second to sixth audits, each done.
D-336, the first audit, followed at 0.2.233 (D-524).
These are still in force unless marked superseded. Grep for an ID or
topic; never read this whole.

---

**D-336 · 2026-10-25 · The first regular audit** (the owner's picks, all
recommended) A conversation given to tidying, with nothing visible changed:
`CLAUDE.md` loses its list of archive files, now one index in
`archive/README.md`; `PROGRESS.md`'s ticked build steps move to the
progress archive; `CHANGELOG.md` keeps its newest entries, the rest in
`archive/CHANGELOG-STAGE-0.2-1.md`; and `tests/docs.test.js` fails when a
doc passes its cap (8 KB; `DECISIONS.md` 12 KB; `PROGRESS.md` 4 KB, as before) or
the archive index misses a file. The 0.2.1 setup script line is in place.

**D-362 · 2026-10-25 · The second audit, early, turn.js split first** (the
owner's picks, recommended; supersedes D-337's 0.2.129) The audit comes now, at 0.2.123,
seven versions early, so things can go on being added cleanly and quickly;
the next is at 0.2.143. Its split is `turn.js`, before the other big files:
into `state.js`, `endturn.js`, `creatureturn.js`, `fall.js` and
`bagturn.js`, with `turn.js` passing their rules on, so the rest of the
game imports from it as before (the playtest packer learns that form).
`history-0.2.js`, `screens.js` and `main.js` follow at later audits. The
finished decisions D-332 to D-361 (but D-336 to D-338) moved unchanged to
`archive/DECISIONS-GROWING-7.md` and `archive/DECISIONS-CREATURES.md`.

**D-392 · 2026-10-28 · The third audit: history-0.2.js split** (the
owner's picks, all recommended) The audit at 0.2.143 splits
`history-0.2.js` by version: new versions stay at its top, 0.2.60 to
0.2.119 move to `history-0.2-2.js` and 0.2.0 to 0.2.59 to
`history-0.2-1.js`, word for word, the Version history unchanged.
D-378 to D-380 and D-385 to D-391, the corner HUD and the menu cards, all
built, moved unchanged to `archive/DECISIONS-CARDS.md`. `CHANGELOG.md`
keeps its newest 3 entries. `CLAUDE.md`'s pointers are tidied, its rules
word for word. `screens.js` and `main.js` follow at later audits; the next
is at 0.2.163.

**D-421 · 2026-10-28 · The fourth audit, tiny** (the owner's picks, both
recommended) The audit at 0.2.164 is kept small: the profile screens
(name pad, cloak, eyes, trim, clothes, Rename and Look) move word for word
from `screens.js` into `profilescreens.js`, nothing visible changed;
`CHANGELOG.md` keeps its newest 3 entries; `CLAUDE.md`'s file table is
tidied, its rules word for word. The rest of `screens.js` and `main.js`
follow at later audits; the next is at 0.2.184.

**D-468 · 2026-10-30 · The fifth audit: the world screens** (the
owner's picks, all recommended but the glossary split) The audit
at 0.2.186 moves the Seed Explorer, Settings' ways to play and the seed
pad word for word from `screens.js` into `explorerscreens.js`, nothing
visible changed. D-449 moves unchanged to `archive/DECISIONS-STEERING.md`
and D-461 to D-467 to `archive/DECISIONS-SCOPE-2.md`; `CHANGELOG.md`
keeps its newest 3 entries; `CLAUDE.md`'s pointers are tidied, its rules
word for word; `GLOSSARY.md`'s "In the code" moves word for word to
`GLOSSARY-CODE.md`. The rest of `screens.js` and `main.js` follow at
later audits; the next is at 0.2.206.

**D-493 · 2026-10-30 · The sixth audit: the newer Version history**
(the owner's picks, all recommended but CLAUDE.md's tidy) The audit at
0.2.207 moves the Version history's 0.2.121 to 0.2.186 word for word
from `history-0.2.js` into `history-0.2-3.js`, nothing visible
changed. D-491 and D-492 move unchanged to `archive/DECISIONS-DROPS.md`;
`CHANGELOG.md` keeps its newest 3 entries; the build plan's ticked steps
9 to 12 move to `archive/PROGRESS-LOG.md`. `CLAUDE.md` is left as it
is. `screens.js` and `main.js` follow at later audits; the next is at
0.2.227.
