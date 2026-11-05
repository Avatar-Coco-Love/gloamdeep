# Selling on Google Play: the checklist

The owner may sell the game on Google Play, for $5 at most, once it is far
enough along; consoles only if it grows big (D-590). This page is the
checklist, kept so that each step is built when it is due and nothing
blocks the move later. Facts came from research in November 2026, mostly
from secondhand guides; check them on Google's own help pages before
acting, as the rules change every year.

## What Google asks (Nov 2026)
- A personal developer account: $25 once and a government ID check.
- A closed test before launch: 12 testers opted in for 14 days in a row.
  Allow about 3 weeks.
- A payments profile before setting a price; a privacy policy page; the
  Data safety form (no ads or tracking, so almost all "no"); a content
  rating; a 512 px icon, a 1024 × 500 picture and at least 2 screenshots.
- The Android wrapper must target a recent Android every year (API 36
  from 31 Aug 2026), so it is rebuilt yearly even with no game changes.
- A paid app may later go free, but a free app can never become paid:
  decide paid or free-with-an-unlock before launch.

## Ways to wrap the web game (the choice waits until it is due)
1. **Trusted Web Activity (Bubblewrap):** Chrome shows the live game full
   screen. The smallest wrapper; saves in the browser carry over; game
   updates need no new upload. Needs the game at a domain's root (its own
   address or a `<user>.github.io` site) for the link file, and offline play.
2. **Capacitor:** the game's files go inside the app. Works offline with
   no domain, but browser saves need moving by hand (export and import),
   and every update is a new upload.
3. **A plain WebView:** fewest parts, every detail handled by hand.

The research leaned to 1, with 2 as the fallback. The wrapper lives in a
separate repository and reads the game folder as it is, so the game keeps
its no-build-step rule.

## Readiness
| | Item |
| --- | --- |
| Done | a secure site; touch, mouse and keys; the home-screen card and drawn icons (D-375); sound starts on a tap; saves wrapped in try/catch; the share card; no ads or tracking |
| Needed | a safe-area check; the Play account; 12 testers for 14 days; a payments profile; a privacy policy (ties to Q-052); a manifest as a real file; offline play (a service worker); the domain link file, or save export and import; Android's back button opening the game's menu; keeping saves safe (`storage.persist()`); store pictures; paid or unlock; the yearly rebuild |
| Later | an in-game unlock through Play Billing; gamepads; a Steam build; consoles |

Consoles: the Switch has no way to run a web game, so it would mean a
port. Steam and the Steam Deck through a desktop wrapper are the likely
first step. Cheap ways to keep the door open: gamepad support someday, and
no control that works only by hovering.
