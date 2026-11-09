# How we work, part 2: growth, tools, bugs and design habits

The second half of the playbook (D-732, D-741): how the game grew in
stages, the tools that keep the work fast and safe, what bugs taught
us, and the habits behind the art, the story and the plans. `WORKFLOW.md` has how a step runs and why.

## How the game grew

- **In stages, each with its own versions.** 0.0 was planning only,
  decisions and art studies, no game. 0.1 was the foundation, one small
  visible step at a time. 0.2 and 0.3 each began with a plan of themes
  and steps the owner picked (D-159, D-168). The version follows the
  stage: 0.2's last steps built in the 0.3 world kept 0.2 numbers until
  0.3.0 made it plain (D-237, D-528).
- **A playtest of the whole sets the next plan.** After the foundation
  the owner played it through: the caves felt too boxy and samey, so
  stage 0.2 began with natural caves and depths that change (D-160).
- **Groundwork first.** Before a big feature, small steps that change
  nothing on screen lay the ground: old saves upgraded, a list of what
  happened each turn, a profile save (D-263). The feature then comes
  quickly and safely.
- **Only what works shows.** A button appears once its feature exists;
  nothing is greyed out as a promise (D-178).

## Our tools

Nothing here is part of the game, which has no build step. Each tool
exists because doing the job by hand went wrong or was slow.

- **`tools/playtest.js`** (D-073) packs the whole game into one page, the
  private playtest the owner plays from a phone before merging. It and
  the map preview share one packer, `tools/pack.js`.
- **`tools/release.js`** (D-572) does the record-keeping: the version,
  the in-game history, archiving old changelog and log entries. Its
  `--check` runs with the tests, so a slip fails `npm test` (D-665).
- **`tools/soundboard.js`** (D-256): a button for every sound, so the
  owner hears a new one straight from the chat.
- **`tools/mappreview.js`** (D-646): any seed's floor drawn by the real
  generation code, for every step that changes how places are made.
- **`tools/make.js`** and the checker (D-621, D-622): the checker test
  names every piece a creature, find, tile or person still lacks, and
  the file to fix; the maker writes all the empty pieces at once, marked
  blanks where the owner's numbers, words and art go.
- **`tools/perf.js`** (D-430): times play on a simulated slow phone, so
  speed is measured, not guessed.
- **`tools/sharecard.js`** (D-425): draws `share.png`, the one image
  file, with the game's own code.
- **The dev tools, in the game for everyone** (D-086), grew step by step
  into a toolbox: spawn anything, reveal rooms and maps, refill oil and
  hearts, go to any depth, the Seed Explorer to flip through seeds
  (D-214), god mode and endless oil (D-625, D-626), and test spots that
  save and load a moment of play (D-627). A playtest goes straight to
  the thing being tried.
- **The tests**: about 200 test files and 1,400 checks, one line each.
  `tests/docs.test.js` keeps every doc under its size cap (D-336).

## Lessons from bugs

- **Old saves must always load.** From G1 on, a save from an older
  version is upgraded, never dropped (D-263). Bug hunts keep finding
  the cases we missed (the old saves' locket, D-716; journeys begun
  before a change to the world, D-740), so every change to the world
  or the save asks: what does an older save see?
- **Other players find what we don't.** A friend's playtest found a
  freeze at a fall. The fix came with a safety net: an error in one
  frame is logged once and the game goes on (D-557).
- **Docs drift from the code.** Five docs no longer matched the code
  (D-619), and the tenth audit found nine more (D-660, D-673 to
  D-677). Audits now read docs against the code.
- **Each random draw needs its own seed.** Two things rolled from the
  same number quietly depend on each other: a pool hinted at an
  unguarded flask (D-740's bug hunt). Every new draw gets its own salt.
- **Keep the tests fast.** Slow tests get run less. The cave test was
  made to build its rooms once (22 s to 16 s, D-570), and floors were
  made faster and the slowest test split (59 s to 35 s, D-660).
- **A bug hunt at each audit, fixes as their own steps.** A helper
  reads the code since the last audit and checks each finding with a
  small script. The owner picks which to fix; each fix is a small step
  with a test (D-660, D-699, D-740).

## Design habits

- **Mock-ups before art.** New looks are shown as pictures first, the
  owner picks, then it is built. Builds are checked against the
  mock-up: the Look card had drifted and was brought back (D-523).
- **One frozen look.** The style study the owner loved is never edited;
  rules are drawn from it (D-005, D-009).
- **The story in one place before quests.** `LORE.md` was set down
  first (D-633), so every person's words and quest build on it.
- **Outside reviews are ideas, not decisions.** A project review's
  ideas were kept in `RESEARCH-2.md`, none decided until the owner picks
  (D-658). Research pages are kept the same way (D-619).
- **Plan for the end early.** The Google Play checklist was started
  long before release, each piece built when it is due, so nothing
  blocks the release later (D-590).
- **Plan the whole before the parts.** The full scope was drawn up in
  eight parts as multiple choice (D-413), and each big feature is
  planned as numbered steps before the first is built (D-705, D-733).
