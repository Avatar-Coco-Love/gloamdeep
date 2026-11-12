import { build } from './build.mjs'; import { brief, showMap } from './h.mjs';
for (const w of ['start', 'stone', 'bed']) for (const where of ['surface', 'below']) { const { state, notes } = build('gentle', where, 'bite', w); console.log(w, where, brief(state), JSON.stringify(notes), 'bed', JSON.stringify(state.bed), 'enemies', JSON.stringify(state.enemies)); }
