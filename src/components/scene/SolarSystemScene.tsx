"use client";

import { useFrame } from "@react-three/fiber";
import { useSimulationDispatch, useSimulationState } from "@/context/SimulationContext";
import { usePlanetPositions } from "@/hooks/usePlanetPositions";
import { PLANET_NAMES } from "@/lib/orbital-mechanics";
import { PLANET_VISUALS } from "@/lib/planet-data";
import { CameraController } from "./CameraController";
import { OrbitLine } from "./OrbitLine";
import { Planet } from "./Planet";
import { Saturn } from "./Saturn";
import { Starfield } from "./Starfield";
import { Sun } from "./Sun";

export function SolarSystemScene() {
  const { date } = useSimulationState();
  const dispatch = useSimulationDispatch();
  const positions = usePlanetPositions(date);

  // Animation tick
  useFrame((_, delta) => {
    // delta is in seconds; cap to avoid huge jumps on tab switch
    const clampedDelta = Math.min(delta, 0.1);
    dispatch({ type: "TICK", deltaMs: clampedDelta * 1000 });
  });

  return (
    <>
      <CameraController positions={positions} />
      <Starfield />
      <Sun />

      {PLANET_NAMES.map((name) => {
        const visual = PLANET_VISUALS[name];
        const pos = positions[name];

        if (name === "saturn") {
          return (
            <group key={name}>
              <OrbitLine planet={name} color={visual.color} />
              <Saturn position={pos} />
            </group>
          );
        }

        return (
          <group key={name}>
            <OrbitLine planet={name} color={visual.color} />
            <Planet name={name} visual={visual} position={pos} />
          </group>
        );
      })}
    </>
  );
}
