import fs from "node:fs";
import path from "node:path";

const sourceDirectory = "/private/tmp/rev-postcodes";
const originalTotalVisitors = 285;
const targetTotalVisitors = 300;
const attendanceScale = targetTotalVisitors / originalTotalVisitors;
const postcodeVisits = new Map([
  ["25440", 74], ["25000", 46], ["39110", 23], ["25610", 13], ["25320", 11],
  ["39300", 9], ["39600", 9], ["21000", 6], ["21240", 5], ["25770", 5],
  ["39000", 5], ["39120", 4], ["89000", 4], ["25130", 3], ["25170", 3],
  ["25410", 3], ["25800", 3], ["25870", 3], ["39290", 3], ["25270", 2],
  ["25620", 2], ["39230", 2], ["39700", 2], ["70000", 2], ["70100", 2],
  ["71290", 2], ["25300", 1], ["25360", 1], ["25660", 1], ["25960", 1],
  ["39240", 1], ["39800", 1],
].map(([postcode, visitors]) => [postcode, Math.round(visitors * attendanceScale)]));
const maxPostcodeVisitors = Math.max(...postcodeVisits.values());
const mappedDepartmentPrefixes = new Set(["21", "25", "39", "70", "90"]);
// Le fichier postal comporte un léger écart de référence par rapport aux
// contours administratifs Lambert-93. La correction est appliquée aux
// coordonnées source, avant le calcul de l'emprise de la carte.
const postcodeEastingOffset = -430;
const postcodeNorthingOffset = 29700;

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
  if (!mappedDepartmentPrefixes.has(postcode.slice(0, 2))) continue;
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
      return [shp.readDoubleLE(offsetPoint) + postcodeEastingOffset, shp.readDoubleLE(offsetPoint + 8) + postcodeNorthingOffset];
    });
  });
  polygons.push({ postcode, rings });
}

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
const departmentRings = readGeometry(path.join(sourceDirectory, "departements.geojson"), mappedDepartmentPrefixes);
const loueLisonRings = readGeometry(path.join(sourceDirectory, "loue-lison.geojson"));
const allPoints = [
  ...polygons.flatMap((polygon) => polygon.rings.flat()),
  ...departmentRings.flat(),
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
  ["Dijon", 5.0415, 47.322],
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

const overlayPath = (rings) => rings.map(boundaryPathFor).join("");
const blackCityMarkers = cityMarkers.map(({ name, position: [x, y] }) => `<g class="map-marker" aria-label="${name}"><title>${name}</title><circle class="map-marker-outer city-marker-outer" cx="${x}" cy="${y}" r="5" fill="#111111" stroke="white" stroke-width="2"/><circle class="map-marker-center city-marker-center" cx="${x}" cy="${y}" r="1.2" fill="white"/></g>`).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description"><title id="title">Franche-Comté et Côte-d’Or par code postal</title><desc id="description">Carte de la Franche-Comté et de la Côte-d’Or découpée par code postal. Les zones colorées correspondent aux codes postaux représentés. Les contours renforcés indiquent les départements et la Communauté de communes Loue-Lison.</desc><g class="postcode-lines" stroke="#000000" stroke-opacity="0.5" stroke-width="0.55" stroke-linejoin="round">${entries}</g><path class="department-border" d="${overlayPath(departmentRings)}" fill="none" stroke="#111111" stroke-opacity="0.9" stroke-width="2.4" stroke-linejoin="round"/><path class="loue-lison-border" d="${overlayPath(loueLisonRings)}" fill="none" stroke="hsl(145 63% 35%)" stroke-width="6" stroke-linejoin="round"/><g class="map-marker" aria-label="Rennes-sur-Loue"><title>Rennes-sur-Loue</title><circle class="map-marker-outer rennes-marker-outer" cx="${rennesLoueX}" cy="${rennesLoueY}" r="8" fill="hsl(6 78% 57%)" stroke="white" stroke-width="3"/><circle class="map-marker-center rennes-marker-center" cx="${rennesLoueX}" cy="${rennesLoueY}" r="2" fill="white"/></g>${blackCityMarkers}</svg>`;
fs.writeFileSync("src/assets/bourgogne-franche-comte-postcodes.svg", svg);
