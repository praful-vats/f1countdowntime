import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { races, scheduleMeta } from '../dist/data.js';
import { defaultSession } from '../dist/session-selection.js';
import { pixelTracks } from '../dist/track-data.js';

// Independent expectations from the official calendar verified 24 October 2026.
// Review these against Formula1.com if a subsequent official amendment changes them.
assert.equal(scheduleMeta.season, 2026);
assert.equal(scheduleMeta.sourceUrl, 'https://www.formula1.com/en/racing/2026');
assert.equal(scheduleMeta.updateMode, 'verified-snapshot');
assert.equal(scheduleMeta.totalRounds, 23);
assert.equal(races.length, 23);
assert.ok(Number.isFinite(Date.parse(scheduleMeta.checkedAt)), 'Snapshot must record a valid verification timestamp');
assert.ok(Date.parse(scheduleMeta.checkedAt) <= Date.now() + 60_000, 'Snapshot verification timestamp is in the future');
assert.equal(new Set(races.map(race => race.id)).size, races.length, 'Race IDs must be unique');

const expectedSprints = ['britain', 'canada', 'china', 'miami', 'netherlands', 'singapore'];
assert.deepEqual(races.filter(race => race.sprint).map(race => race.id).sort(), expectedSprints);
assert.ok(!races.some(race => /saudi|jeddah/i.test(`${race.id} ${race.circuit}`)), 'Removed Saudi Arabian weekend must not be scheduled');

const localDateTime = (timestamp, timezone) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(timestamp));
  const value = key => parts.find(part => part.type === key).value;
  return `${value('year')}-${value('month')}-${value('day')}T${value('hour')}:${value('minute')}`;
};

for (const [index, race] of races.entries()) {
  assert.equal(race.round, index + 1, `${race.id}: round order`);
  assert.match(race.sourceUrl, /^https:\/\/www\.formula1\.com\/en\/racing\/2026\/[a-z-]+$/);
  assert.match(race.officialName, /^FORMULA 1 .+2026$/);
  assert.ok(race.country && race.location && race.circuit, `${race.id}: complete venue`);
  assert.equal(race.sessions.length, 5, `${race.id}: five F1 sessions`);
  assert.deepEqual(race.sessions.map(session => session.id), race.sprint
    ? ['fp1', 'sq', 'sprint', 'qualifying', 'race']
    : ['fp1', 'fp2', 'fp3', 'qualifying', 'race'], `${race.id}: weekend composition`);
  if (index) assert.ok(race.date > races[index - 1].date, `${race.id}: race chronology`);
  for (const [sessionIndex, session] of race.sessions.entries()) {
    for (const edge of ['start', 'end']) {
      assert.match(session[edge], /^2026-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z$/, `${race.id}/${session.id}: UTC ${edge}`);
      assert.equal(new Date(session[edge]).toISOString(), session[edge], `${race.id}/${session.id}: valid ${edge}`);
    }
    assert.ok(session.end > session.start, `${race.id}/${session.id}: positive duration`);
    if (sessionIndex) assert.ok(session.start >= race.sessions[sessionIndex - 1].end, `${race.id}: non-overlapping sessions`);
    const localDay = localDateTime(session.start, race.timezone).slice(0, 10);
    assert.ok(localDay >= race.dateStart && localDay <= race.dateEnd, `${race.id}/${session.id}: circuit-local weekend dates`);
  }
  assert.equal(race.date, race.sessions.at(-1).start, `${race.id}: race start matches final session`);
  const track = pixelTracks[race.id];
  assert.equal(track.asset, './tracks/' + race.id + '.svg');
  assert.ok(['ODbL-1.0','MIT'].includes(track.license), race.id + ': geometry license');
  assert.ok(track.credit && track.sourceUrl && track.geometryAsset, race.id + ': map attribution');
  assert.ok(Math.abs(track.measuredMetres - Number(race.lengthKm)*1000)/(Number(race.lengthKm)*1000) < .03, race.id + ': correct full-course distance');
  const svg = await readFile(new URL('../dist/tracks/' + race.id + '.svg', import.meta.url));
  assert.equal(createHash('sha256').update(svg).digest('hex'), track.sha256, race.id + ': generated pixel SVG checksum');
  assert.match(svg.toString(), /shape-rendering="geometricPrecision"/, race.id + ": refined vector artwork");
  assert.match(svg.toString(), /stroke-linejoin="round"/, race.id + ": smooth corners");
  const geometry = await readFile(new URL('../dist/map-data/' + race.id + '.geojson', import.meta.url));
  assert.equal(createHash('sha256').update(geometry).digest('hex'), track.geometrySha256, race.id + ': published source geometry checksum');
  const course = JSON.parse(geometry).features[0].geometry.coordinates;
  assert.deepEqual(course[0], course.at(-1), race.id + ': closed full circuit');
  assert.ok(!('trackSourceUrl' in race), race.id + ': official artwork removed');
}

// Values independently cross-checked against official full timetables, not the importer.
// US: formula-1-msc-cruises-united-states-grand-prix-2026.2u6li2pzNhPzL3TSYaagrm
// Mexico: formula-1-gran-premio-de-la-ciudad-de-mexico-2026.14b3wTWzNNLJ5Wd8cG7HCQ
// Brazil: formula-1-msc-cruises-grande-premio-de-sao-paulo-2026.3nFWRAkowAY3uUyvw6O0eJ
// All three articles live under https://www.formula1.com/en/latest/article/.
const expectedStarts = {
  'united-states': ['2026-10-23T17:30:00.000Z', '2026-10-23T21:00:00.000Z', '2026-10-24T17:30:00.000Z', '2026-10-24T21:00:00.000Z', '2026-10-25T20:00:00.000Z'],
  'mexico-city': ['2026-10-30T18:30:00.000Z', '2026-10-30T22:00:00.000Z', '2026-10-31T17:30:00.000Z', '2026-10-31T21:00:00.000Z', '2026-11-01T20:00:00.000Z'],
  'sao-paulo': ['2026-11-06T15:30:00.000Z', '2026-11-06T19:00:00.000Z', '2026-11-07T14:30:00.000Z', '2026-11-07T18:00:00.000Z', '2026-11-08T17:00:00.000Z'],
};
for (const [id, expected] of Object.entries(expectedStarts)) {
  assert.deepEqual(races.find(race => race.id === id).sessions.map(session => session.start), expected, `${id}: published timetable`);
}

const byId = id => races.find(race => race.id === id);
assert.equal(byId('bahrain').country, 'Malaysia');
assert.equal(byId('bahrain').location, 'Kuala Lumpur');
assert.equal(byId('bahrain').circuit, 'Sepang International Circuit');
assert.equal(byId('bahrain').date, '2026-10-04T07:00:00.000Z');
assert.equal(byId('bahrain').flag, 'MY');
assert.equal(byId('britain').location, 'Silverstone');
assert.equal(byId('japan').location, 'Suzuka');
assert.equal(byId('miami').location, 'Miami Gardens');
assert.equal(byId('qatar').location, 'Lusail');
assert.equal(byId('azerbaijan').dateEnd, '2026-09-26', 'Azerbaijan race was on Saturday');
assert.equal(byId('las-vegas').dateEnd, '2026-11-21');
assert.equal(localDateTime(byId('las-vegas').date, byId('las-vegas').timezone), '2026-11-21T20:00');
assert.equal(localDateTime(byId('mexico-city').date, byId('mexico-city').timezone), '2026-11-01T14:00');

const us = byId('united-states');
assert.equal(defaultSession(us, Date.parse('2026-10-24T17:00:00Z')).id, 'fp3');
assert.equal(defaultSession(us, Date.parse('2026-10-24T17:45:00Z')).id, 'qualifying', 'Count down to next session while FP3 is scheduled');
assert.equal(defaultSession(us, Date.parse('2026-10-24T21:00:00Z')).id, 'race', 'Advance at the selected session start');
assert.equal(defaultSession(us, Date.parse('2026-10-25T20:30:00Z')).id, 'race', 'Final active session fallback');
assert.equal(defaultSession(us, Date.parse('2026-10-26T00:00:00Z')).id, 'race', 'Archive defaults to Race');

console.log(`Verified ${races.length} rounds, ${races.reduce((sum, race) => sum + race.sessions.length, 0)} UTC sessions, 6 Sprint weekends, 23 independent track illustrations, critical official timetables and next-session selection.`);
