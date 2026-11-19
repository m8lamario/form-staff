import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "logo-mark.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#011674",
          color: "white",
          padding: "64px",
        }}
      >
        <img src={src} alt="" width="140" height="140" />
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, marginTop: 32 }}>
          Candidatura staff
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#00edaf", marginTop: 16 }}>
          Leonessa Cup 2027 · Brescia
        </div>
      </div>
    ),
    size,
  );
}
