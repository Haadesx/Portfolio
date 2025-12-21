"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Resume", href: "/resume" }, // Will redirect or download
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Close menu when route changes
        setIsOpen(false);
    }, [pathname]);

    return (
        <header className="fixed top-0 z-50 w-full backdrop-blur-sm bg-background/80 border-b border-white/10">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
                <Link href="/" className="font-mono text-secondary text-lg font-bold tracking-tighter z-50">
                    VP
                </Link>

                {/* Desktop Nav */}
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

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 p-2 text-secondary focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="relative w-6 h-5">
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="absolute top-0 left-0 w-full h-0.5 bg-current transform origin-center transition-transform"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2 transition-opacity"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform origin-center transition-transform"
                        />
                    </div>
                </button>

                {/* Mobile Nav Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#112240] md:hidden"
                        >
                            <nav className="flex flex-col gap-8 text-center">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-2xl font-mono transition-colors hover:text-secondary",
                                            pathname === item.href ? "text-secondary" : "text-foreground"
                                        )}
                                    >
                                        <span className="text-secondary block text-sm mb-1">0{index + 1}.</span>
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
