import Link from "next/link";

const primaryLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/chat", label: "Ask AI" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/chat", label: "Ask AI" },
  { href: "/contact", label: "Contact" },
  { href: "/resume.pdf", label: "Résumé" },
  { href: "https://github.com/Haadesx", label: "GitHub", external: true },
  { href: "https://www.linkedin.com/in/vareshpatel/", label: "LinkedIn", external: true },
];

export function Navbar() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="V.P — Varesh Patel home">
          V<span>.</span>P
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a href="/resume.pdf">Résumé ↗</a>
        </nav>
        <details className="mobile-menu">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {mobileLinks.map((link) =>
              link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <Link key={link.href} href={link.href}>
                  {link.label}
                  {link.href === "/resume.pdf" ? <span aria-hidden="true">↗</span> : null}
                </Link>
              ),
            )}
          </nav>
        </details>
      </div>
    </header>
  );
}
