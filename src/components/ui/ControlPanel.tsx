"use client";

import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { SpeedControl } from "./SpeedControl";
import { useSimulation } from "@/hooks/useSimulation";

export function ControlPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const { showOrbits, showLabels, toggleOrbits, toggleLabels, reset, date } = useSimulation();

  const formattedDate = date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="absolute left-4 top-4 z-10 rounded-lg bg-black/70 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-black/80"
      >
        <span className="mr-2">&#9776;</span>
        {formattedDate}
      </button>
    );
  }

  return (
    <div className="absolute left-4 top-4 z-10 flex w-72 flex-col gap-4 rounded-xl bg-black/70 p-4 text-white backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-wide">太陽系シミュレーター</h2>
        <button
          onClick={() => setCollapsed(true)}
          className="text-gray-400 transition hover:text-white"
          title="パネルを閉じる"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </button>
      </div>

      {/* Current Date Display */}
      <div className="text-center text-lg font-light text-blue-300">{formattedDate}</div>

      <DatePicker />
      <SpeedControl />

      {/* Toggle Controls */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase tracking-wider text-gray-400">表示設定</label>
        <div className="flex gap-2">
          <button
            onClick={toggleOrbits}
            className={`flex-1 rounded px-2 py-1.5 text-xs transition ${
              showOrbits ? "bg-blue-600/60 text-white" : "bg-white/10 text-gray-400"
            }`}
          >
            軌道線
          </button>
          <button
            onClick={toggleLabels}
            className={`flex-1 rounded px-2 py-1.5 text-xs transition ${
              showLabels ? "bg-blue-600/60 text-white" : "bg-white/10 text-gray-400"
            }`}
          >
            ラベル
          </button>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={reset}
        className="rounded bg-white/10 px-3 py-1.5 text-xs text-gray-300 transition hover:bg-white/20"
      >
        現在日時にリセット
      </button>
    </div>
  );
}
