"use client";

import { useMemo } from "react";
import { Vector3 } from "three";
import { Line } from "@react-three/drei";
import { computeOrbitPath, eclipticToScene, PlanetName } from "@/lib/orbital-mechanics";
import { AU_TO_SCENE } from "@/lib/scale";
import { useSimulationState } from "@/context/SimulationContext";

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

  return <Line points={points} color={color} lineWidth={1.5} transparent opacity={0.5} />;
}
