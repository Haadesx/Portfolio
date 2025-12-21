"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Resume", href: "/resume" }, // Will redirect or download
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 z-50 w-full backdrop-blur-sm bg-background/80 border-b border-white/10">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
                <Link href="/" className="font-mono text-secondary text-lg font-bold tracking-tighter">
                    VP
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative text-sm font-mono transition-colors hover:text-secondary",
                                pathname === item.href ? "text-secondary" : "text-foreground"
                            )}
                        >
                            <span className="text-secondary mr-1">0{index + 1}.</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Placeholder - can be expanded later */}
            </div>
        </header>
    );
}
