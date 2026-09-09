import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="section hero" id="home" aria-labelledby="hero-title">
      <div className="section__content hero__content">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Designer · Developer · Creative Technologist
        </motion.p>

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          Hi, I’m Anindita.
          <span>I build thoughtful digital experiences.</span>
        </motion.h1>

        <motion.p
          className="hero__intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          This is the starting canvas. We’ll shape the story, visuals, and interaction
          of this hero together.
        </motion.p>

        <motion.a
          className="button"
          href="#projects"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.75 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          Explore my work
        </motion.a>
      </div>
    </section>
  );
}
