// The free pick of one locked look for every profile (D-714)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newProfile, newProfiles, usingSlot, giftedSlot, boughtSlot, unpackProfiles, packProfiles, FORMAT } from '../src/core/profile.js';
import { shopOf, newShop, glintsLeft, freeNote, FREE_PICK } from '../src/core/feats.js';
import { isLocked, cloakOf } from '../src/core/looks.js';

const at = (beaten) => ({ ...newProfile().records, beaten });

test('a new profile has its free pick waiting', () => {
  assert.equal(newProfile().gift, null);
  assert.equal(shopOf(newProfile()).free, true);
  assert.deepEqual(newShop(), { bought: [], have: 0, free: true });
  assert.deepEqual(newShop('cow'), { bought: ['cow'], have: 0, free: false });
});

test('a new hero made with a free pick wears it and has it for good', () => {
  const ps = usingSlot({ current: null, slots: [null, null, null] }, 1, 'Ada', { cloak: 'cow' }, 'cow');
  const p = ps.slots[1];
  assert.deepEqual([p.gift, p.bought], ['cow', ['cow']]);
  assert.equal(cloakOf(p), 'cow');
  assert.equal(isLocked('cloak', 'cow', p.bought), false);
  assert.equal(shopOf(p).free, false);
  assert.equal(usingSlot({ current: null, slots: [null, null, null] }, 0).slots[0].gift, null, 'none taken: still waiting');
});

test('taking the free pick costs no Glints, and only one is taken', () => {
  let ps = { current: 0, slots: [{ ...newProfile(), records: at(50) }, null, null] };
  ps = giftedSlot(ps, 0, 'helm');
  assert.deepEqual([ps.slots[0].gift, ps.slots[0].bought], ['helm', ['helm']]);
  assert.equal(glintsLeft(ps.slots[0]), 3, 'the 3 Glints Beaten paid are all left');
  assert.equal(giftedSlot(ps, 0, 'cow').slots[0].bought.includes('cow'), false, 'a second is not free');
  ps = boughtSlot(ps, 0, 'cow');
  assert.equal(glintsLeft(ps.slots[0]), 0, 'a bought one still costs');
});

test('profiles made before get one free pick each, kept through saving', () => {
  const old = newProfile(); delete old.gift;
  const ps = unpackProfiles({ format: 9, profiles: { current: 0, slots: [old, null, null] } });
  assert.equal(ps.slots[0].gift, null);
  const taken = giftedSlot(ps, 0, 'moth');
  assert.equal(unpackProfiles(packProfiles(taken)).slots[0].gift, 'moth');
  assert.equal(FORMAT, 11);
  assert.equal(unpackProfiles({ format: 11, profiles: { current: 0, slots: [{ ...newProfile(), gift: 'moth' }, null, null] } }).slots[0], null, 'a gift not in bought is not read');
});

test('the note says the price, or the one free pick; the card says 1 FREE PICK (D-715)', () => {
  assert.equal(`Cow: ${freeNote(3)}`, 'Cow: 3 Glints, or your one free pick.');
  assert.equal(FREE_PICK, '1 FREE PICK');
  assert.ok(newProfiles().slots[0].gift === null);
});

test('Carriage and Zebra are free for everyone; a free pick taken on one waits again, Glints spent come back (D-715)', () => {
  assert.ok(!isLocked('cloak', 'zebra', []) && !isLocked('lamp', 'carriage', []));
  assert.equal(cloakOf({ look: { cloak: 'zebra' }, bought: [] }), 'zebra');
  const gifted = (id) => ({ ...newProfile(), bought: [id], gift: id });
  const ps = unpackProfiles({ format: 10, profiles: { current: 0, slots: [gifted('zebra'), gifted('carriage'), gifted('moth')] } });
  assert.deepEqual(ps.slots.map((p) => p.gift), [null, null, 'moth']);
  assert.equal(shopOf(ps.slots[0]).free, true);
  assert.equal(glintsLeft({ ...newProfile(), records: at(50), bought: ['zebra', 'carriage'] }), 3, 'bought before, they cost nothing now');
});
