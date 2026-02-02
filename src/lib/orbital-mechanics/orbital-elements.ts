import { OrbitalElements, PlanetOrbitalData } from "./types";

/**
 * Compute orbital elements at time T (centuries since J2000.0)
 * by linear interpolation from the J2000 epoch values and rates.
 */
export function computeElements(data: PlanetOrbitalData, T: number): OrbitalElements {
  return {
    a: data.epoch.a + data.rates.a * T,
    e: data.epoch.e + data.rates.e * T,
    I: data.epoch.I + data.rates.I * T,
    L: data.epoch.L + data.rates.L * T,
    wBar: data.epoch.wBar + data.rates.wBar * T,
    Omega: data.epoch.Omega + data.rates.Omega * T,
  };
}

/**
 * Compute the mean anomaly from orbital elements, with optional
 * correction terms for outer planets (Jupiter through Neptune).
 *
 * M = L - wBar + b*T^2 + c*cos(f*T) + s*sin(f*T)
 */
export function computeMeanAnomaly(
  elements: OrbitalElements,
  T: number,
  extra?: PlanetOrbitalData["extra"],
): number {
  let M = elements.L - elements.wBar;

  if (extra) {
    M +=
      extra.b * T * T +
      extra.c * Math.cos(extra.f * T * (Math.PI / 180)) +
      extra.s * Math.sin(extra.f * T * (Math.PI / 180));
  }

  // Normalize to [-180, 180]
  M = (((M % 360) + 540) % 360) - 180;
  return M;
}
