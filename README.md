# Lights Out

A minimal Formula One countdown and race calendar, using a verified snapshot of the official 2026 Formula1.com schedule.

## Preview locally

Run `npm run dev` (or `node server.mjs`) in this directory, then open [the local preview](http://127.0.0.1:4173).

## Publish with GitHub Pages

The GitHub Actions workflow on the repository’s `main` branch publishes this branch’s checked-in `dist/` files to GitHub Pages. Push a site update to `site-deploy`, then run **Deploy to GitHub Pages** from the repository’s **Actions** tab to publish it. The site uses a separate deployment branch to preserve the repository’s existing `main` contents.

## Included

- Next session countdown, ticking against the visitor's actual device clock. The earliest future session takes priority, even while an earlier session is within its scheduled time window. If no future session remains in the selected weekend, its active window is shown; archived weekends default to Race. Manual session selections stay selected.
- Shared open-wheel car icon for practice, timed-lap stopwatches for qualifying, a starting-light gantry for Sprint, and a chequered flag for Race. Sprint qualifying adds speed strokes to its stopwatch.
- Session selection for FP1, FP2, FP3, qualifying and Race.
- Sprint weekends with sprint qualifying and sprint in place of FP2/FP3.
- Upcoming, past and full-season calendars.
- Times default to the visitor’s current device timezone on every visit. The timezone selector, including the selected circuit’s timezone, supports manual changes for the current visit. Session dates and times use this selection; weekend date ranges always use dates at the circuit.
- Responsive layout, keyboard controls and reduced-motion support.

## Official schedule snapshot

`dist/data.js` contains the 23-round 2026 schedule, session start/end timestamps, official event names, venue metadata and source links collected from [Formula1.com](https://www.formula1.com/en/racing/2026). Its `scheduleMeta.checkedAt` records the last successful source refresh and is displayed in the footer. This includes the Bahrain Grand Prix in Malaysia at Sepang and the six official Sprint weekends; Saudi Arabia is absent from this calendar.

This is a manually refreshed snapshot, not an automatic live schedule feed. The countdown advances continuously, but schedule amendments require a new refresh and publication. “Scheduled now” describes the published time window; it does not confirm live track status, delays or session completion. Session timestamps are stored as ISO UTC values after applying the official record's UTC offset. `Intl.DateTimeFormat` converts them for display.

Each file in `dist/tracks/` is an original stylised track illustration generated from geographic course coordinates, using OpenStreetMap data (ODbL) and Tomislav Bacinger’s circuit collection (MIT). No Formula1.com map artwork is used. `scripts/build-pixel-tracks.mjs` joins the main course, excludes pit lanes, applies latitude-correct scaling, simplifies small details and draws clean, gently rounded strokes. It rotates tall layouts to fit the panel. The illustrations prioritise recognisable overall shapes over exact surveying detail. Sources, downloadable coordinates and licenses are linked from the circuit panel through `dist/map-credits.html`.

## Refresh and validation

Run `npm run sync` to fetch the official calendar, every listed race, then run the checks. Source pages and extracted records are cached in `../official-research/`. The importer validates all downloaded records before replacing the schedule; the previous timestamp remains until a successful refresh. Review changed dates, rounds and venues, preview locally, and publish the updated `dist/` separately. The refresh command does not publish the site.

Run `npm run check` for local syntax and data checks without network access. The checks cover the verified 23-round calendar, session order and Sprint composition, independent US/Mexico/São Paulo timetable examples, the relocated Bahrain venue, timezone/date boundaries, independent track illustration checksums and closed full-course geometry and default-session selection. A genuine official calendar change may require reviewing these fixed expectations against Formula1.com before updating them.

Run `node scripts/build-pixel-tracks.mjs` to rebuild the artwork from the checked-in `sources/tracks/` coordinate snapshots without network access. This is separate from refreshing the schedule, so schedule updates cannot reintroduce copied official artwork.

The scripts can also run directly without npm: `node scripts/sync-official.mjs` refreshes the snapshot and `node scripts/verify-data.mjs` checks it.

The site is plain HTML, CSS and JavaScript without build dependencies. Google Fonts serves the two display fonts, with system font fallbacks.
