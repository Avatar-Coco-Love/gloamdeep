// § aside: a kept save this game can't read, or reads only in part, copied word for word
// under a key of its own before anything is written over it (H-21, D-880): one broken
// or made by a newer version of the game. Nothing is shown; nothing reads these back yet.
// Each copy has its own key, by the time it was made, so none is written over. Wrapped (TECH.md).
// A text already set aside under that save's key is not copied again, so loading one broken save
// over and over keeps one copy (F-4, D-914).
export const asideKey = (key, t) => `${key}-aside-${t}`;
const asideOf = (key) => `${key}-aside-`;
function keptAside(key, text) {
  for (let i = 0; i < (localStorage.length ?? 0); i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(asideOf(key)) && localStorage.getItem(k) === text) return true;
  }
  return false;
}
export function setAside(key, text) {
  try { if (!keptAside(key, text)) localStorage.setItem(asideKey(key, Date.now()), text); } catch { /* not kept */ }
}
