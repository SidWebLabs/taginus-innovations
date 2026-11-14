import { ImageResponse } from "next/og";

export const alt = "Taginus Innovations - Engineering Ideas. Advancing Agriculture. Enabling Innovation.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#12372a", color: "#fff", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: "#f2a900" }} />
          <div style={{ fontSize: 40, fontWeight: 700 }}>Taginus Innovations</div>
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>Engineering ideas. Advancing agriculture. Enabling innovation.</div>
        <div style={{ fontSize: 30, color: "#f2a900" }}>Agri Input | Agri Tech | R&D | IPR | AI | Fin Tech</div>
      </div>
    ),
    size,
  );
}
