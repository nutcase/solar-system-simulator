"use client";

import { useMemo } from "react";
import {
  computeAllPositions,
  eclipticToScene,
  PlanetName,
  ScenePosition,
} from "@/lib/orbital-mechanics";
import { AU_TO_SCENE } from "@/lib/scale";

export function usePlanetPositions(date: Date): Record<PlanetName, ScenePosition> {
  return useMemo(() => {
    const ecliptic = computeAllPositions(date);
    const scene = {} as Record<PlanetName, ScenePosition>;
    for (const [name, pos] of Object.entries(ecliptic)) {
      scene[name as PlanetName] = eclipticToScene(pos, AU_TO_SCENE);
    }
    return scene;
  }, [date]);
}
