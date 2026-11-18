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
- [x] B. A PR's overhead: the checklist, release, history, conflicts.
- [x] C. The code's shape: big files, boot, duplication, the rules.
- [ ] D. Tests and tools: speed, noise, what's slow or doubled.
- [x] E. The Lampeater's fight (0.3.381 to 0.3.420).
- [x] F. Leap, the crumbling floor, gaps, the archway, the seal hall.
- [ ] G. The Warden's Fist, vaults, the rune wall, shovel, doorways, flyers.
- [ ] H. Played as a player, on a phone and a PC, the screens since 0.3.329.
- [ ] I. Saves and speed: old saves, save size, frame time, boot.
- [x] J. The docs against the code since 0.3.329.
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

### As checked: area B
#### Area B: PR overhead and merge conflicts
Looked at: the last 40 merged PRs (0.3.381 to 0.3.420) by git numstat, follow-up commits, release.js, the in-game history files, the playtest tool, the two last audits. Not covered: GitHub-side CI or the PR body text.

##### B-2 Decisions archive has no guard; one PR nearly wiped it
- Where: docs/DECISIONS.md (12179 B of the 12288 cap, tests/docs.test.js:7); tools/release.js:127-133; docs/archive/DECISIONS-SURFACE.md (169,980 B, 2686 lines); no test in tests/ or tools/ mentions the decisions archive
- Against: D-572 "Decisions it only suggests ... Claude proposes the move" (the owner chose hand moves; this is their cost, not a broken rule)
- What: 37 of 40 PRs edit DECISIONS.md (about 37 changed lines each) and 27 of 40 append to DECISIONS-SURFACE.md by hand, word for word. In 0.3.414, commit 3700c2e replaced the whole 2566-line archive with 14 lines; the next commit (ca28066) restored it. Nothing in `npm test` would have caught it.
- Seen: measured: numstat of the 40 merges; `git show --numstat 3700c2e` (14 added, 2566 deleted in DECISIONS-SURFACE.md); grep of tests/ and tools/
- Who: none (players) — context, dev time and a data-loss risk
- Fixes: 1) A test that every D-id ever written appears exactly once across DECISIONS.md and the archive, and archive files never shrink (cheap, no decision changed) 2) A `release.js --archive-decisions` step that moves the oldest or superseded entries word for word (changes D-572: owner's call) 3) One archive file per 100 decisions so appends never touch a 170 KB file
- Checked: REVISE, re-ran numstat and inspected 3700c2e/ca28066; D-572 says hand moves are the owner's choice, so the auto-move fix needs their OK; the test fix moved first.

##### B-3 The Version history copies the changelog; its split is by hand
- Where: src/core/history-0.3*.js, history-0.2*.js, history-0.1.js, history-0.0.js, history-all.js:3-18; tools/release.js:81-83; tests/history.test.js
- Against: D-254 "Every PR adds its lines to `src/core/history-0.2.js` ... as well as to `CHANGELOG.md`; a test fails if the two differ" (the copy is the owner's design)
- What: 396,021 bytes in 15 history files repeat the 341 KB of changelog files. release.js writes each version's block, but at audits the history file is split by hand and history-all.js's import list edited by hand (0.3.393 added history-0.3-6.js, +270 lines). The game loads it lazily (history.js:4-11, D-868), but the packed playtest carries it: 396 KB of 2.08 MB (19%).
- Seen: measured: wc -c src/core/history*.js and the changelog files; `node tools/playtest.js` to $S/work/B-check/p.html (2,075,607 B); numstat of 230944c
- Who: none (players) — context, dev time, playtest size
- Fixes: 1) Let release.js start a new history file and add its import when the current one passes a size, so audits no longer split by hand (keeps D-254 as is) 2) One source: the Version history page reads the changelog markdown files, and the js copies move to the archive (changes D-254; the md files must then ship with the game for offline play, STORE.md)
- Checked: REVISE, sizes re-measured; D-254 makes the copy deliberate, so the no-decision fix goes first; dropped "stop committing a hand-edited copy" (release.js already writes it).

##### B-1 Bookkeeping is about half of every PR's changed lines
- Where: tools/release.js; docs/PR-CHECKLIST.md:10-45; CHANGELOG.md, docs/PROGRESS.md, docs/DECISIONS.md, src/core/history-0.3.js, src/core/version.js, docs/archive/{CHANGELOG-STAGE-0.3-1,PROGRESS-LOG,README}.md
- Against: CLAUDE.md "Keeping context small"
- What: Over 40 PRs, docs and record files average 11.3 files and 132 changed lines per PR, against 4.6 code files (58 lines) and 1.5 test files (48 lines). Seven files change in all 40 PRs (version.js, PROGRESS, history-0.3.js, CHANGELOG, 3 archive files): 53 lines per PR, mostly the tool's copy and moves; DECISIONS.md adds 37 more, which are the owner's real decisions.
- Seen: measured: `git diff --numstat $m^1 $m` for the 40 merges, $S/work/B-check/num.txt
- Who: none (players) — context and dev time
- Fixes: 1) B-3's fix 1 and B-2's fix 1 2) release.js refuses (exit 1) when PROGRESS.md passes 4 KB, so the cap is met before the push (0.3.420 needed a follow-up commit, 1840cad)
- Checked: REVISE, re-measured: 7 not 9 files, about half not two thirds; release.js already writes the archive index row (D-572 "updating the archive index"); "keep 1 entry" dropped: each entry is moved once whatever the window, and KEEP 3 is D-572.

##### B-7 The audit moves text by hand; tests take 1m43s
- Where: docs/archive/PROGRESS-LOG.md:85 (0.3.393); tests/ (292 files, 2050 tests); package.json:6; CLAUDE.md (8106 of 8192 B)
- Against: D-518; D-338 "word for word"
- What: The 0.3.393 audit changed 571 added and 437 deleted lines in 22 files, mostly moves (history-0.3-6.js +270, WORKFLOW-7.md +59, CONTENT-CREATURES.md +48, GLOSSARY-HERO.md +46). Full `npm test` takes 103 s alone, run more than once per PR. CLAUDE.md, read by every conversation, has 86 bytes left under its cap.
- Seen: measured: `git diff --numstat 230944c^1 230944c`; `npm test` alone: 103 s, 2050 pass; wc -c CLAUDE.md
- Who: none (players) — dev time
- Fixes: 1) A `tools/audit.js` that lists docs near their cap and the bytes read at start, and does the history split (B-3 fix 1) 2) `npm run test:quick` = `node --test tests/docs.test.js tests/history.test.js tests/release.test.js` for record-only steps 3) release.js prints "audit due" at the "Next audit" version (0.3.433)
- Checked: REVISE, audit numbers confirmed; test time re-measured alone (103 s, not 2m27s, which overlapped another run).

##### B-6 No conflicts yet, but 7 files change at the same spot every PR
- Where: top of CHANGELOG.md, src/core/history-0.3.js top block, docs/PROGRESS.md log, docs/archive/*.md, src/core/version.js:1
- Against: CLAUDE.md "one PR per conversation" (PRs run one at a time today)
- What: Every merge in the 40 is a plain "Merge pull request"; no branch ever merged main back in. If two conversations ever run at once, those 7 files (and DECISIONS.md) conflict every time, and both PRs claim the same version number.
- Seen: measured: `git log --merges` shows only PR merges
- Who: none (players) — dev time only if two PRs run at once
- Fixes: 1) A rule in PR-CHECKLIST: on a conflict, take main's copy of the tool-written files, re-add this PR's own changelog and log entries by hand under a new version, then re-run `node tools/release.js` 2) Fewer shared files (B-3 fix 2)
- Checked: REVISE, 7 every-PR files not 9; the original fix ("take main's copy and re-run") would lose the PR's hand-written entries; merge=union dropped (could interleave word-for-word blocks).

#### Dropped
- B-4 Playtest republish and its link: too weak; 1 link-only commit in 40 PRs, the same-link rule within a PR already exists (PR-CHECKLIST:60), and a standing link across PRs would make every old log link (D-074 "The playtest link goes in the log entry") show the newest game; D-073/D-256 don't say what was claimed.
- B-5 Follow-up commits: too weak (1 avoidable follow-up in 40 PRs); its one fix folded into B-1 fix 2.

### As found: area F
#### Area F: Leap, the gaps, the archway beyond
Looked at: Leap (rules, button, J, touch), the first Leap gaps (3,511 gap rooms over seeds 1-1500, depths 5-8), the archway and the room beyond (walk through, save/load, fall), the arena's gloamlings (300 seeds), the unused falling-floor code, the docs for them; the 46 tests for these pass. Not covered: the Lampeater's calls/phases, sounds by ear, the Leap card (D-971 step not built yet).

##### F-1 Settings still lists a sound that can never play
- Where: src/core/settings.js:89 (`giveWay`, "Floor gives way"), src/render/sound.js:183-185, src/render/moments.js:27, src/main.js:217,291
- Against: D-967 "its Settings line" kept "for a later falling floor" | none (a player sees a switch for nothing)
- What: Settings > Sounds > Steps shows "Floor gives way: On/Off", but nothing in the game raises the `giveWay` event now (`floorGives` in beaten.js:88 has no caller). The owner chose to keep the code; the player-visible switch is the odd part, and the quake, crumble and sound code is read by every conversation that touches sound or the arena.
- Seen: ran: `soundsOf('steps')` lists "Floor gives way"; grep finds no caller of `floorGives`
- Who: few players (a dead switch); dev time and context (about 150 lines: crumble.js, floorGives, quake, 3 sound entries, tests/escape.test.js)
- Fixes: 1) hide the Settings line until a falling floor exists (keep the rest) 2) move the dead code and tests/escape.test.js to a parked folder with a one-line note in TECH.md 3) leave as is

##### F-2 Glossary says the Gap is still the arena's escape
- Where: docs/GLOSSARY-2.md:18; docs/CONTENT-4.md:52
- Against: D-967 "no falling ground in the boss fight"
- What: The Gap entry opens with "where the floor gave way, round the arena's stairs down once the Lampeater is beaten ... (D-964)", which D-967 undid; the real Gap now is only the line before a cache at depths 5-8 (its own sentence is last). CONTENT-4 correctly says arena stones only in old saves, so the two docs disagree.
- Seen: read
- Who: dev time (a conversation reading the glossary builds on a removed mechanic)
- Fixes: 1) rewrite the Gap entry to lead with the depth 5-8 line and mention the arena only as "old saves" 2) add "superseded by D-967" beside D-964

##### F-3 Leap and J are not in How to play
- Where: src/core/howto.js:62-90 (keyboard page lists Walk, Wait, Lantern, Pause, Frame, Bag, Map; touch page the same)
- Against: D-962 "J does the same" and the Leap button (no doc says How to play must list it)
- What: Today Leap is taught only by the line "You learn Leap." and, at a Gap, "Too wide to step. Leap it." Nothing says to tap the round button, or press J, and then pick a way. D-971's card will teach it, but until that step, and for anyone who closes the card, the Help pages have no row.
- Seen: read; played (phone and PC): the button and J work, nothing explains them
- Who: some players (everyone who beats the Lampeater)
- Fixes: 1) add one "Leap" row to each page ("The Leap button, then a way" / "J, then a way") when Leap is learnt, with the Leap card step 2) leave it to the card (D-971) and note that in Next up

##### F-4 "Leap which way?" stays on the strip after the leap
- Where: src/main.js:409-412 (sets the line), src/core/leap.js:24-28 (a leap says nothing)
- Against: D-962 "Leap which way?" is the prompt, nothing on when it goes
- What: The prompt line lasts its normal turns (`shownLine`, LINE_TURNS), so after a successful leap, and after cancelling, it still reads "Leap which way?" as if still asking. Tapping the button, leaping and screenshotting 1 s and 4 s later shows it on both phone and PC (the button itself correctly un-presses).
- Seen: played (iPhone 13 and 1366x768, saves built at the gap room)
- Who: most Leap users, a small confusion
- Fixes: 1) clear the line when the leap is taken or let go (if the line is `leapWhich`) 2) say the line only on first use of each journey

##### F-5 Gaps leave extra finds and creatures behind, not just the cache
- Where: src/core/leapgap.js:57-62 (only the cache's 2-3 finds are checked)
- Against: D-968 "its cache behind a line of Gap tiles" "every find out of walking reach"
- What: Everything else standing in the cut-off corner is cut off too. Over 3,511 gap rooms: 521 (15%) have a creature behind the Gap, and many have 4-5 finds there (flask, herb, bat guano) against a cache of 2-3. Bats fly over; ground creatures sit there for ever. Stairs, people and waystones were never cut off (0 of 3,511), and every gap room has exactly one Archway.
- Seen: ran: work/F/scan.mjs in the scratchpad (seeds 1-1500, depths 5-8)
- Who: few players; matters when the owner next tunes how rich a cache is (Q-115)
- Fixes: 1) leave as is but write in D-968/CONTENT-4 that the whole corner is behind the Gap 2) check the whole corner is empty of non-cache finds and creatures, or move them out

##### F-6 tests/beyond.test.js is about something else
- Where: tests/beyond.test.js:1-30 (tests `widen` past room edges, D-403); the Archway tests live in tests/leapgap.test.js:91-150
- Against: none (a risk)
- What: src/core/beyond.js is the Leap place; the test with the same name tests rock past a room's edge. A conversation on "the place beyond" opens the wrong test and finds no archway tests, then may write a duplicate.
- Seen: read
- Who: dev time
- Fixes: 1) rename the old test to openings.test.js (or widen.test.js) and put the archway tests in beyond.test.js 2) note it in docs/TECH-2.md's tests list

##### Checked and fine (no finding)
Leap blocked by a wall, sealed door, off the map edge or a leap that would land on water, creature, person or Gap: free, right line; landing on a find takes it (full bag says so); on stairs takes them; with 0 oil, unlit, poisoned, a draught or a line out: one turn as a step; over a sleeping or chasing creature (it still bites). Arena: 4 braziers each with 1 gloamling on its outer side in 300 seeds (D-971). The Archway round trip, save and load while beyond, and a fall from beyond all work; gap rooms cost about 5 ms (23 worst). Leap button 44x44 css px, left of the quick slot, on the lantern arc (phone); J, then an arrow, W/A/S/D or tap works. Leap is lost on a hardcore fall as D-962 says; there is no "falling floor" anywhere in play now, so crumble, waiting and its save/load cases cannot happen.

### As found: area I
#### Area I: Saves and speed
Looked at: save/profile/aside code and the 2 old fixtures; round trips of boss, beaten arena with gap, and vault states; save size and time; page load, frame times (iPhone 13 and 4x slower CPU), sounds on/off. Not covered: a real phone's battery or GPU (headless Chromium draws in software, so ms numbers are high but compare fairly), the Sound-On network cost with browser caching on a real host.

Checked and fine: journey save format is 37 (profiles 11); the oldest save (format 1) goes through 36 steps, the two fixtures through 27 and 21. Steps 32 to 36 each have a test (resettle, refetch, wardenFist, arena, lampeater). Saved mid-boss-fight (boss hit, 11 health), at the beaten arena, with the floor given way, and in a vault with 1 and 2 braziers lit all load back deep-equal (`$S/work/I/rt2.mjs`). The two old fixtures upgraded, played 60 steps and saved back equal (`work/I/play.mjs`). Every localStorage use (save, profile, spots, settings, aside, dev, record) is in try/catch. With Sound Off, 0 sound files were fetched (0.3.322 holds). Three profile slots of 65-room journeys use about 0.27 MB of the ~5 MB limit; all 463 rooms of depths 1 to 40 is 0.71 MB, so 3 full slots is about 2.1 MB.

##### I-1 The speed check never measures a dark room
- Where: tools/perf.js:67-89,106-110; docs/TECH.md:23-29; src/render/frame.js:342-349
- Against: D-430 "16.7 ms a frame" and the light "at most 8 ms" (TECH.md "Frame budget")
- What: perf.js plays only the daylight surface, where the lantern light is not drawn, so its "light" number is 0.0 ms and it reports 3.6 ms a frame. In a dark big room on the same 4x slower processor, walking took 26.2 ms a frame (38 fps), with single frames of 400 ms; in the boss arena 21.7 ms (46 fps). Any drawing change in the dark can pass the check unseen.
- Seen: measured: `node tools/perf.js 4` gives standing 58 fps, 3.6 ms, light 0.0; my `work/I/frames.cjs 4 phone`: walk-bigroom 38.2 fps mean 26.2 ms p95 50 max 400; walk-arena 46.1 fps; idle-bigroom 57.3 fps.
- Who: some (phones, dark floors, where the game is mostly played); dev time
- Fixes: 1) let perf.js load a saved dark-room scene (journey text built by game modules, as I did) and report the light number there 2) add the boss arena as a third scene 3) keep as is, and accept the surface number as a floor

##### I-2 It redraws 60 times a second even when nothing changes
- Where: src/main.js:614-624; src/render/frame.js:265-271
- Against: none (a risk; phones, battery)
- What: the loop asks for a new frame every time and `draw` clears and repaints everything each frame, on the title, in play, standing still, and with the pause card open (no "nothing changed, skip" path). Saving is already skipped when the state is unchanged (main.js:138), but drawing is not.
- Seen: measured: headless phone, 10 s each, 60 fps in all: title busy 197 ms of every second, standing in the woods 136, in the arena 249, paused 91; at 4x slower busy was 458 to 959 ms a second, even paused 458.
- Who: most (phone battery and heat on long sessions)
- Fixes: 1) when paused or on a still card, draw one frame then ask for the next only on input or a timer 2) lower the rate to about 30 fps when nothing moves (the flame flicker is the only motion) 3) leave it, and note it in docs/TECH.md as accepted

##### I-3 Sound On fetches each sound file about 3 times
- Where: src/render/sound.js:281-290 (`fetchAll`), 65 (`FILES`)
- Against: D-877 "saves phone data" (changelog 0.3.322)
- What: `fetchAll` fetches every file of every voice at the first tap, with no check for a file that two voices share. 143 voices list 314 file entries but only 111 different files (3.35 MB counted per entry, 1.35 MB different).
- Seen: measured: Sound On, a woods room, 12 key presses: 315 sound requests, 112 different names; Sound Off: 0. `work/I/snd.cjs`, `work/I/dup.mjs`.
- Who: some (Sound On players on a phone; the browser cache may hide part of it)
- Fixes: 1) keep one decoded buffer per file path and share it between voices 2) also fetch the steps and fight sounds first and the rest when first needed

##### I-4 Tests pin the exact format number, so the next save change breaks two
- Where: tests/lampeater.test.js:150; tests/freepick.test.js:43
- Against: none (a risk; conflicts); other upgrade tests use `FORMAT >= n`
- What: `assert.equal(FORMAT, 37)` and `assert.equal(FORMAT, 11)` (profiles) fail the moment a later step raises the format, so the next PR that changes a save must also edit an old test. Every other step test uses `>=`.
- Seen: read: grep `FORMAT, ` in tests/.
- Who: none (players); dev time
- Fixes: 1) change both to `>=` and keep the `UPGRADES[36]` check 2) leave the check in the newest test only

##### I-5 No fixture covers steps 17 to 36 end to end
- Where: tests/saves/ (format 10 and 16 only); tests/refetch.test.js:15-24; src/core/save.js:36-71
- Against: D-266 "one numbered step at a time"
- What: only two old saves exist, and the only test that loads them checks one thing (the Peddler's place). Steps 17 to 36 are tested one by one, never chained from a real old save to today's state and then played. My run showed both fixtures survive (27 and 21 steps, 60 turns, round trip equal), so this is a missing guard, not a bug found. Step 29 to 30 (`withKnown`) has no test of its own.
- Seen: ran: `work/I/chain.mjs`, `work/I/play.mjs`; grep of tests for each step name.
- Who: few players (anyone with a very old save); dev time
- Fixes: 1) a test that loads each fixture, steps 20 turns, saves, loads and compares (my play.mjs is the base) 2) add a newer fixture (format 30+) saved by the real game whenever a step is added

##### I-6 Saves rewrite the whole world each turn and set-aside copies never go
- Where: src/core/save.js:131-139; src/core/aside.js:15-18; src/main.js:136-141
- Against: D-880 "set aside" (nothing reads them back yet, aside.js:3)
- What: a fresh journey is 26 KB; 65 rooms is 91 KB, of which `elsewhere` is 87%; all 463 rooms of depths 1 to 40 is 707 KB, and one write took 24 ms on this machine (parse 68 ms), so about 100 ms a turn on a slow phone for a very deep journey. Separately, each broken or newer save is copied whole under a new key forever, never trimmed, so on a full store the copy can push out the real save (save then returns false and the warning line shows).
- Seen: measured: `work/I/rt2.mjs` (sizes, stringify and parse times); read: aside.js.
- Who: few players (very long journeys); context (the whole state in one text)
- Fixes: 1) keep as is until a measured slow turn, but cap the set-aside copies at 1 or 2 per slot 2) later, save each room under its own key and rewrite only the one changed

##### I-7 The first page load is 300 separate files
- Where: index.html (module entry), src/main.js; tools/pack.js (already packs for the playtest)
- Against: CLAUDE.md "no build step" (a trade-off, not a break)
- What: the page loads 300 requests (299 JS modules), 1.63 MB uncompressed, before the first draw; biggest are main.js 51 KB, lines.js 50 KB, frame.js 44 KB. On localhost the first drawn frame came at 0.6 to 1.7 s; every module is a separate trip on a slow phone connection.
- Seen: measured: `work/I/load.cjs` (iPhone 13 and 1366x768, same count both).
- Who: some (first visit on mobile data; later visits depend on the host's caching)
- Fixes: 1) leave it, and check the live host sends compression and cache headers 2) publish the already-existing packed single file (tools/pack.js) as the store/offline build, as D-590's checklist may want

### As checked: area F
#### Area F: Leap, the gaps, the archway beyond
Looked at: Leap (rules, button, J, touch), the first Leap gaps (seeds 1-1500, depths 5-8), the archway and the room beyond, the arena's gloamlings, the unused falling-floor code, their docs. Not covered: the Lampeater's calls/phases, sounds by ear, the Leap card (D-971 step not built yet).

##### F-4 "Leap which way?" stays on the strip after the leap
- Where: src/main.js:409-412 (sets the line), src/core/leap.js:24-28 (a leap says nothing), src/core/lines.js:410 (LINE_TURNS = 5)
- Against: D-962 "Leap which way?" is the prompt; nothing says when it goes
- What: The prompt is an ordinary line that lasts 5 turns, so after a leap (and after cancelling) the strip still asks "Leap which way?" for up to 4 more turns.
- Seen: ran: work/F-check/leapline.mjs (say leapWhich, leap right, then 3 steps: the line still reads "Leap which way?"); played by the finder on phone and PC
- Who: most Leap users, a small confusion
- Fixes: 1) clear the line when the leap is taken or let go (if it is `leapWhich`) 2) say it only on first use each journey
- Checked: KEEP, reproduced with the game's own say/leap/step

##### F-3 Leap and J are not in How to play
- Where: src/core/howto.js:63-82 (keyboard: Walk, Wait, Lantern, Pause, Frame, Bag, Map; touch/mouse the same, no Leap)
- Against: none (a gap); D-350 "How to play keeps the controls"; no decision says when How to play gets Leap. D-971's card ("a new ability, the icon, its name and its use") is planned, step 5 of 6, not built
- What: Today Leap is taught only by "You learn Leap." Nothing says to press the round button or J, then pick a way; once the card exists, a player who closes it still has no Help row.
- Seen: read (howto.js); played by the finder
- Who: some players (everyone who beats the Lampeater)
- Fixes: 1) ask at the D-971 card step whether How to play gets a Leap row (shown once Leap is learnt) 2) leave it to the card alone
- Checked: REVISE, confirmed no Leap row; no decision covers it, so it is a question for the card step, not a breach

##### F-5 Gaps cut off creatures and extra finds, not just the cache
- Where: src/core/leapgap.js:42-50 (only the cache's finds, passed from room.js:336, are checked); room.js:336
- Against: D-968 "its cache behind a line of Gap tiles", "every find out of walking reach" (says nothing of what else stands there)
- What: Whatever else stands in the cut-off corner is cut off too. Rerun over seeds 1-400, depths 5-8: 128 of 927 gap rooms (14%) have a creature behind the Gap; 15 (under 2%) have 4-5 finds there against a cache of 2-3. Stairs, people and the Archway were always fine.
- Seen: ran: work/F-check/scan2.mjs (the finder's scan, 400 seeds)
- Who: few players; matters when the cache's richness is tuned (Q-115)
- Fixes: 1) write in D-968/CONTENT-4 that the whole corner is behind the Gap 2) keep the corner clear of non-cache finds and creatures
- Checked: REVISE, numbers confirmed; "many have 4-5 finds" was overstated (under 2%)

##### F-6 tests/beyond.test.js is about something else
- Where: tests/beyond.test.js:1-4 (tests `widen` from openings.js, D-403); the Archway tests are in tests/leapgap.test.js:86-150
- Against: none (a risk); src/core/beyond.js is the place beyond a Leap gap (D-969, D-970)
- What: A conversation on "the place beyond" opens the same-named test and finds rock-past-the-edge tests, not the Archway's; it may write duplicates.
- Seen: read
- Who: dev time
- Fixes: 1) rename it widen.test.js and move the archway tests into beyond.test.js 2) note it in TECH-2.md's tests list
- Checked: KEEP, heads of both test files and beyond.js read

#### Dropped
- F-1 Settings still lists a sound that can never play: already decided; D-967 keeps "the Gap tile, `floorGives` ... its crumble, shake and sound, and its Settings line" for a later falling floor (offered too: notes only).
- F-2 Glossary says the Gap is still the arena's escape: same as J-2 (J-2 also covers SOUNDS.md and Q-114).

### As found: area D
#### Area D: tests and tools
Looked at: all 290 test files timed one by one, 2 more full runs (flakiness, output size), every tool run with a harmless or scratch-only mode, helper copies, git status before/after (clean; no test or tool wrote into the repo). Not covered: reading each test for wording-only checks beyond the 6 files that read docs; sharecard.js (not run, see D-4).

##### D-1 `npm test` prints 436 KB when a conversation runs it
- Where: package.json:5 ("test": "node --test")
- Against: CLAUDE.md "Test output: one line per test or check, never full logs"
- What: With output piped (as Claude sees it) node switches to TAP and prints about five lines per test (name, duration_ms, type, dashes) for 2050 tests: 436,210 bytes. Only the last 8 lines (tests/pass/fail) matter. No test uses console.log; the noise is all the reporter.
- Seen: measured: `npm test > run1.txt; wc -c` = 436210 and 436128 (two runs); grep for console/process.stdout in tests/ finds only tests/syntax.test.js:12 (writes inside a child process, harmless).
- Who: none (players) — context and dev time, every step that runs tests
- Fixes: 1) change the script to `node --test --test-reporter=dot` (prints a dot per pass, full detail only for failures; a few KB) 2) add a `test:full` with the TAP reporter for debugging 3) say in docs/PR-CHECKLIST.md to always pipe through `tail -15`

##### D-2 Three "standin" sweeps are a fifth of all test time
- Where: tests/standin.test.js:28, tests/standin-2.test.js:14, tests/standin-3.test.js:14
- Against: none (a risk; it will grow as depths and seeds are added)
- What: Each sweeps seeds 1 to 300 over a band of depths (8-11, 12-15, 16-20) and takes 17-19 s alone, 54 s of the 279 s total (sum of every file run alone). They were split so they run side by side, so they set the minimum wall time. The same suite took 72 s (brief), 112 s and 93 s on my two runs: wall time swings with machine load; all 3 full runs passed 2050/2050 with no failure and no change in count (no flakiness seen).
- Seen: measured: per-file time loop (scratch times.txt). Slowest 10: standin-3 19.2 s, standin-2 17.9 s, standin 17.2 s (seed sweeps of layoutAt/placeFor), stamper 9.1 s, region 8.6 s, leapgap 6.6 s, raredrops 6.5 s, textfit 6.4 s, mixed 6.1 s, water 5.8 s (all seed sweeps over rooms; no bench or browser). 237 of 290 files finish in under 0.3 s beyond start-up.
- Who: none (players) — dev time
- Fixes: 1) a quick default (e.g. seeds 1-40 in the sweeps, picked by an env var like FULL=1) and a full run before the PR handoff 2) cache layoutAt per seed/depth between the three sweeps (same layouts are rebuilt) 3) leave as is: a full run is still under 2 min

##### D-3 perf.js's "light" budget reads 0.0 ms, so it checks nothing
- Where: tools/perf.js:38-61, 71-72
- Against: docs/TECH.md "Frame budget" (light 8 ms), D-430
- What: The tool plays only "into play, on the surface" then times frames. Both rows show `light 0.0 ms` (frame 4.0 and 3.1 ms), so the "light over budget" warning can never fire for the dark underground levels, the place the light cost is real. Either the surface skips the light pass or the profiler match on drawLight is not working; I did not dig further.
- Seen: ran: `node tools/perf.js` printed `standing fps 60 · frame 4.0 ms · light 0.0 ms` and `walking ... light 0.0 ms`
- Who: few players (slow phones underground) — dev time
- Fixes: 1) start the scene a few stairs down (via the dev tools, as playtest.js does) and confirm light > 0 2) print a warning when light is exactly 0 so the blind spot shows

##### D-4 Four tools have no test; sharecard writes into the repo
- Where: tools/playtest.js, tools/mappreview.js, tools/soundboard.js, tools/soundfiles.js, tools/perf.js (no reference in tests/); tools/sharecard.js:16-17,59
- Against: none (a risk)
- What: bossrun, make, pack, release and sharecard have tests; the others do not. They all run today: playtest (313 modules), mappreview (136), soundboard (128 sounds, 117 files) wrote pages to scratch that load in Chromium with zero page errors; bossrun ran (5 fights, 0.4 s); make.js --check and release.js --check ran and wrote nothing. sharecard.js always writes /home/user/gloamdeep/share.png (OUT is fixed), so I did not run it. The playtest page is what every PR hands the owner, so a break would show only at handoff.
- Seen: ran: the commands above with output to scratch; Playwright load of the three pages
- Who: none (players) — dev time
- Fixes: 1) one small test that builds playtest, mappreview and soundboard pages into a temp dir and checks they exist and the packer did not throw (no browser needed) 2) give sharecard.js an optional output path like the others

##### D-5 The same test fixtures are copied across dozens of files
- Where: tests/ (e.g. `const where = (s) => s.enemies.map(...)` identical in 15 files; `const start = () => makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES)` in 7; `const carrying = (bag, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, bag, ...more })` in 7; `const at` in about 10 variants)
- Against: none (a risk)
- What: The only shared helper is tests/caves.js (7 lines, used by 11 files). Each new test file re-writes its own starting state, so a change to makeState's arguments means editing many files, and each conversation reads these copies again. Also two files are named after audits (tests/audit826.test.js, audit868.test.js) rather than what they test, so they are hard to find by topic.
- Seen: measured: `grep -n "^const where = " tests/*.test.js` and the like (counts above)
- Who: none (players) — context and dev time
- Fixes: 1) add tests/fixtures.js with `where`, `start`, `carrying`, `at` and let new tests (and tools/make.js templates) import it; move old ones only when touched 2) leave old files alone, only point TECH-2.md at the helper

### As checked: area E
#### Area E: the Lampeater
Looked at: every Lampeater rule D-940 to D-978 against the code; re-ran E-1 with a real blow (work/E-check/r2.mjs), E-4 with a real kindle (r4.mjs); played the bench on an iPhone 13 to the seal, cutscene and bar (play2.js). Not covered: the sound; a full fight in the browser.

##### E-1 A phase blow on the last drop of oil starts "wary" early
- Where: src/core/snuff.js:40 and :75 (`owed` runs after the creatures move), src/core/creatureturn.js:234-240, src/core/wary.js:20, src/core/call.js:33
- Against: D-978 "owing or breathing, it neither calls nor is wary"; "its call after a snuff is from another cold brazier, else wary"
- What: A blow hurts it only while lit, and lit at its turn it is caught, so a normal phase blow is fine. But when the blow that takes it to 8 or 4 hearts also burns the last oil, the lantern drops to its ember, the Lampeater is in the dark at its turn and sees "struck, owing nothing yet": it turns wary in the same turn it starts breathing. The player sees the breath line only (the wary line is overwritten), its eyes dim while it breathes, the wary runs out during the 2 breath turns and clears the struck mark, so after "The brazier gutters out." it bites straight on instead of 3 wary turns (or a second gloamling call).
- Seen: ran: work/E-check/r2.mjs (DIR=left HX=6 HY=13 alllit last): blow turn shows breath 2 + wary 2, struck cleared by turn 2, snuff at turn 2, then bites every turn (hero 9 to 3 hearts), no wary. With oil left: wary 3 turns after the snuff, as D-978 says.
- Who: few players (phase blow on the turn the oil runs dry, no other cold brazier or 6 out)
- Fixes: 1) bring `owed` before the creatures move (or count the phase in hitEnemy) so every check sees the debt 2) leave it and note the edge in D-978
- Checked: REVISE, reproduced with a real blow; only the oil-runs-out path reaches it, so "some" became "few"

##### E-2 Boss docs still give the old hearts (same as A/J)
- Where: docs/CONTENT-BOSSES.md:11 (the Lampeater row); docs/DEV-TOOLS.md:90; src/core/enemies.js:121, src/core/bossbench.js:42
- Against: D-950 "on 12 hearts"; D-971 to D-978
- What: CONTENT-BOSSES.md gives Hearts 8 and its Ways and Decisions stop at D-973, with nothing of the calls, wary, phases or the 6-gloamling limit. DEV-TOOLS.md says the bench "at half it has 4 hearts"; the code gives 6 (12 / 2).
- Seen: read (row against `health: 12`; bench half `health / 2`; row names no D-974 to D-978)
- Who: none (players); dev time (a conversation trusting either doc builds on wrong hearts)
- Fixes: 1) put both right: 12 hearts, 6 at half, add calls, wary, phases, D-974 to D-978 2) shorten the row to a pointer at enemies.js so it cannot drift
- Checked: REVISE, the row is line 11 not 9; dropped the Bestiary-guards part (D-976 asks no Bestiary words; guards are the gloamlings'); DEV-TOOLS.md:90 found while checking

##### E-3 Lampeater decisions fill DECISIONS.md, 109 bytes from its cap (same as A/J)
- Where: docs/DECISIONS.md (D-971, D-972, D-975, D-977, D-978 are 7827 of 12179 bytes); tests/docs.test.js:7
- Against: CLAUDE.md "No doc over 8 KB, except docs/DECISIONS.md (12 KB)"
- What: DECISIONS.md is 12179 of 12288 bytes, so the next decision forces an archive move in the same PR, and most of it is one fight's five decisions. It is grepped, not read whole, so the cost is each PR's archiving, not every start.
- Seen: measured: wc -c; awk per decision (D-971 1796, D-972 2272, D-975 1192, D-977 1410, D-978 1157)
- Who: none (players); dev time
- Fixes: 1) move D-971 and D-972 to the archive now, one-line pointer each 2) archive the whole Lampeater run when the fight's last step lands
- Checked: REVISE, numbers re-measured; CLAUDE.md says grep DECISIONS.md, so "every conversation reads all of it" was wrong

##### E-4 A gloamling waiting in a re-lit bowl counts toward the 6 forever
- Where: src/core/brood.js:27-40 (crawl never checks the bowl is still cold), src/core/call.js:22-25 (broodCount counts `bowls`)
- Against: D-972 "counting any waiting in a bowl"
- What: A gloamling waits in a snuffed bowl when every tile beside it is lit (the hero standing there with the lantern). If the hero then lights that brazier again, its own glow keeps all 4 tiles beside it lit, so the gloamling never comes out but keeps one of the 6 places, which can make the Lampeater wary where it would have called.
- Seen: ran: work/E-check/r4.mjs: bowl at (2,5), kindled, lantern off; 4 turns later bowls still [(2,5)], 0 gloamlings out, broodCount 1, tiles beside lit 1111
- Who: few players
- Fixes: 1) drop a waiting gloamling when its brazier is lit (or let it out onto the lit tile) 2) leave it and say so in D-972
- Checked: REVISE, was "read", now ran with a real kindle

Played: iPhone 13, seal, cutscene and bar as D-959 says; 0 page errors; no new finding.

#### Dropped
- none
