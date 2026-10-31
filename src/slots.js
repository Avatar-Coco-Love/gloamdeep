// § slots (D-271): picking a slot plays as its profile, a new one in an empty slot, with its own journey;
// a new one takes the name typed on the name pad (D-272) and the cloak, eyes, trim and clothes chosen after it (P3 to P6)
// Split from main.js at the seventh audit (D-519): `app` as there, `loadInto` brings a profile's
// journey in, and `loaded` keeps it as the saved one and shows it afresh.
import { saveProfiles, usingSlot, withoutSlot, renamedSlot, lookedSlot } from './core/profile.js';
import { dropJourney } from './core/save.js';

export function createSlots(app, loadInto, loaded) {
  function useSlot(i, name = '', look = {}) {
    app.profiles = usingSlot(app.profiles, i, name, look); saveProfiles(app.profiles);
    loadInto(i); loaded();
  }
  // Renaming a profile keeps all else, its journey too (D-273)
  function renameSlot(i, name) { app.profiles = renamedSlot(app.profiles, i, name); saveProfiles(app.profiles); }
  // A new look keeps all else too (P3)
  function lookSlot(i, look) { app.profiles = lookedSlot(app.profiles, i, look); saveProfiles(app.profiles); }
  // Deleting a profile drops its journey too; if it was in use, the next in use takes over
  function dropSlot(i) {
    const was = app.profiles.current;
    app.profiles = withoutSlot(app.profiles, i); saveProfiles(app.profiles); dropJourney(i);
    if (app.profiles.current !== was) { loadInto(app.profiles.current); loaded(); }
  }
  return { useSlot, renameSlot, lookSlot, dropSlot };
}
