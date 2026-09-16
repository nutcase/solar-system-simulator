"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";
import { Vector3 } from "three";
import { useSimulationState } from "@/context/SimulationContext";
import { computeOrbitPath, eclipticToScene, type PlanetName } from "@/lib/orbital-mechanics";
import { AU_TO_SCENE } from "@/lib/scale";

interface OrbitLineProps {
  planet: PlanetName;
  color: string;
}

export function OrbitLine({ planet, color }: OrbitLineProps) {
  const { date, showOrbits } = useSimulationState();

  const points = useMemo(() => {
    const eclipticPoints = computeOrbitPath(planet, date, 256);
    return eclipticPoints.map((p) => {
      const s = eclipticToScene(p, AU_TO_SCENE);
      return new Vector3(s.x, s.y, s.z);
    });
  }, [planet, date]);

  if (!showOrbits) return null;

  return <Line points={points} color={color} lineWidth={1} transparent opacity={0.26} />;
}
