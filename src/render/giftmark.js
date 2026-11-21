// § gift mark (D-1018): while a person at home has a gift waiting (gift.js), a small ember parcel
// over their head, a bone ribbon round it, bobbing a pixel each second; still with reduced motion.
// Drawn with the people, under the light. Drawing only.
const PARCEL = ['..w.w..', 'kkkwkkk', 'keeweek', 'kwwwwwk', 'keeweek', 'kkkkkkk'], BOB_MS = 2000;
const COLOURS = { k: '#0e0c16', e: '#f39a3b', w: '#efe6cc' };

export function drawGiftMarks(c, people, t, still) {
  const dy = still ? 0 : Math.floor(t / (BOB_MS / 2)) % 2;
  for (const p of people) {
    const x = p.x * 16 + 4, y = p.y * 16 - 9 - dy;
    PARCEL.forEach((row, j) => [...row].forEach((ch, i) => {
      if (ch === '.') return;
      c.fillStyle = COLOURS[ch];
      c.fillRect(x + i, y + j, 1, 1);
    }));
  }
}
