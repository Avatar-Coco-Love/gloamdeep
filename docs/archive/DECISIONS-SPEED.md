# The faster light, the speed check (D-429, D-430)

Moved unchanged from `docs/DECISIONS.md` at 0.2.169 (D-432), when it
passed 12 KB: more reuse in the light with the same look, and the speed
check with its frame budget. These are still in force unless marked
superseded. Grep for an ID or topic; never read this whole.

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
