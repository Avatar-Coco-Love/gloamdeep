// § caves: a floor's rooms less its vault (vault.js, D-892), for the tests that check what every
// cave room holds; the vault is checked in vault.test.js
import { layoutAt } from '../src/core/region.js';
import { vaultAt } from '../src/core/room.js';

export const caves = (seed, depth) => layoutAt(seed, depth).cells.filter((c) => c.id !== vaultAt(seed, depth));
