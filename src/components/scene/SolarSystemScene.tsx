"use client";

import { useFrame } from "@react-three/fiber";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import { Saturn } from "./Saturn";
import { OrbitLine } from "./OrbitLine";
import { Starfield } from "./Starfield";
import { CameraController } from "./CameraController";
import { PLANET_VISUALS } from "@/lib/planet-data";
import { PLANET_NAMES, PlanetName } from "@/lib/orbital-mechanics";
import { usePlanetPositions } from "@/hooks/usePlanetPositions";
import { useSimulationState, useSimulationDispatch } from "@/context/SimulationContext";

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
      <CameraController />
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
