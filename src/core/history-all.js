// § history, all of it: every version's file, newest first, joined (D-254). Moved word for word from
// history.js at the fifteenth audit (D-868), which loads this only when Version history first opens.
import { HISTORY_00 } from './history-0.0.js';
import { HISTORY_01 } from './history-0.1.js';
import { HISTORY_03 } from './history-0.3.js';
import { HISTORY_03_4 } from './history-0.3-4.js';
import { HISTORY_03_3 } from './history-0.3-3.js';
import { HISTORY_03_2 } from './history-0.3-2.js';
import { HISTORY_03_1 } from './history-0.3-1.js';
import { HISTORY_02 } from './history-0.2.js';
import { HISTORY_02_3 } from './history-0.2-3.js';
import { HISTORY_02_2 } from './history-0.2-2.js';
import { HISTORY_02_1 } from './history-0.2-1.js';

export const VERSIONS = [...HISTORY_03, ...HISTORY_03_4, ...HISTORY_03_3, ...HISTORY_03_2, ...HISTORY_03_1, ...HISTORY_02, ...HISTORY_02_3, ...HISTORY_02_2, ...HISTORY_02_1, ...HISTORY_01, ...HISTORY_00];
