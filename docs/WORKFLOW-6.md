# How we work, 6: what the sixteenth audit added

`WORKFLOW-5.md` continued (D-910), so that page stays under its cap. Each
audit adds what its stretch taught us about working together (D-518,
D-741). The rules in force are in `CLAUDE.md` and `PR-CHECKLIST.md`.

## What the sixteenth audit added (0.3.313 to 0.3.353)

The lines each step added to `WORKFLOW.md`'s "Since the last audit",
and the four that waited in their PRs while that page was full (0.3.341,
0.3.342, 0.3.345), word for word, sorted (D-741), then what the stretch
as a whole taught (D-910).

**Showing the owner before asking.**

- Drawing the mock-up from the game's own picture rows, not a redraw, let the owner pick on the real brazier, and the build used the same rows (0.3.338).
- An owner's half-sure idea, drawn into the same mock-up, settled in one more question (0.3.340).
- For a long look ahead, one Artifact page of ideas with short IDs (L1, T3) let the owner react to about 40 at once; the owner kept them all, so the page went into the docs word for word (0.3.334).
- Measuring a layout fix at five screen sizes (the section's height against what the sheet shows) caught that the picked fix still hid Grow on phones, so a follow-up pick went to the owner before the PR, not after a playtest (0.3.327).
- The owner picked a look Claude hadn't recommended (the plinth): draw every option in the mock-up, not only the favoured one (0.3.341).
- Mock-ups drawn with the game's own bag code, a table of the proposed words for every item, and a short survey of how other games show numbers let the owner pick a look and the whole plan of steps in one round (0.3.345).

**Counting before asking.**

- Counting over 500 seeds how often a floor has a one-room dead end, and which way it opens, turned "how should the vault fit?" into options with real odds (half the shallow floors would lose their vault with one layout), before asking (0.3.337).
- Marking each failed try in a copy of the code and counting the marks over 2,000 rooms showed why pools were rare (most tries cut the room), so the fix aimed at the cause before tuning the roll (0.3.321).
- A tiny script over 40 seeds proved a finding still held (40 of 40 rooms cut) and its fix worked (none cut, 9 of 9 mimics placed) before and after the change, in seconds (0.3.318).

**Proving a fix.**

- When a test fingerprints every generated room, rerunning the fingerprint on the old code with the new rooms left out proved every other room unchanged, so the new number was earned, not just copied (0.3.337).
- Stashing only `src/` and running the new tests on the old code showed every one failing first, so each test proves its fix, in one command (0.3.319).
- Saves the old game itself made, kept from the health check's branch, reproduced a loss in today's game in one short script before the fix, and became the fix's tests (0.3.325).
- Before offering to change a fallback, grep `tests/` for a test that pins the old one (dropclear's spill on its own tile) and name it in the options, so the owner knows a test changes with the pick (0.3.314).
- Tests can read a code file's text (audit826's read `main.js`), so grep `tests/` for a file's name before moving code out of it; and the playtest's packer knows only the import forms the code uses, so a new form (`import()`) needs it taught too (0.3.313).

**Checking the docs against the code.**

- Checking a near-miss colour against the art docs before matching it showed the documented one was the rarer in the code (`#3a3448`), so the fix matched the code to the rules, not the rules to the code (0.3.326).
- Three helpers each checking a third of the doc findings against the decisions and the registry, with each target page's bytes left, found the full pages first, so the owner picked where text goes before any edit (0.3.328).

**Pages and tools.**

- A page published without its sound files plays nothing, and no test catches it: the owner found the sound board silent at 0.3.333. Now the playtest and sound board tools write the files to publish beside them (0.3.333).
- To see new tiles without the full game, pack a small page with the game's own drawing code (`tools/pack.js`) and screenshot it; a local web server may be blocked (0.3.341).

**Playing as the player does.**

- The owner playing on a phone caught words written for a keyboard; a grep for "press" in the goals found the only two lines that name a key, so the fix stayed that small (0.3.342).

**What the stretch taught.**

- **The game's own code makes the mock-ups.** The brazier's rows, the
  vault's tiles and the bag's numbers were each drawn by the game's own
  code, so the owner picked on what the game would really show, and the
  build used the same code.
- **Count before asking.** Seeds, failed tries and screen sizes were
  counted first, so the options came with real odds, not guesses.
- **Prove a fix on the old code first.** New tests run on the old code,
  old saves and room fingerprints showed each fix earned its change.
- **A full page waits for the audit.** `WORKFLOW.md` reached its cap at
  0.3.341, so three PRs kept their lessons in their bodies, and the
  "Next audit" line said where to find them.
