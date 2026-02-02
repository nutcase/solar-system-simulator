# 太陽系3Dシミュレーター

NASA JPL の軌道データに基づき、8惑星の位置をリアルタイムに計算・描画する3Dシミュレーターです。

## 技術スタック

- **Next.js 16** (App Router / Turbopack)
- **React Three Fiber** + **Three.js** + **@react-three/drei**
- **Tailwind CSS v4**
- **Biome** (formatter / linter)

## 機能

- ケプラー方程式 (Newton-Raphson法) による惑星位置計算
- NASA JPL 近似軌道要素 (1800〜2050年有効)
- 日付指定による任意時点の惑星配置表示
- 再生速度制御 (1日/秒 〜 365日/秒)
- 軌道線・ラベルの表示切替
- 惑星クリックで選択
- 2Kテクスチャ (Solar System Scope)

## セットアップ

```bash
pnpm install
pnpm dev
```

http://localhost:3000 で起動します。

## スクリプト

| コマンド | 説明 |
|---|---|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | プロダクションビルド |
| `pnpm format` | Biome でコードフォーマット |
| `pnpm check` | Biome でフォーマット + lint |

## ディレクトリ構成

```
src/
├── app/                  # Next.js App Router
├── components/
│   ├── scene/            # 3Dシーン (Sun, Planet, Saturn, OrbitLine, Starfield)
│   └── ui/               # UIパネル (ControlPanel, DatePicker, SpeedControl)
├── lib/
│   ├── orbital-mechanics/ # 軌道計算 (ケプラー方程式, 座標変換)
│   ├── planet-data.ts     # 惑星ビジュアル設定
│   └── scale.ts           # AU→シーン座標変換
├── hooks/                 # useSimulation, usePlanetPositions
└── context/               # SimulationContext (日付/速度/表示状態)
```

## 軌道計算パイプライン

```
Date → ユリウス日 → J2000からの世紀数 T
  → 軌道要素の線形補間
  → 平均近点角 M
  → ケプラー方程式 (Newton-Raphson) → 離心近点角 E
  → 軌道面座標 → 黄道直交座標 → シーン座標
```

## ライセンス

テクスチャは [Solar System Scope](https://www.solarsystemscope.com/textures/) の利用規約に従います。
