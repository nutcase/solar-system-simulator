"use client";

import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh, MathUtils, SRGBColorSpace } from "three";
import { Billboard, Text } from "@react-three/drei";
import { PlanetVisualData } from "@/lib/planet-data";
import { ScenePosition } from "@/lib/orbital-mechanics/types";
import { useSimulationState, useSimulationDispatch } from "@/context/SimulationContext";

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

  let texture;
  try {
    texture = useLoader(TextureLoader, `/textures/${visual.textureFile}`);
    if (texture) texture.colorSpace = SRGBColorSpace;
  } catch {
    texture = null;
  }

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
        {texture ? (
          <meshStandardMaterial map={texture} />
        ) : (
          <meshStandardMaterial color={visual.color} />
        )}
      </mesh>

      {/* Selection indicator */}
      {isSelected && (
        <mesh>
          <ringGeometry args={[visual.radius + 0.15, visual.radius + 0.2, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      )}

      {showLabels && (
        <Billboard position={[0, visual.radius + 0.35, 0]}>
          <Text fontSize={0.3} color={visual.color} anchorY="bottom">
            {visual.nameJa}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
