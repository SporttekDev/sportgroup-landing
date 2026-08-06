"use client";

import { motion, useReducedMotion } from "framer-motion";

export interface JourneyItem {
    year: string;
    title: string;
    description: string;
}

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.15 },
    },
};

const lineVariant = {
    hidden: { scaleY: 0 },
    show: (itemCount: number) => ({
        scaleY: 1,
        transition: { duration: Math.max(itemCount * 0.35, 0.6), ease: "easeInOut" as const },
    }),
};

const itemVariant = {
    hidden: { opacity: 0, x: -16 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
};

/**
 * Motivation: storytelling — reveals SGI's history in sequence, matching the
 * chronological narrative of the timeline, with the connecting line growing
 * to reinforce a single continuous journey rather than disconnected points.
 */
export function JourneyTimeline({ items }: { items: JourneyItem[] }) {
    const reduce = useReducedMotion();

    if (reduce) {
        return (
            <ol className="relative mt-14 space-y-10 border-l border-navy-200 pl-8">
                {items.map((item) => (
                    <li key={`${item.year}-${item.title}`} className="relative">
                        <span
                            className="absolute -left-9.25 top-1.5 h-2.5 w-2.5 rounded-full bg-navy-800"
                            aria-hidden
                        />
                        <span className="text-sm font-semibold text-navy-400">{item.year}</span>
                        <h3 className="mt-1 font-display text-xl font-semibold text-navy-900">
                            {item.title}
                        </h3>
                        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-navy-500">
                            {item.description}
                        </p>
                    </li>
                ))}
            </ol>
        );
    }

    return (
        <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
            className="relative mt-14 space-y-10 pl-8"
        >
            <motion.span
                custom={items.length}
                variants={lineVariant}
                style={{ transformOrigin: "top" }}
                className="absolute inset-y-1 left-0 w-px bg-navy-200"
                aria-hidden
            />
            {items.map((item) => (
                <motion.li
                    key={`${item.year}-${item.title}`}
                    variants={itemVariant}
                    className="relative"
                >
                    <span
                        className="absolute -left-9.25 top-1.5 h-2.5 w-2.5 rounded-full bg-navy-800"
                        aria-hidden
                    />
                    <span className="text-sm font-semibold text-navy-400">{item.year}</span>
                    <h3 className="mt-1 font-display text-xl font-semibold text-navy-900">
                        {item.title}
                    </h3>
                    <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-navy-500">
                        {item.description}
                    </p>
                </motion.li>
            ))}
        </motion.ol>
    );
}