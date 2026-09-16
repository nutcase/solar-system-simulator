"use client";

import { useSimulation } from "@/hooks/useSimulation";

const SPEED_OPTIONS = [1, 7, 30, 365];

export function SpeedControl() {
  const { speed, playing, setSpeed, togglePlay } = useSimulation();

  return (
    <div className="speed-control">
      <div className="field-heading">
        <span className="field-label">時間の速さ</span>
        <span className="speed-value">
          {speed}日 <span>/ 秒</span>
        </span>
      </div>
      <div className="playback-row">
        <button
          type="button"
          onClick={togglePlay}
          className="play-button"
          aria-label={playing ? "一時停止" : "再生"}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            {playing ? (
              <>
                <rect x="2" y="2" width="3" height="10" rx="1" />
                <rect x="9" y="2" width="3" height="10" rx="1" />
              </>
            ) : (
              <path d="M3 1.5 12 7 3 12.5Z" />
            )}
          </svg>
        </button>
        <fieldset className="speed-options" aria-label="再生速度">
          {SPEED_OPTIONS.map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => setSpeed(value)}
              aria-pressed={speed === value}
              aria-label={`${value}日/秒`}
            >
              {value}
              <span>日</span>
            </button>
          ))}
        </fieldset>
      </div>
    </div>
  );
}
