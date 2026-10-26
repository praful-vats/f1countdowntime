import fs from 'node:fs/promises';
const mappings = {'abu-dhabi':'ae-2009',bahrain:'my-1999',hungary:'hu-1986',miami:'us-2022',netherlands:'nl-1948',madrid:'es-2026',monaco:'mc-1929',azerbaijan:'az-2016'};
const base='https://raw.githubusercontent.com/bacinger/f1-circuits/master/';
const response=await fetch(base+'f1-circuits.geojson',{signal:AbortSignal.timeout(40000)});
if(!response.ok)throw new Error(`Track data ${response.status}`);
const dataset=await response.json();
for(const [id,sourceId] of Object.entries(mappings)) {
  const feature=dataset.features.find(f=>f.properties.id===sourceId);
  if(!feature||feature.geometry.type!=='LineString')throw new Error(`Missing ${id}`);
  const data={type:'FeatureCollection',source:{url:`https://github.com/bacinger/f1-circuits/blob/master/circuits/${sourceId}.geojson`,credit:'© Tomislav Bacinger',license:'MIT',licenseUrl:'https://github.com/bacinger/f1-circuits/blob/master/LICENSE.md',retrievedAt:new Date().toISOString()},features:[feature]};
  await fs.writeFile(`sources/tracks/${id}.geojson`,JSON.stringify(data));
  console.log(`${id}: ${feature.geometry.coordinates.length} coordinate points`);
}
const licenseResponse=await fetch(base+'LICENSE.md');
if(!licenseResponse.ok)throw new Error('Missing data license');
await fs.writeFile('sources/LICENSE-bacinger.txt',await licenseResponse.text());
