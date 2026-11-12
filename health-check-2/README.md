# Health check, second pass: work in progress (handoff)

**Temporary.** This folder holds the unfinished second health check of 0.3.305,
saved here on 2026-11-12 when the conversation running it hit its usage limit.
It lives only on the branch `claude/gloamdeep-health-check-2-5uv4gm`. It is
not part of the game, must never be merged into `main`, and changed no game
code or docs. A fresh conversation copies it into its scratchpad and goes on
from there.

## The owner's request (unchanged)
A second health check covering only what the first (0.3.304, D-860,
`docs/HEALTH-CHECK.md`, H-01 to H-31) did not reach. No game code changed.
Play in Playwright on a phone-sized and a wide PC screen, as a player
would, looking at screenshots: fishing (pond, cave pool); the Peddler;
the home waystone, boons, travel; campfires and sleeping out; the mortar
and each draught; the mountain rooms, lamppost, miners' camp; depths 4 to
12, a waystone depth, the warden; Gentle and Hardcore falls; the look
creator; the Seed Explorer; every dev panel tool. Read and compare:
`src/render/` against `ART-DIRECTION*.md`; every Bestiary text, Settings and
menu word, Journal page against `GLOSSARY*.md` and the decisions; the
old-save upgrade code by building saves in each old format and loading them.
The result: an Artifact in the form of the first report
(https://claude.ai/artifact/Lv8sNA91e7X949uKDe4E4s), numbered from H-32,
ranked by how much a player would notice, each with 2 or 3 fix options and
a recommendation, saying plainly what was reproduced and what was only read.
Then ask the owner which to add to `docs/HEALTH-CHECK.md`.

## How the work was split
`BRIEF.md` is the brief every worker had (rules, report format).
`lib.mjs` is the shared Playwright harness (`smoke*.mjs` show its use).
One folder per area; its `notes.md` holds confirmed findings and
"checked and sound" lines, written as it went.

| Area | Folder | Where it stopped |
| --- | --- | --- |
| `src/render/` against the art rules | `art/` | **Done.** Findings A1 to A7 in `DONE-art-words.md` |
| Words: Bestiary, Settings, menus, Journal | `words/` | **Done.** Findings W1 to W7 in `DONE-art-words.md` |
| Peddler, waystones, boons, travel | `peddler-stones/` | `report.md` written; check it is complete |
| Fishing, campfires, sleeping out, mortar, draughts | `water-fire/` | `report.md` written; check it is complete |
| Look creator, Seed Explorer, dev panel | `tools/` | Explorer and most dev tools done; look creator to check |
| Mountain rooms, lamppost, miners' camp, falls | `surface-falls/` | Partly done; see `notes.md` |
| Depths 4 to 12, waystone depth, warden | `depths/` | Partly done (depths 4 to 8 toured, warden played); 9 to 12 to finish |
| Old saves, every format | `saves/` | All 32 formats loaded (about 3,700 saves made by the old code); one confirmed finding; loading in the real game and old profiles to check |

## Not kept (can be made again)
Screenshots (`*/out/`, about 230 MB) and, for `saves/`, the full clone and
the old versions' code (about 145 MB): `saves/notes.md` says how they were
made. Only the two old saves behind the confirmed save finding are kept,
in `saves/out/`.

## For the next conversation
1. Copy this folder into the scratchpad (`cp -r health-check-2 <scratchpad>/hc`);
   `lib.mjs` reaches the repo at `/home/user/gloamdeep`.
2. Read each area's `notes.md` / `report.md`; finish the unfinished areas
   one at a time, more carefully and with fewer agents at once.
3. Check each finding against the decisions before it goes in the report,
   then build the Artifact and ask the owner.
