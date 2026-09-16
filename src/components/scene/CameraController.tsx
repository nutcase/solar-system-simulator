"use client";

import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type ComponentRef, useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useSimulationState } from "@/context/SimulationContext";
import type { PlanetName, ScenePosition } from "@/lib/orbital-mechanics";
import { PLANET_VISUALS } from "@/lib/planet-data";

const OVERVIEW_POSITION = new Vector3(0, 24, 42);

export function CameraController({ positions }: { positions: Record<PlanetName, ScenePosition> }) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { selectedPlanet } = useSimulationState();
  const previousSelection = useRef<string | null>(null);
  const transitioning = useRef(false);
  const reducedMotion = useRef(false);
  const target = useRef(new Vector3());
  const offset = useRef(new Vector3());
  const desiredPosition = useRef(new Vector3());
  const targetDelta = useRef(new Vector3());
  const previousTarget = useRef(new Vector3());

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotion.current = preference.matches;
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useFrame(({ camera }, delta) => {
    const orbit = controls.current;
    if (!orbit) return;
    const name = selectedPlanet as PlanetName | null;
    if (name) {
      const position = positions[name];
      target.current.set(position.x, position.y, position.z);
    } else {
      target.current.set(0, 0, 0);
    }

    if (previousSelection.current !== selectedPlanet) {
      previousSelection.current = selectedPlanet;
      transitioning.current = true;
      previousTarget.current.copy(target.current);
      if (name) {
        const distance = Math.max(3.5, PLANET_VISUALS[name].radius * 8);
        offset.current.set(0, distance * 0.45, distance);
      } else {
        offset.current.copy(OVERVIEW_POSITION);
      }
    }

    const blend = reducedMotion.current ? 1 : 1 - Math.exp(-5 * delta);
    if (transitioning.current) {
      // Move the transition with the planet, so fast orbits cannot outrun the zoom.
      targetDelta.current.copy(target.current).sub(previousTarget.current);
      camera.position.add(targetDelta.current);
      orbit.target.add(targetDelta.current);
      previousTarget.current.copy(target.current);
      desiredPosition.current.copy(target.current).add(offset.current);
      camera.position.lerp(desiredPosition.current, blend);
      orbit.target.lerp(target.current, blend);
      if (
        camera.position.distanceTo(desiredPosition.current) < 0.025 &&
        orbit.target.distanceTo(target.current) < 0.025
      )
        transitioning.current = false;
      orbit.update();
    } else if (name) {
      // Follow the planet without taking over the user's rotation or zoom.
      targetDelta.current.copy(target.current).sub(orbit.target);
      camera.position.add(targetDelta.current);
      orbit.target.copy(target.current);
      orbit.update();
    }
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={1.5}
      maxDistance={850}
      zoomSpeed={0.8}
      rotateSpeed={0.5}
      onStart={() => {
        transitioning.current = false;
      }}
    />
  );
}
