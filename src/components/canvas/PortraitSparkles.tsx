import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { PortraitParticles } from './PortraitParticles';

const SAMPLE_WIDTH = 140;

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
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ alpha: true, antialias: true }}
    >
      <OrthographicCamera
        makeDefault
        left={-aspect}
        right={aspect}
        top={1}
        bottom={-1}
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
