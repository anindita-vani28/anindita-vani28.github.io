import { lazy, Suspense, useRef, useState } from 'react';
import heroPortrait from '../../assets/hero-portrait.webp';

const PortraitSparkles = lazy(() =>
  import('./PortraitSparkles').then((module) => ({
    default: module.PortraitSparkles,
  })),
);

const DEFAULT_ASPECT = 1160 / 1356;

export function PortraitStage() {
  const [aspect, setAspect] = useState(DEFAULT_ASPECT);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const trigger = useRef(0);

  return (
    <div
      className="portrait-stage"
      style={{ aspectRatio: aspect }}
      onPointerEnter={() => {
        trigger.current += 1;
      }}
    >
      <img
        ref={imgRef}
        src={heroPortrait}
        alt="Portrait of Anindita Bhowmik"
        className="portrait-stage__image"
        onLoad={(event) => {
          const image = event.currentTarget;
          if (image.naturalWidth && image.naturalHeight) {
            setAspect(image.naturalWidth / image.naturalHeight);
          }
          setLoadedImage(image);
        }}
      />
      {loadedImage && (
        <Suspense fallback={null}>
          <PortraitSparkles image={loadedImage} trigger={trigger} imageEl={imgRef} />
        </Suspense>
      )}
    </div>
  );
}
