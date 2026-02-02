import { PlanetName } from "./orbital-mechanics/types";

export interface PlanetVisualData {
  name: string;
  nameJa: string;
  color: string;
  radius: number; // scene units (exaggerated for visibility)
  textureFile: string;
  rotationSpeed: number; // radians per frame
  axialTilt: number; // degrees
}

/**
 * Visual configuration for each planet.
 * Sizes are exaggerated relative to orbits for visibility.
 */
export const PLANET_VISUALS: Record<PlanetName, PlanetVisualData> = {
  mercury: {
    name: "Mercury",
    nameJa: "水星",
    color: "#c0c0c0",
    radius: 0.15,
    textureFile: "mercury.jpg",
    rotationSpeed: 0.002,
    axialTilt: 0.034,
  },
  venus: {
    name: "Venus",
    nameJa: "金星",
    color: "#f0dbb8",
    radius: 0.3,
    textureFile: "venus_surface.jpg",
    rotationSpeed: -0.001, // retrograde
    axialTilt: 177.4,
  },
  earth: {
    name: "Earth",
    nameJa: "地球",
    color: "#6aabef",
    radius: 0.32,
    textureFile: "earth.jpg",
    rotationSpeed: 0.005,
    axialTilt: 23.44,
  },
  mars: {
    name: "Mars",
    nameJa: "火星",
    color: "#e06030",
    radius: 0.22,
    textureFile: "mars.jpg",
    rotationSpeed: 0.005,
    axialTilt: 25.19,
  },
  jupiter: {
    name: "Jupiter",
    nameJa: "木星",
    color: "#e0a850",
    radius: 0.7,
    textureFile: "jupiter.jpg",
    rotationSpeed: 0.01,
    axialTilt: 3.13,
  },
  saturn: {
    name: "Saturn",
    nameJa: "土星",
    color: "#f0e0b8",
    radius: 0.6,
    textureFile: "saturn.jpg",
    rotationSpeed: 0.009,
    axialTilt: 26.73,
  },
  uranus: {
    name: "Uranus",
    nameJa: "天王星",
    color: "#90dce0",
    radius: 0.45,
    textureFile: "uranus.jpg",
    rotationSpeed: -0.006,
    axialTilt: 97.77,
  },
  neptune: {
    name: "Neptune",
    nameJa: "海王星",
    color: "#6070d0",
    radius: 0.43,
    textureFile: "neptune.jpg",
    rotationSpeed: 0.006,
    axialTilt: 28.32,
  },
};

/** Sun visual properties */
export const SUN_VISUAL = {
  name: "Sun",
  nameJa: "太陽",
  color: "#FDB813",
  radius: 1.2,
  textureFile: "sun.jpg",
};

/** Saturn ring properties */
export const SATURN_RING = {
  innerRadius: 0.75,
  outerRadius: 1.3,
  textureFile: "saturn_ring.png",
};
