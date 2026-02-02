"use client";

import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh, AdditiveBlending } from "three";
import { Billboard, Text } from "@react-three/drei";
import { SUN_VISUAL } from "@/lib/planet-data";
import { useSimulationState } from "@/context/SimulationContext";

export function Sun() {
  const meshRef = useRef<Mesh>(null);
  const { showLabels } = useSimulationState();

  let texture;
  try {
    texture = useLoader(TextureLoader, `/textures/${SUN_VISUAL.textureFile}`);
  } catch {
    texture = null;
  }

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Sun glow */}
      <mesh>
        <sphereGeometry args={[SUN_VISUAL.radius * 1.4, 32, 32]} />
        <meshBasicMaterial
          color={SUN_VISUAL.color}
          transparent
          opacity={0.15}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Sun body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[SUN_VISUAL.radius, 64, 64]} />
        {texture ? (
          <meshBasicMaterial map={texture} />
        ) : (
          <meshBasicMaterial color={SUN_VISUAL.color} />
        )}
      </mesh>

      {/* Point light from center */}
      <pointLight color="#ffffff" intensity={2} distance={0} decay={0} />
      <ambientLight intensity={0.06} />

      {showLabels && (
        <Billboard position={[0, SUN_VISUAL.radius + 0.6, 0]}>
          <Text fontSize={0.5} color="#FDB813" anchorY="bottom">
            {SUN_VISUAL.nameJa}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
