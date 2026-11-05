import Link from "next/link";

export function Navbar() {
  return <header className="site-header"><div className="header-inner"><Link href="/" className="brand" aria-label="V.P — Varesh Patel home">V<span>.</span>P</Link><nav aria-label="Main navigation"><Link href="/projects">Projects</Link><Link href="/about">About</Link><Link href="/chat">Ask AI</Link><Link href="/contact">Contact</Link><a href="/resume.pdf">Résumé ↗</a></nav></div></header>;
}
