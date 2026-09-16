"use client";

import { type CSSProperties, useState } from "react";
import { useSimulation } from "@/hooks/useSimulation";
import { PLANET_NAMES, type PlanetName } from "@/lib/orbital-mechanics";
import { PLANET_VISUALS } from "@/lib/planet-data";
import { DatePicker } from "./DatePicker";
import { SpeedControl } from "./SpeedControl";

const DESCRIPTIONS: Record<PlanetName, string> = {
  mercury: "太陽に最も近い、小さな岩石の惑星。",
  venus: "厚い雲に包まれた、ひときわ明るい隣人。",
  earth: "海と大気をまとった、私たちの青い惑星。",
  mars: "赤い大地の向こうに、次の探検を思い描く。",
  jupiter: "縞模様の雲が流れる、太陽系最大の惑星。",
  saturn: "氷の環が描き出す、太陽系の美しい風景。",
  uranus: "大きく傾いた軸で回る、淡い青緑の惑星。",
  neptune: "太陽から最も遠い惑星。深い青の世界へ。",
};

export function ControlPanel() {
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches,
  );
  const {
    showOrbits,
    showLabels,
    toggleOrbits,
    toggleLabels,
    reset,
    date,
    playing,
    selectedPlanet,
    selectPlanet,
  } = useSimulation();
  const selected = selectedPlanet as PlanetName | null;
  const visual = selected ? PLANET_VISUALS[selected] : null;
  const dateLabel = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="observatory-ui">
      <header className="observatory-header">
        <div className="brand">
          <span className="brand-symbol" aria-hidden="true">
            <i />
          </span>
          <div>
            <span className="brand-name">
              ORBITAL<span className="brand-period">.</span>
            </span>
            <span className="brand-caption">太陽系を、旅しよう。</span>
          </div>
        </div>
        <div className="header-meta">
          <span className="status-dot" />
          INTERACTIVE SOLAR SYSTEM<span className="header-edition">EXPLORER / 01</span>
        </div>
      </header>

      <section className="scene-intro" aria-label="選択中の天体">
        <p className="eyebrow">{visual ? "PLANET EXPLORER" : "OUR COSMIC NEIGHBORHOOD"}</p>
        <h1>
          {visual ? (
            visual.name
          ) : (
            <>
              Solar <br />
              System<span>.</span>
            </>
          )}
        </h1>
        <p className="intro-subtitle">{visual ? visual.nameJa : "いつもの空の、その先へ。"}</p>
        <p className="intro-description">
          {selected ? (
            DESCRIPTIONS[selected]
          ) : (
            <>
              8つの惑星と、ひとつの太陽。
              <br />
              時間を動かして、宇宙のリズムを眺めよう。
            </>
          )}
        </p>
        {visual ? (
          <div className="planet-detail">
            <span>
              自転軸の傾き
              <strong>
                {visual.axialTilt}
                <small>°</small>
              </strong>
            </span>
            <button type="button" onClick={() => selectPlanet(null)} className="text-button">
              太陽系に戻る <span aria-hidden="true">↗</span>
            </button>
          </div>
        ) : (
          <div className="intro-index">
            <span>01 — 08</span>
            <span className="index-line" />
            <span>惑星を選んで探索</span>
          </div>
        )}
      </section>

      <aside
        className={`control-panel glass-panel ${collapsed ? "is-collapsed" : ""}`}
        aria-label="シミュレーション操作"
      >
        <div className="panel-heading">
          <span className="eyebrow">TIME CONTROL</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "操作パネルを開く" : "操作パネルを閉じる"}
            aria-expanded={!collapsed}
            aria-controls="simulation-controls"
          >
            {collapsed ? "+" : "−"}
          </button>
        </div>
        <div className="simulation-date">
          <span className="date-caption">
            シミュレーション日時 <span>UTC</span>
          </span>
          <time dateTime={date.toISOString()}>{dateLabel}</time>
          <span className="simulation-status">
            <i className={playing ? "status-dot" : "status-dot paused"} />
            {playing ? "時間が進んでいます" : "一時停止中"}
          </span>
        </div>
        <div id="simulation-controls" hidden={collapsed}>
          <DatePicker />
          <SpeedControl />
          <div className="display-controls">
            <p className="field-label">表示設定</p>
            <div className="toggle-row">
              <button
                type="button"
                className="toggle-button"
                aria-pressed={showOrbits}
                onClick={toggleOrbits}
              >
                <span className="orbit-icon" aria-hidden="true" />
                軌道線
                <span className="toggle-light" />
              </button>
              <button
                type="button"
                className="toggle-button"
                aria-pressed={showLabels}
                onClick={toggleLabels}
              >
                <span className="label-icon" aria-hidden="true">
                  Aa
                </span>
                ラベル
                <span className="toggle-light" />
              </button>
            </div>
          </div>
          <button type="button" onClick={reset} className="reset-button">
            <span aria-hidden="true">↺</span> 現在日時にリセット
          </button>
        </div>
      </aside>

      <div className="explorer-bottom">
        <div className="navigation-caption">
          <span className="eyebrow">EXPLORE THE PLANETS</span>
          <span>
            惑星を選んでクローズアップ <span aria-hidden="true">↓</span>
          </span>
        </div>
        <nav className="planet-dock glass-panel" aria-label="惑星を選択">
          <button
            type="button"
            className="planet-button overview-button"
            aria-pressed={!selected}
            onClick={() => selectPlanet(null)}
          >
            <span className="overview-orbits" aria-hidden="true">
              ◎
            </span>
            <span className="planet-name">太陽系</span>
            <span className="planet-english">Overview</span>
          </button>
          {PLANET_NAMES.map((name, index) => {
            const planet = PLANET_VISUALS[name];
            return (
              <button
                key={name}
                type="button"
                className="planet-button"
                aria-pressed={selected === name}
                onClick={() => selectPlanet(selected === name ? null : name)}
                style={{ "--planet-color": planet.color } as CSSProperties}
              >
                <span className="planet-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span
                  className={`planet-thumbnail ${name === "saturn" ? "has-rings" : ""}`}
                  style={{ backgroundImage: `url(/textures/${planet.textureFile})` }}
                  aria-hidden="true"
                />
                <span className="planet-name">{planet.nameJa}</span>
                <span className="planet-english">{planet.name}</span>
              </button>
            );
          })}
        </nav>
        <footer className="observatory-footer">
          <span>
            <span aria-hidden="true">↔</span> ドラッグで回転 <span className="hint-divider">/</span>{" "}
            スクロール・ピンチでズーム
          </span>
          <span>惑星の大きさは、見やすい比率で表示しています。</span>
        </footer>
      </div>
    </div>
  );
}
