import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import type { MutableRefObject } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  ContactShadows,
  Environment,
  Lightformer,
  Sparkles,
  useTexture,
} from "@react-three/drei"

import { apps, type App } from "~/data/apps"

const CASE_W = 2.1
const CASE_H = 2.1
const CASE_D = 0.24
const PITCH = 1.7

const ACCENTS: Record<string, string> = {
  vibepad: "#8b5cf6",
  glitch: "#a3e635",
  minigraph: "#38bdf8",
}

function accentFor(app: App) {
  return ACCENTS[app.slug] ?? "#e2e8f0"
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function makeCanvas(w: number, h: number) {
  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")!
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return { canvas, ctx, texture }
}

/** Spine text on the left edge of the jewel case. */
function useSpineTexture(app: App) {
  const { texture } = useMemo(() => {
    const { canvas, ctx, texture } = makeCanvas(128, 1024)
    const accent = accentFor(app)

    const paint = (icon?: HTMLImageElement) => {
      ctx.clearRect(0, 0, 128, 1024)
      ctx.fillStyle = "#101013"
      ctx.fillRect(0, 0, 128, 1024)
      ctx.fillStyle = accent
      ctx.fillRect(0, 0, 128, 14)
      ctx.fillRect(0, 1010, 128, 14)
      if (icon) {
        ctx.save()
        ctx.beginPath()
        ctx.roundRect(28, 40, 72, 72, 18)
        ctx.clip()
        ctx.drawImage(icon, 28, 40, 72, 72)
        ctx.restore()
      }
      ctx.save()
      ctx.translate(64, 512)
      ctx.rotate(-Math.PI / 2)
      ctx.fillStyle = "#fafafa"
      ctx.font = "700 54px system-ui, sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(app.name.toUpperCase(), 0, 0)
      ctx.restore()
      texture.needsUpdate = true
    }

    paint()
    loadImage(app.icon).then(paint).catch(() => {})
    return { canvas, texture }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.slug])

  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

/** Back insert: tagline + version. */
function useBackTexture(app: App) {
  const { texture } = useMemo(() => {
    const { canvas, ctx, texture } = makeCanvas(1024, 1024)
    const accent = accentFor(app)

    ctx.fillStyle = "#0c0c0e"
    ctx.fillRect(0, 0, 1024, 1024)
    ctx.fillStyle = accent
    ctx.fillRect(0, 0, 1024, 16)
    ctx.fillStyle = "#fafafa"
    ctx.font = "700 72px system-ui, sans-serif"
    ctx.fillText(app.name, 64, 140)
    ctx.fillStyle = "rgba(255,255,255,0.65)"
    ctx.font = "400 40px system-ui, sans-serif"
    const words = app.tagline.split(" ")
    let line = ""
    let y = 240
    for (const word of words) {
      if ((line + " " + word).trim().length > 34) {
        ctx.fillText(line.trim(), 64, y)
        y += 56
        line = word
      } else {
        line += " " + word
      }
    }
    ctx.fillText(line.trim(), 64, y)
    // Fake track listing for the CD vibe.
    ctx.fillStyle = "rgba(255,255,255,0.35)"
    ctx.font = "400 34px ui-monospace, monospace"
    ;["01  install", "02  vibe", "03  ship"].forEach((t, i) => {
      ctx.fillText(t, 64, 560 + i * 60)
    })
    if (app.version) {
      ctx.fillStyle = accent
      ctx.font = "700 36px ui-monospace, monospace"
      ctx.fillText(`v${app.version}`, 64, 940)
    }
    texture.needsUpdate = true
    return { canvas, texture }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.slug])

  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

function JewelCase({
  app,
  index,
  smooth,
  hovered,
  onSelect,
  onHover,
  onOpenApp,
}: {
  app: App
  index: number
  smooth: MutableRefObject<number>
  hovered: number | null
  onSelect: (index: number) => void
  onHover: (index: number | null) => void
  onOpenApp: (slug: string) => void
}) {
  const group = useRef<THREE.Group>(null!)
  const disc = useRef<THREE.Group>(null!)
  const cover = useTexture(app.cover)
  const spine = useSpineTexture(app)
  const back = useBackTexture(app)

  useMemo(() => {
    cover.colorSpace = THREE.SRGBColorSpace
    cover.anisotropy = 8
  }, [cover])

  const edge = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(CASE_W, CASE_H, CASE_D)),
    []
  )
  useEffect(() => () => edge.dispose(), [edge])

  // Slight vertical gradient baked into the jewel shell (top bright, base dim).
  const shellGeo = useMemo(() => {
    const geo = new THREE.BoxGeometry(CASE_W, CASE_H, CASE_D)
    const pos = geo.attributes.position as THREE.BufferAttribute
    const colors = new Float32Array(pos.count * 3)
    const top = new THREE.Color("#ffffff")
    const bottom = new THREE.Color("#71717a")
    const c = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
      const t = THREE.MathUtils.clamp(pos.getY(i) / CASE_H + 0.5, 0, 1)
      c.lerpColors(bottom, top, t)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geo
  }, [])
  useEffect(() => () => shellGeo.dispose(), [shellGeo])

  // Procedural fallback disc: silver sheen + machined rings. Used until (or
  // unless) a custom image is found under /discs/.
  const fallbackDisc = useMemo(() => {
    const { ctx, texture } = makeCanvas(512, 512)
    const g = ctx.createRadialGradient(256, 256, 30, 256, 256, 256)
    g.addColorStop(0, "#fafafa")
    g.addColorStop(0.55, "#d4d4d8")
    g.addColorStop(0.85, "#e7e7ea")
    g.addColorStop(1, "#a1a1aa")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 512, 512)
    // Subtle darker "written area" band.
    ctx.fillStyle = "rgba(0,0,0,0.08)"
    ctx.beginPath()
    ctx.arc(256, 256, 200, 0, Math.PI * 2)
    ctx.arc(256, 256, 120, 0, Math.PI * 2, true)
    ctx.fill()
    // Machined rings.
    ctx.globalAlpha = 0.18
    ctx.strokeStyle = "#71717a"
    for (let r = 70; r < 250; r += 12) {
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(256, 256, r, 0, Math.PI * 2)
      ctx.stroke()
    }
    // Prismatic diffraction bands.
    ctx.globalAlpha = 0.3
    ctx.globalCompositeOperation = "overlay"
    const bands = ["#f0abfc", "#93c5fd", "#86efac", "#fde68a", "#fb7185", "#67e8f9"]
    bands.forEach((col, i) => {
      ctx.strokeStyle = col
      ctx.lineWidth = 24
      ctx.beginPath()
      ctx.arc(
        256,
        256,
        96 + i * 24,
        Math.PI * (0.05 + i * 0.12),
        Math.PI * (0.7 + i * 0.12)
      )
      ctx.stroke()
    })
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = "source-over"
    ctx.fillStyle = "#09090b"
    ctx.beginPath()
    ctx.arc(256, 256, 52, 0, Math.PI * 2)
    ctx.fill()
    texture.needsUpdate = true
    return texture
  }, [])
  useEffect(() => () => fallbackDisc.dispose(), [fallbackDisc])

  // Custom disc art: drop an image at public/discs/<slug>.svg (or .png) for
  // per-app art, or public/discs/default.svg (or .png) to skin every disc.
  // Falls back to the procedural silver disc while loading / if missing.
  const [customDisc, setCustomDisc] = useState<THREE.Texture | null>(null)
  useEffect(() => {
    let cancelled = false
    const loader = new THREE.TextureLoader()
    const candidates = [
      `/discs/${app.slug}.svg`,
      `/discs/${app.slug}.png`,
      `/discs/default.svg`,
      `/discs/default.png`,
    ]
    const tryNext = (i: number) => {
      if (cancelled || i >= candidates.length) return
      loader.load(
        candidates[i],
        (tex) => {
          if (cancelled) {
            tex.dispose()
            return
          }
          tex.colorSpace = THREE.SRGBColorSpace
          tex.anisotropy = 8
          setCustomDisc((prev) => {
            prev?.dispose()
            return tex
          })
        },
        undefined,
        () => tryNext(i + 1)
      )
    }
    tryNext(0)
    return () => {
      cancelled = true
      setCustomDisc((prev) => {
        prev?.dispose()
        return null
      })
    }
  }, [app.slug])
  const discFace = customDisc ?? fallbackDisc

  // Soft diagonal glass shine that sits over the cover, faded on every edge
  // so it never looks clipped.
  const streak = useMemo(() => {
    const { ctx, texture } = makeCanvas(256, 512)
    const g = ctx.createLinearGradient(0, 0, 256, 0)
    g.addColorStop(0, "rgba(255,255,255,0)")
    g.addColorStop(0.5, "rgba(255,255,255,0.85)")
    g.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 512)
    ctx.globalCompositeOperation = "destination-in"
    const v = ctx.createLinearGradient(0, 0, 0, 512)
    v.addColorStop(0, "rgba(0,0,0,0)")
    v.addColorStop(0.2, "rgba(0,0,0,1)")
    v.addColorStop(0.8, "rgba(0,0,0,1)")
    v.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = v
    ctx.fillRect(0, 0, 256, 512)
    ctx.globalCompositeOperation = "source-over"
    texture.needsUpdate = true
    return texture
  }, [])
  useEffect(() => () => streak.dispose(), [streak])

  // Full-face vertical shade: bright sheen up top, gentle shade at the base.
  // Spans the whole case so the gradient never looks cut off at the sides.
  const faceShade = useMemo(() => {
    const { ctx, texture } = makeCanvas(64, 512)
    const g = ctx.createLinearGradient(0, 0, 0, 512)
    g.addColorStop(0, "rgba(255,255,255,0.55)")
    g.addColorStop(0.35, "rgba(255,255,255,0)")
    g.addColorStop(0.75, "rgba(0,0,0,0)")
    g.addColorStop(1, "rgba(0,0,0,0.6)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 512)
    texture.needsUpdate = true
    return texture
  }, [])
  useEffect(() => () => faceShade.dispose(), [faceShade])

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const step = Math.min(dt, 0.05)
    const target = smooth.current
    const offset = index - target
    const a = Math.abs(offset)
    const isActive = Math.abs(index - Math.round(target)) < 0.5 && a < 0.5

    const tx = offset * PITCH
    const tz = -a * 1.0
    const try_ = THREE.MathUtils.clamp(-offset * 0.55, -0.9, 0.9)
    const float =
      Math.sin(state.clock.elapsedTime * 1.1 + index * 1.7) * 0.06 +
      (isActive ? 0.14 : 0)
    const ts =
      (isActive ? 1.08 : 1 - Math.min(a * 0.07, 0.24)) *
      (hovered === index ? 1.03 : 1)

    g.position.x = THREE.MathUtils.damp(g.position.x, tx, 8, step)
    g.position.y = THREE.MathUtils.damp(g.position.y, float, 8, step)
    g.position.z = THREE.MathUtils.damp(g.position.z, tz, 8, step)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, try_, 8, step)
    const s = THREE.MathUtils.damp(g.scale.x, ts, 8, step)
    g.scale.setScalar(s)

    // The disc slides out of the right side when its case is front and center,
    // and retracts as soon as the case starts moving away so discs never
    // sweep through their neighbors.
    const closeness = THREE.MathUtils.clamp(1 - a * 2.2, 0, 1)
    const eject = closeness * closeness
    const dx = 0.15 + eject * 1.2
    disc.current.position.x = THREE.MathUtils.damp(
      disc.current.position.x,
      dx,
      5,
      step
    )
    disc.current.rotation.z += step * (isActive ? 0.6 : 0.08)
  })

  return (
    <group
      ref={group}
      onClick={(e) => {
        e.stopPropagation()
        // Tapping a side case selects it; tapping the centered case opens it.
        if (index === Math.round(smooth.current)) onOpenApp(app.slug)
        else onSelect(index)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(index)
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        onHover(null)
        document.body.style.cursor = "auto"
      }}
    >
      {/* CD sliding out the right side: real ring faces + open edges so the
          hub hole is genuinely see-through */}
      <group ref={disc} position={[0.15, 0, -0.02]}>
        {/* top (label-side) face */}
        <mesh position={[0, 0, 0.0125]}>
          <ringGeometry args={[0.16, 0.92, 64]} />
          <meshPhysicalMaterial
            map={discFace}
            metalness={0.4}
            roughness={0.35}
            clearcoat={0.5}
            clearcoatRoughness={0.25}
            iridescence={0.25}
            iridescenceIOR={1.6}
            iridescenceThicknessRange={[100, 300]}
            envMapIntensity={1.2}
          />
        </mesh>
        {/* bottom face: plain silver underside */}
        <mesh position={[0, 0, -0.0125]} rotation={[0, Math.PI, 0]}>
          <ringGeometry args={[0.16, 0.92, 64]} />
          <meshStandardMaterial
            color="#c9c9cf"
            metalness={0.8}
            roughness={0.35}
          />
        </mesh>
        {/* clear hub ring around the hole */}
        <mesh position={[0, 0, 0.013]}>
          <ringGeometry args={[0.16, 0.3, 48]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.22}
            roughness={0.05}
            metalness={0}
            depthWrite={false}
          />
        </mesh>
        {/* outer edge */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 0.025, 64, 1, true]} />
          <meshStandardMaterial
            color="#d4d4d8"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
        {/* inner hub wall */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.025, 32, 1, true]} />
          <meshStandardMaterial color="#09090b" roughness={0.6} />
        </mesh>
      </group>

      {/* Dark inner tray */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[CASE_W - 0.14, CASE_H - 0.14, 0.05]} />
        <meshStandardMaterial color="#131316" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Transparent jewel shell with a slight vertical gradient */}
      <mesh geometry={shellGeo}>
        <meshPhysicalMaterial
          color="#ffffff"
          vertexColors
          transparent
          opacity={0.16}
          roughness={0.04}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.6}
          depthWrite={false}
        />
      </mesh>
      <lineSegments geometry={edge}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </lineSegments>

      {/* Front cover art: just the cover image, full-bleed */}
      <mesh position={[0, 0, CASE_D / 2 + 0.002]}>
        <planeGeometry args={[CASE_W - 0.14, CASE_H - 0.14]} />
        <meshStandardMaterial map={cover} roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Full-face gradient shade over the cover */}
      <mesh position={[0, 0, CASE_D / 2 + 0.003]}>
        <planeGeometry args={[CASE_W - 0.1, CASE_H - 0.1]} />
        <meshBasicMaterial
          map={faceShade}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
      {/* Glass shine streak over the cover */}
      <mesh position={[0.3, 0, CASE_D / 2 + 0.004]} rotation={[0, 0, -0.45]}>
        <planeGeometry args={[0.5, CASE_H - 0.5]} />
        <meshBasicMaterial
          map={streak}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      {/* Spine */}
      <mesh position={[-CASE_W / 2 - 0.001, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[CASE_D, CASE_H - 0.04]} />
        <meshStandardMaterial map={spine} roughness={0.5} />
      </mesh>

      {/* Back insert */}
      <mesh position={[0, 0, -CASE_D / 2 - 0.002]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[CASE_W - 0.14, CASE_H - 0.14]} />
        <meshStandardMaterial map={back} roughness={0.55} />
      </mesh>
    </group>
  )
}

function Rig({
  activeIndex,
  drag,
  hovered,
  onSelect,
  onHover,
  onOpenApp,
}: {
  activeIndex: number
  drag: MutableRefObject<number>
  hovered: number | null
  onSelect: (index: number) => void
  onHover: (index: number | null) => void
  onOpenApp: (slug: string) => void
}) {
  const smooth = useRef(activeIndex)

  // Single continuous target: while dragging this chases activeIndex + drag
  // so releasing never snaps back — the release index is already under us.
  useFrame((_, dt) => {
    smooth.current = THREE.MathUtils.damp(
      smooth.current,
      activeIndex + drag.current,
      12,
      Math.min(dt, 0.05)
    )
  })

  return (
    <group position={[0, 0.1, 0]}>
      {apps.map((app, i) => (
        <JewelCase
          key={app.slug}
          app={app}
          index={i}
          smooth={smooth}
          hovered={hovered}
          onSelect={onSelect}
          onHover={onHover}
          onOpenApp={onOpenApp}
        />
      ))}
    </group>
  )
}

function Scene({
  activeIndex,
  dragRef,
  onSelect,
  onOpenApp,
}: {
  activeIndex: number
  dragRef: MutableRefObject<number>
  onSelect: (index: number) => void
  onOpenApp: (slug: string) => void
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 6]} intensity={1.4} />
      <directionalLight position={[-5, 3, -4]} intensity={0.4} color="#93c5fd" />
      <spotLight position={[0, 6, 4]} angle={0.5} intensity={0.6} />
      <Suspense fallback={null}>
        <Rig
          activeIndex={activeIndex}
          drag={dragRef}
          hovered={hovered}
          onSelect={onSelect}
          onHover={setHovered}
          onOpenApp={onOpenApp}
        />
        <Environment resolution={256}>
          <Lightformer
            intensity={2}
            position={[0, 5, 0]}
            rotation-x={Math.PI / 2}
            scale={[10, 10, 1]}
          />
          <Lightformer
            intensity={1.2}
            position={[-5, 1, 2]}
            rotation-y={Math.PI / 2}
            scale={[8, 3, 1]}
          />
          <Lightformer
            intensity={1.2}
            position={[5, 1, 2]}
            rotation-y={-Math.PI / 2}
            scale={[8, 3, 1]}
          />
        </Environment>
      </Suspense>
      <Sparkles count={36} scale={[9, 3.5, 3]} size={2.5} speed={0.25} opacity={0.35} />
      <ContactShadows
        position={[0, -1.45, 0]}
        opacity={0.55}
        scale={12}
        blur={2.4}
        far={3}
      />
    </>
  )
}

export default function CdStage({
  activeIndex,
  dragRef,
  onSelect,
  onOpenApp,
  onContextLost,
}: {
  activeIndex: number
  dragRef: MutableRefObject<number>
  onSelect: (index: number) => void
  onOpenApp: (slug: string) => void
  onContextLost: () => void
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.45, 6.6], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop="always"
      onCreated={({ gl }) => {
        gl.domElement.addEventListener(
          "webglcontextlost",
          (ev) => {
            ev.preventDefault()
            onContextLost()
          },
          { once: true }
        )
      }}
    >
      <Scene
        activeIndex={activeIndex}
        dragRef={dragRef}
        onSelect={onSelect}
        onOpenApp={onOpenApp}
      />
    </Canvas>
  )
}
