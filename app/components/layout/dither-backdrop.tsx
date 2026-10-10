import { Suspense, lazy, useEffect, useRef, useState } from "react"

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
  const container = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(true)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotion = () => setReducedMotion(preference.matches)
    const updateVisibility = () => setPageVisible(!document.hidden)
    updateMotion()
    updateVisibility()
    preference.addEventListener("change", updateMotion)
    document.addEventListener("visibilitychange", updateVisibility)

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
      if (entry.isIntersecting) setLoaded(true)
    })
    if (container.current) observer.observe(container.current)

    return () => {
      preference.removeEventListener("change", updateMotion)
      document.removeEventListener("visibilitychange", updateVisibility)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={container} className="h-full w-full">
      {reducedMotion ? (
        <div className="h-full w-full bg-gradient-to-l from-[#8c1f2e]/40 to-[#050505]" />
      ) : loaded ? (
        <Suspense fallback={null}>
          <Dither
            active={visible && pageVisible}
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
      ) : null}
    </div>
  )
}
