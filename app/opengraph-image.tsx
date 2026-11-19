import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Leonessa Cup — Candidatura staff";
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
          background: "#011674",
          color: "white",
        }}
      >
        <div
          style={{
            width: 630,
            height: 630,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={src} alt="" width="380" height="380" />
        </div>
        <div
          style={{
            width: 570,
            height: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: 64,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 6,
              color: "#00edaf",
              textTransform: "uppercase",
            }}
          >
            Leonessa Cup
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.1,
              marginTop: 18,
            }}
          >
            Candidatura staff
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#9be7d4",
              marginTop: 20,
            }}
          >
            2027 · Brescia
          </div>
        </div>
      </div>
    ),
    size,
  );
}
