"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface MilestoneItem {
    year: string;
    title: string;
    description: string;
}

/**
 * Interactive milestones. Desktop: horizontal rail with titles alternating
 * above/below, and a detail panel underneath for the selected year.
 * Mobile: vertical rail with the selected item expanded inline.
 */
export function MilestonesTimeline({ items }: { items: MilestoneItem[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const progressWidth = `${((activeIndex + 0.5) / items.length) * 100}%`;

    const railRef = useRef<HTMLDivElement | null>(null);
    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [mobileLineHeight, setMobileLineHeight] = useState(0);

    useEffect(() => {
        const measure = () => {
            const rail = railRef.current;
            const dot = dotRefs.current[activeIndex];
            if (!rail || !dot) return;
            const railRect = rail.getBoundingClientRect();
            const dotRect = dot.getBoundingClientRect();
            setMobileLineHeight(dotRect.top - railRect.top + dotRect.height / 2);
        };

        // Pass 1: immediate. Pass 2: after the expand/collapse animation.
        const raf = requestAnimationFrame(measure);
        const timer = setTimeout(measure, 510);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timer);
        };
    }, [activeIndex]);

    const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
    const goNext = () => setActiveIndex((i) => Math.min(items.length - 1, i + 1));

    const titleButton = (item: MilestoneItem, index: number) => {
        const isActive = index === activeIndex;
        return (
            <button
                type="button"
                onClick={() => setActiveIndex(index)}
                tabIndex={-1}
                className={`w-full text-center text-xs font-bold leading-tight transition-colors duration-200 md:text-sm ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                }`}
            >
                {item.title}
            </button>
        );
    };

    return (
        <div className="relative isolate mt-10 overflow-hidden rounded-3xl bg-linear-to-br from-navy-900 via-navy-800 to-navy-900 px-6 py-8 md:px-8 md:py-10">
            {/* Texture & glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:repeating-linear-gradient(45deg,#fff_0px,#fff_1px,transparent_1px,transparent_12px)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -left-20 -top-20 -z-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -right-10 -z-10 h-64 w-64 rounded-full bg-navy-500/30 blur-3xl"
            />

            {/* Desktop */}
            <div className="hidden sm:block">
                <div className="overflow-x-auto pb-2">
                    <div className="min-w-[900px]">
                        {/* Titles above (odd index) */}
                        <div className="flex items-end">
                            {items.map((m, i) => (
                                <div
                                    key={`above-${m.year}`}
                                    className="flex min-h-14 flex-1 items-end px-1.5 pb-2"
                                >
                                    {i % 2 === 1 && titleButton(m, i)}
                                </div>
                            ))}
                        </div>

                        {/* Rail */}
                        <div className="relative flex items-center">
                            <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/20" />
                            <div
                                className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-white transition-all duration-500 motion-reduce:transition-none"
                                style={{ width: progressWidth }}
                            />

                            {items.map((m, i) => {
                                const isActive = i === activeIndex;
                                return (
                                    <button
                                        key={`node-${m.year}`}
                                        type="button"
                                        onClick={() => setActiveIndex(i)}
                                        aria-label={`Select year ${m.year}`}
                                        aria-current={isActive}
                                        className="group relative z-10 flex flex-1 flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                    >
                                        <span
                                            className={`mb-2 text-sm font-black tracking-wide transition-all duration-200 ${
                                                isActive
                                                    ? "scale-110 text-white"
                                                    : "text-white/60 group-hover:text-white"
                                            }`}
                                        >
                                            {m.year}
                                        </span>
                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                                isActive
                                                    ? "scale-125 border-white bg-white shadow-[0_0_16px_rgba(255,255,255,0.5)]"
                                                    : "border-white/50 bg-white/10 group-hover:scale-110 group-hover:border-white"
                                            }`}
                                        >
                                            <div
                                                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                                    isActive ? "bg-navy-900" : "bg-white/50"
                                                }`}
                                            />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Titles below (even index) */}
                        <div className="flex items-start">
                            {items.map((m, i) => (
                                <div
                                    key={`below-${m.year}`}
                                    className="flex min-h-14 flex-1 items-start px-1.5 pt-2"
                                >
                                    {i % 2 === 0 && titleButton(m, i)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detail panel */}
                <div
                    aria-live="polite"
                    className="mt-6 flex items-center gap-4 rounded-2xl bg-white/10 px-6 py-5 ring-1 ring-white/15 md:px-8 md:py-6"
                >
                    <button
                        type="button"
                        onClick={goPrev}
                        disabled={activeIndex === 0}
                        aria-label="Previous milestone"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* All items share one grid cell, so the panel is always as tall
                        as the longest entry and never resizes between milestones. */}
                    <div className="grid flex-1">
                        {items.map((m, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <div
                                    key={`detail-${m.year}`}
                                    aria-hidden={!isActive}
                                    className={`col-start-1 row-start-1 text-center transition-opacity duration-300 motion-reduce:transition-none ${
                                        isActive ? "opacity-100" : "invisible opacity-0"
                                    }`}
                                >
                                    <p className="font-display text-3xl font-semibold text-white">
                                        {m.year}
                                    </p>
                                    <p className="mt-1 text-base font-bold text-white">
                                        {m.title}
                                    </p>
                                    <p className="mx-auto mt-2 max-w-4xl text-sm leading-relaxed text-navy-200">
                                        {m.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={goNext}
                        disabled={activeIndex === items.length - 1}
                        aria-label="Next milestone"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className="sm:hidden">
                <div ref={railRef} className="relative pl-10">
                    <div className="absolute left-[9px] top-0 h-full w-[2px] bg-white/20" />
                    <div
                        className="absolute left-[9px] top-0 w-[2px] bg-white transition-all duration-500 ease-in-out motion-reduce:transition-none"
                        style={{ height: mobileLineHeight }}
                    />

                    {items.map((m, i) => {
                        const isActive = i === activeIndex;
                        return (
                            <button
                                key={`mobile-${m.year}`}
                                type="button"
                                onClick={() => setActiveIndex(i)}
                                aria-label={`Select year ${m.year}`}
                                aria-expanded={isActive}
                                className="relative mb-7 flex w-full items-start gap-3 text-left last:mb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                            >
                                <div
                                    ref={(el) => {
                                        dotRefs.current[i] = el;
                                    }}
                                    className={`absolute -left-10 top-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                        isActive
                                            ? "border-white bg-white shadow-[0_0_14px_rgba(255,255,255,0.5)]"
                                            : "border-white/50 bg-white/10"
                                    }`}
                                >
                                    <div
                                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                            isActive ? "bg-navy-900" : "bg-white/40"
                                        }`}
                                    />
                                </div>

                                <div className="w-full">
                                    <span
                                        className={`text-[10px] font-black tracking-widest ${
                                            isActive ? "text-white" : "text-white/60"
                                        }`}
                                    >
                                        {m.year}
                                    </span>
                                    <p
                                        className={`mt-0.5 text-sm font-bold leading-tight ${
                                            isActive ? "text-white" : "text-white/75"
                                        }`}
                                    >
                                        {m.title}
                                    </p>
                                    <p
                                        className={`overflow-hidden text-xs leading-5 text-navy-200 transition-all duration-500 ease-in-out motion-reduce:transition-none ${
                                            isActive
                                                ? "mt-1 max-h-60 opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        {m.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}