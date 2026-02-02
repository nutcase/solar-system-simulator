"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh, DoubleSide, MathUtils, RingGeometry, SRGBColorSpace } from "three";
import { Billboard, Text } from "@react-three/drei";
import { PLANET_VISUALS, SATURN_RING } from "@/lib/planet-data";
import { ScenePosition } from "@/lib/orbital-mechanics/types";
import { useSimulationState, useSimulationDispatch } from "@/context/SimulationContext";

interface SaturnProps {
  position: ScenePosition;
}

export function Saturn({ position }: SaturnProps) {
  const meshRef = useRef<Mesh>(null);
  const visual = PLANET_VISUALS.saturn;
  const { showLabels, selectedPlanet } = useSimulationState();
  const dispatch = useSimulationDispatch();
  const isSelected = selectedPlanet === "saturn";

  const bodyTexture = useLoader(TextureLoader, `/textures/${visual.textureFile}`);
  bodyTexture.colorSpace = SRGBColorSpace;

  const ringTexture = useLoader(TextureLoader, `/textures/${SATURN_RING.textureFile}`);
  ringTexture.colorSpace = SRGBColorSpace;

  // Fix ring UVs so texture maps radially
  const ringGeo = useMemo(() => {
    const geo = new RingGeometry(SATURN_RING.innerRadius, SATURN_RING.outerRadius, 64);
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const t =
        (dist - SATURN_RING.innerRadius) / (SATURN_RING.outerRadius - SATURN_RING.innerRadius);
      uv.setXY(i, t, 0.5);
    }
    return geo;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += visual.rotationSpeed;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch({ type: "SELECT_PLANET", planet: isSelected ? null : "saturn" });
  };

  const tiltRad = MathUtils.degToRad(visual.axialTilt);

  return (
    <group position={[position.x, position.y, position.z]}>
      {/* Saturn body */}
      <mesh ref={meshRef} onClick={handleClick} rotation={[tiltRad, 0, 0]}>
        <sphereGeometry args={[visual.radius, 32, 32]} />
        <meshStandardMaterial map={bodyTexture} />
      </mesh>

      {/* Ring */}
      <mesh rotation={[-Math.PI / 2 + tiltRad, 0, 0]} onClick={handleClick}>
        <primitive object={ringGeo} attach="geometry" />
        <meshStandardMaterial map={ringTexture} side={DoubleSide} transparent opacity={0.85} />
      </mesh>

      {isSelected && (
        <mesh>
          <ringGeometry args={[visual.radius + 0.15, visual.radius + 0.2, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      )}

      {showLabels && (
        <Billboard position={[0, visual.radius + 0.5, 0]}>
          <Text fontSize={0.3} color={visual.color} anchorY="bottom">
            {visual.nameJa}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
