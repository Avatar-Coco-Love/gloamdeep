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
  the owner's choice. This applies to gameplay and story: mechanics,
  numbers that change play, new names, story.
- **Small things are Claude's** (D-1026): wording, Bestiary words,
  colours, pixel looks, timings, code structure and bug fixes. Claude
  picks its own recommendation without asking and lists every pick in
  the PR and the handoff, so the owner can change any before merging.
- **Except the health check's steps** (`HEALTH-CHECK-3*.md`, D-980): the
  owner's wish, Claude builds its own recommended fix for each finding
  without asking, keeps to what the finding and the decisions already
  say (nothing new invented), and lists every pick in the PR and the
  handoff, so the owner can change any before merging. What really
  matters, such as a gameplay ruling, is still asked.
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

Read the smallest file that answers the question. Every doc, with what
it holds and when to read it, is in `docs/INDEX.md` (D-981); read it
when the route below isn't enough.

- Every conversation: `docs/PROGRESS.md`. Before a PR: `docs/PR-CHECKLIST.md`.
- Decisions: `docs/DECISIONS.md` (the newest); older in `docs/archive/`, grep an ID.
- Words, story, content: `GLOSSARY*.md`, `LORE.md`, `CONTENT*.md`, `SCOPE*.md`.
- Open things: `OPEN-QUESTIONS*.md`, `BUGS.md`, `HEALTH-CHECK-3*.md`.
- Ideas and design: `RESEARCH*.md`, `PUZZLES*.md`, `DESIGN.md`, `VISION.md`,
  `WORLD*.md`, `regions/`.
- Code, art, sound, store: `TECH*.md`, `ART-DIRECTION*.md` (and
  `reference/`), `SOUNDS*.md`, `DEV-TOOLS.md`, `STORE.md`.
- How we work: `WORKFLOW*.md`. Versions: `CHANGELOG.md`, the top entry only.

## PRs: read `docs/PR-CHECKLIST.md` first

Before making or updating a PR, read `docs/PR-CHECKLIST.md`: what every
PR updates (changelog, in-game history, progress, decisions; write the
changelog and log entries, then run `node tools/release.js` for the rest,
D-572), naming PRs
by version, playtest and sound board Artifacts, and the handoff. Never
push to `main`; one PR per conversation; merging is the owner's call.
Before the merge, the handoff ends "Tell me when it's merged" and gives no
prompts. Once the owner says so, check the PR is merged on GitHub, then give
the next prompts once, each in its own fenced code block (D-792, D-918, D-923).

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
- Test output: one line per test or check, never full logs or page dumps;
  `npm test` prints a dot a test, and full detail only for a failure (D-981).
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
