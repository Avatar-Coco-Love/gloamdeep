# How we work: since the last audit

`WORKFLOW.md`'s last section, moved here word for word at 0.3.422
(D-981), so the playbook stays under 8 KB and a step reads only this
page to add its line.

When a step teaches something about working together, its PR adds one
line here (D-741). Each audit moves the lines into the right sections.

- Tests and tools can name a doc too: moving the creature list off `CONTENT.md` broke the content-index test and left `tools/make.js` writing to the old page, so grep `tests/` and `tools/` for a doc's name before moving its text (0.3.393).
- A fix the screen shows can still be proven in the browser by what it leaves: F-8's was checked by playing through the menus with the keyboard and reading `localStorage` before and after the fix (0.3.394).
- An answer can carry new ideas beside the pick: the owner's ideas for sealing the arena (a cutscene, boss music) were kept word for word as Q-112, not built, so the step stayed one small change (0.3.395).
- A standing check runs only when the step touches what it checks: the owner asked that the boss bot run before and after only when the fight changes, so the Lampeater's Feat, which leaves the fight alone, ran none (0.3.397).
- Measure a drafted line before offering it: the hallway's warning the owner picked was too wide for the strip and had to be cut after the pick (0.3.398); `textWidth` in `src/render/font.js` against `W - 4` checks it first.
- A worry in an answer can change the pick: the owner feared an accidental skip, so the cutscene has none, and its name-and-health idea became its own next step, settled in the same round of questions (0.3.399).
- A point the owner raises once a PR is ready to merge is saved, not built: note it (Next up or a Q-), merge if asked, and work on it in a fresh conversation, as long ones cost context (the bench move came after 200k, 0.3.399).
- A point saved at merge time comes back as part of the next step's prompt: the bench's lower start rode with the hallway's quiet, asked as one more question in the same round (0.3.402).
- A tune that must start on a moment has to be fetched before it: the place tunes load when first wanted, so the boss tune is fetched ahead in the quiet hallway, or it would start late at the seal (0.3.403).
- The same slip came back: the escape's joined line was offered unmeasured and was too wide again (0.3.405); measure every option's words before the question, not after the pick.
- A new sound needs its own button on the sound board too: the board's list is written by hand in `tools/soundboard.js`, so `giveWay` was in the game but not on the board, and the owner couldn't find it among 118; `--boss` now makes a short page of one place's sounds, and a sound step links the short page (0.3.408).
- Ask what a change does to a later trip: the owner saw that the hall falling in behind the hero would cut off the way back down, which the proposal hadn't checked; rooms a journey keeps need the return trip thought through before offering (0.3.409).
- More foes can make a fight easier: the 4 gloamlings took the tiles beside the hero, so the Lampeater bit less and the bot won more; run the bench before offering a fight change (0.3.413).
- Prove a guard test by breaking what it guards: cutting the surface archive to 14 lines made both of `tests/kept.test.js`'s checks fail, then git put it back (0.3.423).
- Split a data file the way an earlier split did, and prove it: `LINES` was compared key by key against main's before and after (530 the same), and the moved screens were played in a browser, since no test draws them (0.3.424).
