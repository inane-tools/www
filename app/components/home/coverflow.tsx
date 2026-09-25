import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react"

import { useNavigate } from "react-router"

import { apps } from "~/data/apps"

// Three.js is code-split so the hero stays light until the 3D stage loads.
const CdStage = lazy(() => import("./cd-stage"))

function StaticFallback({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
        src={apps[activeIndex]?.cover}
        alt=""
        className="aspect-[16/10] w-full max-w-md rounded-2xl border border-border object-cover shadow-2xl"
      />
    </div>
  )
}

type CoverflowProps = {
  activeIndex: number
  onActiveChange: (index: number) => void
}

export function Coverflow({ activeIndex, onActiveChange }: CoverflowProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const dragRef: MutableRefObject<number> = useRef(0)
  const gesture = useRef<{
    startX: number
    lastX: number
    lastT: number
    vel: number
    moved: boolean
    captured: boolean
  } | null>(null)
  const lastWheelRef = useRef(0)
  const [mounted, setMounted] = useState(false)
  const [glReady, setGlReady] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const count = apps.length
  const last = count - 1
  const clamp = (v: number) => Math.min(Math.max(v, 0), last)

  // Fresh index inside the native wheel listener below.
  const activeRef = useRef(activeIndex)
  activeRef.current = activeIndex
  const changeRef = useRef(onActiveChange)
  changeRef.current = onActiveChange

  // Trap vertical wheel over the hero for browsing the cases. The page only
  // scrolls once you scroll past either end of the carousel.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const onNativeWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(delta) < 4) return
      const cur = activeRef.current
      const down = delta > 0
      if ((down && cur >= count - 1) || (!down && cur <= 0)) return
      e.preventDefault()
      const now = Date.now()
      if (now - lastWheelRef.current < 300) return
      lastWheelRef.current = now
      const next = Math.min(Math.max(cur + (down ? 1 : -1), 0), count - 1)
      changeRef.current(next)
    }
    el.addEventListener("wheel", onNativeWheel, { passive: false })
    return () => el.removeEventListener("wheel", onNativeWheel)
  }, [count])

  function onPointerDown(e: ReactPointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return
    // No pointer capture here: capturing on pointerdown retargets pointerup
    // away from the canvas and breaks click detection on the cases.
    gesture.current = {
      startX: e.clientX,
      lastX: e.clientX,
      lastT: performance.now(),
      vel: 0,
      moved: false,
      captured: false,
    }
  }

  function onPointerMove(e: ReactPointerEvent) {
    const g = gesture.current
    if (!g) return
    const dx = e.clientX - g.startX
    const now = performance.now()
    // Smoothed pointer velocity (px/ms) for flick-through on release.
    const inst = (e.clientX - g.lastX) / Math.max(now - g.lastT, 1)
    g.vel = g.vel * 0.7 + inst * 0.3
    g.lastX = e.clientX
    g.lastT = now
    if (!g.moved && Math.abs(dx) > 6) {
      g.moved = true
      // Only capture once this is an actual drag, so plain taps still click.
      if (!g.captured) {
        g.captured = true
        try {
          ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
        } catch {
          // Pointer already gone; the matching up/cancel still ends the gesture.
        }
      }
    }
    if (g.moved)
      dragRef.current = Math.min(Math.max(-dx / 260, -1.2), 1.2)
  }

  function endGesture(e: ReactPointerEvent) {
    const g = gesture.current
    if (!g) return
    gesture.current = null
    const dx = e.clientX - g.startX
    const offset = dragRef.current
    dragRef.current = 0
    if (g.moved && Math.abs(dx) > 30) {
      // Dragging left (dx < 0, offset > 0) advances to the next case.
      // A fast flick carries up to one extra case in its direction.
      const flick = Math.min(Math.max(-g.vel * 0.12, -1), 1)
      onActiveChange(clamp(Math.round(activeIndex + offset + flick)))
    }
  }

  function onKeyDown(e: ReactKeyboardEvent) {
    if (e.key === "ArrowRight") onActiveChange(clamp(activeIndex + 1))
    else if (e.key === "ArrowLeft") onActiveChange(clamp(activeIndex - 1))
  }

  return (
    <div
      ref={wrapRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endGesture}
      onPointerCancel={endGesture}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label="Featured apps as CD cases"
      className="relative h-[clamp(340px,60vw,480px)] w-full cursor-grab touch-pan-y outline-none select-none active:cursor-grabbing"
    >
      {/* Ambient glow behind the stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-1/2 -z-10 h-56 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-500/15 via-fuchsia-500/10 to-sky-500/15 blur-3xl"
      />
      {!mounted || !glReady ? (
        <StaticFallback activeIndex={activeIndex} />
      ) : (
        <Suspense fallback={<StaticFallback activeIndex={activeIndex} />}>
          <CdStage
            activeIndex={activeIndex}
            dragRef={dragRef}
            onSelect={onActiveChange}
            onOpenApp={(slug) => navigate(`/apps/${slug}`)}
            onContextLost={() => setGlReady(false)}
          />
        </Suspense>
      )}
      <p className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 text-[11px] tracking-wide text-muted-foreground">
        drag · scroll · click a case
      </p>
    </div>
  )
}
