'use client'
import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, Line } from '@react-three/drei'
import * as THREE from 'three'

function FloorplanModel() {
  const groupRef = useRef<THREE.Group>(null!)

  // Slow auto-rotate when no interaction
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  const wallMat = { color: '#3B82F6', metalness: 0.3, roughness: 0.7 }
  const floorMat = { color: '#EDEAE3', metalness: 0.1, roughness: 0.9 }

  return (
    <group ref={groupRef} scale={0.8}>
      {/* Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[6, 0.05, 5]} />
        <meshStandardMaterial {...floorMat} />
      </mesh>

      {/* Outer walls */}
      <mesh position={[0, 0.5, -2.5]}><boxGeometry args={[6, 1, 0.08]} /><meshStandardMaterial {...wallMat} /></mesh>
      <mesh position={[0, 0.5, 2.5]}><boxGeometry args={[6, 1, 0.08]} /><meshStandardMaterial {...wallMat} /></mesh>
      <mesh position={[-3, 0.5, 0]}><boxGeometry args={[0.08, 1, 5]} /><meshStandardMaterial {...wallMat} /></mesh>
      <mesh position={[3, 0.5, 0]}><boxGeometry args={[0.08, 1, 5]} /><meshStandardMaterial {...wallMat} /></mesh>

      {/* Interior walls */}
      <mesh position={[0.5, 0.5, 0.5]}><boxGeometry args={[0.06, 1, 2]} /><meshStandardMaterial {...wallMat} /></mesh>
      <mesh position={[-0.75, 0.5, -0.5]}><boxGeometry args={[2.5, 1, 0.06]} /><meshStandardMaterial {...wallMat} /></mesh>

      {/* Room labels */}
      <Text position={[-1.2, 0.1, 0.8]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.22} color="#1A1410">Living</Text>
      <Text position={[1.5, 0.1, 0.8]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.22} color="#1A1410">Kitchen</Text>
      <Text position={[-1.2, 0.1, -1.2]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.22} color="#1A1410">Primary</Text>
      <Text position={[1.5, 0.1, -1.2]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.22} color="#1A1410">Bedroom</Text>
    </group>
  )
}

export default function FloorplanViewer() {
  return (
    <div style={{ width: '100%', height: 360, background: '#F4EFE6', position: 'relative' }}>
      <Canvas
        camera={{ position: [4, 5, 4], fov: 45 }}
        shadows
        dpr={[1, 1.5]}
        style={{ cursor: 'grab' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1} castShadow color="#93C5FD" />
        <Suspense fallback={null}>
          <FloorplanModel />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={false}
        />
      </Canvas>
      <div style={{
        position: 'absolute', bottom: 16, right: 16,
        fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'var(--muted)', background: 'rgba(244,239,230,0.8)', padding: '6px 12px',
      }}>
        Drag to rotate
      </div>
    </div>
  )
}
