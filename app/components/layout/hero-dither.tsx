import { Suspense, lazy } from "react"

// three + postprocessing are heavy, so the dither is code-split.
const Dither = lazy(() => import("~/components/backgrounds/dither"))

// Two close, slightly darker values of Cherry's red over the page base.
const WAVE = "#8c1f2e"
const WAVE2 = "#9c2233"
const BASE = "#0a0607"

function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.slice(1), 16)
  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ]
}

export function DitherLayer({ interactive = true }: { interactive?: boolean }) {
  return (
    <Suspense fallback={null}>
      <Dither
        waveColor={hexToRgb(WAVE)}
        waveColor2={hexToRgb(WAVE2)}
        backgroundColor={hexToRgb(BASE)}
        colorNum={4}
        pixelSize={2}
        waveSpeed={0.05}
        waveFrequency={3}
        waveAmplitude={0.4}
        mouseRadius={0.45}
        enableMouseInteraction={interactive}
      />
    </Suspense>
  )
}

export function HeroDither() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <DitherLayer />
      <div className="pointer-events-none absolute inset-0 bg-background/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
