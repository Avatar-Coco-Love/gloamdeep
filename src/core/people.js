// § people: every person, keyed by id (D-470, D-490). `registry.js` gathers this table
// with the other kinds. A person stands on a floor tile, in the place's `people` list as
// { id, x, y }, and never moves yet. Bumped, or the rubble around them bumped, they say
// their `calls` line, free. Plain data, no drawing.

export const PEOPLE = {
  // The first person, a peddler trapped by a ring of rubble on depth 3 (step 12a, D-490):
  // freed in 12b, at home in 12c, the first vendor in step 13 (D-471). Named at its own step.
  peddler: { id: 'peddler', kind: 'npc', name: 'Peddler', calls: 'peddlerCalls' },
};

// The person standing on x, y, or undefined
export const personAt = (state, x, y) => (state.people || []).find((p) => p.x === x && p.y === y);
// A person on one of the 8 tiles around x, y, or undefined: the one heard through rubble
export const personBeside = (state, x, y) => (state.people || []).find((p) => Math.max(Math.abs(p.x - x), Math.abs(p.y - y)) === 1);
