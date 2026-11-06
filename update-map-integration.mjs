import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {races,scheduleMeta} from './lights-out/dist/data.js';
let sync=execFileSync('git',['show','HEAD:scripts/sync-official.mjs'],{cwd:'lights-out',encoding:'utf8'});
sync=sync.replace("import { createHash } from 'node:crypto';\n",'')
  .replace("['www.formula1.com', 'media.formula1.com']","['www.formula1.com']")
  .replace('const outlines = [];\n','')
  .replace(/    const publicId = flight\.match[\s\S]*?(?=    const id = aliases)/,'')
  .replace("sessions, trackAsset:`./tracks/${id}.svg`, trackSourceUrl, trackSha256:createHash('sha256').update(svg).digest('hex'), sourceUrl:pageUrl,","sessions, sourceUrl:pageUrl,")
  .replace(", official SVG`", "`")
  .replace('return { race, svg };','return race;')
  .replace('for (const {race,svg} of batch) { records.push(race); outlines.push({id:race.id,svg}); }','records.push(...batch);')
  .replace('Verified schedule and unmodified circuit outlines from Formula1.com.','Verified schedule from Formula1.com; map artwork is independently generated.')
  .replace(/\/\/ Nothing replaces[\s\S]*?(?=await fs.writeFile\(path.join\(root,'dist\/data.js.tmp')/,'// Keep the previous schedule until all official records have passed validation.\n')
  .replace(',trackSourceUrl:r.trackSourceUrl,trackSha256:r.trackSha256','')
  .replace(' weekends and unchanged official outlines at ',' weekends at ');
if(/\bsvg\b|\boutlines\b|trackSha256|trackSourceUrl|createHash/.test(sync))throw new Error('Stale official artwork remains in sync script');
await fs.writeFile('lights-out/scripts/sync-official.mjs',sync);
for(const race of races){delete race.trackAsset;delete race.trackSourceUrl;delete race.trackSha256;}
await fs.writeFile('lights-out/dist/data.js','// Verified schedule from Formula1.com; map artwork is independently generated.\nexport const scheduleMeta = '+JSON.stringify(scheduleMeta,null,2)+';\n\nexport const races = '+JSON.stringify(races,null,2)+';\n');
let verify=await fs.readFile('lights-out/scripts/verify-data.mjs','utf8');
verify=verify.replace("import { defaultSession } from '../dist/session-selection.js';","import { defaultSession } from '../dist/session-selection.js';\nimport { pixelTracks } from '../dist/track-data.js';");
const start=verify.indexOf('  assert.equal(race.trackAsset,');
const end=verify.indexOf('\n}',start);
if(start<0||end<0)throw new Error('Missing old asset checks');
verify=verify.slice(0,start)+`  const track = pixelTracks[race.id];
  assert.equal(track.asset, './tracks/' + race.id + '.svg');
  assert.ok(['ODbL-1.0','MIT'].includes(track.license), race.id + ': geometry license');
  assert.ok(track.credit && track.sourceUrl && track.geometryAsset, race.id + ': map attribution');
  assert.ok(Math.abs(track.measuredMetres - Number(race.lengthKm)*1000)/(Number(race.lengthKm)*1000) < .03, race.id + ': correct full-course distance');
  const svg = await readFile(new URL('../dist/tracks/' + race.id + '.svg', import.meta.url));
  assert.equal(createHash('sha256').update(svg).digest('hex'), track.sha256, race.id + ': generated pixel SVG checksum');
  assert.match(svg.toString(), /shape-rendering="crispEdges"/, race.id + ': sharp square pixels');
  assert.ok(!/[CQASTcqast]/.test(svg.toString().match(/d="([^"]+)"/)?.[1] || ''), race.id + ': square-cell paths only');
  const geometry = await readFile(new URL('../dist/map-data/' + race.id + '.geojson', import.meta.url));
  assert.equal(createHash('sha256').update(geometry).digest('hex'), track.geometrySha256, race.id + ': published source geometry checksum');
  const course = JSON.parse(geometry).features[0].geometry.coordinates;
  assert.deepEqual(course[0], course.at(-1), race.id + ': closed full circuit');
  assert.ok(!('trackSourceUrl' in race), race.id + ': official artwork removed');`+verify.slice(end);
verify=verify.replace('23 original SVG checksums','23 independent pixel maps');
await fs.writeFile('lights-out/scripts/verify-data.mjs',verify);
let readme=await fs.readFile('lights-out/README.md','utf8');
readme=readme.replace(/Each file in `dist\/tracks\/`[\s\S]*?(?=\n\n## Refresh)/,'Each file in `dist/tracks/` is an original pixel drawing generated from geographic course coordinates, using OpenStreetMap data (ODbL) and Tomislav Bacinger’s circuit collection (MIT). No Formula1.com map artwork is used. `scripts/build-pixel-tracks.mjs` joins the main course, excludes pit lanes, applies latitude-correct scaling, preserves the route’s proportions and renders square cells on a fixed grid. It rotates tall layouts to fit the panel. Pixel maps are stylised representations rather than surveying diagrams. Sources, downloadable coordinates and licenses are linked from the circuit panel through `dist/map-credits.html`.');
readme=readme.replace('every listed race and its original outline','every listed race').replace('original asset checksums','independent pixel map checksums and closed full-course geometry');
readme=readme.replace('The scripts can also run directly without npm:', 'Run `node scripts/build-pixel-tracks.mjs` to rebuild the artwork from the checked-in `sources/tracks/` coordinate snapshots without network access. This is separate from refreshing the schedule, so schedule updates cannot reintroduce copied official artwork.\n\nThe scripts can also run directly without npm:');
await fs.writeFile('lights-out/README.md',readme);
const pkg=JSON.parse(await fs.readFile('lights-out/package.json','utf8'));
pkg.scripts.maps='node scripts/build-pixel-tracks.mjs';
pkg.scripts.check='node --check dist/app.js && node --check dist/data.js && node --check dist/track-data.js && node --check dist/session-selection.js && node --check scripts/sync-official.mjs && node --check scripts/build-pixel-tracks.mjs && node scripts/verify-data.mjs';
await fs.writeFile('lights-out/package.json',JSON.stringify(pkg,null,2)+'\n');
console.log('Separated independent map artwork from the verified schedule; updated checks and documentation.');
