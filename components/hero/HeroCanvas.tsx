'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Environment, Torus, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'
import { useIsMobile } from '@/hooks/useIsMobile'

// Abstract building sculpture from primitive geometries
function GlassSculpture({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!groupRef.current || !mouse.current) return
    const t = state.clock.getElapsedTime()
    // Slow auto-rotate + mouse parallax
    groupRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.3
    groupRef.current.rotation.x = mouse.current.y * 0.15
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.08
  })

  return (
    <group ref={groupRef} position={[2.2, 0, 0]} scale={1.3}>
      {/* Tower base */}
      <mesh position={[0, -1.4, 0]}>
        <boxGeometry args={[0.9, 2.8, 0.9]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          roughness={0.05}
          transmission={0.95}
          ior={1.5}
          chromaticAberration={0.08}
          color="#3B82F6"
          attenuationColor="#93C5FD"
          attenuationDistance={2}
        />
      </mesh>

      {/* Mid tower */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.65, 1.8, 0.65]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.4}
          roughness={0.0}
          transmission={0.98}
          ior={1.6}
          chromaticAberration={0.12}
          color="#2563EB"
        />
      </mesh>

      {/* Top spire */}
      <mesh position={[0, 1.6, 0]}>
        <coneGeometry args={[0.3, 0.9, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.3}
          roughness={0.0}
          transmission={0.99}
          ior={1.7}
          chromaticAberration={0.15}
          color="#60A5FA"
        />
      </mesh>

      {/* Floating orb */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh position={[-1.2, 0.8, 0.3]}>
          <icosahedronGeometry args={[0.35, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={3}
            thickness={0.2}
            roughness={0.0}
            transmission={0.97}
            ior={1.5}
            chromaticAberration={0.2}
            color="#3B82F6"
          />
        </mesh>
      </Float>

      {/* Ring */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.2}>
        <mesh position={[1.0, -0.5, 0.5]} rotation={[Math.PI / 3, 0.3, 0]}>
          <torusGeometry args={[0.45, 0.06, 16, 60]} />
          <meshStandardMaterial color="#3B82F6" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  )
}

// Particle field
function ParticleField() {
  const count = 180
  const positionsRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2
    }
    return arr
  }, [])

  useFrame((state) => {
    if (positionsRef.current) {
      positionsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={positionsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#3B82F6" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function HeroCanvas({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const isMobile = useIsMobile()

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, isMobile ? 1 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#93C5FD" />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#4A7AB5" />
      <Environment preset="city" />
      <ParticleField />
      {!isMobile && <GlassSculpture mouse={mouse} />}
      {isMobile && (
        <Float speed={1.5} floatIntensity={0.3}>
          <mesh>
            <icosahedronGeometry args={[1.2, 1]} />
            <MeshTransmissionMaterial
              backside samples={2} thickness={0.5}
              roughness={0.0} transmission={0.95} ior={1.5}
              chromaticAberration={0.1} color="#3B82F6"
            />
          </mesh>
        </Float>
      )}
    </Canvas>
  )
}
