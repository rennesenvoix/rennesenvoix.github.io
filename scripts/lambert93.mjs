// Lambert-93 (GRS80), paramètres du fichier .prj postal.
export const toLambert93 = ([longitude, latitude]) => {
  const degree = Math.PI / 180;
  const eccentricity = Math.sqrt(2 / 298.257222101 - (1 / 298.257222101) ** 2);
  const latitudeRadians = latitude * degree;
  const longitudeRadians = longitude * degree;
  const latitude1 = 44 * degree;
  const latitude2 = 49 * degree;
  const centralMeridian = 3 * degree;
  const isoLatitude = (value) => Math.log(Math.tan(Math.PI / 4 + value / 2) * ((1 - eccentricity * Math.sin(value)) / (1 + eccentricity * Math.sin(value))) ** (eccentricity / 2));
  const m = value => Math.cos(value) / Math.sqrt(1 - eccentricity ** 2 * Math.sin(value) ** 2);
  const n = Math.log(m(latitude1) / m(latitude2)) / (isoLatitude(latitude2) - isoLatitude(latitude1));
  const c = (6378137 * m(latitude1) * Math.exp(n * isoLatitude(latitude1))) / n;
  const radius = c * Math.exp(-n * isoLatitude(latitudeRadians));
  const angle = n * (longitudeRadians - centralMeridian);
  return [700000 + radius * Math.sin(angle), 6600000 + c * Math.exp(-n * isoLatitude(46.5 * degree)) - radius * Math.cos(angle)];
};
