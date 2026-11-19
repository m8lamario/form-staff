import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Leonessa Cup — Candidatura staff";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO_HEIGHT = 500;
const LOGO_WIDTH = Math.round((LOGO_HEIGHT * 686) / 792);

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
          alignItems: "center",
          justifyContent: "center",
          background: "#011674",
        }}
      >
        <img src={src} alt="" width={LOGO_WIDTH} height={LOGO_HEIGHT} />
      </div>
    ),
    size,
  );
}
