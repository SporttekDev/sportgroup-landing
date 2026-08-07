"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { businessLines } from "@/data/business-lines";
import { BusinessLineCard } from "@/components/business-line-card";

interface BusinessLineGridProps {
    eyebrow?: string;
    title?: string;
    description?: string;
    /** Limit the number of cards shown (e.g. featured set on Home). Omit to show all 7. */
    limit?: number;
    /** Show a "View All" link at the bottom — only makes sense when limit is set. */
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

export function BusinessLineGrid({
    eyebrow,
    title = "Our Business Lines",
    description,
    limit,
    showViewAll = false,
}: BusinessLineGridProps) {
    const reduce = useReducedMotion();
    const items = [...businessLines]
        .sort((a, b) => a.order - b.order)
        .slice(0, limit ?? businessLines.length);

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
                        href="/business-line"
                        className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-navy-800 hover:text-navy-600"
                    >
                        View All Business Lines
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
                {items.map((businessLine) => (
                    <motion.div
                        key={businessLine.slug}
                        variants={reduce ? undefined : item}
                        className="h-full"
                    >
                        <BusinessLineCard businessLine={businessLine} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}