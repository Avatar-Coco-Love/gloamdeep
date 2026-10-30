// § people: every person, keyed by id (D-470, D-490). `registry.js` gathers this table
// with the other kinds. A person stands on a floor tile, in the place's `people` list as
// { id, x, y }, and never moves yet. Bumped, they say their `calls` line, free; the
// rubble around them dug, the same line, and once a heap beside them is cleared, their
// `freed` line, and they are gone (rescue.js, D-491), standing at once at home in the
// woods, `home` set, where a bump says their `home` lines (D-492). Plain data, no drawing.

export const PEOPLE = {
  // The first person, a peddler trapped by a ring of rubble on depth 3 (step 12a, D-490):
  // freed in 12b (D-491), at home in 12c (D-492), the first vendor in step 13 (D-471):
  // at home, he `buys` what has a price, `sells` in the registry (D-494), and sells his
  // `wares`, { itemId: price } in coins, never running out (D-495). Named at its own step.
  peddler: { id: 'peddler', kind: 'npc', name: 'Peddler', calls: 'peddlerCalls', freed: 'peddlerFreed', home: 'peddlerHome', buys: true, wares: { flask: 3, bagTorch: 2 } },
};

// The person standing on x, y, or undefined
export const personAt = (state, x, y) => (state.people || []).find((p) => p.x === x && p.y === y);
// A person on one of the 8 tiles around x, y, or undefined: the one heard through rubble
export const personBeside = (state, x, y) => (state.people || []).find((p) => Math.max(Math.abs(p.x - x), Math.abs(p.y - y)) === 1);
