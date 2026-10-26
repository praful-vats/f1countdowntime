import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { races } from '../dist/data.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const hash=value=>createHash('sha256').update(value).digest('hex');
const distance=(a,b)=>Math.hypot((a[0]-b[0])*111320*Math.cos((a[1]+b[1])*Math.PI/360),(a[1]-b[1])*111320);
const length=points=>points.slice(1).reduce((sum,p,i)=>sum+distance(points[i],p),0);
function joinCourse(data,id) {
  const segments=data.features.filter(f=>f.geometry&&!/pit/i.test(f.properties?.role||''))
    .flatMap(f=>f.geometry.type==='LineString'?[f.geometry.coordinates]:f.geometry.type==='MultiLineString'?f.geometry.coordinates:[])
    .filter(line=>line.length>1).map(line=>line.map(p=>p.slice(0,2)));
  if(!segments.length)throw new Error(`${id}: missing course`);
  const points=[...segments.shift()];
  while(segments.length) {
    let choice;
    for(let i=0;i<segments.length;i++)for(const reverse of [false,true]) {
      const gap=distance(points.at(-1),reverse?segments[i].at(-1):segments[i][0]);
      if(!choice||gap<choice.gap)choice={i,reverse,gap};
    }
    if(choice.gap>2)throw new Error(`${id}: disconnected course (${choice.gap.toFixed(1)} m)`);
    const segment=segments.splice(choice.i,1)[0];
    if(choice.reverse)segment.reverse();
    points.push(...segment.slice(choice.gap<.01?1:0));
  }
  if(distance(points[0],points.at(-1))>2)throw new Error(`${id}: course is not closed`);
  points[points.length-1]=points[0];
  return points;
}
function pixelDrawing(coordinates) {
  const latitude=coordinates.reduce((s,p)=>s+p[1],0)/coordinates.length;
  let projected=coordinates.map(([lon,lat])=>[lon*Math.cos(latitude*Math.PI/180),-lat]);
  const bounds=ps=>({x0:Math.min(...ps.map(p=>p[0])),x1:Math.max(...ps.map(p=>p[0])),y0:Math.min(...ps.map(p=>p[1])),y1:Math.max(...ps.map(p=>p[1]))});
  let b=bounds(projected),rotated=false;
  if(b.y1-b.y0>(b.x1-b.x0)*1.15){projected=projected.map(([x,y])=>[-y,x]);b=bounds(projected);rotated=true;}
  const scale=144/Math.max(b.x1-b.x0,b.y1-b.y0),padding=5;
  const points=projected.map(([x,y])=>[(x-b.x0)*scale+padding,(y-b.y0)*scale+padding]);
  const width=Math.ceil((b.x1-b.x0)*scale+padding*2),height=Math.ceil((b.y1-b.y0)*scale+padding*2);
  const dist=(p,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],n=dx*dx+dy*dy,t=n?Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/n)):0;return Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy);};
  function simplify(ps){let max=.65,at=0;for(let i=1;i<ps.length-1;i++){const d=dist(ps[i],ps[0],ps.at(-1));if(d>max){max=d;at=i;}}return at?[...simplify(ps.slice(0,at+1)).slice(0,-1),...simplify(ps.slice(at))]:[ps[0],ps.at(-1)];}
  const split=points.reduce((best,p,i)=>Math.hypot(p[0]-points[0][0],p[1]-points[0][1])>best.d?{i,d:Math.hypot(p[0]-points[0][0],p[1]-points[0][1])}:best,{i:1,d:0}).i;
  const ps=[...simplify(points.slice(0,split+1)).slice(0,-1),...simplify(points.slice(split)).slice(0,-1)];
  const f=p=>p.map(n=>n.toFixed(2)).join(' ');
  const offset=(p,q)=>{const d=Math.hypot(q[0]-p[0],q[1]-p[1]),t=Math.min(.8,d*.2)/d;return[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];};
  let d='';ps.forEach((p,i)=>{const entry=offset(p,ps[(i+ps.length-1)%ps.length]),exit=offset(p,ps[(i+1)%ps.length]);d+=(i?'L':'M')+f(entry)+'Q'+f(p)+' '+f(exit);});d+='Z';
  const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+width+' '+height+'" shape-rendering="geometricPrecision"><path d="'+d+'" fill="none" stroke="#f02717" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/></svg>\n';
  return {svg,width,height,rotated,style:'simplified-vector',controlPoints:ps.length};
}
const entries={};
const failures=[];
await fs.mkdir(path.join(root,'dist/map-data'),{recursive:true});
for(const race of races) {
  try {
  const raw=await fs.readFile(path.join(root,`sources/tracks/${race.id}.geojson`),'utf8');
  const sourceData=JSON.parse(raw),points=joinCourse(sourceData,race.id);
  const source=sourceData.source||{url:sourceData.properties.sourceUrl,credit:sourceData.properties.attribution,license:sourceData.properties.license,licenseUrl:sourceData.properties.licenseUrl,retrievedAt:sourceData.properties.fetchedAt};
  const measuredMetres=length(points),error=Math.abs(measuredMetres-Number(race.lengthKm)*1000)/(Number(race.lengthKm)*1000);
  if(error>.03)throw new Error(`${race.id}: track length differs by ${(error*100).toFixed(1)}%; review course`);
  const drawing=pixelDrawing(points);
  const course={type:'FeatureCollection',source,features:[{type:'Feature',properties:{id:race.id,name:race.circuit,license:source.license,credit:source.credit},geometry:{type:'LineString',coordinates:points}}]};
  const geometry=JSON.stringify(course);
  await fs.writeFile(path.join(root,`dist/map-data/${race.id}.geojson`),geometry);
  await fs.writeFile(path.join(root,`dist/tracks/${race.id}.svg`),drawing.svg);
  entries[race.id]={asset:`./tracks/${race.id}.svg`,sourceUrl:source.url,credit:source.credit,license:source.license,licenseUrl:source.licenseUrl,geometryAsset:`./map-data/${race.id}.geojson`,sha256:hash(drawing.svg),geometrySha256:hash(geometry),sourceSha256:hash(raw),measuredMetres:Math.round(measuredMetres),...Object.fromEntries(Object.entries(drawing).filter(([key])=>key!=='svg'))};
  console.log(`${race.id}: ${(measuredMetres/1000).toFixed(3)} km; ${drawing.width}×${drawing.height} drawing`);
  } catch(error) { failures.push(error.message); }
}
if(failures.length)throw new Error(failures.join('\n'));
await fs.writeFile(path.join(root,'dist/track-data.js'),`// Original stylised drawings from attributed geographic track coordinates.\nexport const pixelTracks = ${JSON.stringify(entries,null,2)};\n`);
await fs.copyFile(path.join(root,'sources/LICENSE-bacinger.txt'),path.join(root,'dist/map-data/LICENSE-bacinger.txt'));
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cards=races.map(r=>{const map=entries[r.id];return '<article class="collection-card"><div class="card-meta"><span>ROUND '+String(r.round).padStart(2,'0')+'</span><b>'+escape(r.country)+'</b></div><h2>'+escape(r.location)+'</h2><div class="map-drawing"><img src="'+map.asset+'" alt="'+escape(r.circuit)+' stylised track layout"></div><p class="venue">'+escape(r.circuit)+'</p><div class="collection-links"><a href="'+escape(map.sourceUrl)+'">Map source ↗</a><a href="'+map.geometryAsset+'" download>Coordinates ↓</a></div><p class="credit">'+escape(map.credit)+' · <a href="'+escape(map.licenseUrl)+'">'+map.license+'</a></p></article>';}).join('');
const credits=(await fs.readFile(path.join(root,'scripts/map-credits.template.html'),'utf8')).replace('{{CARDS}}',cards);
await fs.writeFile(path.join(root,'dist/map-credits.html'),credits);
console.log(`Built ${Object.keys(entries).length} independent track illustrations.`);
