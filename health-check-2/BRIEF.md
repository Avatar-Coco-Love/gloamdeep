# Gloamdeep health check, second pass: the shared brief

You are one of several workers on a second health check of Gloamdeep, a
turn-based grid game in plain HTML/JS at `/home/user/gloamdeep` (version
0.3.305). The owner wants **findings only**: bugs, places where the game
goes against a recorded decision or doc, risky code, stale docs. Each
worker has its own area (in your prompt). Stay inside it.

## Hard rules
- **Change nothing in `/home/user/gloamdeep`.** No edits, no commits, no
  new files there, no `git` commands that change it. Write everything
  (scripts, screenshots, your report) in your own folder:
  `/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/<your-name>/`
- **Do not re-report the first pass.** Read `docs/HEALTH-CHECK.md` first:
  H-01 to H-31 are known. If you meet one of them, skip it (you may note
  "met H-09 again" in one line).
- **A finding needs a yardstick.** The game is right when it does what
  the decisions say. Decisions are `D-xxx` in `docs/DECISIONS.md` (newest)
  and `docs/archive/*.md` (older, still in force; grep there — the index
  is `docs/archive/README.md`). A later decision may supersede an older
  one: check for "Superseded" / "supersedes" before calling a mismatch.
  Other yardsticks: `docs/GLOSSARY*.md`, `docs/CONTENT*.md`,
  `docs/ART-DIRECTION*.md`, `docs/TECH.md`, `docs/DEV-TOOLS.md`,
  `docs/OPEN-QUESTIONS*.md` (a thing listed there is knowingly undecided,
  not a finding). Something that looks odd but matches a decision is not a
  finding. Something plainly broken (a crash, words running off a card,
  a button that can't be reached, a thing drawn on top of another, a
  line that is untrue) is a finding even with no decision.
- **Be sceptical of your own findings.** Before reporting, try to
  disprove each: reproduce twice, read the code path, grep the decisions
  once more. Report fewer, surer findings. Say plainly how sure you are.
- Never invent mechanics, names or numbers. Fix options must be small and
  must not invent new game content.

## How to play it (play workers)
The harness is `hc/lib.mjs` (read it; it is short). Scripts are ES
modules run with `node yourscript.mjs` from your folder, importing
`../lib.mjs`. Examples that work: `hc/smoke.mjs`, `hc/smoke2.mjs`.
- `serve()` serves the repo; `open(url, 'phone' | 'pc', storage)` opens
  the game on a 412×915 touch phone or a 1600×900 PC (`phoneWide` is a
  phone held sideways, optional). **Play every scenario on both `phone`
  and `pc`.**
- **Play as a player would**: on the phone, taps (`tap(page, x, y)`; the
  game is all canvas, so look at a screenshot to find where to tap; the
  corner buttons are real DOM buttons like `#bag-button`, `#pause-button`,
  `#map-button`, `#lantern-button`, `#quick-slot`, `#sleep-button`, and
  the dev wrench); on the PC, keys (arrows/WASD to step, Space waits,
  Enter chooses, Esc/P pause, I bag, M map, L lantern, Tab) and mouse
  clicks. Read `src/input/input.js`, `src/input/touch.js` and the card
  files in `src/input/cards/` when you need to know what a tap does.
- **Getting to the situation** may be done quickly: build a state in Node
  from the game's own rule modules (`core('turn')` has `newJourney`,
  `step`, etc.; `core('stairs')` has `goToDepth`; all of `src/core/` is
  DOM-free) and hand it to `inject()`, or use the game's own dev panel
  (the wrench) in the browser. Then do **the thing under test with real
  input** and look. Do not judge a feature from the rules modules alone.
- **Look at screenshots** (`shot(page, path)`, then the Read tool on the
  PNG). Check: is anything cut off, overlapping, off-screen, unreadable,
  too small to tap (under 44 px), or different between phone and PC in a
  way that breaks it? Is each line of text true? Take them at the
  harness's default scale. Don't read hundreds; look at the moments that
  matter (each card, each new state).
- `readSave(page)` gives the saved state after any turn (the game saves
  every turn), `line(page)` the words on the text line, and `errors`
  collects page errors (the `willReadFrequently` canvas warning is known,
  ignore it).
- Chromium is installed; never install Playwright. Several workers share
  this 4-core machine: one browser at a time each, close it when done,
  keep waits short.

## What to hand back
Write `report.md` in your folder and return the same text as your final
message. For each finding:

```
### <short title in plain words>
- Kind: bug | mismatch (game against a decision or doc) | risky code | docs
- Notice: most players | some | few | rare | never (players can't see it)
- What a player sees: 2-4 plain sentences, no jargon.
- Evidence: decision IDs quoted in a few words, file:line, numbers measured.
- How checked: REPRODUCED in the browser (phone / pc / both) | REPRODUCED in a script | READ only
- Screenshot: absolute path, if it shows the problem
- Fix options: 2 or 3, one marked Recommended
- Sure?: high | medium | low, and why
```

Then two short lists: **Checked and found sound** (what you played or
read that works and matches the decisions, a line each) and **Not
reached** (anything in your area you could not get to, and why). Be
honest in both: the owner will be told exactly what was reproduced and
what was only read.
