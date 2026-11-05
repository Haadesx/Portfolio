"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "strict",
    fontFamily: "var(--font-mono)",
    themeVariables: {
        background: "#151414",
        primaryColor: "#1e1a19",
        primaryTextColor: "#f3f0ea",
        primaryBorderColor: "#f15b4e",
        lineColor: "#8a807a",
        secondaryColor: "#252120",
        tertiaryColor: "#101010",
        fontSize: "14px",
    },
});

interface MermaidProps {
    chart: string;
}

export const Mermaid = ({ chart }: MermaidProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;
        mermaid
            .render(`mermaid-${Math.random().toString(36).slice(2, 11)}`, chart)
            .then((result) => {
                if (container.isConnected) container.innerHTML = result.svg;
            })
            .catch((error) => {
                console.error("Mermaid render failed", error);
            });
    }, [chart]);

    return <div ref={ref} className="mermaid my-8 overflow-x-auto border border-[#413d39] bg-[#151414] p-5" />;
};
