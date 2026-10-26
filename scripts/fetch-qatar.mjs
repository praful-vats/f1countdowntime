import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

// Inspected against OSM's current Lusail raceway graph. These two ways form
// the 5.4 km Grand Prix loop; the other raceways include pits, alternative
// course links, a MotoGP long-lap loop and karting tracks.
const wayIds = [152483595, 1553605580];
const nodes = new Map();
const ways = [];

for (const id of wayIds) {
  const apiUrl = `https://api.openstreetmap.org/api/0.6/way/${id}/full.json`;
  const response = await fetch(apiUrl, {
    headers: { Accept: 'application/json', 'User-Agent': 'LightsOutCircuitResearch/1.0' },
    signal: AbortSignal.timeout(40000),
  });
  if (!response.ok) throw new Error(`OSM ${response.status}: ${apiUrl}`);
  const result = await response.json();
  for (const element of result.elements) {
    if (element.type === 'node') nodes.set(element.id, [element.lon, element.lat]);
  }
  const way = result.elements.find(element => element.type === 'way' && element.id === id);
  assert.equal(way?.tags?.highway, 'raceway', `Way ${id} must remain a raceway`);
  assert.equal(way.tags.sport, 'motor', `Way ${id} must remain a motor circuit`);
  assert.ok(!/pit|kart|penalty/i.test(way.tags.name || ''), `Way ${id} is not the Grand Prix course`);
  ways.push({ ...way, apiUrl });
}

const orderedNodes = [...ways[0].nodes];
for (const way of ways.slice(1)) {
  const segment = [...way.nodes];
  if (segment.at(-1) === orderedNodes.at(-1)) segment.reverse();
  assert.equal(segment[0], orderedNodes.at(-1), 'Main track segments must join at the same OSM node');
  orderedNodes.push(...segment.slice(1));
}
assert.equal(orderedNodes[0], orderedNodes.at(-1), 'Grand Prix course must form a closed loop');
const coordinates = orderedNodes.map(id => {
  const position = nodes.get(id);
  assert.ok(position?.every(Number.isFinite), `Missing coordinates for node ${id}`);
  return position;
});
const distance = (a, b) => {
  const rad = Math.PI / 180;
  const lat = (b[1] - a[1]) * rad;
  const lon = (b[0] - a[0]) * rad;
  const haversine = Math.sin(lat / 2) ** 2 + Math.cos(a[1] * rad) * Math.cos(b[1] * rad) * Math.sin(lon / 2) ** 2;
  return 6371008.8 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
};
const metres = coordinates.slice(1).reduce((sum, point, index) => sum + distance(coordinates[index], point), 0);
assert.ok(metres > 5200 && metres < 5600, `Review Lusail geometry: measured ${metres.toFixed(1)} m, expected approximately 5.4 km`);

const data = {
  type: 'FeatureCollection',
  name: 'Lusail International Circuit — Grand Prix course',
  properties: {
    source: 'OpenStreetMap',
    sourceUrl: 'https://www.openstreetmap.org/way/152483595',
    license: 'ODbL-1.0',
    licenseUrl: 'https://opendatacommons.org/licenses/odbl/1-0/',
    attribution: '© OpenStreetMap contributors',
    attributionUrl: 'https://www.openstreetmap.org/copyright',
    fetchedAt: new Date().toISOString(),
    measuredLengthMetres: Number(metres.toFixed(3)),
    officialLengthMetresForComparison: 5419,
    selection: 'Main Grand Prix loop only. Excludes pit lanes, MotoGP long-lap loop, alternative course links and karting tracks.',
    sourceElements: ways.map(way => ({
      type: 'way', id: way.id, version: way.version, modifiedAt: way.timestamp,
      sourceUrl: `https://www.openstreetmap.org/way/${way.id}`, apiUrl: way.apiUrl,
    })),
  },
  features: [{
    type: 'Feature',
    properties: { id: 'qatar', name: 'Lusail International Circuit', osmWayIds: wayIds },
    geometry: { type: 'LineString', coordinates },
  }],
};
const output = new URL('../sources/tracks/qatar.geojson', import.meta.url);
await mkdir(new URL('../sources/tracks/', import.meta.url), { recursive: true });
await writeFile(output, JSON.stringify(data, null, 2) + '\n');
console.log(JSON.stringify({ file: output.pathname, points: coordinates.length, closed: true, measuredMetres: data.properties.measuredLengthMetres, sourceElements: data.properties.sourceElements }, null, 2));
