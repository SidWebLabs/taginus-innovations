"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { SceneNode } from "./HeroScene";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Static animated-SVG path (always rendered, zero JS cost) with the 3D scene layered on top when it is safe to. */
function Fallback() {
  const pts = [[40, 190], [140, 120], [250, 70], [360, 110], [470, 190], [570, 150], [660, 80]];
  const d = `M${pts.map((p) => p.join(" ")).join(" S")}`;
  return (
    <svg viewBox="0 0 700 260" className="h-full w-full" aria-hidden="true">
      <path d={d} fill="none" stroke="#f2a900" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1200" strokeDashoffset="1200" opacity=".7">
        <animate attributeName="stroke-dashoffset" from="1200" to="0" dur="2.2s" fill="freeze" />
      </path>
      {pts.map(([x, y], i) => (
        <g key={i}><circle cx={x} cy={y} r="14" fill="#f2a900" opacity=".2" /><circle cx={x} cy={y} r="6" fill="#fff" /></g>
      ))}
    </svg>
  );
}

export default function HeroVisual({ nodes }: { nodes: SceneNode[] }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let gl = false;
    try { const c = document.createElement("canvas"); gl = !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { gl = false; }
    if (reduce || saveData || !gl) return;
    const go = () => setOn(true);
    if ("requestIdleCallback" in window) { const id = requestIdleCallback(go, { timeout: 1500 }); return () => cancelIdleCallback(id); }
    const id = setTimeout(go, 800); return () => clearTimeout(id);
  }, []);

  return (
    <div className="relative aspect-[5/4] w-full sm:aspect-[16/10] lg:aspect-[6/5]">
      {!on && <Fallback />}
      {on && <HeroScene nodes={nodes} />}
    </div>
  );
}
