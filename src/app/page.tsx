import Link from "next/link";
import { MoveRight, Download } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/feature/ProjectCard";
import { ExperienceTimeline } from "@/components/feature/ExperienceTimeline";

export default function Home() {
  const flagshipProjects = projects.filter(p => p.isFlagship);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 space-y-24 md:space-y-32">
      {/* Hero Section */}
      <section className="flex flex-col justify-center min-h-[60vh] md:min-h-[70vh] max-w-4xl">
        <div className="space-y-1 mb-6">
          <p className="font-mono text-secondary">Hi, my name is</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary">
            Varesh Patel.
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground/70">
            I build production-ready ML systems.
          </h2>
        </div>

        <p className="max-w-xl text-lg text-foreground/80 mb-8 leading-relaxed">
          AI/ML Engineer specializing in computer vision, time-series, and retrieval systems.
          I turn complex data into measurable outcomes.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="/projects" className="inline-flex items-center justify-center rounded-md bg-secondary/10 px-6 py-3 text-sm font-medium text-secondary ring-1 ring-inset ring-secondary/20 transition hover:bg-secondary/20">
            View Projects
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-md bg-white/5 px-6 py-3 text-sm font-medium text-foreground ring-1 ring-inset ring-white/10 transition hover:bg-white/10">
            Contact Me
          </Link>
        </div>

        {/* Quick Proof Strip */}
        <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-5 gap-4 text-center md:text-left">
          {[
            { label: "Dataset Processed", value: "710GB" },
            { label: "Species Classified", value: "1,150" },
            { label: "Model Accuracy", value: "79%" },
            { label: "Fatigue Prediction MAE", value: "0.25" },
            { label: "MAE Reduction", value: "78%" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-xl md:text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
            <span className="font-mono text-secondary text-xl">01.</span> Some Things I've Built
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {flagshipProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects" className="group inline-flex items-center font-mono text-secondary hover:underline">
            View Full Project Archive <MoveRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-3xl">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
            <span className="font-mono text-secondary text-xl">02.</span> Where I've Worked
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
        </div>
        <ExperienceTimeline />
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
            <span className="font-mono text-secondary text-xl">03.</span> Technical Skills
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "Languages", skills: ["Python", "Java", "C/C++", "TypeScript", "SQL"] },
            { title: "ML/CV", skills: ["PyTorch", "TensorFlow", "Keras", "OpenCV", "Scikit-learn"] },
            { title: "Data & Tools", skills: ["Pandas", "NumPy", "Git", "Docker", "Hugging Face"] },
            { title: "Specialized", skills: ["Time-Series", "RAG Systems", "MLOps", "Gradio"] },
          ].map((group) => (
            <div key={group.title}>
              <h3 className="font-bold text-lg mb-4 text-primary">{group.title}</h3>
              <ul className="space-y-2 font-mono text-sm text-foreground/80">
                {group.skills.map(skill => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="text-secondary text-xs">▹</span> {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">Publications</h2>
        <ul className="space-y-4">
          <li className="p-4 rounded-lg bg-card/50 border border-white/5">
            <p className="font-bold text-foreground">Openpose/Posenet/Movenet evolution in yoga pose classification <span className="text-secondary font-mono text-xs ml-2">(In Progress)</span></p>
            <p className="text-sm text-foreground/60 mt-1">ICDAM-2025, London</p>
          </li>
          <li className="p-4 rounded-lg bg-card/50 border border-white/5">
            <p className="font-bold text-foreground">ML-based hand gesture recognition for immersive gaming</p>
            <p className="text-sm text-foreground/60 mt-1">IJIRMF, 2024</p>
          </li>
          <li className="p-4 rounded-lg bg-card/50 border border-white/5">
            <p className="font-bold text-foreground">Emotion-aware music recommendations: custom CNN vs VGG16 vs InceptionV3</p>
            <p className="text-sm text-foreground/60 mt-1">IEEE FMLDS, 2024</p>
          </li>
        </ul>
      </section>

      <div className="pb-20"></div>
    </div>
  );
}
