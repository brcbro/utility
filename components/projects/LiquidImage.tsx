'use client'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { liquidVertexShader, liquidFragmentShader } from '@/lib/shaders'
import { useIsMobile } from '@/hooks/useIsMobile'

interface ShaderMeshProps {
  gradient: string
  hover: number
  mouse: { x: number; y: number }
}

// Fallback gradient texture since we're using CSS gradients as source
function createGradientTexture(gradient: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 384
  const ctx = canvas.getContext('2d')!

  // Parse gradient colors
  const colors = gradient.match(/#[0-9A-Fa-f]{6}/g) || ['#1E2C2A', '#2D4A42']
  const grad = ctx.createLinearGradient(0, 0, 512, 384)
  grad.addColorStop(0, colors[0])
  grad.addColorStop(1, colors[1] || colors[0])
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 384)

  // Add subtle dot pattern
  ctx.fillStyle = 'rgba(59,130,246,0.08)'
  for (let x = 12; x < 512; x += 24) {
    for (let y = 12; y < 384; y += 24) {
      ctx.beginPath()
      ctx.arc(x, y, 1, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  return new THREE.CanvasTexture(canvas)
}

function LiquidMesh({ gradient, hover, mouse }: ShaderMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const textureRef = useRef<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    textureRef.current = createGradientTexture(gradient)
    if (materialRef.current) {
      materialRef.current.uniforms.uTexture.value = textureRef.current
    }
  }, [gradient])

  const uniforms = useRef({
    uTexture: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uHover: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  })

  useFrame((state) => {
    const u = uniforms.current
    u.uTime.value = state.clock.getElapsedTime()
    u.uHover.value += (hover - u.uHover.value) * 0.06
    u.uMouse.value.x += (mouse.x - u.uMouse.value.x) * 0.08
    u.uMouse.value.y += ((1 - mouse.y) - u.uMouse.value.y) * 0.08
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 1.5, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={liquidVertexShader}
        fragmentShader={liquidFragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  )
}

interface LiquidImageProps {
  gradient: string
  className?: string
}

export default function LiquidImage({ gradient, className = '' }: LiquidImageProps) {
  const isMobile = useIsMobile()
  const [hover, setHover] = useState(0)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const containerRef = useRef<HTMLDivElement>(null!)

  const onMove = (e: React.MouseEvent) => {
    if (isMobile) return
    const rect = containerRef.current.getBoundingClientRect()
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  if (isMobile) {
    return (
      <div
        className={className}
        style={{ background: gradient, width: '100%', height: '100%' }}
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
      onMouseEnter={() => setHover(1)}
      onMouseLeave={() => setHover(0)}
      onMouseMove={onMove}
    >
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <LiquidMesh gradient={gradient} hover={hover} mouse={mouse} />
      </Canvas>
    </div>
  )
}
