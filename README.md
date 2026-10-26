# Lights Out

A minimal Formula One countdown and race calendar, using a verified snapshot of the official 2026 Formula1.com schedule.

## Preview locally

Run `npm run dev` (or `node server.mjs`) in this directory, then open [the local preview](http://127.0.0.1:4173).

## Included

- Next session countdown, ticking against the visitor's actual device clock. The earliest future session takes priority, even while an earlier session is within its scheduled time window. If no future session remains in the selected weekend, its active window is shown; archived weekends default to Race. Manual session selections stay selected.
- Shared open-wheel car icon for practice, timed-lap stopwatches for qualifying, a starting-light gantry for Sprint, and a chequered flag for Race. Sprint qualifying adds speed strokes to its stopwatch.
- Session selection for FP1, FP2, FP3, qualifying and Race.
- Sprint weekends with sprint qualifying and sprint in place of FP2/FP3.
- Upcoming, past and full-season calendars.
- Timezone selection, retained in the browser, including the selected circuit's timezone. Session dates and times use this selection; weekend date ranges always use dates at the circuit.
- Responsive layout, keyboard controls and reduced-motion support.

## Official schedule snapshot

`dist/data.js` contains the 23-round 2026 schedule, session start/end timestamps, official event names, venue metadata and source links collected from [Formula1.com](https://www.formula1.com/en/racing/2026). Its `scheduleMeta.checkedAt` records the last successful source refresh and is displayed in the footer. This includes the Bahrain Grand Prix in Malaysia at Sepang and the six official Sprint weekends; Saudi Arabia is absent from this calendar.

This is a manually refreshed snapshot, not an automatic live schedule feed. The countdown advances continuously, but schedule amendments require a new refresh and publication. “Scheduled now” describes the published time window; it does not confirm live track status, delays or session completion. Session timestamps are stored as ISO UTC values after applying the official record's UTC offset. `Intl.DateTimeFormat` converts them for display.

Each file in `dist/tracks/` is the unmodified black-outline SVG provided by Formula1.com for that circuit. CSS masks recolor those original shapes in the existing red-and-grid design, using `contain` sizing to preserve their proportions. Each asset's source URL and SHA-256 checksum are recorded alongside its race. The circuit panel links to the official source.

## Refresh and validation

Run `npm run sync` to fetch the official calendar, every listed race and its original outline, then run the checks. Source pages and extracted records are cached in `../official-research/`. The importer validates all downloaded records before replacing the schedule; the previous timestamp remains until a successful refresh. Review changed dates, rounds and venues, preview locally, and publish the updated `dist/` separately. The refresh command does not publish the site.

Run `npm run check` for local syntax and data checks without network access. The checks cover the verified 23-round calendar, session order and Sprint composition, independent US/Mexico/São Paulo timetable examples, the relocated Bahrain venue, timezone/date boundaries, original asset checksums and default-session selection. A genuine official calendar change may require reviewing these fixed expectations against Formula1.com before updating them.

The scripts can also run directly without npm: `node scripts/sync-official.mjs` refreshes the snapshot and `node scripts/verify-data.mjs` checks it.

The site is plain HTML, CSS and JavaScript without build dependencies. Google Fonts serves the two display fonts, with system font fallbacks.
