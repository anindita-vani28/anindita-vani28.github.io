import { projects } from '../../data/projects';

export function Projects() {
  return (
    <section className="section section--panel reveal-section" id="projects">
      <div className="section__content">
        <p className="eyebrow">Selected work</p>
        <h2>Projects will live here.</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <span>{project.year}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul aria-label={`${project.title} technologies`}>
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
