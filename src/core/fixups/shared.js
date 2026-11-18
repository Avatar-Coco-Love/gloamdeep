// § fixups: the files that bring an older save up to date, once, as it is read (save.js).
// Each keeps to one change in the game, named after it (recap, the oilcaps; reherb, the herbs);
// none is a rule of play. This holds what they share (H-100). Plain data, no drawing.

// A place never seen: no tile of its memory lit (fog.js)
export const unseen = (p) => !p.seen || !Array.prototype.some.call(p.seen, Boolean);
