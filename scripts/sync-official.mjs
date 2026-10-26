import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cache = path.resolve(root, '../official-research');
const season = 2026;
const sourceUrl = `https://www.formula1.com/en/racing/${season}`;
const aliases = { mexico: 'mexico-city', brazil: 'sao-paulo', 'barcelona-catalunya': 'barcelona', 'great-britain': 'britain', spain: 'madrid', 'united-arab-emirates': 'abu-dhabi' };
const countryCodes = { AUS:'AU', CHN:'CN', JPN:'JP', USA:'US', CAN:'CA', MON:'MC', ESP:'ES', AUT:'AT', GBR:'GB', BEL:'BE', HUN:'HU', NED:'NL', NLD:'NL', ITA:'IT', AZE:'AZ', BRN:'BH', BHR:'BH', MYS:'MY', MAS:'MY', MAL:'MY', SGP:'SG', SIN:'SG', MEX:'MX', BRA:'BR', QAT:'QA', UAE:'AE', ARE:'AE' };
const sessionIds = { p1:'fp1', p2:'fp2', p3:'fp3', q:'qualifying', ss:'sq', s:'sprint', r:'race' };
await fs.mkdir(cache, { recursive: true });

async function download(url) {
  const allowed = ['www.formula1.com'];
  if (!allowed.includes(new URL(url).hostname)) throw new Error(`Unexpected source host: ${url}`);
  const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw new Error(`Official source returned ${response.status}: ${url}`);
  if (!allowed.includes(new URL(response.url).hostname)) throw new Error(`Unexpected redirect: ${response.url}`);
  return response.text();
}

function flightText(html) {
  return [...html.matchAll(/self\.__next_f\.push\((\[.*?\])\)<\/script>/gs)]
    .map(match => JSON.parse(match[1]))
    .filter(chunk => chunk[0] === 1)
    .map(chunk => chunk[1]).join('');
}

function readObject(text, marker) {
  const start = text.indexOf(marker);
  if (start < 0) throw new Error(`Official page missing ${marker}`);
  let depth = 0, inString = false, escaped = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') inString = false;
    } else if (c === '"') inString = true;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return JSON.parse(text.slice(start, i + 1));
  }
  throw new Error('Incomplete official session record');
}

function utc(local, offset) {
  if (!local || !/^[+-]\d{2}:\d{2}$/.test(offset)) throw new Error('Missing official timestamp or UTC offset');
  const timestamp = new Date(/[Zz]$|[+-]\d{2}:\d{2}$/.test(local) ? local : local + offset);
  if (!Number.isFinite(timestamp.getTime())) throw new Error(`Invalid official timestamp: ${local} ${offset}`);
  return timestamp.toISOString();
}

const calendar = await download(sourceUrl);
await fs.writeFile(path.join(cache, 'calendar.html'), calendar);
const links = [...new Set([...calendar.matchAll(new RegExp(`href="(/en/racing/${season}/[^"?#]+)"`, 'g'))].map(m => m[1]))]
  .filter(url => !url.includes('pre-season-testing'));
if (links.length < 15 || links.length > 30) throw new Error('Unexpected calendar size; review before replacing data');
const records = [];
for (let offset = 0; offset < links.length; offset += 4) {
  const batch = await Promise.all(links.slice(offset, offset + 4).map(async href => {
    const slug = href.split('/').at(-1);
    const pageUrl = `https://www.formula1.com${href}`;
    const html = await download(pageUrl);
    await fs.writeFile(path.join(cache, `${slug}.html`), html);
    const flight = flightText(html);
    const raw = readObject(flight, '{"meetingSessions":');
    if (String(raw.season) !== String(season) || raw.url !== href) throw new Error(`Race identity mismatch: ${href}`);
    await fs.writeFile(path.join(cache, `${slug}-record.json`), JSON.stringify(raw, null, 2));
    const id = aliases[slug] || slug;
    const sessions = raw.meetingSessions.map(s => {
      if (!sessionIds[s.session]) throw new Error(`Unknown F1 session ${s.session}`);
      const start = utc(s.startTime, s.gmtOffset), end = utc(s.endTime, s.gmtOffset);
      if (end <= start) throw new Error(`Invalid session window: ${slug}/${s.session}`);
      return { id:sessionIds[s.session], name:s.description, start, end, sourceState:s.state, sourceSessionId:s.meetingSessionKey };
    }).sort((a,b) => Date.parse(a.start) - Date.parse(b.start));
    const raceSession = sessions.find(s => s.id === 'race');
    if (!raceSession || new Set(sessions.map(s=>s.id)).size !== sessions.length || sessions.length !== 5) throw new Error(`Incomplete weekend: ${slug}`);
    const track = raw.trackStats;
    const flag = countryCodes[track.circuitCountryCode];
    if (!flag || !raw.circuitOfficialName || !track.trackLength || !raw.scheduledDistance || !raw.scheduledLapCount) throw new Error(`Missing venue metadata: ${slug}`);
    const race = {
      id, round:Number(raw.meetingNumber), title:raw.meetingName.replace(/ Grand Prix\b/, '').trim(), officialName:raw.meetingOfficialName,
      country:track.circuitCountry, location:raw.meetingLocation || raw.circuitLocation, circuit:raw.circuitOfficialName, flag,
      date:raceSession.start, dateStart:raw.meetingStartDate.slice(0,10), dateEnd:raw.meetingEndDate.slice(0,10),
      timezone:raw.meetingTimezone, sprint:sessions.some(s=>s.id==='sprint'),
      lengthKm:track.trackLength, laps:Number(raw.scheduledLapCount), distanceKm:raw.scheduledDistance,
      sessions, sourceUrl:pageUrl,
    };
    console.log(`${String(race.round).padStart(2,'0')} ${race.title}: ${sessions.length} sessions, ${race.sprint ? 'Sprint' : 'standard'}`);
    return race;
  }));
  records.push(...batch);
}

records.sort((a,b)=>a.round-b.round);
if (records.some((r,i)=>r.round!==i+1)) throw new Error('Non-contiguous official rounds; inspect the source before updating');
if (records.some((r,i)=>i && r.date<=records[i-1].date)) throw new Error('Calendar date order disagrees with round order');
const checkedAt = new Date().toISOString();
const meta = {season,checkedAt,sourceUrl,totalRounds:records.length,updateMode:'verified-snapshot'};
const output = `// Verified schedule from Formula1.com; map artwork is independently generated.\n// Regenerate with: node scripts/sync-official.mjs\nexport const scheduleMeta = ${JSON.stringify(meta,null,2)};\n\nexport const races = ${JSON.stringify(records,null,2)};\n`;
// Keep the previous schedule until all official records have passed validation.
await fs.writeFile(path.join(root,'dist/data.js.tmp'),output);
await fs.rename(path.join(root,'dist/data.js.tmp'),path.join(root,'dist/data.js'));
await fs.writeFile(path.join(cache,'verification.json'),JSON.stringify({checkedAt,races:records.map(r=>({id:r.id,round:r.round,sourceUrl:r.sourceUrl}))},null,2));
console.log(`Verified and saved ${records.length} weekends at ${checkedAt}.`);
