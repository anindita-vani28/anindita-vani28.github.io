import { GitHubIcon, LinkedInIcon, MailIcon } from '../ui/icons';

const contactLinks = {
  github: {
    label: 'GitHub',
    value: '@anindita-vani28',
    href: 'https://github.com/anindita-vani28',
    icon: GitHubIcon,
    external: true,
  },
  linkedin: {
    label: 'LinkedIn',
    value: 'anindita-bhowmik-rit',
    href: 'https://www.linkedin.com/in/anindita-bhowmik-rit',
    icon: LinkedInIcon,
    external: true,
  },
  email: {
    label: 'Email',
    value: 'ab6126@g.rit.edu',
    href: 'mailto:ab6126@g.rit.edu',
    icon: MailIcon,
    external: false,
  },
} as const;

export function Contact() {
  return (
    <section className="section section--panel reveal-section" id="contact">
      <div className="section__content contact">
        <div className="contact__intro">
          <p className="eyebrow">04 / Contact</p>
          <h2>Let’s Connect</h2>
          <p className="section__copy">
            I’m always open to connecting with entrepreneurs, business leaders,
            people in tech, developers, and recruiters. Whether you have an
            opportunity, an idea, or simply want to talk technology, I’d love to
            hear from you.
          </p>
          <p className="contact__availability">
            <span aria-hidden="true" />
            Currently open to software engineering internships, collaborative
            projects, and opportunities to learn and build.
          </p>
        </div>

        <div className="contact__actions" aria-label="Contact options">
          <div className="contact__channels">
            {Object.values(contactLinks).map((link) => {
              const Icon = link.icon;

              return (
                <a
                  className="contact-link"
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  aria-label={`${link.label}: ${link.value}`}
                  data-label={link.label}
                  title={`${link.label}: ${link.value}`}
                  key={link.label}
                >
                  <Icon />
                </a>
              );
            })}
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
