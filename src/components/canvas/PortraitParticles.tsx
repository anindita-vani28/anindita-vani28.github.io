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

const EDGE_PARTICLE_COUNT = 250;
const EDGE_OPACITY = 0.9;
const EDGE_SPEED = 1.2;

type ParticleField = {
  count: number;
  basePositions: Float32Array;
  scatterOffsets: Float32Array;
  colors: Float32Array;
  edgePositions: Float32Array;
  edgeColors: Float32Array;
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
      const px = (nx - 0.5) * 2 * aspect;
      const py = -(ny - 0.5) * 2;
      base.push(px, py, 0);

      const angle = Math.random() * Math.PI * 2;
      const radius =
        SCATTER_RADIUS_MIN + Math.random() * (SCATTER_RADIUS_MAX - SCATTER_RADIUS_MIN);
      scatter.push(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 1.2);

      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      colors.push(r, g, b);
    }
  }

  // Edge detection: find pixels on the boundary where subject meets transparent background
  const edgeCandidates: { x: number; y: number; z: number; r: number; g: number; b: number }[] = [];
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      const alpha = data[i + 3];

      if (alpha >= ALPHA_CUTOFF) {
        // Check if neighbors have lower alpha (on a boundary)
        let isEdge = false;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const ni = ((y + dy) * width + (x + dx)) * 4;
            const nAlpha = data[ni + 3];
            if (nAlpha < ALPHA_CUTOFF) {
              isEdge = true;
              break;
            }
          }
          if (isEdge) break;
        }

        if (isEdge) {
          const nx = x / width;
          const ny = y / height;
          const px = (nx - 0.5) * 2 * aspect;
          const py = -(ny - 0.5) * 2;
          edgeCandidates.push({
            x: px,
            y: py,
            z: (Math.random() - 0.5) * 0.2,
            r: data[i] / 255,
            g: data[i + 1] / 255,
            b: data[i + 2] / 255,
          });
        }
      }
    }
  }

  // Sample EDGE_PARTICLE_COUNT particles from the edge, evenly spaced around the perimeter
  const edgeBase: number[] = [];
  const edgeColorArr: number[] = [];
  const sampleCount = Math.min(EDGE_PARTICLE_COUNT, edgeCandidates.length);
  const step = Math.max(1, Math.floor(edgeCandidates.length / sampleCount));
  for (let n = 0; n < edgeCandidates.length; n += step) {
    if (edgeBase.length / 3 >= sampleCount) break;
    const p = edgeCandidates[n];
    edgeBase.push(p.x, p.y, p.z);
    edgeColorArr.push(p.r, p.g, p.b);
  }

  return {
    count: base.length / 3,
    basePositions: new Float32Array(base),
    scatterOffsets: new Float32Array(scatter),
    colors: new Float32Array(colors),
    edgePositions: new Float32Array(edgeBase),
    edgeColors: new Float32Array(edgeColorArr),
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
  const edgePointsRef = useRef<THREE.Points>(null);
  const edgeMaterialRef = useRef<THREE.PointsMaterial>(null);
  const lastTrigger = useRef(0);
  const cycleStart = useRef<number | null>(null);

  /* eslint-disable react-hooks/immutability */
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Edge glow: particles flow continuously around the silhouette outline
    if (!prefersReducedMotion && edgePointsRef.current && edgeMaterialRef.current) {
      const edgePosAttr = edgePointsRef.current.geometry.getAttribute(
        'position',
      ) as THREE.BufferAttribute;
      const edgeCount = field.edgePositions.length / 3;

      // Offset each particle along the edge sequence based on time for continuous flow
      const offset = (t * EDGE_SPEED) % 1;

      for (let i = 0; i < edgeCount; i++) {
        const idx = (i + Math.floor(offset * edgeCount)) % edgeCount;
        const x = field.edgePositions[idx * 3];
        const y = field.edgePositions[idx * 3 + 1];
        const z = field.edgePositions[idx * 3 + 2];
        edgePosAttr.setXYZ(i, x, y, z);
      }
      edgePosAttr.needsUpdate = true;
      edgeMaterialRef.current.opacity = EDGE_OPACITY;
    }

    if (!pointsRef.current || !materialRef.current || prefersReducedMotion) return;

    if (trigger.current !== lastTrigger.current && cycleStart.current === null) {
      lastTrigger.current = trigger.current;
      cycleStart.current = t;
    }

    if (cycleStart.current === null) return;

    const progress = Math.min((t - cycleStart.current) / CYCLE_DURATION, 1);
    const scatterFactor = Math.sin(progress * Math.PI);
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
    <>
      <points ref={edgePointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[field.edgePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[field.edgeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={edgeMaterialRef}
          map={dotTexture}
          vertexColors
          size={5}
          transparent
          opacity={prefersReducedMotion ? 0 : EDGE_OPACITY}
          sizeAttenuation={false}
          depthWrite={false}
        />
      </points>

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
    </>
  );
}
