import { DEG_TO_RAD } from "./constants";
import { EclipticPosition, OrbitalElements } from "./types";

/**
 * From eccentric anomaly E and orbital elements, compute
 * heliocentric ecliptic coordinates (x, y, z) in AU.
 *
 * Steps:
 * 1. Compute orbital plane coordinates (x', y')
 * 2. Apply 3 rotation matrices to get ecliptic coordinates
 */
export function orbitalToEcliptic(E_deg: number, elements: OrbitalElements): EclipticPosition {
  const { a, e, I, wBar, Omega } = elements;

  const E = E_deg * DEG_TO_RAD;
  const w = (wBar - Omega) * DEG_TO_RAD; // argument of perihelion
  const OmegaRad = Omega * DEG_TO_RAD;
  const iRad = I * DEG_TO_RAD;

  // Orbital plane coordinates
  const xPrime = a * (Math.cos(E) - e);
  const yPrime = a * Math.sqrt(1 - e * e) * Math.sin(E);

  // Rotation to ecliptic coordinates
  const cosW = Math.cos(w);
  const sinW = Math.sin(w);
  const cosO = Math.cos(OmegaRad);
  const sinO = Math.sin(OmegaRad);
  const cosI = Math.cos(iRad);
  const sinI = Math.sin(iRad);

  const x =
    (cosW * cosO - sinW * sinO * cosI) * xPrime + (-sinW * cosO - cosW * sinO * cosI) * yPrime;

  const y =
    (cosW * sinO + sinW * cosO * cosI) * xPrime + (-sinW * sinO + cosW * cosO * cosI) * yPrime;

  const z = sinW * sinI * xPrime + cosW * sinI * yPrime;

  return { x, y, z };
}
