// § menus (D-187, D-189, D-238): the menu lines shared by the title, the pause menu and Settings,
// and the arrows shared by every menu, moved word for word from screens.js at the eighth audit
// (D-576), with the settings changes. Each menu's own file gives its tap and close. `c` holds
// screens.js's menuOf, openSlots, openJournal, openHowTo, openExplorer, openPad, openWays and openHistory.
import { SURE_MENU, MODE_FIRST, moveChoice } from '../../core/menu.js';
import { saveSettings, swipeText, tapText, nextTap, padText, nextOnOff, stopText, nextStop, nextMotion, motionText, lanternText, nextLantern, flasksText, nextFlasks, soundText, nextSound, loudText, nextLoud, LOUD_KINDS, kindText, toggleMuted, voiceText, statsText, marksText } from '../../core/settings.js';

export const MENUS = ['title', 'paused', 'settings', 'ways', 'mode', 'ended']; // the menus' own files, sharing this one

export function makeMenu(app, ui, show, c) {
  const { spoken, reduceMotion } = ui;
  const { menuOf, openSlots, openJournal, openHowTo, openExplorer, openPad, openWays, openHistory, openSoundList } = c;
  function change(key, next, words) {
    app.settings = { ...app.settings, [key]: next };
    saveSettings(app.settings);
    spoken.textContent = words;
  }
  const changeSwipe = () => { const o = nextOnOff(app.settings.swipe); change('swipe', o, swipeText(o)); };
  const changeTap = (back = false) => { const o = nextTap(app.settings.tap, back); change('tap', o, tapText(o)); };
  const changePad = () => { const o = nextOnOff(app.settings.pad); change('pad', o, padText(o)); };
  const changeStop = () => { const o = nextStop(app.settings.stop); change('stop', o, stopText(o)); };
  const changeMotion = () => { const m = nextMotion(app.settings.motion, reduceMotion.matches); change('motion', m, motionText(m, reduceMotion.matches)); };
  const changeLantern = () => { const l = nextLantern(app.settings.lantern); change('lantern', l, lanternText(l)); };
  const changeFlasks = () => { const f = nextFlasks(app.settings.flasks); change('flasks', f, flasksText(f)); };
  const changeSound = () => { const o = nextSound(app.settings.sound); change('sound', o, soundText(o)); };
  const changeLoud = (dir) => { const n = nextLoud(app.settings.loud, dir); change('loud', n, loudText(n)); }; // D-822
  const changeKind = (id, dir) => { const n = nextLoud(app.settings[id] ?? 100, dir); change(id, n, kindText(id, n)); }; // D-823
  const isKind = (id) => LOUD_KINDS.some((k) => k.id === id);
  // § each sound (D-824): a pick, Left or Right turns it On or Off; a kind's line on the Sound tab opens its list
  const isVoice = (id) => id?.startsWith('mute:');
  const changeVoice = (id) => { const v = id.slice(5), m = toggleMuted(app.settings, v); change('muted', m, voiceText(v, m.includes(v))); };
  const onSoundTab = () => app.settingsTab === 'sound' && !app.soundList;
  const changeStats = () => { const o = nextOnOff(app.settings.stats); change('stats', o, statsText(o)); };
  const changeMarks = () => { const o = app.settings.marks === 'off' ? 'on' : 'off'; change('marks', o, marksText(o)); }; // D-730

  // § choosing: a menu line picked; New journey starts in a new world (D-187), asking first
  // while one is saved; Continue and Back to title keep the journey (D-238)
  function menuPick(i) {
    const id = menuOf(app.screen)[i]?.id;
    if (id === 'profiles') openSlots(true);
    else if (id === 'new' && app.saved) show('sure', SURE_MENU.findIndex((l) => l.id === 'no'));
    else if (id === 'new') show('mode', MODE_FIRST); // the way to play asked first (D-334)
    else if (id === 'resume' || id === 'continue') show('play');
    else if (id === 'title') show('title');
    else if (id === 'settings') show('settings');
    else if (id === 'journal') openJournal();
    else if (id === 'howto') openHowTo();
    else if (id === 'explore') openExplorer();
    else if (id === 'swipe') changeSwipe();
    else if (id === 'tap') changeTap();
    else if (id === 'pad') changePad();
    else if (id === 'stop') changeStop();
    else if (id === 'motion') changeMotion();
    else if (id === 'seed') openPad();
    else if (id === 'mode') openWays();
    else if (id === 'lantern') changeLantern();
    else if (id === 'flasks') changeFlasks();
    else if (id === 'sound') changeSound();
    else if (id === 'loud') changeLoud();
    else if (isKind(id) && onSoundTab() && app.screen === 'settings') openSoundList(LOUD_KINDS.find((k) => k.id === id).kind);
    else if (isKind(id)) changeKind(id);
    else if (isVoice(id)) changeVoice(id);
    else if (id === 'stats') changeStats();
    else if (id === 'marks') changeMarks();
    else if (id === 'history') openHistory();
  }
  // Arrows and swipes on a menu: Left and Right change a setting's switch, else the flame moves
  const menuDir = (dir) => {
    const id = menuOf(app.screen)[app.chosen]?.id;
    if (id === 'swipe' && (dir === 'left' || dir === 'right')) changeSwipe();
    else if (id === 'tap' && (dir === 'left' || dir === 'right')) changeTap(dir === 'left');
    else if (id === 'pad' && (dir === 'left' || dir === 'right')) changePad();
    else if (id === 'stop' && (dir === 'left' || dir === 'right')) changeStop();
    else if (id === 'motion' && (dir === 'left' || dir === 'right')) changeMotion();
    else if (id === 'lantern' && (dir === 'left' || dir === 'right')) changeLantern();
    else if (id === 'flasks' && (dir === 'left' || dir === 'right')) changeFlasks();
    else if (id === 'sound' && (dir === 'left' || dir === 'right')) changeSound();
    else if (id === 'loud' && (dir === 'left' || dir === 'right')) changeLoud(dir);
    else if (isKind(id) && (dir === 'left' || dir === 'right')) changeKind(id, dir);
    else if (isVoice(id) && (dir === 'left' || dir === 'right')) changeVoice(id);
    else if (id === 'stats' && (dir === 'left' || dir === 'right')) changeStats();
    else if (id === 'marks' && (dir === 'left' || dir === 'right')) changeMarks();
    else app.chosen = moveChoice(app.chosen, dir, menuOf(app.screen).length);
  };
  return { menuPick, menuDir };
}
