"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
    children: ReactNode;
    /**
     * "mount"  — animates once on page load. Use for hero content, where the
     *            element is already in view when the page renders.
     * "scroll" — animates the first time the element enters the viewport.
     *            Use for anything below the fold.
     */
    mode?: "mount" | "scroll";
    delay?: number;
    y?: number;
    className?: string;
}

/**
 * Motivation: draws the eye to page content in a deliberate order
 * (hierarchy) instead of everything appearing at once. Respects
 * prefers-reduced-motion by rendering statically.
 */
export function Reveal({
    children,
    mode = "scroll",
    delay = 0,
    y = 24,
    className,
}: RevealProps) {
    const reduce = useReducedMotion();

    if (reduce) {
        return <div className={className}>{children}</div>;
    }

    const initial = { opacity: 0, y };
    const animate = { opacity: 1, y: 0 };
    const transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay };

    if (mode === "mount") {
        return (
            <motion.div
                initial={initial}
                animate={animate}
                transition={transition}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, margin: "-80px" }}
            transition={transition}
            className={className}
        >
            {children}
        </motion.div>
    );
}