import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Navigation } from './components/ui/Navigation';
import { useSectionReveal } from './hooks/useSectionReveal';

export default function App() {
  const contentRef = useSectionReveal();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />

      <main id="main-content" ref={contentRef}>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
