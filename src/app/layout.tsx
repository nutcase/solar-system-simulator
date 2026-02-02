import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "太陽系3Dシミュレーター",
  description: "Solar System 3D Simulator with accurate orbital mechanics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
