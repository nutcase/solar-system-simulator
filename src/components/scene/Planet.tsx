"use client";

import { Billboard, Text } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, type Mesh, SRGBColorSpace, TextureLoader } from "three";
import { useSimulationDispatch, useSimulationState } from "@/context/SimulationContext";
import type { ScenePosition } from "@/lib/orbital-mechanics/types";
import type { PlanetVisualData } from "@/lib/planet-data";

interface PlanetProps {
  name: string;
  visual: PlanetVisualData;
  position: ScenePosition;
}

export function Planet({ name, visual, position }: PlanetProps) {
  const meshRef = useRef<Mesh>(null);
  const { showLabels, selectedPlanet } = useSimulationState();
  const dispatch = useSimulationDispatch();
  const isSelected = selectedPlanet === name;

  const texture = useLoader(TextureLoader, `/textures/${visual.textureFile}`);
  texture.colorSpace = SRGBColorSpace;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += visual.rotationSpeed;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch({ type: "SELECT_PLANET", planet: isSelected ? null : name });
  };

  return (
    <group position={[position.x, position.y, position.z]}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        rotation={[MathUtils.degToRad(visual.axialTilt), 0, 0]}
      >
        <sphereGeometry args={[visual.radius, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Selection indicator */}
      {showLabels && !isSelected && (
        <Billboard position={[0, visual.radius + 0.35, 0]}>
          <Text fontSize={0.3} color={visual.color} anchorY="bottom">
            {visual.nameJa}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
