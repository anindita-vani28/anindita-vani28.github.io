import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { PortraitParticles } from './PortraitParticles';

const SAMPLE_WIDTH = 140;
// The canvas and camera frustum are both sized larger than the photo itself
// so scattered particles have room to fly outward and be seen doing so,
// instead of being hard-clipped at the edge of the photo's own rectangle.
const FRUSTUM_SCALE = 2.2;
const CANVAS_OVERHANG_PERCENT = ((FRUSTUM_SCALE - 1) / 2) * 100;

function sampleImage(image: HTMLImageElement): ImageData {
  const scale = SAMPLE_WIDTH / image.naturalWidth;
  const canvas = document.createElement('canvas');
  canvas.width = SAMPLE_WIDTH;
  canvas.height = Math.round(image.naturalHeight * scale);

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

export function PortraitSparkles({
  image,
  trigger,
  imageEl,
}: {
  image: HTMLImageElement;
  trigger: React.RefObject<number>;
  imageEl: React.RefObject<HTMLImageElement | null>;
}) {
  const imageData = useMemo(() => sampleImage(image), [image]);
  const aspect = imageData.width / imageData.height;

  return (
    <Canvas
      className="portrait-stage__particles"
      style={{
        position: 'absolute',
        width: `${FRUSTUM_SCALE * 100}%`,
        height: `${FRUSTUM_SCALE * 100}%`,
        top: `-${CANVAS_OVERHANG_PERCENT}%`,
        left: `-${CANVAS_OVERHANG_PERCENT}%`,
        pointerEvents: 'none',
      }}
      gl={{ alpha: true, antialias: true }}
    >
      <OrthographicCamera
        makeDefault
        left={-aspect * FRUSTUM_SCALE}
        right={aspect * FRUSTUM_SCALE}
        top={FRUSTUM_SCALE}
        bottom={-FRUSTUM_SCALE}
        near={0.1}
        far={10}
        position={[0, 0, 5]}
      />
      <Suspense fallback={null}>
        <PortraitParticles imageData={imageData} trigger={trigger} imageEl={imageEl} />
      </Suspense>
    </Canvas>
  );
}
