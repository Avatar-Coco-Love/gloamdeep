// § opening card (D-628): a new journey's first words. Enter, Space, Esc, P or a tap anywhere
// begin play; arrows do nothing.
export function openingCard(app, ui, show) {
  const begin = () => show('play');
  return { pick: begin, dir: () => {}, tap: (px, py, held) => { if (!held) begin(); }, close: begin };
}

// § the boons card (D-712): the same keys and taps go on, back to play after the first pick, or
// back to the Journal's Quests tab when opened from its done "Take a boon" (app.boonsFrom)
export function aboutBoonsCard(app, ui, show) {
  const go = () => show(app.boonsFrom === 'journal' ? 'journal' : 'play');
  return { pick: go, dir: () => {}, tap: (px, py, held) => { if (!held) go(); }, close: go };
}
