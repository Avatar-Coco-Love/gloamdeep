// § aside: a kept save this game can't read, or reads only in part, copied word for word
// under a key of its own before anything is written over it (H-21, D-880): one broken
// or made by a newer version of the game. Nothing is shown; nothing reads these back yet.
// Each copy has its own key, by the time it was made, so none is written over. Wrapped (TECH.md).
export const asideKey = (key, t) => `${key}-aside-${t}`;
export function setAside(key, text) {
  try { localStorage.setItem(asideKey(key, Date.now()), text); } catch { /* not kept */ }
}
