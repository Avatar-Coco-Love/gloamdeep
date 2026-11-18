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
- [ ] A. A conversation's start: what it reads, and how that grows.
- [ ] B. A PR's overhead: the checklist, release, history, conflicts.
- [ ] C. The code's shape: big files, boot, duplication, the rules.
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
