// The lost Peddler (H-57) and saves that can't be read set aside (H-21), D-880
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readJourney, upgradeState, loadJourney, journeyKey, journeyText, FORMAT } from '../src/core/save.js';
import { refetch } from '../src/core/refetch.js';
import { stoneHome } from '../src/core/mouth.js';
import { peddlerRoom } from '../src/core/room.js';
import { makeWorld } from '../src/core/turn.js';

const rooms = (s) => [[s.place, s], ...Object.entries(s.elsewhere)];
const peddlers = (s) => rooms(s).flatMap(([id, p]) => (p.people || []).filter((q) => q.id === 'peddler').map((q) => ({ at: id, ...q })));

// Two saves made by the old game itself (formats 10 and 16, the health check's), the Peddler freed and waiting
for (const name of ['format10-seed7-peddler-waiting', 'format16-seed4-peddler-waiting']) {
  test(`an old save kept while the freed Peddler waited has him at home after loading: ${name}`, () => {
    const { state: s } = readJourney(readFileSync(new URL(`./saves/${name}.json`, import.meta.url), 'utf8'));
    const [him, ...more] = peddlers(s);
    assert.equal(more.length, 0);
    assert.equal(him.at, stoneHome(s.seed));
    assert.equal(him.home, true);
    assert.equal(him.greeted, undefined, 'he greets the hero when they come near');
    assert.equal(him.arrives, undefined, 'he stands there, not beaming in');
  });
}

test('the step leaves a Peddler who is somewhere, or whose room is not begun, as he is', () => {
  assert.equal(FORMAT, 34);
  const s = makeWorld('first', 7);
  assert.equal(rooms(s).some(([id]) => id === peddlerRoom(7)), false);
  assert.equal(refetch(s), s);
  const begun = upgradeState(33, { ...s, elsewhere: { ...s.elsewhere, [peddlerRoom(7)]: { ...s, people: [{ id: 'peddler', x: 3, y: 3 }] } } });
  assert.deepEqual(peddlers(begun).map((p) => p.at), [peddlerRoom(7)]);
});

test('a journey that can\'t be read, broken or newer, is set aside word for word; one read is not', () => {
  const s = makeWorld('first', 7), newer = journeyText(s, false).replace(`"format":${FORMAT}`, `"format":${FORMAT + 1}`);
  for (const text of [newer, '{"format":']) {
    const kept = { [journeyKey(1)]: text };
    globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = String(v); } };
    try {
      assert.equal(loadJourney(1), null);
      assert.deepEqual(Object.entries(kept).filter(([k]) => k.startsWith(`${journeyKey(1)}-aside-`)).map(([, v]) => v), [text]);
    } finally { delete globalThis.localStorage; }
  }
  const kept = { [journeyKey(0)]: journeyText(s, false) };
  globalThis.localStorage = { getItem: (k) => kept[k] ?? null, setItem: (k, v) => { kept[k] = String(v); } };
  try { assert.ok(loadJourney(0)); assert.deepEqual(Object.keys(kept), [journeyKey(0)]); } finally { delete globalThis.localStorage; }
});
