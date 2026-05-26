import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#000000",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
        border: "1.5px solid rgba(255,255,255,0.15)",
      }}
    >
      <span
        style={{
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 900,
          fontFamily: "serif",
          letterSpacing: "-1px",
          lineHeight: 1,
        }}
      >
        R
      </span>
    </div>,
    { ...size },
  )
}
