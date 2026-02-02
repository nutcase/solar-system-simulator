"use client";

import { useMemo } from "react";
import { Float32BufferAttribute, BufferGeometry, AdditiveBlending } from "three";

export function Starfield({ count = 3000 }: { count?: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute on a large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 400 + Math.random() * 100;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geo.setAttribute("size", new Float32BufferAttribute(sizes, 1));
    return geo;
  }, [count]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#ffffff"
        size={0.8}
        sizeAttenuation={false}
        transparent
        opacity={0.8}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
