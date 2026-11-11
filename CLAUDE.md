# Gloamdeep: notes for Claude Code

Gloamdeep is a grid-based, turn-based survival micro-RPG with action and
strategy. It is built phone-first and also plays on PC in any browser. You
carry a lantern down through dark places, and the oil runs low. Plain HTML,
CSS and JavaScript, with everything drawn in code; sounds come from files (D-773).

## The owner leads. Work in tiny steps.

- The owner wants to take part in every decision. The pace is a little
  faster than at kickoff (D-018).
- A PR may settle **several small decisions** together. Visible changes
  stay small: one small visible change per step ("the hero can move one
  tile"). Never bundle a new mechanic with a new system.
- **Propose before building.** Say what you found, offer 2 or 3 options with
  a recommendation (a quick mock-up or picture where it helps), and wait for
  the owner's choice. This applies to design, art, code structure and bug
  fixes.
- Never invent mechanics, story, names or numbers that are not in
  `docs/DECISIONS.md` or its archive files (`docs/archive/README.md`).
  If something is missing, add it to `docs/OPEN-QUESTIONS.md` and ask.
- Ask questions as **multiple choice** (the AskUserQuestion tool when it
  exists): 2 to 4 options, the recommended one first, more than one pick
  allowed when options can combine, and the owner can always add their own
  answer. Up to 4 related questions at a time.
- Write for the owner in plain words. Explain technical terms when they
  first come up.

## Start of every conversation

1. Pull the latest `main` first; the starting copy can be old (D-070).
   A start-up hook does this (D-092), silently. If it didn't run (Claude
   started one folder above the repo), `cd` in, fetch and check out
   `origin/main` by hand. If any PR is still open, ask the owner whether
   to merge it, update it or close it. If this conversation's
   branch had a PR merged, restart the branch from `origin/main`.
2. Read `docs/PROGRESS.md` on the fresh `main`. It says where things
   stand, what is "Next up" and what is waiting on the owner.
3. Read only the documents that the Next up item names.

## Where things live

Read the smallest file that answers the question.

| File | What it holds | When to read it |
| --- | --- | --- |
| `docs/PROGRESS.md` | status, Next up, the last 3 logs | every conversation |
| `docs/PR-CHECKLIST.md` | what every PR updates, playtests, the handoff (D-570) | before making or updating a PR |
| `docs/DECISIONS.md` | the newest decisions | grep for an ID or topic |
| `docs/LORE.md` | the story: Underhearth, the First Light, Old Maren (D-633) | before any lore, quest or person's words |
| `docs/GLOSSARY.md` | the game's words (D-264); finds in `GLOSSARY-FINDS.md`; the code's and menus' in `GLOSSARY-CODE.md` | before naming anything |
| `docs/CONTENT.md` | every creature, find, tile, place (D-363); finds in `CONTENT-FINDS*.md`, people in `-2`, tiles and places in `-3`; the plan in `SCOPE*.md` (D-413) | before adding content |
| `docs/OPEN-QUESTIONS.md` | undecided questions (Q-001…); outside places in `OPEN-QUESTIONS-2.md`; lore and special creatures in `-3` | when a step touches one |
| `docs/RESEARCH.md` | the owner's wish list; ideas kept in `RESEARCH-2.md`; games and talks in `RESEARCH-GAMES.md`; travel and boons in `RESEARCH-TRAVEL.md`; research pages and their suggestions in `RESEARCH-PAGES.md` | when proposing a feature |
| `docs/DESIGN.md`, `VISION.md` | the design brief; the pitch, inspirations, pillars | before proposing a feature |
| `docs/WORLD.md` | regions, ways between rooms (D-170); the map and the starting region in `-2` | world, region or map steps |
| `docs/regions/` | one rule sheet per region | only the region a step touches |
| `docs/ART-DIRECTION.md` | the visual rules from the style study; generated places' colours in `-2` | before any drawing code |
| `docs/TECH.md` | architecture, code rules; the layout and adding content in `TECH-2.md` | before writing code |
| `docs/SOUNDS.md` | every sound the game needs, and its file (D-773); the creatures', places' and maybes in `SOUNDS-2.md` | sound steps |
| `docs/DEV-TOOLS.md` | the dev mode plan and tools | dev mode steps |
| `docs/STORE.md` | the Google Play checklist (D-590) | store, offline or save-moving steps |
| `docs/WORKFLOW.md` | how we work together, why, what we learned (D-732); growth, tools, bugs and design habits in `-2` (D-741); each audit's lessons in `-3` and `-4` (D-782) | audits, or when the way of working changes |
| `CHANGELOG.md` | versions, newest first | the top entry only |
| `docs/archive/` | old decisions (in force), changelog, log | grep only; index in its `README.md` |
| `reference/style-study-1.html` | the approved look (545 lines, frozen) | art work only, by line range (`reference/README.md`) |

## PRs: read `docs/PR-CHECKLIST.md` first

Before making or updating a PR, read `docs/PR-CHECKLIST.md`: what every
PR updates (changelog, in-game history, progress, decisions; write the
changelog and log entries, then run `node tools/release.js` for the rest,
D-572), naming PRs
by version, playtest and sound board Artifacts, and the handoff. Never
push to `main`; one PR per conversation; merging is the owner's call.

## Keeping context small

- No doc over 8 KB, except `docs/DECISIONS.md` (12 KB), `docs/PROGRESS.md`
  (4 KB) and the grep-only files in `docs/archive/`; `npm test` checks this
  (`tests/docs.test.js`, D-336). Archive or split when a doc gets close.
  Nothing is deleted. Old material moves to `docs/archive/`, and
  `CHANGELOG.md` keeps only its newest entries the same way.
- **An audit every 40 versions** (D-518): when the version in
  `docs/PROGRESS.md`'s "Next audit" line comes, the audit is Next up. It
  measures what a conversation reads at its start, archives, trims, and
  splits one big code file, nothing visible changed, adds what we learned
  about working together to `docs/WORKFLOW.md` (D-732), then sets the next.
  Nothing useful is lost (D-338): moved text stays word for word, and the
  PR lists every line reworded or dropped (check with `git diff -U0`).
- Keep code files small. Mark sections with `// § name` so a file can be
  read by line range (`grep -n "§"`).
- Test output: one line per test or check, never full logs or page dumps.
- Diffs: run `git diff --stat` first.

## Hard technical rules (details in `docs/TECH.md`)

- No external assets: no image or font files, no CDNs, no frameworks,
  no build step (`tools/` is only for playtests and record-keeping, D-572). One exception: `share.png`,
  the share card, drawn by `tools/sharecard.js` (D-425). Visuals use Canvas 2D. Sounds are files from a free pack, each listed in `docs/SOUNDS.md` (D-773).
- Phone first. Everything works with touch, mouse and keyboard.
- Game state is kept separate from drawing. All content (items, enemies,
  NPCs, tiles) lives in one data registry. Randomness goes through a seeded
  RNG. Dev tools are on for everyone (D-086); they work by editing the
  state and read from the registry (`docs/DEV-TOOLS.md`).
- Wrap every `localStorage` access in try/catch.
