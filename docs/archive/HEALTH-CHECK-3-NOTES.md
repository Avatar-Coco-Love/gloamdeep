# Health check 3: working notes (D-975)

The third health check, at 0.3.420, run hands-off: no game code changed,
findings only. Each area is looked at by a helper agent (Sonnet), then
each finding is checked by another (Opus) before it is kept. This file is
saved and pushed as each area is done, so a new conversation can carry
on from the checklist. Grep only; the kept findings go to
`docs/HEALTH-CHECK-3.md` at the end.

Finding IDs: H-68 on (H-01 to H-67 are the first two checks', never
reused); while working, each area numbers its own (A-1, B-1...).

## Checklist
- [x] 0. Set up: this file, baseline `npm test` 2050 of 2050 pass, 72 s.
- [x] A. A conversation's start: what it reads, and how that grows.
- [ ] B. A PR's overhead: the checklist, release, history, conflicts.
- [x] C. The code's shape: big files, boot, duplication, the rules.
- [ ] D. Tests and tools: speed, noise, what's slow or doubled.
- [ ] E. The Lampeater's fight (0.3.381 to 0.3.420).
- [ ] F. Leap, the crumbling floor, gaps, the archway, the seal hall.
- [ ] G. The Warden's Fist, vaults, the rune wall, shovel, doorways, flyers.
- [ ] H. Played as a player, on a phone and a PC, the screens since 0.3.329.
- [ ] I. Saves and speed: old saves, save size, frame time, boot.
- [ ] J. The docs against the code since 0.3.329.
- [ ] K. Every finding checked (Opus); IDs H-68 on given.
- [ ] L. `HEALTH-CHECK-3.md`, the report page, the questions, one PR.

Not done, and why:
- The every-3-hours check-in (D-975) could not be made: the session's
  permission check refused creating a scheduled task. This checklist,
  pushed after each area, is what a new conversation carries on from.

## Findings as found, then as checked

### As found: area C
#### Area C: code shape and what a step must read
Looked at: sizes and sections of the big files, boot imports (script + a throttled browser load), unused exports, circular imports, the state/drawing, seeded-RNG and localStorage rules, the save-fix-up files, and the files 6 recent PRs and the last 40 PRs touched. Not covered: line-by-line code quality, performance of the light, tests.

Checked and clean (no finding): no circular imports; src/core imports nothing from render/input/dev (0 of 163 files); Math.random is used once, in src/main.js:87 (seed for a new journey, as TECH.md says); every localStorage use sits in try/catch (aside.js:10-12 is called from inside the try at :17); no export is dead (251 are not imported by another src file, but all are used in their own file, tests or tools).

##### C-1 No size limit on code files; every step reads big shared ones
- Where: src/main.js (51 KB), src/core/lines.js (50 KB, one table of 412 lines), src/render/frame.js (44 KB, `createFrame` is one closure, lines 130-517), src/render/sound.js, sprites.js, items.js (33 KB, one table), cave.js; tests/docs.test.js:22 (caps docs only)
- Against: CLAUDE.md "Keep code files small" | none (no test checks it)
- What: 12 of 313 src files are over 30 KB and 29 over 20 KB; the 10 biggest (without history) are 369 KB. In the last 40 merged PRs lines.js was edited 16 times, enemies.js 12, main.js 11, sprites.js 9, frame.js 9 (usually 1 to 3 lines each), so a conversation either reads 50 KB to add one line or must know to grep. Recent steps: 0.3.419 (wary) touched 10 src files = 196 KB of whole files for +217 lines; 0.3.417 touched 10 = 234 KB; 0.3.416 touched 5 = 93 KB; 0.3.410 touched 6 = 139 KB.
- Seen: measured: `git diff --numstat` plus `wc` per merge (scratchpad work/C/pr.sh); /tmp/files40.txt counts.
- Who: none (players) — context and dev time
- Fixes: 1) Give each big shared table a per-topic split like `lines-creatures.js` already is: e.g. the 12 Lampeater lines and other boss lines into `lines-boss.js`, so a boss step reads about 3 KB, not 50 KB; 2) split `createFrame` into per-layer files (panel, round map, arrow pad, hold, light, plaques) each under about 15 KB, since it already has `// §` sections inside; 3) add a size cap test for src (say 30 KB, with a listed allow-list that only shrinks), as `tests/docs.test.js` does for docs.

##### C-2 The browser loads 299 modules, 1.6 MB, before the title
- Where: index.html:164 (`src/main.js`), src/main.js (64 imports), src/render/frame.js (88 imports), src/input/screens.js (34 imports)
- Against: none (a risk); TECH.md "Home screen": "No service worker: nothing is cached"
- What: everything except the Version history (lazy since D-868, 14 files, 394 KB) is imported statically: 299 of 313 files, 1,630,813 bytes (core 830 KB, render 567 KB, input 147 KB, dev 26 KB). Playwright with 200 KB/s and 150 ms latency, uncompressed local server: 300 requests, 12.1 s to the load event. A static host that compresses would be about 4 times smaller, and later visits depend on browser cache only; this was not measured on a real phone.
- Seen: measured: scratchpad work/C/graph.js (import graph), work/C/boot.js (throttled load).
- Who: some (first visit on a slow phone) — and grows with each feature, since each adds modules at boot
- Fixes: 1) Load the card files (`src/input/cards/*`, 32 files, 51 KB), the dev tools (26 KB) and the many save fix-ups (C-3) on first use with `import()`, as history already does; 2) measure the real compressed size on the host before deciding; 3) leave as is until a phone shows it is slow, and record the byte count each audit.

##### C-3 Save fix-up files pile up, copy their helpers, and have misleading names
- Where: src/core/recamp.js, recap.js, refetch.js, refloor.js, regrove.js, rehome.js, relamp.js, renew.js, resettle.js, restar.js, reherb.js, oldarena.js, oldfist.js, oldlocket.js (14 files, about 28 KB); each imported only by src/core/save.js (rehome also by renew.js)
- Against: TECH.md "Built to grow" "keep saves upgradable" | none
- What: each one is a one-time fix for an older save ("an older save given its miners' camp"); 14 of the 37 save formats got their own file, and they grow one per feature that adds a room thing. The same `unseen = (p) => !p.seen || ...` line is copied into 8 files (restar, recamp, recap, regrove, relamp, renew, reherb, and strewn.js) and each opens with "as relamp.js gave the lamppost". The `re` prefix is also used by real features (regrow, rescue, relic, record, region, registry), so a search for "re*" or a reader cannot tell a rule from a one-time fix.
- Seen: read; `grep -rE "const unseen = " src` gives 8, `ls src/core | grep -E '^(re|old)'` gives 20 names.
- Who: none (players) — context and dev time
- Fixes: 1) Move them to `src/core/upgrades/` (the name `upgrades.js` is the Growth tree, so use `fixups/`), one shared `unseen` helper, and load them only when an old save is read; 2) one table file listing them by format number so save.js names none of them; 3) just rename with a `fix-` prefix and keep the layout.

##### C-4 Small helpers copied across files
- Where: `same` in src/core/flank.js:14, relic.js:13, cache.js:13, guano.js:10, scatter.js:9, sized.js:14, pack.js:10, guarding.js:18, unguarded.js:13, cave.js:517; `dist` in scatter.js:10, cave.js:518, sized.js:15, pack.js:11, unguarded.js:14 (12 matching distance lines in all); `key` in wary.js:17, sized.js:16, unguarded.js:15, cave.js:514 (different meaning)
- Against: none (a risk)
- What: each new step copies "same tile", "tile distance" and "tile key" into its own file; the two `key`s in cave.js and wary.js return different things (a number vs a string), so a mix-up when someone later shares them would be silent.
- Seen: measured: `grep -rE "const (same|dist) = " src | wc -l` = 10 and 5.
- Who: none (players) — dev time
- Fixes: 1) One `src/core/tile.js` with `same`, `dist`, `tileKey`; new steps import it (do not edit merged files in a rush, move them one audit at a time); 2) note it in TECH.md so a new file does not copy; 3) leave it.

##### C-5 Each step also edits about 10 record files, 3 of them in every PR
- Where: CHANGELOG.md, docs/PROGRESS.md, src/core/history-0.3.js (40 KB), src/core/version.js, docs/DECISIONS.md, docs/OPEN-QUESTIONS-3.md; tools/release.js
- Against: docs/PR-CHECKLIST.md (the per-PR list) | none
- What: of the last 40 PRs, 40 changed the history file, PROGRESS and CHANGELOG, 37 DECISIONS, 25 OPEN-QUESTIONS-3. Median 17 files per PR, about 10 of them records. `tools/release.js` writes the history and archives, which keeps the by-hand part to the changelog, log and decisions; the cost left is that the whole changelog is kept in the game's source (396 KB in 15 history files, 20% of src) as well as in docs/archive.
- Seen: measured: `git log --first-parent main -40` and `git diff --name-only` per merge.
- Who: none (players) — context and dev time, and a merge conflict on the same top lines whenever two PRs are open
- Fixes: 1) Keep as is while one PR at a time is open; 2) if conflicts appear, have release.js regenerate history/version after a rebase, as `--check` already can; 3) load the history text from a data file the Version history card fetches instead of 15 JS modules.

##### C-6 Rules are in code by creature id, and a creature touches about 8 files
- Where: docs/TECH-2.md:61-67 ("A creature" list); 'lampeater' string in src/main.js (3), arena.js, beaten.js, bossbench.js, enemies.js, feats.js, frame.js, settings.js, sound.js; src/core/call.js, snuff.js, wary.js, flank.js (one file per boss step)
- Against: D-261 "Add content as registry data, not special cases in the rules"
- What: the boss's rules are one new file per step (call, snuff, wary, flank, sight), each wired through creatureturn.js and enemies.js; the id 'lampeater' appears in 10 files outside its own data. A creature's list in TECH-2 names enemies.js, lines-creatures.js, pictures-creatures.js, sprites.js, room.js/cave.js, sound.js and docs. Most of the rest of the content does follow the registry (registry.js 2.4 KB gathers tiles, items, lights, enemies, people), with a few tables outside it (fishing.js POND_FISH/CAVE_FISH, goals.js, feats.js, hearthwood.js KIND_NAMES), which the registry's own header excuses as "not things in the world".
- Seen: read; `grep -rlE "'lampeater'" src | wc -l` = 10.
- Who: none (players) — dev time
- Fixes: 1) Keep the one-file-per-boss-step pattern but put a boss's files in `src/core/boss/` with its lines and sprite hooks in one place; 2) when a second boss comes, move the 'lampeater' checks into a `boss: {...}` field on its enemies.js entry; 3) no change now.

### As found: area A
#### Area A: what a conversation reads at its start, and how it grows
Looked at: sizes of CLAUDE.md, PROGRESS.md, the start hook, DECISIONS.md and its archive index; which docs the last 25 merged PRs (0.3.396 to 0.3.420) touched; doc sizes at 0.3.380, 0.3.400, 0.3.420. Not covered: whether each doc's words are right, the code docs' accuracy, and the real token counts (bytes only, about 4 bytes a token).

##### A-1 PROGRESS.md: 72% of it is rarely needed
- Where: docs/PROGRESS.md:35-39 (Build plan, 1047 bytes), :14-33 (Waiting on the owner, 1921 bytes)
- Against: PROGRESS.md:3 "Keep this file under 4 KB"; the file's own rule "Tick a step when merged ... move ticked steps there at each audit"
- What: the file is 4094 of 4096 bytes. The Build plan lists steps 19 and 26 with version numbers that are already merged (0.3.83 and 0.3.245 are both in archive/PROGRESS-LOG.md), so about 1 KB is done work. In "Waiting", five bullets (Any time, Each its own step, Later, Sounds, the lab; about 1,230 bytes) only repeat Q-numbers that OPEN-QUESTIONS*.md already holds.
- Seen: measured: awk per section and per bullet; grep of the archive log for 0.3.83 and 0.3.245.
- Who: most players: none. Context: every conversation reads it, so cutting it is a saving of about 2.2 KB (550 tokens) each time, and it stops the 2-byte margin that forces a trim in every PR.
- Fixes: 1) Move the ticked build plan to the archive log now, and turn the five repeat bullets into one line "Later and any-time questions: OPEN-QUESTIONS*.md" (PROGRESS goes to about 1.9 KB). 2) Only drop the build plan (saves about 1 KB). 3) Make the audit check the plan against the log each time.

##### A-2 CLAUDE.md: the routing table is 42% of the file
- Where: CLAUDE.md "Where things live" (3374 bytes of the 8106; 86 bytes under the 8 KB cap)
- Against: CLAUDE.md "Read the smallest file that answers the question" and "Keeping context small"
- What: every conversation loads all 25 rows, but a typical step needs 2 to 4 of them (the last 25 PRs touched mostly OPEN-QUESTIONS-3, CONTENT-BOSSES, CONTENT-4, GLOSSARY-2, WORKFLOW, SOUNDS*). The table also has holes: GLOSSARY-2.md, GLOSSARY-HERO.md, GLOSSARY-HOME.md (11 KB, where "Leap" lives) and WORKFLOW-5/6/7.md are not named; they are reached only through other docs. So the table is both too long and incomplete.
- Seen: measured: awk section sizes; script loop of every docs/*.md name against CLAUDE.md (29 files not named exactly; 3 glossary files and 3 workflow files have no route at all in the family descriptions).
- Who: most players: none. Context: every conversation, about 2 KB (500 tokens) saved each time.
- Fixes: 1) Move the full table to a new docs/INDEX.md (family by family, naming every file) and keep in CLAUDE.md about 8 lines: one per family plus "full list: docs/INDEX.md". Saves about 2 KB and fixes the holes. 2) Keep the table, but shorten each description to a few words (saves about 1 KB). 3) Put the index in docs/PROGRESS.md "Next up" only for the step at hand (the step names its docs).

##### A-3 DECISIONS.md: half of it is process rules written elsewhere
- Where: docs/DECISIONS.md:14-79 (nine standing decisions, 3858 bytes) and :80-105 (D-971, 1796 bytes); cap 12288, now 12179
- Against: D-338 "Audits lose nothing" (moving word for word is allowed); CLAUDE.md already restates D-338, D-363, D-518, D-732, D-741, D-852, D-923
- What: D-338, D-363, D-431, D-518, D-732, D-741, D-790, D-852, D-923 sit at the top of the "newest decisions" file though they are old; their rules are in CLAUDE.md or PR-CHECKLIST.md. The file was touched by 23 of the last 25 PRs, so a conversation must read all 12 KB to edit it. It is 109 bytes from the cap, and release.js already warns (11 KB).
- Seen: measured: awk by line range; git diff --name-only on each of the last 25 merges (23 touched DECISIONS.md).
- Who: most players: none. Context: about 3.9 KB (1K tokens) less read in nearly every PR, plus room before the cap.
- Fixes: 1) Move the nine standing decisions to archive/DECISIONS-STANDING.md word for word, add the index row, and keep one line at the top: "Process rules: grep the archive for D-338, D-363 ...". 2) Move each decision to the archive the moment its step is done (D-971 when the Lampeater ends). 3) Lower the warning to 8 KB so the move happens before the cap.

##### A-4 The archive index is rewritten in every PR but grep does not need it
- Where: docs/archive/README.md:26 (the DECISIONS-SURFACE row, 5773 characters, of which the IDs cell is 3914); docs/DECISIONS.md:6-8; tests/docs.test.js:30-34
- Against: D-336 "one index of the archive" (the test only checks file names)
- What: archive/README.md was edited in all 25 sampled PRs, only to add one more "D-nnn," to a list of single IDs. Every decision header is `**D-nnn ·`; all 978 IDs are present once, with no gaps, in DECISIONS.md plus archive/DECISIONS-*.md, so one command finds any decision. The index is 22 KB (about 5.5K tokens if opened), and 28 old IDs (D-029 to D-168 in SUPERSEDED / STAGE-0.2-1 rows) are already not listed in the file that holds them.
- Seen: ran: node script work/A/cov.js (header count 978, duplicates none; 964 archive IDs, 28 not indexed to their own file). grep -c '^\*\*D-' confirmed.
- Who: most players: none. Context and dev time: smaller PR diffs, and no risk of reading the 22 KB index.
- Fixes: 1) Say in CLAUDE.md and DECISIONS.md line 7 "find an ID: grep -n '^\*\*D-865 ·' docs/archive/DECISIONS-*.md" and change the SURFACE row to "D-209 to latest, scattered; grep" so release.js stops editing it. 2) Keep the index but make it ranges only. 3) Add a test that every header matches `**D-nnn ·` so grep stays reliable.

##### A-5 Seven docs sit within 100 bytes of their cap
- Where: docs/PROGRESS.md (2 bytes spare), docs/WORKFLOW.md (13), docs/SOUNDS-3.md (64), docs/CONTENT-4.md (75), CLAUDE.md (86), docs/DECISIONS.md (109), docs/PUZZLES.md (288)
- Against: tests/docs.test.js:6-8 and :20-25 (8 KB, 12 KB, 4 KB caps)
- What: the next PR touching any of these must trim or split first. Growth from 0.3.380 to 0.3.420: OPEN-QUESTIONS-3 4676 to 7677 bytes (touched by 20 of the last 25 PRs; 515 spare, so the cap is reached in about 7 versions, around 0.3.427), WORKFLOW 6846 to 8179 in the last 20 versions (its "Since the last audit" gets a line in about 10 of 25 PRs), CONTENT-4 6555 to 8117. The next audit is 0.3.433, so these hit their caps before it.
- Seen: measured: git cat-file -s at 67d8774 (0.3.380), 78c77e2 (0.3.400) and HEAD; spare bytes from the caps.
- Who: none (players). Dev time: a split in the middle of a step, a new file, and one more route to learn.
- Fixes: 1) Plan the splits now, as one step: open-question "Lampeater" lines to a new file when its polish ends, CONTENT-4 and SOUNDS-3 to a -5 and -4 by region. 2) Let the "Since the last audit" lines live in their own file (WORKFLOW-SINCE.md) so WORKFLOW.md stops hitting its cap. 3) Raise the cap to 10 KB for docs read in pieces (fewer files).

##### A-6 What a normal PR reads, and how total docs grow
- Where: CLAUDE.md, docs/PROGRESS.md, docs/PR-CHECKLIST.md (4870), docs/DECISIONS.md, then the step's docs
- Against: CLAUDE.md "Keeping context small"
- What: the four files every PR reads or edits are 29.3 KB (about 7.3K tokens): 8.1 + 4.1 + 4.9 + 12.2. A boss step adds OPEN-QUESTIONS-3 7.7, CONTENT-4 8.1, CONTENT-BOSSES 2.5, GLOSSARY-2 3.5 and often WORKFLOW 8.2, so about 59 KB (15K tokens) before any code. With A-1, A-2 and A-3 the four files fall to about 21 KB (-28%). Live (non-archive) docs grew 310,207 to 330,104 bytes in 40 versions (+500 bytes a version; 57 to 62 files); the archive grew 1.16 MB to 1.25 MB (+2.1 KB a version), which costs nothing unless opened.
- Seen: measured: wc, git ls-tree -r -l at three commits, git diff --name-only on the last 25 merges.
- Who: none (players). Context: yes.
- Fixes: 1) Do A-1 to A-3 first (about 8 KB less per conversation). 2) PR-CHECKLIST.md could shrink by putting the finish steps under the release tool's output (D-572), saving about 1.5 KB; this needs a check of what release.js now does itself. 3) Let the audit report these numbers so growth is seen every 40 versions.

##### A-7 The WORKFLOW family is 46 KB in eight files, mostly frozen history
- Where: docs/WORKFLOW.md:93-98, docs/WORKFLOW-3.md to WORKFLOW-7.md (24.6 KB together); also CLAUDE.md names only "WORKFLOW" and "-2, -3, -4"
- Against: D-782 and D-338 (moved word for word); CLAUDE.md routing row "each audit's lessons in -3 and -4"
- What: WORKFLOW-3..7 are each audit's lessons, copied in word for word, one new 5 KB file per audit (40 versions). Only an audit reads them, but they count as live docs and need routing (5, 6, 7 are not routed). The rules in force are already in CLAUDE.md and PR-CHECKLIST.md, as the files say themselves.
- Seen: read: headers of WORKFLOW-3 and -7; grep for who names WORKFLOW-5..7 (only WORKFLOW.md and each other).
- Who: none (players). Context and dev time: fewer live files, a shorter routing row.
- Fixes: 1) Move WORKFLOW-3..7 to archive/ (one index row, grep only); an audit then adds WORKFLOW-lessons to the archive file directly. 2) Merge -3..-7 into one archive file per 5 audits. 3) Leave as is and add the routes (costs CLAUDE.md bytes).

### As found: area B
#### Area B: PR overhead and merge conflicts
Looked at: the last 40 merged PRs (0.3.381 to 0.3.420) by git numstat, follow-up commits, release.js, the in-game history files, the playtest tool, the two last audits. Not covered: GitHub-side CI or the PR body text.

##### B-1 Bookkeeping is two thirds of every PR's lines
- Where: tools/release.js; docs/PR-CHECKLIST.md:10-45; per-PR files CHANGELOG.md, docs/PROGRESS.md, docs/DECISIONS.md, src/core/history-0.3.js, src/core/version.js, docs/archive/{CHANGELOG-STAGE-0.3-1,PROGRESS-LOG,README}.md
- Against: D-572 "does the rest" (release.js does only part); CLAUDE.md "Keeping context small"
- What: Over 40 PRs the average PR touches 9.3 bookkeeping files (119 changed lines) against 4.6 game-code files (58 lines) and 1.5 test files (48 lines). Nine files change in all 40 PRs (version.js, PROGRESS, history-0.3.js, CHANGELOG, 3 archive files). Each version's text is written by hand once, then copied by the tool into 3 more places (history js, archive changelog, and the README index line).
- Seen: measured: `git diff --numstat $m^1 $m` for the 40 merges, summed in $S/work/B/num.txt (PROGRESS 16 lines/PR, DECISIONS 37 lines/PR, history-0.3.js 12 lines/PR, archive README 3.5 lines/PR)
- Who: none (players) — context and dev time
- Fixes: 1) Cut copies: stop keeping the same lines in the in-game history js and the archive changelog (see B-3) 2) Let release.js also write the archive README index line and the PROGRESS "Playtest:" line from a one-line input 3) Drop the 3-entry rolling window in CHANGELOG.md and PROGRESS.md log: keep 1, so less is moved each PR

##### B-2 DECISIONS.md sits at its cap and is archived by hand
- Where: docs/DECISIONS.md (12179 B of the 12288 cap, tests/docs.test.js:7); tools/release.js:126-131; docs/archive/DECISIONS-SURFACE.md (170 KB, 2500+ lines)
- Against: D-572 "only a suggestion" (the tool only warns "near its 12 KB cap: propose a move")
- What: 37 of 40 PRs edit DECISIONS.md (about 37 changed lines each) and 27 of 40 also append to DECISIONS-SURFACE.md, so nearly every conversation reads the full 12 KB and then moves old entries by hand, word for word. One slip shows: "0.3.414: restore the surface decisions archive, cut by mistake" (ca28066), a 2568-line file nearly lost.
- Seen: measured: numstat above; git log -- docs/DECISIONS.md; commit ca28066
- Who: none (players) — context, dev time and a data-loss risk
- Fixes: 1) A `release.js --archive-decisions` step: when over 11 KB, move the oldest finished or superseded D-entries to the archive automatically (it already moves changelog and log entries word for word) 2) Make the archive a folder with one file per 100 decisions so appends never touch a 170 KB file 3) Test that every D-id in the archive appears exactly once, so a mistaken cut fails npm test

##### B-3 The Version history repeats the changelog word for word
- Where: src/core/history-0.3*.js, history-0.2*.js, history-0.1.js, history-0.0.js, history-all.js:3-18; tests/history.test.js:10-30; docs/archive/CHANGELOG-STAGE-*.md
- Against: D-254 "word for word"; D-868 (history-all loaded lazily)
- What: 396,021 bytes in 15 history files hold the same text as the 340 KB of changelog files; a test only checks they match. Every 50 versions an audit must split a new history file by hand and edit the import list in history-all.js (the 0.3.393 audit added 270 lines for this). The game itself loads them lazily (history.js:4-11), but the packed playtest page carries all of it (2.07 MB html, measured).
- Seen: measured: wc -c src/core/history*.js; node tools/playtest.js to scratchpad (2,075,607 bytes); grep of tests/history.test.js
- Who: none (players) — context, dev time, playtest size
- Fixes: 1) One source: the Version history page fetches the changelog markdown files on first open and parses them (the test already has the parser), then delete the history js files and the split ritual; check that STORE.md's offline plan ships those md files 2) Keep the js but let release.js rotate and generate it (no hand split, no hand import edit) 3) Generate the history js at release time from CHANGELOG and the archive and stop committing a hand-edited copy

##### B-4 Every PR republishes a 2 MB playtest and 117 sound files, and then edits its link in the log
- Where: docs/PR-CHECKLIST.md:52-72; tools/playtest.js:19-30; tools/soundfiles.js; the log lines "Playtest: https://claude.ai/artifact/..." in docs/PROGRESS.md
- Against: D-073 / D-256
- What: The playtest page is 2.08 MB (313 modules packed) plus a 117-file sound list (11 KB json) that must be published beside it after every push. Each PR gets a new Artifact link written into the PR body and the PROGRESS log, which means a late commit like "0.3.417: the playtest's link" (88978c0) after the push.
- Seen: measured: playtest build in $S/work/B/pt/ (p.html 2,075,607 B, p.files.json 10,977 B); 53 commits over 40 PRs, 13 follow-ups, 1 link-only
- Who: none (players) — dev time
- Fixes: 1) One standing playtest Artifact, republished to the same url every PR, so the link is written once and never edited 2) Upload the sounds once as assets and have the page point at them, so a push sends only the page 3) A `tools/ship.js` that builds both the page and the files list in one call and prints the exact publish arguments

##### B-5 Follow-up commits are mostly the owner's ideas; cap overflow is the one avoidable cause
- Where: git log of the 40 PRs; docs/PROGRESS.md cap (tests/docs.test.js:7)
- Against: none (a risk)
- What: 53 commits in 40 PRs (1.3 each); 13 are follow-ups. Of those: 4 save an owner idea or decision text (Q-113, Q-115, Q-116, D-972), 3 are small code fixes (F-7, F-8, boss bench start), 1 sound board addition, 1 restore of a cut archive, 1 playtest link, 1 "progress log under its 4 KB cap" (1840cad, 0.3.420), and 2 are the PR's own second commit. Release trouble is small: no test or script failures show as separate commits.
- Seen: measured: `git rev-list --count $m^1..$m^2` for 40 merges; listing of the 13 non-first commits
- Who: none (players) — dev time (small)
- Fixes: 1) release.js should refuse (exit 1) when PROGRESS.md goes over 4 KB, not leave it to npm test later 2) Move the "Next up" and "Waiting" text so the log entries have a fixed budget per entry (about 700 B), checked by release.js

##### B-6 No merge conflicts so far, but 9 files are written by every PR at the same spot
- Where: top of CHANGELOG.md, top of src/core/history-0.3.js:8, docs/PROGRESS.md log, docs/archive/*.md (appended), src/core/version.js:1
- Against: CLAUDE.md "one PR per conversation"
- What: 0 merge commits from main into a branch and 0 conflict fixes in 113 commits; PRs are merged one by one. If the owner ever runs two conversations at once, those 9 files conflict every time (same insertion point), and the archive files conflict on the same last line.
- Seen: measured: `git log --merges` shows only "Merge pull request"; no branch merges
- Who: none (players) — dev time if two PRs run at once
- Fixes: 1) Write down one rule in PR-CHECKLIST: on a conflict in those files take main's copy and re-run `node tools/release.js` (it is idempotent and regenerates them) 2) `.gitattributes` `merge=union` for the archive md files 3) Fewer shared files (B-1, B-3) removes the risk

##### B-7 The audit is mostly moving text a tool could move; npm test takes about 2.5 minutes
- Where: docs/archive/PROGRESS-LOG.md:85 (0.3.393), :274 (0.3.353); tests/ (292 files); CLAUDE.md "An audit every 40 versions"
- Against: D-518; D-338 "word for word"
- What: The 0.3.393 audit changed 571 added and 437 deleted lines in 22 files, almost all moves: history-0.3-6.js (+270, and -268 from history-0.3.js), WORKFLOW-7.md (+59), CONTENT-CREATURES.md (+48), GLOSSARY-HERO.md (+46). A tool could do the history rotation and the doc-size moves; the audit's judgement part (WORKFLOW lessons, bug hunt) is small. Separately `npm test` ran 2 m 27 s for 292 test files, which every PR runs more than once.
- Seen: measured: `git diff --numstat 230944c^1 230944c`; `time npm test` = 2m27s (another test run partly overlapped it)
- Who: none (players) — dev time
- Fixes: 1) A `tools/audit.js` that rotates history files (or retires them, B-3), lists docs near their cap and their bytes read at start (CLAUDE.md is 8106 of 8192 bytes, PR-CHECKLIST 4870, PROGRESS 4094) 2) Add `npm run test:quick` (docs, history, release checks only) for bookkeeping-only steps and keep full `npm test` for code steps 3) Move the audit due-line "Next audit" into release.js so it prints "audit due" at the right version

### As found: area J
#### Area J: the docs against the game
Looked at: every registry entry (152) against GLOSSARY*/CONTENT* by script; creature hearts/bite rows vs enemies.js; SOUNDS*.md vs sound.js and the sounds folder; decision IDs cited vs defined; the 0.3.329-0.3.420 additions; OPEN-QUESTIONS, BUGS, HEALTH-CHECK*, DEV-TOOLS, TECH-2, README, STORE. Not covered: every wording in lines*.js against the glossary (only D-970 to D-978 quotes spot-checked, all match); art docs.

##### J-1 Docs still describe a falling floor that D-967 removed
- Where: docs/GLOSSARY-2.md:18; docs/SOUNDS.md:43; docs/OPEN-QUESTIONS-3.md:109-114; src/core/beaten.js:79-91
- Against: D-967 "No falling ground in the boss fight" (supersedes D-963 to D-966); docs/CONTENT-4.md:52 already has it right
- What: The glossary says the Gap is "where the floor gave way, round the arena's stairs down ... (D-964)", and SOUNDS.md lists `giveWay` "round the Lampeater's stairs (D-966)"; both decisions are superseded and nothing calls `floorGives` now (only tests/escape.test.js does). Q-114 still quotes the Gap line as "Too wide to step across." and says the Gap is "unused", but lines.js:351 says "Too wide to step. More lies beyond." and the Gap is in use for Leap gaps (leapgap.js).
- Seen: read; ran: grep floorGives shows no caller outside beaten.js and one test
- Who: none (players); context (a conversation writing the next gap or sound step reads a wrong rule)
- Fixes: 1) correct those three entries to match CONTENT-4 and D-967/D-968 2) also decide whether to delete the dead `floorGives` code and its test, or keep it as Q-114 says

##### J-2 The Lampeater's last four steps are in no content or glossary doc
- Where: docs/CONTENT-BOSSES.md:11; docs/GLOSSARY-CREATURES.md:27; src/core/call.js, wary.js, snuff.js, guarding.js, enemies.js:121
- Against: docs/TECH-2.md:54 "A new row goes in docs/CONTENT.md ... its word in GLOSSARY.md"
- What: CONTENT-BOSSES says the Lampeater has 8 hearts; enemies.js:121 has `health: 12` (D-950). The calls from braziers, the gloamlings guarding its shoulders, wary, the two phases and the snuffed brazier (0.3.417 to 0.3.420) appear in neither CONTENT*.md nor GLOSSARY*.md (grep "wary", "phase", "snuffs", "calls" finds nothing there). Gloamling's row (CONTENT-CREATURES.md:13) has no mention of the arena, calls, flank or guard. Everything else in the registry is documented: 152 of 152 names found, 0 hearts/bite mismatches except this one.
- Seen: ran: $S/work/J/hp.mjs, reg2.mjs, ids.mjs (scratchpad work/J)
- Who: none (players); context and dev time (the next Lampeater step starts from a wrong sheet)
- Fixes: 1) fix the hearts, add one short paragraph for calls/guards/wary/phases to CONTENT-BOSSES and the gloamling row, and add "update CONTENT/GLOSSARY/SOUNDS rows" to docs/PR-CHECKLIST.md's list (it names none of them; feature PRs did it by habit and 0.3.417-420 skipped it) 2) leave the docs and let the next audit catch it

##### J-3 Done health-check findings still sit in docs/ and are named in CLAUDE.md
- Where: docs/HEALTH-CHECK.md (23 findings), docs/HEALTH-CHECK-2.md (24), docs/HEALTH-CHECK-ORDER.md:last line, CLAUDE.md:54, docs/archive/README.md:101-103
- Against: docs/HEALTH-CHECK.md:10 "moves to archive/HEALTH-CHECK-DONE.md at the next audit"; ORDER "Every step is done"
- What: All 19 steps were done by 0.3.328 (D-883), and two audits since (0.3.353, 0.3.393) left about 10 KB (4672 + 5358 bytes) of finished findings, with no version marks, in docs/. The CLAUDE.md table still tells a conversation to read them "when Next up names one". The archive README also points to docs/HEALTH-CHECK-3.md, which does not exist yet (D-975 plans it).
- Seen: measured: wc -c; grep "^- \*\*H-" counts
- Who: none (players); context
- Fixes: 1) at the audit due at 0.3.433, move both files' findings word for word into HEALTH-CHECK-DONE.md, keep ORDER, and make the CLAUDE.md line say "the third check's steps in HEALTH-CHECK-3.md" 2) do it now in the third check's own PR

##### J-4 Two files sit within bytes of their caps, and several docs within 100 of 8 KB
- Where: docs/PROGRESS.md (4094 of 4096 bytes), docs/DECISIONS.md (12179 of 12288), docs/CONTENT-4.md (8117), SOUNDS-3.md (8128), WORKFLOW.md (8179), tests/docs.test.js:7-22
- Against: CLAUDE.md "No doc over 8 KB" and the 4 KB / 12 KB caps
- What: PROGRESS.md has 2 bytes spare and its "Waiting on the owner" list is long and partly old (e.g. Q-052, Q-056 years of "later"). Every PR's log entry and a new decision will fail `npm test` unless the author trims by hand, as 0.3.420's "progress log under its 4 KB cap" commit shows. CONTENT-4 and SOUNDS-3 are where new places and sounds go next, so they will overflow at the next row. TECH-2.md:54 also sends new tiles to CONTENT-3 and places to CONTENT-4, while CLAUDE.md says newer ones go to CONTENT-5; two answers to "where does this row go".
- Seen: measured: wc -c; git log shows the trim commit
- Who: none (players); context and dev time every PR
- Fixes: 1) at the audit, move the "Later" items out of PROGRESS to OPEN-QUESTIONS and archive older DECISIONS, and make TECH-2 say once which CONTENT file takes new rows 2) raise the PROGRESS cap to 5 KB (the owner's call)

##### J-5 Small stale or missing doc facts
- Where: docs/DEV-TOOLS.md:22; docs/CONTENT.md and GLOSSARY.md (no row for unlitTorch, bareBush, "Your bag" lostbag; "Stairs up" and mimicHeart in CONTENT-2 only); docs/STORE.md; sounds/packs
- Against: DEV-TOOLS.md:22 "sections, View, Spawn, Room, Oil, Hero, Share, Spots"; docs/SOUNDS.md "Each sound ... its file"
- What: panel.js:216 has a ninth section, Boss, that line 22 omits (it is described at line 85). Three registry names (Unlit torch, Bare bush, Your bag) are in no CONTENT or GLOSSARY doc. The sounds folder holds 701 files (23 MB) but the game uses 117 (about 9.9 MB, measured from sound.js FILES and MUSIC), and STORE.md's checklist does not mention the package size or removing unused files. The rune wall/vault/dark door, Leap, archway, seal hall, shovel and Warden's Fist are all documented.
- Seen: ran: $S/work/J/snd.mjs, sz.mjs
- Who: none (players); few (a store build 13 MB heavier than needed)
- Fixes: 1) add the Boss section name, the three rows, and a STORE line "ship only the 117 used files" 2) skip, as none of it misleads a step

### As checked: area C
#### Area C: code shape and what a step must read
Looked at: sizes and sections of the big files, boot imports (script + a throttled browser load), unused exports, circular imports, the state/drawing, seeded-RNG and localStorage rules, the save-fix-up files, and the files 6 recent PRs and the last 40 PRs touched. Not covered: line-by-line code quality, performance of the light, tests.

Checked and clean (no finding): no circular imports; src/core imports nothing from render/input/dev; Math.random once, src/main.js:87 (a new journey's seed, as TECH.md says); every localStorage use in try/catch; no dead export.

##### C-1 No size limit on code files; every step reads big shared ones
- Where: src/main.js (51 KB), src/core/lines.js (50 KB, one table), src/render/frame.js (44 KB, `createFrame` one closure, lines 130-517), src/render/sound.js (39 KB), sprites.js (38 KB), src/core/items.js (33 KB); tests/docs.test.js:18-24 (caps docs only)
- Against: CLAUDE.md:97 "Keep code files small"; the audit splits only "one big code file" every 40 versions (CLAUDE.md:89-90, D-518) | no test checks it
- What: 12 of 313 src files are over 30 KB (6 of them lazy history files) and 29 over 20 KB. In the last 40 merged PRs (0.3.381 to 0.3.420) lines.js was edited 16 times, enemies.js 12, main.js 11, sprites.js and frame.js 9 each, usually a few lines, so a step either reads 50 KB to add one line or must know to grep. 0.3.419 touched 10 src files, 196 KB whole, for +217 lines; 0.3.420 touched 6, 41 KB. One split per audit cannot keep up with 29 files over 20 KB.
- Seen: measured: `find src -size +30k`, `git diff --name-only` per first-parent merge (work/C-check/m.txt).
- Who: none (players) — context and dev time
- Fixes: 1) Split the big shared tables by topic as `lines-creatures.js` already is (e.g. boss lines into their own file); 2) split `createFrame` along its `// §` sections into per-layer files under about 15 KB; 3) a src size-cap test (say 30 KB) with an allow-list that only shrinks, like docs.test.js.
- Checked: KEEP, re-measured sizes and the 40-PR edit counts myself; added the one-split-per-audit context.

##### C-2 The browser still loads 299 modules, 1.6 MB, before the title
- Where: index.html:164 (`src/main.js`), src/main.js, src/render/frame.js, src/input/screens.js
- Against: H-23 (done at 0.3.313, D-868) made only the Version history lazy | TECH.md "No service worker: nothing is cached"
- What: everything but the history (14 files) is imported at boot: 299 of 313 files, 1,632,808 bytes, up from H-23's 266 files. Gzipped file by file they are 616 KB, about 2.6 times smaller (not 4). The helper's throttled load (200 KB/s, 150 ms: 300 requests, 12.1 s) was not re-run and not tried on a real phone. Cards (`src/input/cards/`, 32 files, 51 KB) and dev tools (26 KB) are candidates to load later.
- Seen: measured: work/C-check/graph.js (import graph from main.js), gzip per file.
- Who: some (first visit on a slow phone) — grows with each feature
- Fixes: 1) Measure on the real host and a phone first, record the byte count each audit; 2) load cards, dev tools and the save fix-ups (C-3) with `import()` on first use, as history does; 3) leave as is.
- Checked: REVISE, import graph re-run (299 files, same bytes); compression ratio corrected; tied to H-23.

##### C-3 Save fix-up files pile up, copy a helper, and have misleading names
- Where: src/core/recamp.js, recap.js, refetch.js, refloor.js, regrove.js, rehome.js, relamp.js, renew.js, resettle.js, restar.js, reherb.js, oldarena.js, oldfist.js, oldlocket.js (14 files, about 28 KB); all imported only by src/core/save.js (rehome also by renew.js)
- Against: TECH.md:48 "keep saves upgradable" | none
- What: each is a one-time fix for an older save ("an older save given its miners' camp"); 14 files for save FORMAT 37, one more per feature that adds a room thing. The same `const unseen = (p) => ...` line is copied into 8 files (7 fix-ups and strewn.js), and several point to the one before ("as relamp.js gave the lamppost"). The `re` prefix is shared with real rules (regrow, rescue, relic, record, region, registry), so a reader cannot tell a rule from a one-time fix.
- Seen: read; `grep -rnE "const unseen = " src` = 8; `ls src/core | grep -E '^(re|old)'` = 20.
- Who: none (players) — context and dev time
- Fixes: 1) Move them to `src/core/fixups/` with one shared `unseen`, loaded only when an old save is read; 2) one table by format number so save.js names none; 3) just rename with a `fix-` prefix.
- Checked: REVISE, opened all 14 headers and importers; "each opens with as relamp.js" was only true of recamp, reworded.

##### C-4 Small tile helpers copied across files
- Where: `same` in src/core/flank.js:14, relic.js:13, cache.js:13, guano.js:10, scatter.js:9, sized.js:14, pack.js:10, guarding.js:18, unguarded.js:13, cave.js:517; `dist` in scatter.js:10, cave.js:518, sized.js:15, pack.js:11, unguarded.js:14; `key` in wary.js:17, sized.js:16, unguarded.js:15 (a string) and cave.js:514 (a number)
- Against: none (a risk)
- What: new steps copy "same tile", "tile distance" and "tile key" into their own files; the two kinds of `key` return different things, a silent mix-up if someone later shares them.
- Seen: measured: `grep -rnE "const (same|dist|key) = " src` = 10, 5, 4 at top level.
- Who: none (players) — dev time
- Fixes: 1) One `src/core/tile.js` with `same`, `dist`, `tileKey`, used by new files, older ones moved at audits; 2) a line in TECH.md; 3) leave it.
- Checked: KEEP, grep re-run; lowest of the kept.

##### C-5 Boss rules check the creature's id in several files
- Where: src/main.js:314, src/core/beaten.js:14, src/render/frame.js:355, src/core/arena.js:55, src/core/bossbench.js:42 (dev); one rule file per boss step (call.js, snuff.js, wary.js, flank.js); docs/TECH-2.md:61-67 (a creature's list)
- Against: docs/TECH.md:44-46 (D-261) "Add content as registry data, not special cases in the rules"
- What: the Lampeater's rules are found by `e.id === 'lampeater'` in at least 5 files outside its enemies.js entry (feats.js, settings.js, sound.js only list it as data, which is fine). A second boss would have to find and copy each check. Most other content does go through the registry (registry.js).
- Seen: read; `grep -rlE "'lampeater'" src` = 10 files, 5 of them rule checks.
- Who: none (players) — dev time, when a second boss comes
- Fixes: 1) When the second boss is planned, move the checks into a `boss: {...}` field on its enemies.js entry; 2) gather a boss's step files in `src/core/boss/`; 3) no change now.
- Checked: REVISE, the quote is TECH.md's summary of D-261, not D-261's text; narrowed the 10 files to the 5 real rule checks.

#### Dropped
- C-5 (original) Each step also edits about 10 record files: counts are true (40/40 history, PROGRESS, CHANGELOG; median 17 files), but tools/release.js writes most of them, the history is lazy since D-868, and its own recommended fix is "keep as is", so nothing for the owner to decide.

### As found: area E
#### Area E: the Lampeater
Looked at: every Lampeater rule D-940 to D-978 against arena, call, guarding, wary, snuff, brood, flank, beaten, save and bossrun; ran bossrun (Lean 35%, Middling 84%, Strong 94%, same as PROGRESS.md) with a per-turn rule checker over 300 fights (no two on a tile, never over 6 gloamlings, phases never missed: 0 hits), a save/load round trip each turn (0 differences in 146 turns), 9-to-3 with 2 and 6 gloamlings out, leaving and coming back mid-call (comes back whole), beating it mid-call (gloamlings gone, door open, Leap given). Not covered: the sound, the cutscene and the bar drawn in play (I only got as far as the hallway on an iPhone 13 and no errors came up; "too wide" lines are already checked by tests/lines.test.js), guards with 6 out (the bot rarely gets there).

##### E-1 A phase blow starts "wary" before the debt is counted
- Where: src/core/snuff.js:40 and :75 (the debt is counted after the creatures move), src/core/creatureturn.js:234-240, src/core/wary.js:20, src/core/call.js:33
- Against: D-978 "owing or breathing, it neither calls nor is wary"; "so 2 from that blow"
- What: On the very turn a blow takes it to 8 or 4 hearts, the creatures move first and see "struck, owing nothing yet", so it turns wary (or steps toward a cold brazier) and only then the snuff is owed. Its 3 wary turns run out during the 2 breath turns and clear the struck mark, so the phase's second gloamling call, or the 3 wary turns D-978 says follow the snuff when no other brazier is cold, never happen; the wary line is also overwritten by the breath line.
- Seen: ran: scratch/work/E/b.mjs p1 (4 braziers lit, 8 hearts, struck): turn 0 shows breath and wary 2 together, struck is gone by turn 2, no call, no second wary. tests/call.test.js:82 only tests it with `owes` already set, so it misses this path.
- Who: some (anyone who has lit all the braziers or has 6 gloamlings out when the phase blow lands)
- Fixes: 1) count the phase inside the blow (in hitEnemy, or run `owed` before the creatures move) so every later check sees the debt 2) leave it and change D-978's words to match

##### E-2 CONTENT-BOSSES.md still says 8 hearts and stops at D-973
- Where: docs/CONTENT-BOSSES.md:9 (the Lampeater row); src/core/enemies.js:121-122
- Against: D-950 "12 hearts"; D-971, D-972, D-974, D-976, D-977, D-978
- What: The one doc "before adding content" for a boss gives Hearts 8, and its Ways and Decisions cells say nothing of the calls, guards, wary, phases or the 6-gloamling limit. The Bestiary words in enemies.js also leave out the guards (D-976).
- Seen: read (the table row against `health: 12` and `calls: { turns: 2, most: 6, ... wary: 3 }`)
- Who: few players; dev time (a conversation that trusts the row will build on the wrong hearts)
- Fixes: 1) put the row right: 12 hearts, add calls, guards, wary, phases and D-974 to D-978 2) shorten the row to a pointer at enemies.js and the decisions so it cannot drift again

##### E-3 Lampeater decisions fill DECISIONS.md, 109 bytes from its cap
- Where: docs/DECISIONS.md:80-190 (D-971, D-972, D-975, D-977, D-978 are about 7.8 KB of 12 KB); docs/OPEN-QUESTIONS-3.md (7677 of 8192)
- Against: CLAUDE.md "No doc over 8 KB, except docs/DECISIONS.md (12 KB)"
- What: DECISIONS.md is 12179 bytes of 12288, so the next decision (the drop and card, the sound) forces an archive move in the same PR, and each Lampeater step so far has moved the one before it word for word. Every conversation reads all of it at the start.
- Seen: measured: wc -c, awk sizes per decision (D-971 1796, D-972 2272, D-975 1192, D-977 1410, D-978 1157)
- Who: none (players); context and dev time
- Fixes: 1) move D-971 and D-972 now (they are built and their rules live in the code and tests) with a one-line pointer each 2) have the step PR that finishes the fight archive the whole Lampeater run at once

##### E-4 Waiting bowls count toward the 6 even after the brazier is lit again
- Where: src/core/brood.js:25-40 (crawl never checks the bowl is still cold), src/core/call.js:22-25 (broodCount counts `bowls`)
- Against: D-972 "counting any waiting in a bowl"
- What: A gloamling waiting in a bowl (no dark tile beside it) stays in the list if the hero kindles that brazier; a lit bowl keeps its light on every tile beside it, so it cannot crawl out and keeps using one of the 6 slots, which can leave the Lampeater wary where it would have called.
- Seen: read (no run; I did not build the lit-bowl case)
- Who: few players
- Fixes: 1) drop a waiting gloamling when its brazier is lit (or let it out onto the lit tile) 2) leave it and say so in D-972

### As checked: area A
#### Area A: what a conversation reads at its start, and how it grows
Looked at: sizes of CLAUDE.md, PROGRESS.md, the start hook, DECISIONS.md and its archive index; which docs the last 25 merged PRs (0.3.396 to 0.3.420) touched; doc sizes at 0.3.380, 0.3.400, 0.3.420. Not covered: whether each doc's words are right, the code docs' accuracy, and the real token counts (bytes only, about 4 bytes a token).

##### A-1 PROGRESS.md: over half of it is rarely needed
- Where: docs/PROGRESS.md:42-48 (Build plan, 912 bytes), :24-40 (five "Waiting" bullets, 1230 bytes)
- Against: PROGRESS.md:3 "Keep this file under 4 KB"; :43-44 "move ticked steps there at each audit"
- What: the file is 4094 of 4096 bytes. The Build plan's two items (19, 26) are still unticked, but every sub-step listed has a merged version except "more flowers (Q-092)", so about 0.9 KB is a list of done work. Five "Waiting" bullets (Any time, Each its own step, Later, Sounds, the lab) mostly repeat Q-numbers held in OPEN-QUESTIONS*.md, but not all: the vault door and rune wall sound (D-895, D-929) is written nowhere else, and the older-iPhone check (H-22) is only in STORE.md.
- Seen: measured: awk per section; grep of every Q in those bullets (all found in OPEN-QUESTIONS*.md); grep "vault" in SOUNDS*/OPEN-QUESTIONS* (no such wish).
- Who: none (players). Context: every conversation reads it; about 2 KB (500 tokens) saved each time, and the 2-byte margin stops forcing a trim.
- Fixes: 1) Move the done sub-steps of items 19 and 26 to archive/PROGRESS-LOG.md word for word, keeping "26: more flowers (Q-092)" open; first add the vault door sound wish to OPEN-QUESTIONS, then turn the five bullets into one line "Later and any-time questions: OPEN-QUESTIONS*.md" (about 2 KB left). 2) Only trim the build plan (about 0.8 KB). 3) Make the audit check the plan against the log each time.
- Checked: REVISE, line numbers were wrong (35-39, 14-33); items 19/26 are open, not merged; two Waiting items would be lost by fix 1 as written.

##### A-2 CLAUDE.md: the routing table is 42% of the file
- Where: CLAUDE.md "Where things live" (3448 bytes of 8106; 86 bytes under the 8 KB cap)
- Against: CLAUDE.md "Read the smallest file that answers the question" and "Keeping context small"
- What: every conversation loads all 23 rows, but a step needs 2 to 4 (the last 25 PRs touched mostly OPEN-QUESTIONS-3, CONTENT-BOSSES, CONTENT-4, GLOSSARY-2, WORKFLOW, SOUNDS*). 27 of 61 docs are not named; most are reached through their family's lead doc (GLOSSARY.md names -2, -HERO, -HOME; WORKFLOW.md:8-10 names -3 to -7), so these are two-hop routes, not holes.
- Seen: measured: awk section size; loop of every docs/*.md name against CLAUDE.md; grep of the lead docs for the unnamed ones.
- Who: none (players). Context: every conversation, about 2 KB (500 tokens) if fix 1 is taken.
- Fixes: 1) Move the full table to a new docs/INDEX.md naming every file, and keep in CLAUDE.md one short line per family plus "full list: docs/INDEX.md" (saves about 2 KB at the start; a step then reads INDEX.md only when its route is not obvious). 2) Keep the table, but shorten each description (saves about 1 KB). 3) Let each "Next up" name its docs, so the table is read less.
- Checked: REVISE, re-measured (3448 bytes, 23 rows); GLOSSARY-HOME is 3.6 KB not 11, Leap is in GLOSSARY-HERO, and the "holes" are routed via lead docs.

##### A-3 DECISIONS.md: a third of it is old process rules
- Where: docs/DECISIONS.md:14-79 (nine old decisions, 3858 bytes) and :80-105 (D-971, 1796 bytes); cap 12288, now 12179
- Against: D-338 "Audits lose nothing" (moving word for word is allowed); DECISIONS.md:3 "Every settled decision, oldest first" with older ones "archived but still in force"
- What: D-338, D-363, D-431, D-518, D-732, D-741, D-790, D-852, D-923 stay at the top of the "newest decisions" file; the seventeenth audit (0.3.393) archived others but kept these, with no written reason. Their rules are restated in CLAUDE.md or PR-CHECKLIST.md. 23 of the last 25 PRs edited the file, so each reads all 12 KB; it is 109 bytes from the cap, and release.js:13 warns from 11 KB.
- Seen: measured: awk by line range; git diff --name-only on the last 25 merges (23 touched DECISIONS.md).
- Who: none (players). Context: about 3.9 KB (1K tokens) less read in nearly every PR, plus room before the cap.
- Fixes: 1) Move the nine to an archive file word for word, add its index row, and keep one line: "Process rules: grep the archive for D-338, D-363 ...". 2) Move each decision to the archive once its step is done (D-971 when the Lampeater ends). 3) Lower the warning to 8 KB so moves come before the cap.
- Checked: KEEP, line ranges, bytes and the 23-of-25 count re-measured; no decision found saying these must stay.

##### A-4 The archive index's biggest row is hand-edited most PRs
- Where: docs/archive/README.md:26 (the DECISIONS-SURFACE row, 5773 characters: IDs cell 1031, "What" cell 3914); tests/docs.test.js:27-31
- Against: D-336 "one index of the archive" (the test only checks file names); README.md:3-4 already says "grep -n "D-123" docs/archive/DECISIONS-*.md"
- What: README.md changed in all 25 sampled PRs: release.js edits the changelog row by itself (release.js:157-164), and 18 PRs also hand-added IDs and a topic phrase to the SURFACE row (0.3.420 added D-939, D-974, D-976 and three topics). Every decision header is `**D-nnn ·`, and D-001 to D-978 are each present exactly once, so grep alone finds any decision. The index is 22 KB if opened, and 28 old IDs are not listed against the file that holds them.
- Seen: ran: work/A/cov.js (978 headers, no duplicates, 28 not indexed); grep -ho '^\*\*D-[0-9]*' | sort -u (978, max 978); git diff -U0 of the 0.3.420 merge.
- Who: none (players). Context and dev time: smaller diffs, less hand-editing, no risk of reading the 22 KB index.
- Fixes: 1) Change the SURFACE row to "D-209 to latest, scattered; grep" and its topics to a short phrase, so PRs stop editing it; repeat the grep line in DECISIONS.md:7. 2) Keep the index but ranges only. 3) Add a test that every header matches `**D-nnn ·` so grep stays reliable.
- Checked: REVISE, the IDs cell is 1031 not 3914 (that is the topics cell); part of each edit is release.js's own; the grep hint already exists.

##### A-5 Six docs are within 110 bytes of their cap
- Where: docs/PROGRESS.md (2 bytes spare), docs/WORKFLOW.md (13), docs/SOUNDS-3.md (64), docs/CONTENT-4.md (75), CLAUDE.md (86), docs/DECISIONS.md (109); also PUZZLES.md (288), OPEN-QUESTIONS-3.md (515)
- Against: tests/docs.test.js:6-7 and :18-24 (8 KB, 12 KB, 4 KB caps); CLAUDE.md "Archive or split when a doc gets close"
- What: the next PR touching any of these must trim or split first. Growth 0.3.380 to 0.3.420: OPEN-QUESTIONS-3 4676 to 7677 (touched by 20 of 25 PRs; at about 60 bytes a version lately, its cap comes near 0.3.428), CONTENT-4 6555 to 8117, SOUNDS-3 7777 to 8128, WORKFLOW 6846 to 8179 since 0.3.400. The next audit is 0.3.433, so these hit their caps before it.
- Seen: measured: git cat-file -s at 67d8774 (0.3.380), 78c77e2 (0.3.400) and the 0.3.420 merge.
- Who: none (players). Dev time: a split in the middle of a step, a new file, one more route.
- Fixes: 1) Plan the splits now, as one step: CONTENT-4 and SOUNDS-3 each to a new part, the Lampeater's open questions when its polish ends. 2) Give WORKFLOW.md's "Since the last audit" (line 100) its own file. 3) Raise the cap to 10 KB for docs read in pieces.
- Checked: REVISE, bytes and growth re-measured; PUZZLES has 288 spare, not within 100, so the count is six.

##### A-6 What a normal PR reads, and how the docs grow
- Where: CLAUDE.md, docs/PROGRESS.md, docs/PR-CHECKLIST.md (4870), docs/DECISIONS.md, then the step's docs
- Against: CLAUDE.md "Keeping context small"
- What: the four files every PR reads are 29,249 bytes (about 7.3K tokens). A boss step adds OPEN-QUESTIONS-3, CONTENT-4, CONTENT-BOSSES, GLOSSARY-2 and often WORKFLOW: about 59 KB before any code. A-1 to A-3 bring the four to about 21 KB. Live docs grew 310,207 to 330,104 bytes in 40 versions (57 to 62 files); the archive 1.16 to 1.25 MB, which costs nothing unless opened.
- Seen: measured: wc; git ls-tree -r -l at 67d8774 and the 0.3.420 merge.
- Who: none (players). Context: yes.
- Fixes: 1) Do A-1 to A-3 first. 2) Let each audit report these four numbers so growth is seen. 3) Check whether PR-CHECKLIST.md repeats what release.js now does (D-572) before trimming it.
- Checked: REVISE, totals re-measured and match; trimmed, as its first fix is A-1 to A-3.

##### A-7 Five audit-lesson files stay live, one more each audit
- Where: docs/WORKFLOW-3.md to WORKFLOW-7.md (24,141 bytes); docs/WORKFLOW.md:8-10, 95-98; CLAUDE.md WORKFLOW row
- Against: D-782 and D-338 (moved word for word); CLAUDE.md row "each audit's lessons in -3 and -4"
- What: WORKFLOW-3 to -7 each hold one audit's lessons, about 5 KB, a new file every 40 versions. Only an audit reads them, and their own headers say the rules in force are in CLAUDE.md and PR-CHECKLIST.md. The CLAUDE.md row is out of date (names -3 and -4 only); WORKFLOW.md routes -5 to -7. The whole family is 38.9 KB in 7 files.
- Seen: read: WORKFLOW-7.md:1-5; measured: wc -c; grep of who names WORKFLOW-5..7.
- Who: none (players). Context and dev time: fewer live files, a shorter route.
- Fixes: 1) Move WORKFLOW-3 to -7 to archive/ word for word (one index row, grep only); later audits write their lessons there. 2) Merge them into one archive file per five audits. 3) Leave them, and fix the CLAUDE.md row to say "-3 to -7".
- Checked: REVISE, family is 38.9 KB in 7 files, not 46 KB in 8; -5 to -7 are routed via WORKFLOW.md.

#### Dropped
None dropped. A-6 trimmed as it mostly sums A-1 to A-3.

### As checked: area J
#### Area J: the docs against the game (checked)
Looked at: every registry entry (152) against GLOSSARY*/CONTENT* by script; creature hearts/bite rows vs enemies.js; SOUNDS*.md vs sound.js and the sounds folder; decision IDs cited vs defined; the 0.3.329-0.3.420 additions; OPEN-QUESTIONS, BUGS, HEALTH-CHECK*, DEV-TOOLS, TECH-2, README, STORE. Not covered: every wording in lines*.js against the glossary (only D-970 to D-978 quotes spot-checked); art docs.

##### J-1 The Lampeater's calls, guards, wary and phases are undocumented
- Where: docs/CONTENT-BOSSES.md:11; docs/GLOSSARY-CREATURES.md:27; docs/CONTENT-CREATURES.md:13; src/core/enemies.js:121; src/core/call.js, guarding.js, wary.js, snuff.js
- Against: docs/TECH-2.md:54-56 "A new row goes in `docs/CONTENT.md` ... its word in `GLOSSARY.md`"; D-950 "The Lampeater on 12 hearts"
- What: CONTENT-BOSSES gives the Lampeater 8 hearts; the code has `health: 12` (D-950). Its row (2.1 KB) covers flanking and the starting brood, but nothing in any CONTENT*.md or GLOSSARY*.md describes the brazier snuffing (D-947), calls (D-974), guards (D-976), wary (D-977) or phases (D-978); those decisions are cited by no CONTENT or GLOSSARY file. PR-CHECKLIST.md never names CONTENT, GLOSSARY or SOUNDS rows, so 0.3.417-420 skipped them. Every other registry entry is documented.
- Seen: ran: $S/work/J/hp.mjs, reg2.mjs; checker grep: `grep -ln "D-947\|D-974\|D-976\|D-977\|D-978\|D-950" docs/*.md` finds only DECISIONS, OPEN-QUESTIONS-3, PROGRESS
- Who: none (players); context and dev time (the next Lampeater step starts from a wrong sheet)
- Fixes: 1) fix the hearts, add one short paragraph on snuffing, calls, guards, wary and phases to CONTENT-BOSSES and the glossary, a word on the gloamling row, and add "its CONTENT, GLOSSARY and SOUNDS rows" to PR-CHECKLIST.md 2) leave it for the 0.3.433 audit
- Checked: REVISE, re-grepped the row and docs; snuffing (D-947) is also missing; flanking/brood already present, so the gloamling note is minor

##### J-2 Docs still describe the falling floor D-967 removed
- Where: docs/GLOSSARY-2.md:18; docs/SOUNDS.md:43; docs/OPEN-QUESTIONS-3.md:109-114
- Against: D-967 "No falling ground in the boss fight" (supersedes D-963 to D-966; archive/DECISIONS-SURFACE.md:2554); D-969 "Too wide to step. More lies beyond."; docs/CONTENT-4.md:52 already right
- What: The glossary's Gap is "where the floor gave way, round the arena's stairs down ... (D-964)", and SOUNDS.md's `giveWay` is "the floor gives way round the Lampeater's stairs (D-966)", both superseded. Q-114 quotes the Gap line as "Too wide to step across." (lines.js:351 now says "Too wide to step. More lies beyond.") and calls the Gap unused, though D-968 uses it before caches at depths 5-8 (leapgap.js).
- Seen: read; ran: `grep -rn floorGives src tests` shows only its definition (beaten.js:88), its line and tests/escape.test.js
- Who: none (players); context (a conversation planning the next gap or sound reads a wrong rule)
- Fixes: 1) correct the three entries to match CONTENT-4, D-967 and D-968/D-969, marking `giveWay` "kept, unused (D-967)" 2) leave until T4 uses falling ground
- Checked: REVISE, confirmed all three; dropped the old fix "delete `floorGives`": D-967 decided "The work is kept in the code, unused"

##### J-3 Done health-check findings still in docs/ and routed by CLAUDE.md
- Where: docs/HEALTH-CHECK.md (23 findings, 5358 bytes), docs/HEALTH-CHECK-2.md (24, 4672 bytes), docs/HEALTH-CHECK-ORDER.md (last line), CLAUDE.md:54
- Against: docs/HEALTH-CHECK.md:10 "moves to `archive/HEALTH-CHECK-DONE.md` at the next audit"; ORDER "Every step is done"
- What: All 19 steps were done by 0.3.328 (D-883); the audits at 0.3.353 and 0.3.393 left about 10 KB of finished findings in docs/, without their versions. CLAUDE.md's table still routes conversations to them "when Next up names one".
- Seen: measured: wc -c; `grep -c "^- \*\*H-"`; ls (HEALTH-CHECK-DONE.md holds only the 17 moved at 0.3.313)
- Who: none (players); context
- Fixes: 1) in this check's own PR, move both files' findings word for word into HEALTH-CHECK-DONE.md, keep ORDER, and point the CLAUDE.md row at the third check's steps 2) do it at the 0.3.433 audit
- Checked: REVISE, confirmed counts and sizes; dropped the archive README claim (that line is this branch's own addition)

##### J-4 Small stale doc facts
- Where: docs/DEV-TOOLS.md:22; src/dev/panel.js:36,216; docs/TECH-2.md:79; CLAUDE.md:52; docs/CONTENT-5.md:3-4; docs/STORE.md:40; sounds/packs
- Against: DEV-TOOLS.md:22 "sections, View, Spawn, Room, Oil, Hero, Share, Spots"; CLAUDE.md:52 "newer tiles and places in `-5`"
- What: The panel has a ninth section, Boss (panel.js:216), missing from DEV-TOOLS line 22 (it is described at line 85). TECH-2:79 still sends tiles and places to CONTENT-3 and "places now in `CONTENT-4.md`", while CLAUDE.md and CONTENT-5 (since 0.3.412) say newer ones go to CONTENT-5: two answers to "where does this row go", and CONTENT-4 has 75 bytes left. The sounds folder holds 701 files (23 MB) but the game plays 117 (9.9 MB); the packs are kept on purpose for picking sounds (SOUNDS.md:17), but STORE.md's "Needed" list never says to ship only the used ones.
- Seen: ran: $S/work/J/sz.mjs (used 117, 9,873,639 bytes); find/du on sounds/
- Who: none (players); few (a store build 13 MB heavier); context (the routing clash)
- Fixes: 1) add Boss to line 22, make TECH-2:79 name CONTENT-5 for new tiles and places, add a STORE line "ship only the sound files the game plays" 2) skip until the audit
- Checked: REVISE, confirmed Boss, sizes and the TECH-2/CLAUDE.md clash (moved here from old J-4, cited line corrected from TECH-2:54 to :79); dropped the "three registry names in no doc" claim

#### Dropped
- J-4 (original) Two files within bytes of their caps: duplicate of A-5 (and A-1, A-3 for PROGRESS and DECISIONS); sizes re-measured and match. Its one unique part, TECH-2's routing clash, moved into J-4 above.
- J-5 part "Unlit torch, Bare bush, Your bag in no doc": false; they are in CONTENT-2.md:74, CONTENT-3.md:19, CONTENT-2.md:41.
