# Lights Out

A design prototype for a minimal Formula One countdown and race calendar.

## Preview locally

Run `node server.mjs` in this directory, then open http://127.0.0.1:4173.

## Included

- Next race countdown, ticking against an illustrative clock.
- Session selection for FP1, FP2, FP3, qualifying and race.
- Sprint weekends with sprint qualifying and sprint in place of FP2/FP3.
- Upcoming, past and full-season calendars.
- Timezone selection, retained in the browser.
- Responsive layout, keyboard controls and reduced-motion support.

## Sample data

Everything in `dist/data.js` is a design fixture, including dates, results, statistics and stylized circuit drawings. The demo clock starts at 24 October 2026 at 10:00 UTC on each page load and then advances in real time. It is not an official race schedule.

The next integration step is to replace `data.js` with normalized schedule data and switch `demoNow()` in `dist/app.js` to the actual current time. Session timestamps are ISO UTC values; display conversion is handled by Intl.DateTimeFormat. No external schedule API is connected.

The site is plain HTML, CSS and JavaScript without build dependencies. Google Fonts serves the two display fonts, with system font fallbacks.
