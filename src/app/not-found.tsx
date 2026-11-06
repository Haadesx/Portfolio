import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function NotFoundContent() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <p className="eyebrow">ERROR / 404</p>
      <h1 className="not-found-title" id="not-found-title">
        404<span>.</span> Page not found.
      </h1>
      <p className="not-found-lede">
        This page could not be found. It may have moved, or the link may be out of date. The rest of
        the portfolio is still here.
      </p>
      <div className="not-found-links">
        <Link className="button-primary" href="/">
          Back to home <span>↗</span>
        </Link>
        <Link className="text-link" href="/projects">
          Projects ↗
        </Link>
        <Link className="text-link" href="/research">
          Research ↗
        </Link>
        <Link className="text-link" href="/contact">
          Contact ↗
        </Link>
      </div>
    </section>
  );
}

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="not-found-page flex min-h-screen flex-col">
        <Navbar />
        <main id="main" className="flex-grow">
          <NotFoundContent />
        </main>
        <Footer />
      </div>
    </>
  );
}
