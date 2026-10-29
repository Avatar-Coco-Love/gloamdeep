# The faster light, the speed check, the light choices (D-429, D-430, D-432 to D-435)

Moved unchanged from `docs/DECISIONS.md` at 0.2.169 (D-432), when it
passed 12 KB: more reuse in the light with the same look, and the speed
check with its frame budget. These are still in force unless marked
superseded. Grep for an ID or topic; never read this whole.
D-432 to D-435, the half-size light and the light choices' names, moved
unchanged at 0.2.171 (D-436).

---

**D-429 · 2026-10-29 · More reuse in the light, the same look** (the
owner's pick, recommended; a step of D-294, D-295, answers part of Q-068)
The light keeps work that hasn't changed: which pixels show remembered
tiles' darkness is worked once per change of memory, not every frame; the
mix of four cells at a shadow's edge comes from a table of its 256
answers; and a pixel that ends up black is written as 0. Every pixel is
the same as before, checked on 3,456 pictures. On a simulated slow phone
the light takes about 16.5 ms a frame instead of 20.3, about 45 frames a
second instead of 37. Built in 0.2.168.

**D-430 · 2026-10-29 · A speed check and a frame budget** (the owner's
picks, both recommended) `tools/perf.js` times play on a simulated slow
phone (the processor 4 times slower, seed 4127) and prints frames a second
and the milliseconds a frame spends in all and in the light. The frame
budget in `docs/TECH.md`: 16.7 ms a frame in all, the light at most 8 ms.
A PR that changes drawing runs it before and after and gives both in the
PR. Built in 0.2.168.

**D-432 · 2026-10-29 · The half-size light's look: soft** (the owner's pick,
A, recommended; answers part of Q-068) The Half choice works the light out
on one pixel in four (every other one each way); each pixel between takes
the mix of its neighbours, and the dither stays one pixel fine, so shadow
edges are a touch softer. Not B, one light per 2 × 2 pixels, whose dither
looks coarser than the art. On the simulated slow phone, about 35 frames a
second instead of 26 to 30 (pictures:
https://claude.ai/artifact/GbP79PqaMwajfoF8gy4Nvz). The owner's Galaxy S26
Ultra runs today's light at about 120, with one brief dip to 60, likely the
phone's own screen switching down.

**D-433 · 2026-10-29 · Automatic: watch, switch down once** (the owner's
pick, A, recommended; answers part of Q-068) Automatic watches the fps in
play; under 50 for 3 seconds, the light goes to half and stays half until
the game is opened again. It never switches back while playing.

**D-434 · 2026-10-29 · The camera on whole pixels, first** (the owner's
picks, both recommended) A room screen an odd number of game pixels tall
or wide puts the camera on half a pixel in rooms bigger than the screen,
and the whole light goes black (found at depth 2 of seed 4127, 844 × 390).
Its fix, the camera rounded to a whole pixel with a test, is the next
step, on its own; then the Half choice and Automatic (D-432, D-433).
Speeding up the last pass over every pixel (about 10 ms of the light, the
same look) comes later.

**D-435 · 2026-10-29 · The light choices' names** (the owner's pick;
answers Q-068) Settings names the light's choices Full, Half and
Automatic (D-432, D-433).
