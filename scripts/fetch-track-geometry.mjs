import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = {
  australia:'Albert_Park_Circuit', china:'Shanghai_International_Circuit', japan:'Suzuka_International_Racing_Course',
  canada:'Circuit_Gilles_Villeneuve',
  barcelona:'Circuit_de_Barcelona_Catalunya', austria:'Red_Bull_Ring', britain:'Silverstone_Circuit',
  belgium:'Circuit_de_Spa_Francorchamps',
  italy:'Autodromo_Nazionale_di_Monza', singapore:'Marina_Bay_Street_Circuit',
  'united-states':'Circuit_of_the_Americas',
  'mexico-city':'Autodromo_Hermanos_Rodriguez', 'sao-paulo':'Autodromo_Jose_Carlos_Pace',
  'las-vegas':'Las_Vegas_Strip_Circuit',
};
const base = 'https://raw.githubusercontent.com/mvoof/F1TrackDownloader/main/tracks_geojson/';
await fs.mkdir(path.join(root,'sources/tracks'),{recursive:true});
async function readJson(url) {
  const response = await fetch(url,{signal:AbortSignal.timeout(45000)});
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response.json();
}
for (const [id,file] of Object.entries(files)) {
  const url = `${base}${file}.geojson`;
  const geojson = await readJson(url);
  geojson.source = {url, credit:'© OpenStreetMap contributors', license:'ODbL-1.0', licenseUrl:'https://opendatacommons.org/licenses/odbl/1-0/', retrievedAt:new Date().toISOString()};
  await fs.writeFile(path.join(root,`sources/tracks/${id}.geojson`),JSON.stringify(geojson));
  console.log(`${id}: ${geojson.features.length} segments; ${JSON.stringify(geojson.features.map(f=>f.properties))}`);
}
await import('./fetch-track-fallbacks.mjs');
await import('./fetch-qatar.mjs');
