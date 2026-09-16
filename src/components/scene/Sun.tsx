"use client";

import { Billboard, Text } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, type Mesh, SRGBColorSpace, TextureLoader } from "three";
import { useSimulationState } from "@/context/SimulationContext";
import { SUN_VISUAL } from "@/lib/planet-data";

export function Sun() {
  const meshRef = useRef<Mesh>(null);
  const { showLabels } = useSimulationState();

  const texture = useLoader(TextureLoader, `/textures/${SUN_VISUAL.textureFile}`);
  texture.colorSpace = SRGBColorSpace;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <Billboard>
        <mesh>
          <planeGeometry args={[SUN_VISUAL.radius * 8, SUN_VISUAL.radius * 8]} />
          <shaderMaterial
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
            vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
            fragmentShader={`varying vec2 vUv; void main() { float r = length(vUv - 0.5); float glow = exp(-r * 9.0) * (1.0 - smoothstep(0.1, 0.5, r)); gl_FragColor = vec4(1.0, 0.42, 0.09, glow * 0.65); }`}
          />
        </mesh>
      </Billboard>

      {/* Sun body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[SUN_VISUAL.radius, 64, 64]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Point light from center */}
      <pointLight color="#ffffff" intensity={2} distance={0} decay={0} />
      <ambientLight intensity={0.14} />

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
