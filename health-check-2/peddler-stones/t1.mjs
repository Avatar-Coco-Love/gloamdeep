import { atPeddler, show, roomM } from './prep.mjs';
for (const seed of [4127, 7, 99]) { const a = atPeddler(seed); console.log(seed, roomM.peddlerRoom(seed), a?.dir, a?.p); if (a) console.log(show(a.state)); }
