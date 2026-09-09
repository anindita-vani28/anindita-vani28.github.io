import { AdaptiveDpr, Float, PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import type { Mesh } from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function PlaceholderObject() {
  const meshRef = useRef<Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return;

    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.25;
  });

  return (
    <Float
      speed={prefersReducedMotion ? 0 : 1.1}
      rotationIntensity={0.25}
      floatIntensity={0.45}
    >
      <mesh ref={meshRef} position={[1.7, 0, 0]}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial
          color="#9c8cff"
          roughness={0.22}
          metalness={0.72}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export function PortfolioCanvas() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(Math.min(window.devicePixelRatio, 1.75))}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 5]} intensity={2.4} color="#ffffff" />
        <pointLight position={[-3, -1, 2]} intensity={8} color="#6754ff" />
        <PlaceholderObject />
        <AdaptiveDpr pixelated />
      </PerformanceMonitor>
    </Canvas>
  );
}
