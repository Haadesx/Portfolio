import { Github, Linkedin, Mail } from "lucide-react";

export const metadata = {
    title: "Contact | Varesh Patel",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 sm:px-8 py-12 max-w-2xl min-h-[70vh] flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">Get In Touch</h1>

            <p className="text-center text-lg text-foreground/80 mb-12">
                I’m currently looking for <strong>Fall 2025 Internship</strong> opportunities in AI/ML Engineering.
                <br />
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="flex justify-center gap-8 mb-16">
                <a href="mailto:workmailvaresh@gmail.com" className="flex flex-col items-center gap-2 group">
                    <div className="p-4 rounded-full bg-card border border-white/10 group-hover:border-secondary/50 group-hover:text-secondary transition-all">
                        <Mail className="w-8 h-8" />
                    </div>
                    <span className="text-sm font-mono">Email</span>
                </a>
                <a href="https://www.linkedin.com/in/vareshpatel/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    <div className="p-4 rounded-full bg-card border border-white/10 group-hover:border-secondary/50 group-hover:text-secondary transition-all">
                        <Linkedin className="w-8 h-8" />
                    </div>
                    <span className="text-sm font-mono">LinkedIn</span>
                </a>
                <a href="https://github.com/Haadesx" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    <div className="p-4 rounded-full bg-card border border-white/10 group-hover:border-secondary/50 group-hover:text-secondary transition-all">
                        <Github className="w-8 h-8" />
                    </div>
                    <span className="text-sm font-mono">GitHub</span>
                </a>
            </div>

            <div className="text-center">
                <a href="mailto:workmailvaresh@gmail.com" className="inline-block px-8 py-4 rounded-md border border-secondary text-secondary font-mono hover:bg-secondary/10 transition-colors">
                    Say Hello
                </a>
            </div>
        </div>
    );
}
