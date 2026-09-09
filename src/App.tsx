import { lazy, Suspense } from 'react';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Navigation } from './components/ui/Navigation';
import { SceneLoader } from './components/ui/SceneLoader';
import { useSectionReveal } from './hooks/useSectionReveal';

const PortfolioCanvas = lazy(() =>
  import('./components/canvas/PortfolioCanvas').then((module) => ({
    default: module.PortfolioCanvas,
  })),
);

export default function App() {
  const contentRef = useSectionReveal();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />

      <div className="canvas-layer" aria-hidden="true">
        <Suspense fallback={<SceneLoader />}>
          <PortfolioCanvas />
        </Suspense>
      </div>

      <main id="main-content" ref={contentRef}>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
