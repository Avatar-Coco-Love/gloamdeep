# How we work: the playbook

The way the owner and Claude build Gloamdeep together, why each habit
exists, and what changed along the way. It is written so a future
project can start from it (D-732). Each audit adds what that stretch
taught us about working together (D-518). The rules in force are in
`CLAUDE.md` and `PR-CHECKLIST.md`. This page explains them.
`WORKFLOW-2.md` has how the game grew, our tools, what bugs taught us
and the design habits (D-741).

## The project so far

Started 2026-10-17. By 2026-11-09: version 0.3.192, about 467 pull
requests, 740 decisions, 88 questions asked, 12 audits. One owner, who
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
7. **Hand off.** One PR, at most 5 lines of handoff, then a new
   conversation for the next step (D-431). Merging is the owner's call.

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

## What the twelfth audit added (0.3.152 to 0.3.192)

- **Plan the big step, then build it in pieces.** A bigger idea is
  settled as one plan with numbered steps (D-733: the surface's five;
  the teaching goals planned and worded before the first was built), then
  one piece a conversation. The owner sees the whole before agreeing to
  any part, and each piece stays small.
- **Claude's calls, written down.** While building, Claude settles small
  details itself and lists them in the decision as "Claude's calls the
  owner may change" (D-734 on). The owner isn't asked about every corner,
  yet can still see and change each one.
- **The owner's own answers.** Many picks come with an idea of the
  owner's own (the lantern cold by day, waking in the last bed). What
  fits now is built; the rest becomes a question kept for later (Q-088,
  campfires), so nothing is lost.
- **An audit's bug hunt pays off as small steps.** The eleventh audit's
  findings became their own steps, each fix with a test (0.3.169 to
  0.3.173), so the owner picked which mattered and nothing was bundled.
- **A check must say what is true.** The start-up hook brought the copy
  up to date but printed an old `main`, because a fresh cloud copy holds
  only recent history. Its message now names what is checked out (D-740).

## Since the last audit

When a step teaches something about working together, its PR adds one
line here (D-741). Each audit moves the lines into the right sections.

- A bug list with one fix choice each let the owner settle nine fixes in one round of questions, then take them as one PR (0.3.194).
- Drawing every card with all content at real phone sizes found layout bugs no playtest had; pictures of each let the owner pick fixes at a glance (0.3.195).
- Art mock-ups drawn with the game's own code, in rounds, let the owner turn down two looks, ask for clearer caves and settle the edges before any building (0.3.196).
- The owner stopped a planned step to ask whether the look fit the story; checking the lore first turned a cave mouth into a crypt door before more cave art was built (0.3.197).
- Asked for a look between two, a row of steps from one to the other let the owner pick the middle at a glance (0.3.200).
- A walk through every surface room, by day and night, with each problem shown now and fixed in mock-ups from the game's own code, let the owner rank the polish and pick looks in one round (0.3.199).
- New ideas sent with a step were asked as picks beside its look and planned as later steps; one visible change kept (0.3.202).

## Starting a new project

- Write `CLAUDE.md` on day one: who decides, the step size, how
  questions are asked, the hard technical rules, and a table of where
  things live.
- Make these files from the start: `PROGRESS.md` (Next up, waiting on
  the owner, the last 3 logs), `DECISIONS.md`, `OPEN-QUESTIONS.md`,
  `CHANGELOG.md`, `GLOSSARY.md`, `PR-CHECKLIST.md` and an archive with
  one index.
- Add on day one, not later: the start-up sync hook, a size test for
  docs, a playtest bundler, and a release tool for the bookkeeping.
- Agree the pace in the first conversation and write it down as a
  decision, so it can be superseded when it changes.
- Plan audits from the start. Each one also adds to this playbook.
- Build the tools in `WORKFLOW-2.md` as soon as each job repeats.
- The owner remembered a goal that was never built; searching the code first and saying so plainly turned it into a small new goal, not a rename of nothing (0.3.198).
