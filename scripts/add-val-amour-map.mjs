// Add the official API Géo outline without rebuilding the existing postal map.
// Source: https://geo.api.gouv.fr/epcis/243900420?format=geojson&geometry=contour
import fs from "node:fs";
const toLambert93 = ([longitude, latitude]) => {
  const degree = Math.PI / 180;
  const eccentricity = 0.0818191910428158;
  const latitudeRadians = latitude * degree;
  const longitudeRadians = longitude * degree;
  const latitude1 = 44 * degree;
  const latitude2 = 49 * degree;
  const centralMeridian = 3 * degree;
  const isoLatitude = (value) => Math.log(Math.tan(Math.PI / 4 + value / 2) * ((1 - eccentricity * Math.sin(value)) / (1 + eccentricity * Math.sin(value))) ** (eccentricity / 2));
  const n = Math.log(Math.cos(latitude1) / Math.cos(latitude2)) / (isoLatitude(latitude2) - isoLatitude(latitude1));
  const c = (6378137 * Math.cos(latitude1) * Math.exp(n * isoLatitude(latitude1))) / n;
  const radius = c * Math.exp(-n * isoLatitude(latitudeRadians));
  const angle = n * (longitudeRadians - centralMeridian);
  return [700000 + radius * Math.sin(angle), 12655612.049876 - radius * Math.cos(angle)];
};

const file = "src/assets/bourgogne-franche-comte-postcodes.svg";
let svg = fs.readFileSync(file, "utf8");
const cities = [["Rennes-sur-Loue",5.8609,47.0168],["Besançon",6.025,47.2378],["Lons-le-Saunier",5.5557,46.6757],["Vesoul",6.1636,47.6236],["Belfort",6.8629,47.6379]];
const savedReferences = svg.match(/<metadata id="projection-references">([^<]+)<\/metadata>/);
const references = savedReferences ? JSON.parse(savedReferences[1]) : null;
const points = cities.map(([name,lon,lat]) => {
  const start = svg.indexOf('aria-label="'+name+'"');
  const match = svg.slice(start).match(/cx="([\d.]+)" cy="([\d.]+)"/);
  const screen = start >= 0 && match ? [Number(match[1]),Number(match[2])] : references?.[name];
  if (!screen) throw new Error("Missing projection reference: " + name);
  return {world:toLambert93([lon,lat]), screen};
});
// Fit the original uniform scale/translation from five rounded reference markers.
const means = [0,1].map(axis => ({w:points.reduce((s,p)=>s+p.world[axis],0)/points.length, s:points.reduce((s,p)=>s+p.screen[axis],0)/points.length}));
let numerator=0, denominator=0;
for(const p of points) for(const axis of [0,1]) {
  const delta=p.world[axis]-means[axis].w;
  numerator+=delta*(p.screen[axis]-means[axis].s)*(axis===0?1:-1);
  denominator+=delta*delta;
}
const scale=numerator/denominator;
const coordinate=point=>point.map((v,axis)=>(means[axis].s+(v-means[axis].w)*scale*(axis===0?1:-1)).toFixed(1));
for(const p of points) if(coordinate(p.world).some((v,i)=>Math.abs(Number(v)-p.screen[i])>0.15)) throw new Error("Projection mismatch");
const data=JSON.parse(fs.readFileSync("scripts/data/val-amour.geojson","utf8"));
const rings=data.geometry.type==="Polygon"?data.geometry.coordinates:data.geometry.coordinates.flat();
const d=rings.map(r=>r.map((p,i)=>(i?"L":"M")+coordinate(toLambert93(p)).join(" ")).join("")+"Z").join("");
svg=svg.replace(/<path class="val-amour-border"[^>]*\/>/g,"");
const outline='<path class="val-amour-border" d="'+d+'" fill="none" stroke="hsl(205 85% 40%)" stroke-width="2.4" stroke-linejoin="round"/>';
svg=svg.replace('<g class="map-marker"',outline+'<g class="map-marker"');
svg=svg.replace('les départements et la Communauté de communes Loue-Lison.', 'les départements et les communautés de communes Loue-Lison et du Val d’Amour.');
// Keep projection references as metadata, without displaying department capitals.
const referenceData = Object.fromEntries(cities.map(([name], i) => [name, points[i].screen]));
svg = svg.replace(/<metadata id="projection-references">[^<]+<\/metadata>/g, "");
svg = svg.replace("</svg>", '<metadata id="projection-references">' + JSON.stringify(referenceData) + '</metadata></svg>');
svg = svg.replace(/<g class="map-marker" aria-label="(?:Besançon|Lons-le-Saunier|Vesoul|Belfort)">[\s\S]*?<\/g>/g, "");
fs.writeFileSync(file,svg);
