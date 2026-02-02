"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SolarSystemScene } from "./scene/SolarSystemScene";
import { SimulationProvider } from "@/context/SimulationContext";
import { ControlPanel } from "./ui/ControlPanel";

export function SolarSystem() {
  return (
    <SimulationProvider>
      <div className="relative h-screen w-screen overflow-hidden bg-black">
        <Canvas
          camera={{ position: [0, 30, 50], fov: 50, near: 0.1, far: 2000 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <SolarSystemScene />
          </Suspense>
        </Canvas>
        <ControlPanel />
      </div>
    </SimulationProvider>
  );
}
