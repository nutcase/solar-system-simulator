"use client";

import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SimulationProvider } from "@/context/SimulationContext";
import { SolarSystemScene } from "./scene/SolarSystemScene";
import { ControlPanel } from "./ui/ControlPanel";

export function SolarSystem() {
  return (
    <SimulationProvider>
      <div className="solar-system">
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 24, 42], fov: 50, near: 0.1, far: 2000 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense
            fallback={
              <Html center>
                <output className="loading-label">宇宙を読み込んでいます…</output>
              </Html>
            }
          >
            <SolarSystemScene />
          </Suspense>
        </Canvas>
        <div className="scene-vignette" />
        <ControlPanel />
      </div>
    </SimulationProvider>
  );
}
