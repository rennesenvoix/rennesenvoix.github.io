import { toLambert93 } from "./lambert93.mjs";
import fs from "node:fs";
import path from "node:path";

const sourceDirectory = "/private/tmp/rev-postcodes";
const attendance = JSON.parse(fs.readFileSync(new URL("../src/data/frequentation-2026.json", import.meta.url), "utf8"));
const postcodeVisits = new Map(attendance.entries.map(({ postcode, visitors }) => [postcode, visitors]));
const maxPostcodeVisitors = Math.max(...postcodeVisits.values());
// Toute la métropole est visible ; seuls les départements avec des données
// possèdent un découpage postal. Aucun filtre de continuité ou de seuil.
const departmentsWithVisitors = new Set([...postcodeVisits]
  .filter(([, visitors]) => visitors > 0).map(([postcode]) => postcode.slice(0, 2)));
const departmentFeatures = JSON.parse(fs.readFileSync(path.join(sourceDirectory, "departements.geojson"), "utf8")).features;
const mappedDepartmentPrefixes = new Set(departmentFeatures
  .filter(feature => /^\d{2}$/.test(feature.properties.code))
  .map(feature => feature.properties.code));
console.log("Départements avec découpage postal :", [...departmentsWithVisitors].sort().join(", "));

// Le fond postal est déjà en Lambert-93 : utiliser ses coordonnées sans décalage.
const dbf = fs.readFileSync(path.join(sourceDirectory, "F_Codes Postaux_2025.dbf"));
const headerLength = dbf.readUInt16LE(8);
const recordLength = dbf.readUInt16LE(10);
const fieldLength = dbf[32 + 16];
const postcodes = [];
for (let offset = headerLength; offset + recordLength <= dbf.length; offset += recordLength) {
  postcodes.push(dbf.subarray(offset + 1 + fieldLength, offset + 1 + fieldLength * 2).toString("latin1").trim());
}

const shp = fs.readFileSync(path.join(sourceDirectory, "F_Codes Postaux_2025.shp"));
const polygons = [];
for (let offset = 100, recordIndex = 0; offset < shp.length; recordIndex += 1) {
  const contentLength = shp.readUInt32BE(offset + 4) * 2;
  const start = offset + 8;
  const postcode = postcodes[recordIndex];
  offset = start + contentLength;
  if (!departmentsWithVisitors.has(postcode.slice(0, 2))) continue;
  const type = shp.readInt32LE(start);
  if (type !== 5) continue;
  const parts = shp.readInt32LE(start + 36);
  const points = shp.readInt32LE(start + 40);
  const partsOffset = start + 44;
  const pointOffset = partsOffset + parts * 4;
  const indexes = Array.from({ length: parts }, (_, index) => shp.readInt32LE(partsOffset + index * 4));
  const rings = indexes.map((first, index) => {
    const end = index + 1 < indexes.length ? indexes[index + 1] : points;
    return Array.from({ length: end - first }, (_, pointIndex) => {
      const offsetPoint = pointOffset + (first + pointIndex) * 16;
      return [shp.readDoubleLE(offsetPoint), shp.readDoubleLE(offsetPoint + 8)];
    });
  });
  polygons.push({ postcode, rings });
}


const readGeometry = (filePath, selectedCodes = null) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const features = data.type === "FeatureCollection" ? data.features : [data];
  return features.filter((feature) => !selectedCodes || selectedCodes.has(feature.properties.code)).flatMap((feature) => {
    const { type, coordinates } = feature.geometry;
    if (type === "Polygon") return coordinates.map((ring) => ring.map(toLambert93));
    if (type === "MultiPolygon") return coordinates.flat().map((ring) => ring.map(toLambert93));
    return [];
  });
};
const mainlandRings = readGeometry(path.join(sourceDirectory, "departements.geojson"), mappedDepartmentPrefixes);
const departmentRings = readGeometry(path.join(sourceDirectory, "departements.geojson"), departmentsWithVisitors);
const loueLisonRings = readGeometry(path.join(sourceDirectory, "loue-lison.geojson"));
const allPoints = [
  ...polygons.flatMap((polygon) => polygon.rings.flat()),
  ...mainlandRings.flat(),
  ...loueLisonRings.flat(),
];
const bounds = allPoints.reduce((result, [x, y]) => ({
  minX: Math.min(result.minX, x), maxX: Math.max(result.maxX, x),
  minY: Math.min(result.minY, y), maxY: Math.max(result.maxY, y),
}), { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });
const padding = 18;
const width = 760;
const scale = (width - padding * 2) / (bounds.maxX - bounds.minX);
const height = Math.ceil((bounds.maxY - bounds.minY) * scale + padding * 2);
const coordinate = ([x, y]) => [
  ((x - bounds.minX) * scale + padding).toFixed(1),
  ((bounds.maxY - y) * scale + padding).toFixed(1),
];
const [rennesLoueX, rennesLoueY] = coordinate(toLambert93([5.8609, 47.0168]));
const cityMarkers = [
  ["Besançon", 6.025, 47.2378],
  ["Lons-le-Saunier", 5.5557, 46.6757],
  ["Vesoul", 6.1636, 47.6236],
  ["Belfort", 6.8629, 47.6379],
].map(([name, longitude, latitude]) => ({ name, position: coordinate(toLambert93([longitude, latitude])) }));
const colorFor = (visitors) => {
  if (!visitors) return "#f7f3e9";
  // L'échelle logarithmique conserve des écarts visibles pour les petites
  // fréquentations, malgré la valeur élevée du code postal 25440.
  const intensity = Math.log1p(visitors) / Math.log1p(maxPostcodeVisitors);
  const lightness = 85 - intensity * 38;
  return `hsl(282 44% ${lightness.toFixed(1)}%)`;
};
// Les contours source sont très détaillés. Garder un point sur cinq suffit à
// distinguer chaque zone postale tout en évitant de charger plusieurs mégaoctets.
const simplifyRing = (ring) => ring.length < 12 ? ring : ring.filter((_, index) => index === 0 || index === ring.length - 1 || index % 5 === 0);
const pathFor = (ring) => simplifyRing(ring).map((point, index) => `${index ? "L" : "M"}${coordinate(point).join(" ")}`).join("") + "Z";
const boundaryPathFor = (ring) => ring.map((point, index) => `${index ? "L" : "M"}${coordinate(point).join(" ")}`).join("") + "Z";
const entries = polygons.map(({ postcode, rings }) => {
  const visitors = postcodeVisits.get(postcode) ?? 0;
  return `<path d="${rings.map(pathFor).join("")}" fill="${colorFor(visitors)}" data-postcode="${postcode}"><title>${postcode}${visitors ? ` — ${visitors} visiteurs` : ""}</title></path>`;
}).join("\n");

// Ne jamais supprimer ni redistribuer les codes absents du fond géographique.
const mappedCodes = new Set(polygons.map(({ postcode }) => postcode));
console.log("Codes conservés mais non représentés :", [...postcodeVisits.keys()].filter(code => !mappedCodes.has(code)).join(", "));
const overlayPath = (rings) => rings.map(boundaryPathFor).join("");
const departmentBackgrounds = departmentFeatures.filter(f => mappedDepartmentPrefixes.has(f.properties.code)).map(f => {
  const rings = f.geometry.type === "Polygon" ? f.geometry.coordinates : f.geometry.coordinates.flat();
  return `<path data-department="${f.properties.code}" d="${overlayPath(rings.map(r => r.map(toLambert93)))}" fill="#f7f3e9" fill-rule="evenodd"/>`;
}).join("");
// Les arêtes partagées sont internes : ne garder que le contour extérieur.
// Correspondances officielles API Géo, conservées pour une génération hors ligne.
const departmentRegions = JSON.parse(fs.readFileSync(new URL("./data/departements-regions.json", import.meta.url), "utf8"));
const mainlandEdges = new Map();
for (const feature of departmentFeatures.filter(f => mappedDepartmentPrefixes.has(f.properties.code))) {
  const region = departmentRegions[feature.properties.code];
  if (!region) throw new Error("Région manquante : " + feature.properties.code);
  const rings = feature.geometry.type === "Polygon" ? feature.geometry.coordinates : feature.geometry.coordinates.flat();
  for (const ring of rings) for (let i = 1; i < ring.length; i++) {
    const key = [ring[i - 1].join(","), ring[i].join(",")].sort().join("|");
    const edge = mainlandEdges.get(key);
    if (edge) { edge.count++; edge.regions.add(region); }
    else mainlandEdges.set(key, { count: 1, regions: new Set([region]), points: [ring[i - 1], ring[i]] });
  }
}
const nationalBorder = [...mainlandEdges.values()].filter(edge => edge.count === 1)
  .map(edge => edge.points.map((p, i) => (i ? "L" : "M") + coordinate(toLambert93(p)).join(" ")).join("")).join("");
const regionalBorder = [...mainlandEdges.values()].filter(edge => edge.regions.size > 1)
  .map(edge => edge.points.map((p, i) => (i ? "L" : "M") + coordinate(toLambert93(p)).join(" ")).join("")).join("");
if (!regionalBorder) throw new Error("Aucune limite régionale générée.");
const blackCityMarkers = cityMarkers.map(({ name, position: [x, y] }) => `<g class="map-marker" aria-label="${name}"><title>${name}</title><circle class="map-marker-outer city-marker-outer" cx="${x}" cy="${y}" r="5" fill="#111111" stroke="white" stroke-width="2"/><circle class="map-marker-center city-marker-center" cx="${x}" cy="${y}" r="1.2" fill="white"/></g>`).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description"><title id="title">Fréquentation en France continentale</title><desc id="description">Carte de France continentale avec les limites de toutes les régions. Seuls les départements avec des données de fréquentation sont découpés par code postal. Les zones colorées correspondent aux codes postaux représentés. Les contours renforcés indiquent les départements et la Communauté de communes Loue-Lison.</desc><g class="department-backgrounds">${departmentBackgrounds}</g><g class="postcode-lines" stroke="#000000" stroke-opacity="0.5" stroke-width="0.55" stroke-linejoin="round">${entries}</g><path class="national-border" d="${nationalBorder}" fill="none" stroke="#111111" stroke-opacity="0.9" stroke-width="1.2"/><path class="department-border" d="${overlayPath(departmentRings)}" fill="none" stroke="#111111" stroke-opacity="0.9" stroke-width="1.6" stroke-linejoin="round"/><path class="region-border" d="${regionalBorder}" fill="none" stroke="#111111" stroke-opacity="0.9" stroke-width="1.2" stroke-linejoin="round"/><path class="loue-lison-border" d="${overlayPath(loueLisonRings)}" fill="none" stroke="hsl(145 63% 35%)" stroke-width="3.3" stroke-linejoin="round"/><g class="map-marker" aria-label="Rennes-sur-Loue"><title>Rennes-sur-Loue</title><circle class="map-marker-outer rennes-marker-outer" cx="${rennesLoueX}" cy="${rennesLoueY}" r="8" fill="hsl(6 78% 57%)" stroke="white" stroke-width="3"/><circle class="map-marker-center rennes-marker-center" cx="${rennesLoueX}" cy="${rennesLoueY}" r="2" fill="white"/></g>${blackCityMarkers}<metadata id="map-projection">${JSON.stringify({ scale, minX: bounds.minX, maxY: bounds.maxY, padding })}</metadata></svg>`;
fs.writeFileSync("src/assets/bourgogne-franche-comte-postcodes.svg", svg);
await import("./add-val-amour-map.mjs");

await import("./build-franche-comte-map.mjs");
