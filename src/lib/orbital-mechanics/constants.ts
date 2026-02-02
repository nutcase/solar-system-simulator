import { PlanetName, PlanetOrbitalData } from "./types";

/**
 * NASA JPL approximate planetary positions (valid 1800-2050).
 * Source: https://ssd.jpl.nasa.gov/planets/approx_pos.html
 *
 * Elements at J2000.0 (epoch) and centennial rates.
 * Units: AU, degrees, degrees/century
 */
export const ORBITAL_DATA: Record<PlanetName, PlanetOrbitalData> = {
  mercury: {
    name: "Mercury",
    epoch: {
      a: 0.38709927,
      e: 0.20563593,
      I: 7.00497902,
      L: 252.2503235,
      wBar: 77.45779628,
      Omega: 48.33076593,
    },
    rates: {
      a: 0.00000037,
      e: 0.00001906,
      I: -0.00594749,
      L: 149472.67411175,
      wBar: 0.16047689,
      Omega: -0.12534081,
    },
  },
  venus: {
    name: "Venus",
    epoch: {
      a: 0.72333566,
      e: 0.00677672,
      I: 3.39467605,
      L: 181.9790995,
      wBar: 131.60246718,
      Omega: 76.67984255,
    },
    rates: {
      a: 0.0000039,
      e: -0.00004107,
      I: -0.0007889,
      L: 58517.81538729,
      wBar: 0.00268329,
      Omega: -0.27769418,
    },
  },
  earth: {
    name: "Earth",
    epoch: {
      a: 1.00000261,
      e: 0.01671123,
      I: -0.00001531,
      L: 100.46457166,
      wBar: 102.93768193,
      Omega: 0.0,
    },
    rates: {
      a: 0.00000562,
      e: -0.00004392,
      I: -0.01294668,
      L: 35999.37244981,
      wBar: 0.32327364,
      Omega: 0.0,
    },
  },
  mars: {
    name: "Mars",
    epoch: {
      a: 1.52371034,
      e: 0.0933941,
      I: 1.84969142,
      L: -4.55343205,
      wBar: -23.94362959,
      Omega: 49.55953891,
    },
    rates: {
      a: 0.00001847,
      e: 0.00007882,
      I: -0.00813131,
      L: 19140.30268499,
      wBar: 0.44441088,
      Omega: -0.29257343,
    },
  },
  jupiter: {
    name: "Jupiter",
    epoch: {
      a: 5.202887,
      e: 0.04838624,
      I: 1.30439695,
      L: 34.39644051,
      wBar: 14.72847983,
      Omega: 100.47390909,
    },
    rates: {
      a: -0.00011607,
      e: -0.00013253,
      I: -0.00183714,
      L: 3034.74612775,
      wBar: 0.21252668,
      Omega: 0.20469106,
    },
    extra: { b: -0.00012452, c: 0.0606406, s: -0.35635438, f: 38.35125 },
  },
  saturn: {
    name: "Saturn",
    epoch: {
      a: 9.53667594,
      e: 0.05386179,
      I: 2.48599187,
      L: 49.95424423,
      wBar: 92.59887831,
      Omega: 113.66242448,
    },
    rates: {
      a: -0.0012506,
      e: -0.00050991,
      I: 0.00193609,
      L: 1222.49362201,
      wBar: -0.41897216,
      Omega: -0.28867794,
    },
    extra: { b: 0.00025899, c: -0.13434469, s: 0.87320147, f: 38.35125 },
  },
  uranus: {
    name: "Uranus",
    epoch: {
      a: 19.18916464,
      e: 0.04725744,
      I: 0.77263783,
      L: 313.23810451,
      wBar: 170.9542763,
      Omega: 74.01692503,
    },
    rates: {
      a: -0.00196176,
      e: -0.00004397,
      I: -0.00242939,
      L: 428.48202785,
      wBar: 0.40805281,
      Omega: 0.04240589,
    },
    extra: { b: 0.00058331, c: -0.97731848, s: 0.17689245, f: 7.67025 },
  },
  neptune: {
    name: "Neptune",
    epoch: {
      a: 30.06992276,
      e: 0.00859048,
      I: 1.77004347,
      L: -55.12002969,
      wBar: 44.96476227,
      Omega: 131.78422574,
    },
    rates: {
      a: 0.00026291,
      e: 0.00005105,
      I: 0.00035372,
      L: 218.45945325,
      wBar: -0.32241464,
      Omega: -0.00508664,
    },
    extra: { b: -0.00041348, c: 0.68346318, s: -0.10162547, f: 7.67025 },
  },
};

export const PLANET_NAMES: PlanetName[] = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
];

export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
