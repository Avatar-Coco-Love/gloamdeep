# Research pages

Read-only research jobs, each published as a private page for the owner.
The links and their open suggestions are kept here so later conversations
find them (D-619). Read a page with the Artifact tool's `read` action, not
a web fetch. Nothing on a page is decided: every suggestion is an option
for the owner, asked at its own step.

## Lore research (2026-11-06, for step 19)
https://claude.ai/artifact/5TRi6YT41UrnfKLxcfUYFg

What is decided about lore, twelve ways other games tell a story in
pieces (Dark Souls, Hollow Knight, Outer Wilds, Subnautica, Hades, Caves
of Qud and more), pitfalls, and writing prompts for the owner (the gloam,
lamplighters, who wrote the pieces, each place, what calls from below).
No ranking: it is for the owner's own writing session before step 19.

## Room making (2026-11-06, procedural generation)
https://claude.ai/artifact/HiadNtERE1CPw6UPkiakzV

How rooms and floors are made today, with real sample rooms, and
thirteen techniques with their cost on phones. Its top 3, in order:
1. Put one find that now goes anywhere "off the way" (a dead end, a far
   nook), found by a distance map from the path between the ways in and
   out. No new item or rule.
2. More corners in cave rooms: one extra tunnel for a loop, and chambers
   kept apart in small rooms so a room is not one open blob.
3. A first biome's own room shape, tried in the Seed Explorer only.

Also kept: hand-drawn set pieces per biome (the stamper exists), light
placed by a room's shape, and a many-seeds check for rooms that fail.

## Health check at 0.3.73 (2026-11-06)
https://claude.ai/artifact/AQzfWJJppzcTpkksBsmcxJ

All tests passed; no high-confidence bugs. Done at 0.3.74 (D-619): the
shadow cast kept between frames (its P1), five drifted docs fixed, and
`ART-DIRECTION.md` and `SCOPE.md` split. Still open, by importance:
- **P2, a new pixel buffer every frame** (`src/render/light.js`,
  `getImageData`). Canvas 2D can't read into a kept buffer, and drawing
  the light as a layer instead would clamp it, changing the look. Left as
  it is unless a way is found that keeps the picture.
- **P3, the whole picture redrawn when nothing changed:** under an open
  card, or with reduced motion while the hero stands still.
- **P4, 14 to 16 layout reads a frame** (`getBoundingClientRect` in
  `src/render/frame.js`, `onLayer` and `covers`), slow during a fade.
- **P5, small allocations every frame** in `frame.js` and `light.js`.
- **P6, `litAt` in `src/core/sight.js`** casts again per check in turns;
  fine today, grows with more creatures and lights.
- **C1 to C4, low:** the dev Stats line keeps every picture of text it
  has shown (`src/dev/pixeltext.js`); a save with no profile goes to
  `gloamdeep-journey-1` (`src/core/save.js`); motes and embers move per
  frame, not per time; Seed Explorer work is kept per seed and never
  cleared.
- **Docs near 8 KB:** `CONTENT.md`, `WORLD.md`, `OPEN-QUESTIONS.md`.
- **For the 0.3.112 audit:** split `src/main.js` first, then
  `src/core/cave.js` or `src/render/frame.js`.
