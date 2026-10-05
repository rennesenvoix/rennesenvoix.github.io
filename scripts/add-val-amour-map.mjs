import { toLambert93 } from "./lambert93.mjs";
// Add the official API Géo outline without rebuilding the existing postal map.
// Source: https://geo.api.gouv.fr/epcis/243900420?format=geojson&geometry=contour
import fs from "node:fs";


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
const projectionMetadata = svg.match(/<metadata id="map-projection">([^<]+)<\/metadata>/);
const projection = projectionMetadata ? JSON.parse(projectionMetadata[1]) : null;
const scale = projection?.scale ?? numerator / denominator;
const coordinate = point => projection
  ? [((point[0] - projection.minX) * scale + projection.padding).toFixed(3), ((projection.maxY - point[1]) * scale + projection.padding).toFixed(3)]
  : point.map((v,axis)=>(means[axis].s+(v-means[axis].w)*scale*(axis===0?1:-1)).toFixed(3));
for(const p of points) if(coordinate(p.world).some((v,i)=>Math.abs(Number(v)-p.screen[i])>0.15)) throw new Error("Projection mismatch");
const data=JSON.parse(fs.readFileSync("scripts/data/val-amour.geojson","utf8"));
const rings=data.geometry.type==="Polygon"?data.geometry.coordinates:data.geometry.coordinates.flat();
const d=rings.map(r=>r.map((p,i)=>(i?"L":"M")+coordinate(toLambert93(p)).join(" ")).join("")+"Z").join("");
svg=svg.replace(/<path class="val-amour-border"[^>]*\/>/g,"");
const outline='<path class="val-amour-border" d="'+d+'" fill="none" stroke="hsl(205 85% 40%)" stroke-width="3.3" stroke-linejoin="round"/>';
svg=svg.replace('<g class="map-marker"',outline+'<g class="map-marker"');
svg=svg.replace('les départements et la Communauté de communes Loue-Lison.', 'les départements et les communautés de communes Loue-Lison, du Val d’Amour et Cœur du Jura.');
const coeurData=JSON.parse(fs.readFileSync("scripts/data/coeur-du-jura.geojson","utf8"));
const coeurRings=coeurData.geometry.type==="Polygon"?coeurData.geometry.coordinates:coeurData.geometry.coordinates.flat();
const coeurD=coeurRings.map(r=>r.map((p,i)=>(i?"L":"M")+coordinate(toLambert93(p)).join(" ")).join("")+"Z").join("");
svg=svg.replace(/<path class="coeur-du-jura-border"[^>]*\/>/g,"");
const coeurOutline='<path class="coeur-du-jura-border" d="'+coeurD+'" fill="none" stroke="hsl(25 90% 45%)" stroke-width="3.3" stroke-linejoin="round"/>';
svg=svg.replace('<path class="val-amour-border"',coeurOutline+'<path class="val-amour-border"');
// Keep projection references as metadata, without displaying department capitals.
const referenceData = Object.fromEntries(cities.map(([name], i) => [name, points[i].screen]));
svg = svg.replace(/<metadata id="projection-references">[^<]+<\/metadata>/g, "");
svg = svg.replace("</svg>", '<metadata id="projection-references">' + JSON.stringify(referenceData) + '</metadata></svg>');
svg = svg.replace(/<g class="map-marker" aria-label="(?:Besançon|Lons-le-Saunier|Vesoul|Belfort)">[\s\S]*?<\/g>/g, "");
// Natural Earth 1:10m: all eight countries bordering continental France.
const geography = JSON.parse(fs.readFileSync("scripts/data/suisse-allemagne-lacs.geojson", "utf8"));
const escapeXml = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
// Natural Earth est généralisé : ne pas doubler une frontière française
// détaillée par son tracé approximatif. Le contour national fait référence.
const nationalPath = svg.match(/<path class="national-border" d="([^"]+)"/)[1];
const tolerance = 2000 * scale;
const cells = new Map();
const cellKey = (x, y) => `${x},${y}`;
for (const match of nationalPath.matchAll(/M([\d.-]+) ([\d.-]+)L([\d.-]+) ([\d.-]+)/g)) {
  const segment = match.slice(1).map(Number);
  const [ax, ay, bx, by] = segment;
  for (let x = Math.floor(Math.min(ax, bx) / tolerance); x <= Math.floor(Math.max(ax, bx) / tolerance); x++) {
    for (let y = Math.floor(Math.min(ay, by) / tolerance); y <= Math.floor(Math.max(ay, by) / tolerance); y++) {
      const key = cellKey(x, y);
      if (!cells.has(key)) cells.set(key, []);
      cells.get(key).push(segment);
    }
  }
}
const nearestBorder = ([x, y]) => {
  let best = null;
  let distance = tolerance ** 2;
  const cx = Math.floor(x / tolerance), cy = Math.floor(y / tolerance);
  for (let i = cx - 1; i <= cx + 1; i++) for (let j = cy - 1; j <= cy + 1; j++) {
    for (const [ax, ay, bx, by] of cells.get(cellKey(i, j)) ?? []) {
      const dx = bx - ax, dy = by - ay;
      const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)));
      const p = [ax + t * dx, ay + t * dy];
      const d = (x - p[0]) ** 2 + (y - p[1]) ** 2;
      if (d < distance) { distance = d; best = p; }
    }
  }
  return best;
};
const geographicPath = geometry => {
  const rings = geometry.type === "Polygon" ? geometry.coordinates : geometry.coordinates.flat();
  const format = p => p.map(v => Number(v).toFixed(3)).join(" ");
  return rings.map(ring => {
    // Densifier pour couper les tronçons communs sans refermer les tracés.
    const points = [];
    for (let i = 1; i < ring.length; i++) {
      const a = coordinate(toLambert93(ring[i - 1])).map(Number);
      const b = coordinate(toLambert93(ring[i])).map(Number);
      const steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / (500 * scale)));
      for (let j = 0; j < steps; j++) points.push(a.map((v, axis) => v + (b[axis] - v) * j / steps));
    }
    points.push(coordinate(toLambert93(ring[ring.length - 1])).map(Number));
    let path = "", penDown = false, lastBorder = null;
    for (const point of points) {
      const border = nearestBorder(point);
      if (border) {
        if (penDown) path += "L" + format(border);
        penDown = false;
        lastBorder = border;
      } else {
        if (!penDown) path += "M" + format(lastBorder ?? point);
        path += "L" + format(point);
        penDown = true;
        lastBorder = null;
      }
    }
    return path;
  }).join("");
};
const geographyLayer = kind => geography.features.filter(f => f.properties.kind === kind).map(f => {
  const style = kind === "country"
    ? 'fill="none" stroke="#555555" stroke-width="2.4" stroke-opacity="0.65"'
    : 'fill="#b9dfef" fill-opacity="0.65" stroke="#609bb5" stroke-width="0.7"';
  return '<path d="' + geographicPath(f.geometry) + '" ' + style + ' stroke-linejoin="round" fill-rule="evenodd"><title>' + escapeXml(f.properties.name) + '</title></path>';
}).join("");
svg = svg.replace(/<g class="neighbor-countries">[\s\S]*?<\/g>/g, "").replace(/<g class="swiss-lakes">[\s\S]*?<\/g>/g, "");
svg = svg.replace('<g class="postcode-lines"', '<g class="neighbor-countries">' + geographyLayer("country") + '</g><g class="postcode-lines"');

fs.writeFileSync(file,svg);
