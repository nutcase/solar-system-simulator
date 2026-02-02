"use client";

import { useSimulationState, useSimulationDispatch } from "@/context/SimulationContext";

export function useSimulation() {
  const state = useSimulationState();
  const dispatch = useSimulationDispatch();

  return {
    ...state,
    dispatch,
    setDate: (date: Date) => dispatch({ type: "SET_DATE", date }),
    setSpeed: (speed: number) => dispatch({ type: "SET_SPEED", speed }),
    togglePlay: () => dispatch({ type: "TOGGLE_PLAY" }),
    selectPlanet: (planet: string | null) => dispatch({ type: "SELECT_PLANET", planet }),
    toggleOrbits: () => dispatch({ type: "TOGGLE_ORBITS" }),
    toggleLabels: () => dispatch({ type: "TOGGLE_LABELS" }),
    reset: () => dispatch({ type: "RESET" }),
  };
}
