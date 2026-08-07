"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { solutions } from "@/data/solutions";
import { SolutionCard } from "@/components/solution-card";

interface SolutionGridProps {
    eyebrow?: string;
    title?: string;
    description?: string;
    limit?: number;
    showViewAll?: boolean;
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export function SolutionGrid({
    eyebrow,
    title = "Our Solutions",
    description,
    limit,
    showViewAll = false,
}: SolutionGridProps) {
    const reduce = useReducedMotion();
    const items = [...solutions]
        .sort((a, b) => a.order - b.order)
        .slice(0, limit ?? solutions.length);

    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                    {eyebrow && (
                        <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                            {eyebrow}
                        </span>
                    )}
                    <h2 className="mt-2 font-display text-3xl font-semibold leading-display-safe tracking-tight text-navy-900 md:text-4xl">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-navy-500">
                            {description}
                        </p>
                    )}
                </div>
                {showViewAll && limit && (
                    <Link
                        href="/solution"
                        className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-navy-800 hover:text-navy-600"
                    >
                        View All Solutions
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                )}
            </div>

            <motion.div
                initial={reduce ? undefined : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, margin: "-100px" }}
                variants={container}
                className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                {items.map((solution) => (
                    <motion.div
                        key={solution.slug}
                        variants={reduce ? undefined : item}
                        className="h-full"
                    >
                        <SolutionCard solution={solution} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}