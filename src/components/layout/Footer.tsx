import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full py-8 text-center text-sm text-foreground/60">
            <div className="flex justify-center gap-6 mb-4">
                <a href="https://github.com/Haadesx" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                    <Github className="w-5 h-5" />
                    <span className="sr-only">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/vareshpatel/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                    <Linkedin className="w-5 h-5" />
                    <span className="sr-only">LinkedIn</span>
                </a>
                <a href="mailto:workmailvaresh@gmail.com" className="hover:text-secondary transition-colors">
                    <Mail className="w-5 h-5" />
                    <span className="sr-only">Email</span>
                </a>
            </div>
            <nav className="footer-links" aria-label="Footer navigation">
                <Link href="/projects">Projects</Link>
                <Link href="/research">Research</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
                <a href="/resume.pdf">Résumé ↗</a>
            </nav>
            <p className="font-mono text-xs">
                Built by Varesh Patel.
            </p>
        </footer>
    );
}
