import { ORBITAL_DATA, PLANET_NAMES } from "./constants";
import { orbitalToEcliptic } from "./coordinates";
import { centuriesSinceJ2000 } from "./julian-date";
import { solveKepler } from "./kepler-solver";
import { computeElements, computeMeanAnomaly } from "./orbital-elements";
import { EclipticPosition, PlanetName, ScenePosition } from "./types";

/**
 * Compute heliocentric ecliptic position (AU) for a planet at a given date.
 */
export function computePlanetPosition(planet: PlanetName, date: Date): EclipticPosition {
  const data = ORBITAL_DATA[planet];
  const T = centuriesSinceJ2000(date);

  const elements = computeElements(data, T);
  const M = computeMeanAnomaly(elements, T, data.extra);
  const E = solveKepler(M, elements.e);
  return orbitalToEcliptic(E, elements);
}

/**
 * Compute all planet positions for a given date.
 */
export function computeAllPositions(date: Date): Record<PlanetName, EclipticPosition> {
  const positions = {} as Record<PlanetName, EclipticPosition>;
  for (const name of PLANET_NAMES) {
    positions[name] = computePlanetPosition(name, date);
  }
  return positions;
}

/**
 * Convert ecliptic coordinates to Three.js scene coordinates.
 * Ecliptic (x, y, z) → Three.js (x, z, -y)
 * This maps the ecliptic plane to the XZ plane with Y as "up".
 */
export function eclipticToScene(pos: EclipticPosition, scale: number): ScenePosition {
  return {
    x: pos.x * scale,
    y: pos.z * scale,
    z: -pos.y * scale,
  };
}

/**
 * Generate orbit path points for a planet (for drawing orbit lines).
 * Computes positions at equal mean anomaly intervals.
 */
export function computeOrbitPath(
  planet: PlanetName,
  date: Date,
  segments: number = 128,
): EclipticPosition[] {
  const data = ORBITAL_DATA[planet];
  const T = centuriesSinceJ2000(date);
  const elements = computeElements(data, T);

  const points: EclipticPosition[] = [];
  for (let i = 0; i <= segments; i++) {
    const M = -180 + (360 * i) / segments;
    const E = solveKepler(M, elements.e);
    points.push(orbitalToEcliptic(E, elements));
  }
  return points;
}
