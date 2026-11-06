import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function renderOg(title: string, kicker = "", foot = "Taginus Innovations | Jath, Sangli, Maharashtra") {
  const fs = title.length > 44 ? 60 : title.length > 28 ? 72 : 84;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#12372a", color: "#fff", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: "#f2a900" }} />
          <div style={{ fontSize: 36, fontWeight: 700 }}>Taginus Innovations</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: fs, fontWeight: 800, lineHeight: 1.05, maxWidth: 1000 }}>{title}</div>
          {kicker ? <div style={{ fontSize: 32, color: "#cfe5d6", maxWidth: 1000 }}>{kicker}</div> : null}
        </div>
        <div style={{ fontSize: 28, color: "#f2a900" }}>{foot}</div>
      </div>
    ),
    ogSize,
  );
}
