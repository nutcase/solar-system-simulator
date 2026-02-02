"use client";

import { useSimulation } from "@/hooks/useSimulation";

const SPEED_OPTIONS = [
  { label: "1日/秒", value: 1 },
  { label: "7日/秒", value: 7 },
  { label: "30日/秒", value: 30 },
  { label: "365日/秒", value: 365 },
];

export function SpeedControl() {
  const { speed, playing, setSpeed, togglePlay } = useSimulation();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] uppercase tracking-wider text-gray-400">再生速度</label>

      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white transition hover:bg-white/20"
          title={playing ? "一時停止" : "再生"}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="1" width="4" height="12" />
              <rect x="8" y="1" width="4" height="12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <polygon points="2,1 12,7 2,13" />
            </svg>
          )}
        </button>

        <div className="flex gap-1">
          {SPEED_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSpeed(opt.value)}
              className={`rounded px-2 py-1 text-xs transition ${
                speed === opt.value
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
