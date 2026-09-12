import { ArrowUpRightIcon } from '../ui/icons';

const contactLinks = {
  email: 'your-email@example.com', // Replace with Anindita's preferred email.
  github: 'https://github.com/anindita-vani28',
  linkedin: 'https://www.linkedin.com/in/your-profile', // Replace with Anindita's profile URL.
};

export function Contact() {
  return (
    <section className="section section--panel reveal-section" id="contact">
      <div className="section__content contact">
        <div className="contact__intro">
          <p className="eyebrow">04 / Contact</p>
          <h2>Let’s Connect</h2>
          <p className="section__copy">
            I’m always open to connecting with students, developers, recruiters,
            and people working in technology. Whether you’d like to discuss an
            opportunity, collaborate on a project, or simply say hello, feel
            free to reach out.
          </p>
          <p className="contact__availability">
            <span aria-hidden="true" />
            Currently open to software engineering internships, collaborative
            projects, and opportunities to learn and build.
          </p>
        </div>

        <div className="contact__actions" aria-label="Contact options">
          <p className="contact__prompt">Start a conversation</p>
          <a
            className="button button--primary contact__email"
            href={`mailto:${contactLinks.email}`}
            aria-label={`Send an email to ${contactLinks.email}`}
          >
            Send me an email
            <ArrowUpRightIcon />
          </a>
          <span className="contact__placeholder">
            Email placeholder—replace before publishing
          </span>

          <div className="contact__socials">
            <a
              href={contactLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Anindita Bhowmik's GitHub profile"
            >
              <span>GitHub</span>
              <ArrowUpRightIcon />
            </a>
            <a
              href={contactLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile placeholder"
            >
              <span>LinkedIn</span>
              <small>add profile</small>
              <ArrowUpRightIcon />
            </a>
          </div>
        </div>

        <footer className="contact__footer">
          <span>Anindita Bhowmik</span>
          <a href="#home">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
