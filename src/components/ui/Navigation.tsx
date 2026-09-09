const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Anindita, back to top">
        AV
      </a>
      <nav aria-label="Primary navigation">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
