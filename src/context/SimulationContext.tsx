"use client";

import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";

export interface SimulationState {
  /** Current simulation date */
  date: Date;
  /** Simulation speed: days per second (0 = paused) */
  speed: number;
  /** Whether the simulation is playing */
  playing: boolean;
  /** Currently selected/focused planet (or null) */
  selectedPlanet: string | null;
  /** Show orbit lines */
  showOrbits: boolean;
  /** Show planet labels */
  showLabels: boolean;
}

export type SimulationAction =
  | { type: "SET_DATE"; date: Date }
  | { type: "SET_SPEED"; speed: number }
  | { type: "TOGGLE_PLAY" }
  | { type: "TICK"; deltaMs: number }
  | { type: "SELECT_PLANET"; planet: string | null }
  | { type: "TOGGLE_ORBITS" }
  | { type: "TOGGLE_LABELS" }
  | { type: "RESET" };

const initialState: SimulationState = {
  date: new Date(),
  speed: 1,
  playing: true,
  selectedPlanet: null,
  showOrbits: true,
  showLabels: true,
};

function simulationReducer(state: SimulationState, action: SimulationAction): SimulationState {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, date: action.date };
    case "SET_SPEED":
      return { ...state, speed: action.speed };
    case "TOGGLE_PLAY":
      return { ...state, playing: !state.playing };
    case "TICK": {
      if (!state.playing || state.speed === 0) return state;
      const msPerDay = 86400000;
      const newTime = state.date.getTime() + action.deltaMs * state.speed * (msPerDay / 1000);
      return { ...state, date: new Date(newTime) };
    }
    case "SELECT_PLANET":
      return { ...state, selectedPlanet: action.planet };
    case "TOGGLE_ORBITS":
      return { ...state, showOrbits: !state.showOrbits };
    case "TOGGLE_LABELS":
      return { ...state, showLabels: !state.showLabels };
    case "RESET":
      return { ...initialState, date: new Date() };
    default:
      return state;
  }
}

const SimulationContext = createContext<SimulationState>(initialState);
const SimulationDispatchContext = createContext<Dispatch<SimulationAction>>(() => {});

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(simulationReducer, initialState);

  return (
    <SimulationContext.Provider value={state}>
      <SimulationDispatchContext.Provider value={dispatch}>
        {children}
      </SimulationDispatchContext.Provider>
    </SimulationContext.Provider>
  );
}

export function useSimulationState() {
  return useContext(SimulationContext);
}

export function useSimulationDispatch() {
  return useContext(SimulationDispatchContext);
}
