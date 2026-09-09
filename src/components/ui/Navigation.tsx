import { useActiveSection } from '../../hooks/useActiveSection';
import { ArrowUpRightIcon } from './icons';

const links = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export function Navigation() {
  const activeId = useActiveSection(links.map((link) => link.id));

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Anindita Bhowmik, back to top">
        AB
      </a>
      <nav aria-label="Primary navigation">
        <ul>
          {links.map((link) => {
            const isActive = link.id === activeId;
            return (
              <li key={link.href}>
                <a href={link.href} aria-current={isActive ? 'page' : undefined}>
                  {isActive && <span className="nav-dot" aria-hidden="true" />}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <a className="button button--ghost button--small" href="#contact">
        Let’s Connect
        <ArrowUpRightIcon />
      </a>
    </header>
  );
}
