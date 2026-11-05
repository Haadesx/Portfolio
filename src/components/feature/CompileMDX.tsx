import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Mermaid } from "./Mermaid";
import React from "react";

interface CompileMDXProps {
    source: string;
}

type PreProps = React.HTMLAttributes<HTMLPreElement>;

type CodeChildProps = {
    className?: string;
    children?: React.ReactNode;
};

// Custom Pre component to intercept mermaid blocks
const Pre = ({ children, ...props }: PreProps) => {
    if (React.isValidElement<CodeChildProps>(children)) {
        const childProps = children.props;
        if (childProps.className?.includes("language-mermaid")) {
            return <Mermaid chart={String(childProps.children ?? "")} />;
        }
    }
    return <pre {...props}>{children}</pre>;
};

const components = {
    pre: Pre,
    // You can add more custom components here
};

export function CompileMDX({ source }: CompileMDXProps) {
    return (
        <MDXRemote
            source={source}
            components={components}
            options={{
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                }
            }}
        />
    );
}
