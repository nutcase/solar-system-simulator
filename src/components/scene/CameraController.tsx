"use client";

import { OrbitControls } from "@react-three/drei";

export function CameraController() {
  return (
    <OrbitControls
      makeDefault
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={2}
      maxDistance={500}
      zoomSpeed={0.8}
      rotateSpeed={0.5}
    />
  );
}
