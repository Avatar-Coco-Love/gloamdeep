# How we work: the playbook

The way the owner and Claude build Gloamdeep together, why each habit
exists, and what changed along the way. It is written so a future
project can start from it (D-732). Each audit adds what that stretch
taught us about working together (D-518). The rules in force are in
`CLAUDE.md` and `PR-CHECKLIST.md`. This page explains them.
`WORKFLOW-2.md` has how the game grew, our tools, what bugs taught us,
the design habits (D-741) and starting a new project; `WORKFLOW-3.md`
to `WORKFLOW-5.md` what each audit added (D-782, D-826, D-868).

## The project so far

Started 2026-10-17. By 2026-11-12: version 0.3.313, about 588 pull
requests, 868 decisions, 102 questions asked, 15 audits. One owner, who
decides; Claude proposes and builds. Plain HTML, CSS and JavaScript,
phone first, nothing outside the code (D-003).

## One step, start to finish

1. **Start fresh.** A start-up hook pulls the latest `main` (D-070,
   D-092). Claude reads `PROGRESS.md` and only the docs that Next up
   names.
2. **Propose.** Claude says what it found and gives 2 or 3 options, the
   recommended one first, as multiple choice. The owner can always give
   their own answer (D-018).
3. **The owner picks.** Nothing is built before that.
4. **Build one small visible change.** A few small decisions can be
   settled together, but a new mechanic never comes with a new system.
5. **Keep the record.** A changelog entry, a log entry, decisions
   (D-xxx) and questions (Q-xxx). `tools/release.js` does the copying
   (D-572), and `npm test` checks it all.
6. **Let the owner try it.** A private playtest page for anything
   visible (D-073), a sound board for sounds (D-256), and a map preview
   for generation (D-646).
7. **Hand off.** One PR, at most 5 lines of handoff and a few copyable
   prompts for the next direction once merged (D-790, D-795), then a new conversation for
   the next step (D-431). Merging is the owner's call.

## Habits and why they exist

- **The owner decides everything** (D-004). Claude never invents
  mechanics, names, story or numbers. A gap becomes an open question.
  The game stays the owner's.
- **Multiple choice with a recommendation** (D-018). It is quick to
  answer from a phone, and the owner still has the last word. Most picks
  are the recommended one, which saves time. The alternatives show what
  else was possible.
- **Every decision written down, with its date and why.** Decisions are
  never edited silently: a new one supersedes the old (PR-CHECKLIST).
  Weeks later, "why is it like this?" has an answer.
- **Decisions in an open PR can still change** (D-072). Playtest tweaks
  edit them in place, with a note ("40 → 80 → 60 turns").
- **A PR is named by its version, not its number** (D-071, D-075).
  Every PR, docs-only ones too, bumps the version.
- **The changelog is also in the game** (D-254). The owner can read
  every version's notes in Settings.
- **One word, one meaning** (D-264). The glossary keeps names steady.
  The content index (D-363) shows what already exists, so new ideas
  build on it.
- **Plan the whole before the parts** (D-413). The full scope was drawn
  up in parts before more items were added one at a time.
- **Dev tools for everyone** (D-086). Spawning, skipping and testing are
  in every build, which makes playtests fast.
- **A frozen art reference** (D-005). The look the owner loved is kept
  in one file that never changes, with rules drawn from it.
- **Only this project's material is a source** (D-007). Older outside
  ideas came in only where the owner picked them again.

## What we changed along the way

- **The pace.** "Slower and in smaller chunks" (D-004) was too slow on
  day one, so one PR now settles several small decisions (D-018).
- **Old copies.** Conversations sometimes started from an old copy of
  the project. First a rule (D-070), then a hook that syncs by itself
  (D-092).
- **Small docs.** Reading everything at the start of a conversation
  grew costly. Now: an 8 KB cap per doc that a test checks (D-336), an
  archive that keeps everything word for word (D-338), and an audit every
  20 versions (D-337), later every 40 (D-518). The start-of-conversation
  read went from 17 KB to under 10 KB (D-699).
- **One step a conversation** (D-431). Long conversations reread too
  much, so each step starts fresh.
- **Hand bookkeeping became a tool** (D-572). Copying the changelog
  into the game and archiving old entries by hand caused slips, so
  `release.js` does it and `npm test` catches gaps.
- **More ways to see a step.** The owner can't play a PR before it
  merges, so playtests came first (D-073), then sound boards (D-256) and
  map previews (D-646).
- **Research beside building** (D-590). Helpers research while the main
  conversation builds. Only one conversation builds at a time.

## What each audit added

Each audit's lessons, from the twelfth on, are in `WORKFLOW-3.md` (D-782),
the fourteenth's in `WORKFLOW-4.md` (D-826), and the fifteenth's in
`WORKFLOW-5.md` (D-868).

## Since the last audit

When a step teaches something about working together, its PR adds one
line here (D-741). Each audit moves the lines into the right sections.
- Tests can read a code file's text (audit826's read `main.js`), so grep `tests/` for a file's name before moving code out of it; and the playtest's packer knows only the import forms the code uses, so a new form (`import()`) needs it taught too (0.3.313).
