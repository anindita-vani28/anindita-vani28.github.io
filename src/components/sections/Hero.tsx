import { motion } from 'motion/react';
import { PortraitStage } from '../canvas/PortraitStage';
import { ArrowDownIcon, ArrowRightIcon } from '../ui/icons';

const PROCESS_WORDS = ['Ideas', 'Code', 'Learn', 'Build', 'Grow'];

export function Hero() {
  return (
    <section className="section hero" id="home" aria-labelledby="hero-title">
      <div className="hero__grid">
        <div className="hero__text">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Computer Science @ RIT
          </motion.p>

          <motion.h1
            id="hero-title"
            className="hero__name"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero__name-primary">Anindita</span>
            <span className="hero__name-secondary">Bhowmik</span>
          </motion.h1>

          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45 }}
          >
            Curious minds
            <br />
            build brighter tomorrows.
          </motion.p>

          <motion.span
            className="hero__divider"
            aria-hidden="true"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />

          <motion.p
            className="hero__intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            Computer Science undergraduate at Rochester Institute of Technology,
            aspiring to build meaningful solutions through code.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.8 }}
          >
            <a className="button button--primary" href="#projects">
              Explore My Work
              <ArrowRightIcon />
            </a>
            <a className="button button--text" href="#about">
              Learn More
              <ArrowDownIcon />
            </a>
          </motion.div>
        </div>

        <div className="hero__visual">
          <PortraitStage />

          <ul className="process-ticker" aria-hidden="true">
            {PROCESS_WORDS.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>

          <p className="signature">still becoming…</p>
        </div>
      </div>

      <div className="hero__scroll-cue">
        <span className="hero__scroll-line" aria-hidden="true" />
        <span>
          Scroll
          <br />
          to explore
        </span>
      </div>
    </section>
  );
}
