'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WireframeGlobe() {
  const groupRef = useRef<THREE.Group>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.1
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main sphere wireframe */}
      <mesh>
        <sphereGeometry args={[1.8, 24, 16]} />
        <meshBasicMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Inner sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 16, 12]} />
        <meshBasicMaterial
          color="#93C5FD"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Equatorial rings */}
      {[0, Math.PI / 4, Math.PI / 2, -Math.PI / 4].map((angle, i) => (
        <mesh key={i} rotation={[angle, 0, 0]}>
          <torusGeometry args={[1.8, 0.008, 4, 80]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Outer slow ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.4, 0.015, 4, 100]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.15} />
      </mesh>

      {/* Dots at "cities" */}
      {Array.from({ length: 40 }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 40)
        const theta = Math.sqrt(40 * Math.PI) * phi
        const x = Math.cos(theta) * Math.sin(phi) * 1.82
        const y = Math.sin(theta) * Math.sin(phi) * 1.82
        const z = Math.cos(phi) * 1.82
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.025, 4, 4]} />
            <meshBasicMaterial color="#93C5FD" transparent opacity={0.6} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function FooterGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <WireframeGlobe />
    </Canvas>
  )
}
