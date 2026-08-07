"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBusinessLineIcon } from "@/lib/business-line-icons";
import { businessLines } from "@/data/business-lines";

interface BusinessLineCarouselProps {
    eyebrow?: string;
    title?: string;
    description?: string;
    /** Limit the number of slides (e.g. featured set on Home/About). Omit to show all 7. */
    limit?: number;
    /** Show a "View All" link near the heading — only makes sense when limit is set. */
    showViewAll?: boolean;
    /** Autoplay interval in ms. */
    autoplayInterval?: number;
}

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 60;
const VISIBLE_OFFSET_RANGE = 2;

const SLOT_STYLE: Record<number, { x: string; scale: number; opacity: number; z: number }> = {
    [-2]: { x: "-172%", scale: 0.6, opacity: 0, z: 0 },
    [-1]: { x: "-68%", scale: 0.82, opacity: 0.5, z: 20 },
    [0]: { x: "0%", scale: 1, opacity: 1, z: 30 },
    [1]: { x: "68%", scale: 0.82, opacity: 0.5, z: 20 },
    [2]: { x: "172%", scale: 0.6, opacity: 0, z: 0 },
};

/** Shortest signed distance from `activeIndex` to `itemIndex` on a circular track. */
function circularOffset(itemIndex: number, activeIndex: number, length: number) {
    let diff = itemIndex - activeIndex;
    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;
    return diff;
}

function ArrowButton({
    direction,
    onClick,
    className,
}: {
    direction: "prev" | "next";
    onClick: () => void;
    className?: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={direction === "prev" ? "Previous business line" : "Next business line"}
            className={cn(
                "h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:h-13 sm:w-13 md:h-14 md:w-14",
                className
            )}
        >
            {direction === "prev" ? (
                <ArrowLeft className="mx-auto h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
                <ArrowRight className="mx-auto h-4 w-4 sm:h-5 sm:w-5" />
            )}
        </button>
    );
}

/**
 * Full-bleed, ambient coverflow carousel. The section background is the
 * active slide's accent + bgSrc (same mix-blend-overlay technique as the
 * Business Line detail hero) and crossfades between slides — this is the
 * scoped color exception, same as the detail hero. Cards themselves are
 * glass panels (no new hue introduced) holding each business line's logo.
 *
 * Arrow placement is responsive: on desktop (md+) the arrows flank the card
 * track. On mobile/tablet (<md), flanking would crowd the viewport, so the
 * arrows move to a small paired cluster top-right, above the card stage.
 */
export function BusinessLineCarousel({
    eyebrow,
    title = "Our Business Lines",
    description,
    limit,
    showViewAll = false,
    autoplayInterval = AUTOPLAY_MS,
}: BusinessLineCarouselProps) {
    const reduce = useReducedMotion();
    const items = [...businessLines]
        .sort((a, b) => a.order - b.order)
        .slice(0, limit ?? businessLines.length);

    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = useCallback(
        (next: number) => {
            setIndex(((next % items.length) + items.length) % items.length);
        },
        [items.length]
    );
    const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
    const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

    useEffect(() => {
        if (reduce || isPaused || items.length <= 1) return;
        timerRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, autoplayInterval);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [reduce, isPaused, items.length, autoplayInterval]);

    function handleDragEnd(_: unknown, info: PanInfo) {
        if (info.offset.x < -SWIPE_THRESHOLD) goNext();
        else if (info.offset.x > SWIPE_THRESHOLD) goPrev();
    }

    if (items.length === 0) return null;

    const current = items[index];
    const hasTheme = Boolean(current.accent && current.bgSrc);

    return (
        <section
            className={cn(
                "relative overflow-hidden py-20 transition-colors duration-700",
                !hasTheme && "bg-navy-900"
            )}
            style={hasTheme ? { backgroundColor: current.accent } : undefined}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Crossfading background photo, same overlay technique as the detail hero */}
            <AnimatePresence>
                {hasTheme && (
                    <motion.div
                        key={current.slug}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.7 }}
                        className="absolute inset-0 mix-blend-overlay"
                        aria-hidden
                    >
                        <Image
                            src={current.bgSrc as string}
                            alt=""
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/20" aria-hidden />
            {!hasTheme && (
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 15% 25%, white 1.5px, transparent 1.5px)",
                        backgroundSize: "26px 26px",
                    }}
                    aria-hidden
                />
            )}

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section heading, top-left, sits directly on the accent background */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        {eyebrow && (
                            <span className="text-xs font-semibold uppercase tracking-wide text-white/60">
                                {eyebrow}
                            </span>
                        )}
                        <h2 className="mt-2 font-display text-3xl font-semibold leading-display-safe tracking-tight text-white md:text-4xl">
                            {title}
                        </h2>
                        {description && (
                            <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-white/75">
                                {description}
                            </p>
                        )}
                    </div>
                    {showViewAll && limit && (
                        <Link
                            href="/business-line"
                            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white"
                        >
                            View All
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    )}
                </div>

                {/* Coverflow stage */}
                <div className="mt-14 md:mt-16">
                    {/* Mobile/tablet arrow cluster — top-right, above the card stage */}
                    {items.length > 1 && (
                        <div className="mb-4 flex justify-end gap-2 md:hidden">
                            <ArrowButton direction="prev" onClick={goPrev} />
                            <ArrowButton direction="next" onClick={goNext} />
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14">
                        {items.length > 1 && (
                            <ArrowButton direction="prev" onClick={goPrev} className="hidden md:flex" />
                        )}

                        <div
                            className="relative w-full max-w-4xl overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                            role="region"
                            aria-roledescription="carousel"
                            aria-label={title}
                            tabIndex={0}
                            onFocus={() => setIsPaused(true)}
                            onBlur={() => setIsPaused(false)}
                            onKeyDown={(event) => {
                                if (event.key === "ArrowRight") goNext();
                                if (event.key === "ArrowLeft") goPrev();
                            }}
                        >
                            <motion.div
                                drag={reduce || items.length <= 1 ? false : "x"}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragStart={() => setIsPaused(true)}
                                onDragEnd={(event, info) => {
                                    handleDragEnd(event, info);
                                    setIsPaused(false);
                                }}
                                className="relative mx-auto flex h-[280px] cursor-grab items-center justify-center active:cursor-grabbing sm:h-[340px] md:h-[400px]"
                            >
                                {items.map((line, i) => {
                                    const offset = circularOffset(i, index, items.length);
                                    if (Math.abs(offset) > VISIBLE_OFFSET_RANGE) return null;

                                    const slot = SLOT_STYLE[offset];
                                    const Icon = getBusinessLineIcon(line.slug);
                                    const isActive = offset === 0;

                                    return (
                                        <motion.button
                                            key={line.slug}
                                            type="button"
                                            onClick={() => goTo(i)}
                                            aria-label={`Show ${line.name}`}
                                            aria-current={isActive ? "true" : undefined}
                                            initial={false}
                                            animate={{
                                                x: slot.x,
                                                scale: slot.scale,
                                                opacity: slot.opacity,
                                            }}
                                            transition={{
                                                duration: reduce ? 0 : 0.5,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            style={{ zIndex: slot.z }}
                                            className={cn(
                                                "absolute flex aspect-[16/10] w-[260px] items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-navy-lg backdrop-blur-md sm:w-[320px] md:w-[380px]",
                                                isActive ? "pointer-events-none" : "cursor-pointer"
                                            )}
                                        >
                                            <span className="flex h-32 w-32 items-center justify-center rounded-full bg-white/95 sm:h-40 sm:w-40 md:h-48 md:w-48">
                                                {line.logo ? (
                                                    <Image
                                                        src={line.logo}
                                                        alt={line.name}
                                                        width={150}
                                                        height={150}
                                                        className="h-24 w-24 object-contain sm:h-32 sm:w-32 md:h-40 md:w-40"
                                                    />
                                                ) : (
                                                    <Icon className="h-9 w-9 text-navy-800 sm:h-11 sm:w-11" strokeWidth={1.5} />
                                                )}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {items.length > 1 && (
                            <ArrowButton direction="next" onClick={goNext} className="hidden md:flex" />
                        )}
                    </div>
                </div>

                {/* Active slide info — bottom-left text, bottom-right CTA */}
                <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between md:mt-16">
                    <div className="min-h-[112px] sm:min-h-[132px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.slug}
                                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                                transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="max-w-xl"
                            >
                                <h3 className="font-display text-2xl font-semibold leading-display-safe tracking-tight text-white sm:text-3xl line-clamp-1">
                                    {current.name}
                                </h3>
                                <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-white/60">
                                    {current.category}
                                </span>
                                <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-white/75 sm:text-base line-clamp-2">
                                    {current.tagline}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <Link
                        href={`/business-line/${current.slug}`}
                        className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg px-5 py-3 text-sm font-medium transition-colors sm:self-end border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                    >
                        View Details
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}