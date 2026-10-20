import { Suspense, useEffect, useRef } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Bounds, Center, Environment } from '@react-three/drei'
import * as THREE from 'three'

type Axis = 'x' | 'y' | 'z'
type EnvironmentPreset = ComponentProps<typeof Environment>['preset']

interface ModelProps {
  url: string
  progressRef: { current: number }
  axis: Axis
  smoothing: number
}

function Model({ url, progressRef, axis, smoothing }: ModelProps) {
  const { scene } = useGLTF(url)
  const group = useRef<THREE.Group>(null)
  const current = useRef(0)

  useFrame((_, delta) => {
    if (!group.current) return
    const target = progressRef.current * Math.PI * 2 // 0 -> 1 maps to one full turn
    current.current = THREE.MathUtils.damp(current.current, target, smoothing, delta)
    group.current.rotation[axis] = current.current
  })

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

export interface ScrollRotateModelProps {
  /** Path to a .glb/.gltf file, e.g. "/models/bracket.glb" */
  url: string
  /** Extra screens of scrolling the full rotation is spread across (default 2) */
  scrollScreens?: number
  /** Axis to rotate around (default "y") */
  axis?: Axis
  /** Higher = snappier, lower = floatier (default 6) */
  smoothing?: number
  /** How big the model appears: 1 = default, 0.7 = smaller, 1.3 = larger */
  size?: number
  /** Degrees the camera sits above the model, looking down at it (default 20, 0 = level) */
  tilt?: number
  /** drei Environment preset used for lighting (default "city") */
  environment?: EnvironmentPreset
  /** Optional overlay content (title, caption...) shown over the canvas */
  children?: ReactNode
}

/**
 * Pins itself to the viewport while the user keeps scrolling, rotating the
 * model one full turn, then releases so the page scrolls on.
 */
export default function ScrollRotateModel({
  url,
  scrollScreens = 2,
  axis = 'y',
  smoothing = 6,
  tilt = 20,
  size = 1,
  environment = 'city',
  children,
}: ScrollRotateModelProps) {
  // Place the camera on an arc above the model; it still looks at the centre
  const tiltRad = THREE.MathUtils.degToRad(tilt)
  const cameraPosition: [number, number, number] = [0, Math.sin(tiltRad) * 5, Math.cos(tiltRad) * 5]

  const wrapperRef = useRef<HTMLElement>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const el = wrapperRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const p = scrollable > 0 ? -rect.top / scrollable : 0
      progressRef.current = Math.min(1, Math.max(0, p))
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    // Tall wrapper = the extra scroll distance the rotation is spread across
    <section
      ref={wrapperRef}
      style={{ height: `${(1 + scrollScreens) * 100}vh`, position: 'relative' }}
    >
      {/* Sticky child stays on screen while the wrapper scrolls past */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%' }}>
        <Canvas camera={{ position: cameraPosition, fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.3 / size}>
              <Model url={url} progressRef={progressRef} axis={axis} smoothing={smoothing} />
            </Bounds>
            <Environment preset={environment} />
          </Suspense>
        </Canvas>
        {children && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>{children}</div>
        )}
      </div>
    </section>
  )
}
