import Link from "next/link";
import { CopyEmailButton } from "@/components/feature/CopyEmailButton";

const email = "workmailvaresh@gmail.com";
const linkedin = "https://www.linkedin.com/in/vareshpatel/";
const github = "https://github.com/Haadesx";

export const metadata = {
  title: "Contact | Varesh Patel",
  description:
    "Contact Varesh Patel about machine learning, computer vision, research, and applied AI work.",
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <p className="eyebrow">CONTACT / DIRECT LINE</p>
        <h1 id="contact-title">
          Tell me what
          <br />
          <span>you&apos;re building.</span>
        </h1>
        <p>
          I&apos;m looking for machine learning and computer vision roles, research
          collaborations, and applied AI work. Email is the fastest way to reach me.
        </p>
      </section>

      <div className="contact-grid">
        <section className="contact-primary" aria-labelledby="email-heading">
          <p className="meta-label" id="email-heading">
            EMAIL / PRIMARY
          </p>
          <a className="contact-email" href={`mailto:${email}`}>
            {email}
          </a>
          <div className="contact-actions">
            <CopyEmailButton email={email} />
            <a className="button-primary" href={`mailto:${email}`}>
              Open email app <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="contact-hint">
            The address is selectable if you prefer to copy it manually. No forms or third-party
            services are involved.
          </p>
        </section>

        <section className="contact-secondary" aria-labelledby="linkedin-heading">
          <p className="meta-label" id="linkedin-heading">
            LINKEDIN / ALTERNATIVE
          </p>
          <a
            className="contact-link"
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/vareshpatel <span aria-hidden="true">↗</span>
          </a>
          <p>For a longer conversation, send me a message on LinkedIn.</p>
        </section>

        <section className="contact-meta" aria-label="Additional contact details">
          <div>
            <span className="meta-label">BASED IN</span>
            <p>New Brunswick, NJ</p>
          </div>
          <div>
            <span className="meta-label">RÉSUMÉ</span>
            <a className="text-link" href="/resume.pdf">
              View PDF <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div>
            <span className="meta-label">GITHUB</span>
            <a
              className="text-link"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Haadesx <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </div>

      <p className="contact-back">
        Prefer to see the work first? <Link href="/projects">Explore the case studies ↗</Link>
      </p>
    </div>
  );
}
