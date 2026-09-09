import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ALPHA_CUTOFF = 40;
const OPACITY_MAX = 0.95;
const CYCLE_DURATION = 2.4;
const FADE_FRACTION = 0.06;
const SCATTER_RADIUS_MIN = 0.5;
const SCATTER_RADIUS_MAX = 1.6;

type ParticleField = {
  count: number;
  basePositions: Float32Array;
  scatterOffsets: Float32Array;
  colors: Float32Array;
};

function buildParticleField(imageData: ImageData): ParticleField {
  const { data, width, height } = imageData;
  const aspect = width / height;

  const base: number[] = [];
  const scatter: number[] = [];
  const colors: number[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const alpha = data[i + 3];
      if (alpha < ALPHA_CUTOFF) continue;

      const nx = x / width;
      const ny = y / height;
      base.push((nx - 0.5) * 2 * aspect, -(ny - 0.5) * 2, 0);

      const angle = Math.random() * Math.PI * 2;
      const radius =
        SCATTER_RADIUS_MIN + Math.random() * (SCATTER_RADIUS_MAX - SCATTER_RADIUS_MIN);
      scatter.push(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 1.2);

      colors.push(data[i] / 255, data[i + 1] / 255, data[i + 2] / 255);
    }
  }

  return {
    count: base.length / 3,
    basePositions: new Float32Array(base),
    scatterOffsets: new Float32Array(scatter),
    colors: new Float32Array(colors),
  };
}

function createDotTexture() {
  const size = 32;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function PortraitParticles({
  imageData,
  trigger,
  imageEl,
}: {
  imageData: ImageData;
  trigger: React.RefObject<number>;
  imageEl: React.RefObject<HTMLImageElement | null>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const field = useMemo(() => buildParticleField(imageData), [imageData]);
  const livePositions = useMemo(() => field.basePositions.slice(), [field]);
  const dotTexture = useMemo(() => createDotTexture(), []);
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const lastTrigger = useRef(0);
  const cycleStart = useRef<number | null>(null);

  /* eslint-disable react-hooks/immutability */
  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current || prefersReducedMotion) return;

    const t = state.clock.elapsedTime;

    if (trigger.current !== lastTrigger.current && cycleStart.current === null) {
      lastTrigger.current = trigger.current;
      cycleStart.current = t;
    }

    if (cycleStart.current === null) return;

    const progress = Math.min((t - cycleStart.current) / CYCLE_DURATION, 1);
    const scatterFactor = Math.sin(progress * Math.PI);
    // A brief crossfade at each end of the cycle: particles take over from the
    // crisp photo almost instantly when the explosion starts, and hand back to
    // it just as fast once the picture has fully reformed — so the only thing
    // ever shown at rest is the real, sharp photograph, never the particle
    // approximation of it.
    const revealAmount = Math.min(
      1,
      Math.min(progress, 1 - progress) / FADE_FRACTION,
    );

    const posAttr = pointsRef.current.geometry.getAttribute(
      'position',
    ) as THREE.BufferAttribute;

    for (let i = 0; i < field.count; i++) {
      const x = field.basePositions[i * 3] + field.scatterOffsets[i * 3] * scatterFactor;
      const y =
        field.basePositions[i * 3 + 1] + field.scatterOffsets[i * 3 + 1] * scatterFactor;
      const z =
        field.basePositions[i * 3 + 2] + field.scatterOffsets[i * 3 + 2] * scatterFactor;

      livePositions[i * 3] = x;
      livePositions[i * 3 + 1] = y;
      livePositions[i * 3 + 2] = z;
      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;

    materialRef.current.opacity = revealAmount * OPACITY_MAX;
    if (imageEl.current) imageEl.current.style.opacity = String(1 - revealAmount);

    if (progress >= 1) {
      cycleStart.current = null;
      materialRef.current.opacity = 0;
      if (imageEl.current) imageEl.current.style.opacity = '1';
    }
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[livePositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[field.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        map={dotTexture}
        vertexColors
        size={4}
        transparent
        opacity={0}
        sizeAttenuation={false}
        depthWrite={false}
      />
    </points>
  );
}
