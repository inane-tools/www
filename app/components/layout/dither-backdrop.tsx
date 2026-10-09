import { Suspense, lazy } from "react"

// three + postprocessing are heavy, so the dither is code-split.
const Dither = lazy(() => import("~/components/backgrounds/dither"))

// Cherry reds, so the dither reads as the Cherry accent.
const WAVE = "#ff4d5e"
const WAVE2 = "#8c1f2e"
const BASE = "#050505"

function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.slice(1), 16)
  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ]
}

export function DitherBackdrop() {
  return (
    <Suspense fallback={null}>
      <Dither
        waveColor={hexToRgb(WAVE)}
        waveColor2={hexToRgb(WAVE2)}
        backgroundColor={hexToRgb(BASE)}
        colorNum={4}
        pixelSize={2}
        waveSpeed={-0.05}
        waveFrequency={3}
        waveAmplitude={0.4}
        enableMouseInteraction={false}
      />
    </Suspense>
  )
}
