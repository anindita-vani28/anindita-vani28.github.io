import { projects, type Project } from '../../data/projects';

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="project-card__details">
      <span>{project.year}</span>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul aria-label={`${project.title} technologies`}>
        {project.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      {project.href && (
        <a
          className="project-card__link"
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.title} repository`}
        >
          View repository <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  if (!project.image) {
    return (
      <article className="project-card">
        <ProjectDetails project={project} />
      </article>
    );
  }

  return (
    <article
      className="project-card project-card--flip"
      aria-label={`${project.title}. Hover or focus to reveal project details.`}
    >
      <div className="project-card__flipper">
        <div className="project-card__face project-card__front">
          <img src={project.image} alt={project.imageAlt ?? ''} />
          <div className="project-card__front-copy">
            <span>Featured project · {project.year}</span>
            <h3>{project.title}</h3>
            <button type="button" tabIndex={0}>
              Explore project <i aria-hidden="true">↻</i>
            </button>
          </div>
        </div>

        <div className="project-card__face project-card__back">
          <ProjectDetails project={project} />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section className="section section--panel reveal-section" id="projects">
      <div className="section__content">
        <p className="eyebrow">02 / Projects</p>
        <h2>Things I’ve built, broken, and made better.</h2>
        <p className="section__copy">
          A collection of work created through experimentation, collaboration,
          and continuous learning.
        </p>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
