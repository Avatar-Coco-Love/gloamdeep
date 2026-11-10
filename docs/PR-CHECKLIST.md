# PR checklist

Moved word for word from `CLAUDE.md` at 0.3.32, the eighth audit (D-570),
so the file every conversation loads stays small. Read this before making
or updating a PR.

## Keeping track: every PR does all of these

- **Run `node tools/release.js`** (D-572) once the new top entries of
  `CHANGELOG.md` and the `docs/PROGRESS.md` log are written by hand (the
  log entry's `- **date, version, title.**` gives the history its title).
  It sets `VERSION`, copies the changelog lines into the in-game history,
  keeps the newest 3 changelog and log entries and moves older ones to
  the archive word for word (with the archive index), and warns when
  `DECISIONS.md` passes 11 KB. Run it again after any edit to either
  entry. `npm test` runs `node tools/release.js --check` and fails if
  anything is out of step. The rest of this list is still done by hand
  where the tool doesn't reach.

- **CHANGELOG.md**: add a new version entry at the top (the format is in its
  header). Each PR has exactly one version. Add the same lines, with a
  short title, at the top of `src/core/history-0.3.js`, the in-game
  Version history (D-254); `npm test` fails if the two differ.
- **docs/PROGRESS.md**: add a log entry, set "Next up" and update "Waiting
  on the owner". Keep only 3 log entries there. Move the oldest to the top
  of `docs/archive/PROGRESS-LOG.md`.
- **Name a PR by its version** (0.1.9) in the docs, never by its number,
  which isn't known until the PR exists (D-071). Docs-only PRs bump the
  version too (D-075).
- **"Waiting on the owner"** holds only questions and choices for the
  owner. Merging the open PR is always implied, so it is never listed
  (D-074).
- **Decisions**: when the owner settles something, add `D-xxx` to
  `docs/DECISIONS.md` with the date and the owner's choice in a sentence.
  If it answers a question, delete the `Q-xxx` entry from
  `docs/OPEN-QUESTIONS.md` and cite it in the decision ("answers Q-004").
  IDs are never reused or renumbered.
- **Decisions in the open PR** aren't final until it is merged. Playtest
  tweaks edit them in place, with a note of what changed ("changed after
  the playtest: 40 → 80 → 60 turns") (D-072).
- **Changing a merged decision**: never edit it silently. Add a new
  one ("supersedes D-005"), and mark the old one
  `Superseded by D-0xx (date)`. When `DECISIONS.md` passes 12 KB, move the
  superseded entries to `docs/archive/DECISIONS-SUPERSEDED.md`, and the
  rest of a finished stage to its own archive file (as D-041 did), and
  add the new file's line to `docs/archive/README.md`.
- **The playbook**: when a step taught something about working
  together, add one line to `docs/WORKFLOW.md`'s "Since the last audit"
  (D-741).
- Once code exists, the `VERSION` constant in the code must match the top
  `CHANGELOG.md` entry.

## Git and PRs

- Never push to `main`. One PR per conversation. Merging is the owner's call.
- Fill in `.github/pull_request_template.md`.
- Every PR that changes something visible gets a private playtest Artifact
  (the owner can't play a PR before it is merged). Build it with
  `node tools/playtest.js <scratchpad>/playtest.html` (D-073), and
  put the link in the PR body and the `docs/PROGRESS.md` log entry.
  Republish to the same link after each push.
- A PR that changes how something is generated (floors, rooms, caves,
  woods, the scatter of creatures or finds) also gets a private map
  preview Artifact (D-646): the whole floor or region drawn from the real
  generation code, the seed shown, Reseed for a new random seed and a
  depth picker, as the Seed Explorer does. Built by a tool in `tools/`,
  linked in the PR body and the `docs/PROGRESS.md` log entry, and
  republished after every push, like the playtest.
- A PR that adds or changes a sound also gets a sound board Artifact
  (`node tools/soundboard.js <scratchpad>/sounds.html`, D-256), linked
  and republished like the playtest, and in the chat.
- After every push, update the PR body so "What changed" and "Decisions"
  match the branch (D-076).
- End every conversation with a handoff of at most 5 lines: the PR link,
  what changed, what is waiting on the owner, and the proposed next step.
  Under it, before the owner merges, give 2 to 4 brief prompts the owner
  can copy, each in its own fenced code block (never inline code or a
  list, so each has its own copy button, D-792), one per direction to take next
  (just one when there is only one way on) (D-790).
