import { DEG_TO_RAD, RAD_TO_DEG } from "./constants";

/**
 * Solve Kepler's equation M = E - e*sin(E) for E using Newton-Raphson iteration.
 *
 * @param M_deg  Mean anomaly in degrees
 * @param e      Eccentricity
 * @param tol    Tolerance in degrees (default 1e-6)
 * @param maxIter Maximum iterations (default 100)
 * @returns Eccentric anomaly E in degrees
 */
export function solveKepler(
  M_deg: number,
  e: number,
  tol: number = 1e-6,
  maxIter: number = 100,
): number {
  const M_rad = M_deg * DEG_TO_RAD;
  let E = M_rad + e * Math.sin(M_rad); // initial guess

  for (let i = 0; i < maxIter; i++) {
    const dE = (E - e * Math.sin(E) - M_rad) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < tol * DEG_TO_RAD) {
      break;
    }
  }

  return E * RAD_TO_DEG;
}
