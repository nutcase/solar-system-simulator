/** Keplerian orbital elements at a given epoch */
export interface OrbitalElements {
  /** Semi-major axis in AU */
  a: number;
  /** Eccentricity (dimensionless) */
  e: number;
  /** Inclination in degrees */
  I: number;
  /** Mean longitude in degrees */
  L: number;
  /** Longitude of perihelion in degrees */
  wBar: number;
  /** Longitude of ascending node in degrees */
  Omega: number;
}

/** Linear rates of change per century for orbital elements */
export interface OrbitalElementRates {
  a: number;
  e: number;
  I: number;
  L: number;
  wBar: number;
  Omega: number;
}

/** NASA JPL data entry for a planet's orbital elements (J2000 epoch + rates) */
export interface PlanetOrbitalData {
  name: string;
  epoch: OrbitalElements;
  rates: OrbitalElementRates;
  /** Additional terms for outer planets (b, c, s, f) */
  extra?: {
    b: number;
    c: number;
    s: number;
    f: number;
  };
}

/** 3D position in heliocentric ecliptic coordinates (AU) */
export interface EclipticPosition {
  x: number;
  y: number;
  z: number;
}

/** 3D position in scene coordinates */
export interface ScenePosition {
  x: number;
  y: number;
  z: number;
}

export type PlanetName =
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";
