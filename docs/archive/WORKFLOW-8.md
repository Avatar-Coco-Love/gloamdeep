# How we work, 8: what the eighteenth audit added

`WORKFLOW-7.md` continued (D-995), so that page stays as it was. Each
audit adds what its stretch taught us about working together (D-518,
D-741). The rules in force are in `CLAUDE.md` and `PR-CHECKLIST.md`.

## What the eighteenth audit added (0.3.394 to 0.3.433)

The lines each step added to `WORKFLOW-SINCE.md` ("Since the last
audit"), word for word, sorted (D-741), then what the stretch as a whole
taught (D-995).

**Measuring before offering.**

- Measure a drafted line before offering it: the hallway's warning the owner picked was too wide for the strip and had to be cut after the pick (0.3.398); `textWidth` in `src/render/font.js` against `W - 4` checks it first.
- The same slip came back: the escape's joined line was offered unmeasured and was too wide again (0.3.405); measure every option's words before the question, not after the pick.
- More foes can make a fight easier: the 4 gloamlings took the tiles beside the hero, so the Lampeater bit less and the bot won more; run the bench before offering a fight change (0.3.413).
- Measure a finding's numbers again before asking its ruling: H-79's 14% was 47% when the fix was built, so the owner was asked again with the right count before it was finished (0.3.428).
- Check a list's room before adding a line: Settings' Finds list was full on the smallest card, so the new card's sound went under Places, as the drips did; the text-fit test caught it (0.3.432).

**Checking before building.**

- Ask what a change does to a later trip: the owner saw that the hall falling in behind the hero would cut off the way back down, which the proposal hadn't checked; rooms a journey keeps need the return trip thought through before offering (0.3.409).
- A tune that must start on a moment has to be fetched before it: the place tunes load when first wanted, so the boss tune is fetched ahead in the quiet hallway, or it would start late at the seal (0.3.403).
- A plan's unbuilt steps hide behind a vague Next up: "the Lampeater's polish" still had steps 7 and 8 of D-972 to build, found by reading the code, not the docs; asking which came first kept the owner's ideas for after (0.3.431).
- A docs step is checked against the code, not only the decisions: each number in H-84's rows came from the registry and the bench's own code (0.3.429).

**Asking the owner.**

- An answer can carry new ideas beside the pick: the owner's ideas for sealing the arena (a cutscene, boss music) were kept word for word as Q-112, not built, so the step stayed one small change (0.3.395).
- A worry in an answer can change the pick: the owner feared an accidental skip, so the cutscene has none, and its name-and-health idea became its own next step, settled in the same round of questions (0.3.399).
- A point the owner raises once a PR is ready to merge is saved, not built: note it (Next up or a Q-), merge if asked, and work on it in a fresh conversation, as long ones cost context (the bench move came after 200k, 0.3.399).
- A point saved at merge time comes back as part of the next step's prompt: the bench's lower start rode with the hallway's quiet, asked as one more question in the same round (0.3.402).
- A standing check runs only when the step touches what it checks: the owner asked that the boss bot run before and after only when the fight changes, so the Lampeater's Feat, which leaves the fight alone, ran none (0.3.397).

**Tests and tools.**

- Tests and tools can name a doc too: moving the creature list off `CONTENT.md` broke the content-index test and left `tools/make.js` writing to the old page, so grep `tests/` and `tools/` for a doc's name before moving its text (0.3.393).
- A fix the screen shows can still be proven in the browser by what it leaves: F-8's was checked by playing through the menus with the keyboard and reading `localStorage` before and after the fix (0.3.394).
- A new sound needs its own button on the sound board too: the board's list is written by hand in `tools/soundboard.js`, so `giveWay` was in the game but not on the board, and the owner couldn't find it among 118; `--boss` now makes a short page of one place's sounds, and a sound step links the short page (0.3.408).
- Prove a guard test by breaking what it guards: cutting the surface archive to 14 lines made both of `tests/kept.test.js`'s checks fail, then git put it back (0.3.423).
- Split a data file the way an earlier split did, and prove it: `LINES` was compared key by key against main's before and after (530 the same), and the moved screens were played in a browser, since no test draws them (0.3.424).
- A tool that guesses where it is can measure the wrong thing for months: perf.js's three Enters stopped on the opening screen, found only once it could read the screen's name (0.3.425).
- A test can turn up a bug of its own: measuring every card's buttons found DECONSTRUCT under the bag's slots on the smallest view; it went to BUGS.md (B-013) instead of into the step (0.3.426).
- The frame's safety net hides a broken name: 0.3.424's split lost 13 imports and every test passed, while the dark went undrawn in play; a split needs a check that every name is still brought in (now `tests/imports.test.js`), and browser scripts should report the page's logged errors (0.3.427).

**What the stretch taught.**

- **Measure the words, every time.** A drafted line too wide for the
  strip came back twice after a lesson about it; the habit now is to
  measure every option's words before the question.
- **A hands-off stretch still needs the code read.** The health check's
  steps were built on Claude's picks (D-980), and each was right only
  where its numbers were measured again and checked against the code.
- **A measuring tool can drift with the game.** perf.js measured the
  opening screen for months, and at this audit its surface walk was
  digging, not walking (F-9); a tool's scene is checked when its numbers
  jump.
- **The owner sees the long run.** The way back down past a fallen hall,
  a skip by accident: the owner's worries about later trips changed picks
  that the proposals had not thought through.
