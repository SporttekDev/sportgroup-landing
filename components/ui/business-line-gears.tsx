"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { BusinessLine } from "@/data/business-lines";
import { Badge } from "@/components/ui/badge";
import { BusinessLineGrid } from "@/components/business-line-grid";

/**
 * Gear view of the business lines: one large gear (SGI) in the hub, one
 * satellite gear per business line, each meshing with the hub only.
 *
 * Why satellites never touch each other: a closed chain of seven gears
 * cannot turn (odd count). With a single hub driving all of them, every
 * satellite turns the opposite way to the hub and the layout stays valid.
 *
 * Selecting a business line advances the hub by exactly one tooth, so every
 * satellite turns by exactly one of its own teeth in the other direction.
 * Whole-tooth steps keep the teeth interlocked after every move.
 *
 * Geometry is built for 7 satellites. With more, adjacent satellites would
 * overlap and DIST / SAT_PITCH need to be recalculated.
 *
 * - md and up: gears + detail panel (side by side from lg, stacked on md).
 * - below md: falls back to BusinessLineGrid.
 */

// ---- Geometry (one 660x660 coordinate space, scaled by the container) ----
const VIEW = 660;
const CENTER = VIEW / 2;

const MODULE = 10; // tooth size; hub and satellites must share it to mesh
const HUB_TEETH = 28;
const SAT_TEETH = 16;
const ADDENDUM = MODULE * 0.8; // tooth height above the pitch circle
const DEDENDUM = MODULE; // root depth below it (a little deeper, for clearance)

const HUB_PITCH = (MODULE * HUB_TEETH) / 2; // 140
const SAT_PITCH = (MODULE * SAT_TEETH) / 2; // 80
const DIST = HUB_PITCH + SAT_PITCH; // hub centre -> satellite centre (meshing distance)
const SAT_OUTER = SAT_PITCH + ADDENDUM;
const HUB_ROOT = HUB_PITCH - DEDENDUM;

const HUB_STEP = 360 / HUB_TEETH; // degrees the hub turns per selection
const SAT_RATIO = HUB_TEETH / SAT_TEETH; // satellites turn this much faster, reversed

const SERVICES_SHOWN = 3;

const frac = (x: number) => x - Math.floor(x);

/** Straight-flanked gear outline. Tooth 0 is centred on the +x axis. */
function gearPath(teeth: number, pitchR: number, addendum: number, dedendum: number) {
    const outer = pitchR + addendum;
    const root = pitchR - dedendum;
    const pitchAngle = (2 * Math.PI) / teeth;
    const baseHalf = 0.31 * pitchAngle; // half tooth width at the root
    const tipHalf = 0.15 * pitchAngle; // half tooth width at the tip
    const pt = (r: number, a: number) =>
        `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;

    let d = "";
    for (let j = 0; j < teeth; j++) {
        const c = j * pitchAngle;
        if (j === 0) d += `M${pt(root, c - baseHalf)}`;
        d += ` L${pt(outer, c - tipHalf)} L${pt(outer, c + tipHalf)} L${pt(root, c + baseHalf)}`;
        d += ` A${root},${root} 0 0 1 ${pt(root, (j + 1) * pitchAngle - baseHalf)}`;
    }
    return `${d} Z`;
}

const HUB_PATH = gearPath(HUB_TEETH, HUB_PITCH, ADDENDUM, DEDENDUM);
const SAT_PATH = gearPath(SAT_TEETH, SAT_PITCH, ADDENDUM, DEDENDUM);

/** Position and starting rotation (deg) of a satellite so its teeth fit the hub's gaps. */
function satelliteAt(index: number, total: number) {
    const theta = ((-90 + (360 / total) * index) * Math.PI) / 180;
    const x = CENTER + DIST * Math.cos(theta);
    const y = CENTER + DIST * Math.sin(theta);

    // Where in its tooth cycle the hub is at this angle (0 = tooth centred here).
    const hubPhase = frac((HUB_TEETH * theta) / (2 * Math.PI));
    // The satellite must show a gap exactly where the hub shows a tooth.
    const satPhase = frac(0.5 - hubPhase);
    const toothAngle = theta + Math.PI - satPhase * ((2 * Math.PI) / SAT_TEETH);

    return { x, y, rotation: (toothAngle * 180) / Math.PI };
}

interface BusinessLineGearsProps {
    businessLines: BusinessLine[];
    /** Dark logo shown in the middle of the hub gear. */
    hubLogoSrc?: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    showViewAll?: boolean;
}

export function BusinessLineGears({
    businessLines,
    hubLogoSrc = "/logos/sport-group-indonesia.png",
    eyebrow,
    title = "One engine, seven business lines.",
    description = "Each business line meshes with the group at the center, so when one moves, the whole ecosystem turns.",
    showViewAll = false,
}: BusinessLineGearsProps) {
    const reduce = useReducedMotion();
    const items = [...businessLines].sort((a, b) => a.order - b.order);
    const total = items.length;
    const satellites = items.map((_, i) => satelliteAt(i, total));

    const [activeIndex, setActiveIndex] = useState(0);
    const [turn, setTurn] = useState(0); // hub rotation in degrees, grows by HUB_STEP per selection

    const select = (i: number) => {
        if (i === activeIndex) return;
        setActiveIndex(i);
        setTurn((t) => t + HUB_STEP);
    };

    const fade = reduce
        ? {}
        : {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true, margin: "-100px" },
            transition: { duration: 0.8 },
        };

    const gearTurn =
        "origin-center [transform-box:fill-box] transition-transform duration-700 ease-out motion-reduce:transition-none";

    return (
        <>
            {/* Mobile fallback */}
            <div className="md:hidden">
                <BusinessLineGrid
                    eyebrow={eyebrow}
                    title={title}
                    description={description}
                    limit={3}
                    showViewAll
                    businessLines={businessLines}
                />
            </div>

            <section className="relative hidden overflow-hidden md:block">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    {/* Header */}
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
                            <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-navy-500">
                                {description}
                            </p>
                        </div>
                        {showViewAll && (
                            <Link
                                href="/business-line"
                                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-navy-800 hover:text-navy-600"
                            >
                                View All Business Lines
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        )}
                    </div>

                    <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
                        {/* Gears */}
                        <div className="lg:col-span-7">
                            <div className="relative mx-auto aspect-square w-full max-w-[680px]">
                                <motion.svg
                                    viewBox={`0 0 ${VIEW} ${VIEW}`}
                                    aria-hidden
                                    className="absolute inset-0 h-full w-full"
                                    strokeLinejoin="round"
                                    {...fade}
                                >
                                    {/* Hub gear */}
                                    <g transform={`translate(${CENTER} ${CENTER})`}>
                                        <g
                                            className={gearTurn}
                                            style={{ transform: `rotate(${turn}deg)` }}
                                        >
                                            <path
                                                d={HUB_PATH}
                                                className="fill-white stroke-navy-900"
                                                strokeWidth={2}
                                            />
                                            <circle
                                                r={HUB_ROOT - 16}
                                                className="fill-none stroke-navy-900/10"
                                                strokeWidth={1}
                                            />
                                        </g>
                                    </g>

                                    {/* Satellite gears */}
                                    {items.map((bl, i) => {
                                        const s = satellites[i];
                                        const isActive = i === activeIndex;
                                        return (
                                            <g key={bl.slug} transform={`translate(${s.x} ${s.y})`}>
                                                <g
                                                    className={gearTurn}
                                                    style={{
                                                        transform: `rotate(${s.rotation - turn * SAT_RATIO}deg)`,
                                                    }}
                                                >
                                                    <path
                                                        d={SAT_PATH}
                                                        strokeWidth={isActive ? 2.5 : 1.5}
                                                        className={`fill-white transition-[stroke,stroke-width] duration-300 ${isActive
                                                                ? "stroke-navy-900"
                                                                : "stroke-navy-300"
                                                            }`}
                                                    />
                                                </g>
                                            </g>
                                        );
                                    })}
                                </motion.svg>

                                {/* Hub logo: upright, never rotates with the gear */}
                                <div className="pointer-events-none absolute left-1/2 top-1/2 w-[15%] -translate-x-1/2 -translate-y-1/2">
                                    <Image
                                        src={hubLogoSrc}
                                        alt="Sport Group Indonesia"
                                        width={240}
                                        height={240}
                                        priority
                                        className="h-auto w-full object-contain"
                                    />
                                </div>

                                {/* Satellite logos + hit areas */}
                                {items.map((bl, i) => {
                                    const s = satellites[i];
                                    const isActive = i === activeIndex;
                                    const initials = bl.shortName
                                        .split(/\s+/)
                                        .map((w) => w[0])
                                        .join("")
                                        .slice(0, 3)
                                        .toUpperCase();

                                    return (
                                        <div
                                            key={bl.slug}
                                            className="absolute -translate-x-1/2 -translate-y-1/2"
                                            style={{
                                                left: `${(s.x / VIEW) * 100}%`,
                                                top: `${(s.y / VIEW) * 100}%`,
                                                width: `${((SAT_OUTER * 2) / VIEW) * 100}%`,
                                            }}
                                        >
                                            <motion.div
                                                {...(reduce
                                                    ? {}
                                                    : {
                                                        initial: { opacity: 0 },
                                                        whileInView: { opacity: 1 },
                                                        viewport: { once: true, margin: "-100px" },
                                                        transition: {
                                                            duration: 0.5,
                                                            delay: 0.25 + i * 0.07,
                                                        },
                                                    })}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => select(i)}
                                                    onMouseEnter={() => select(i)}
                                                    onFocus={() => select(i)}
                                                    aria-pressed={isActive}
                                                    aria-label={`${bl.name}, ${bl.category}`}
                                                    className="group flex aspect-square w-full items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500"
                                                >
                                                    {bl.logo ? (
                                                        <span
                                                            className={`relative block h-[54%] w-[64%] transition-transform duration-300 ${isActive ? "scale-105" : "group-hover:scale-105"
                                                                }`}
                                                        >
                                                            <Image
                                                                src={bl.logo}
                                                                alt=""
                                                                fill
                                                                sizes="130px"
                                                                className="object-contain"
                                                            />
                                                        </span>
                                                    ) : (
                                                        <span className="font-display text-lg font-semibold text-navy-700">
                                                            {initials}
                                                        </span>
                                                    )}
                                                </button>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Detail panel. Every entry shares one grid cell, so the
                            panel keeps the height of the longest entry and never jumps. */}
                        <div
                            aria-live="polite"
                            className="grid border-t border-navy-200 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
                        >
                            {items.map((bl, i) => {
                                const isActive = i === activeIndex;
                                return (
                                    <div
                                        key={bl.slug}
                                        aria-hidden={!isActive}
                                        className={`col-start-1 row-start-1 transition-opacity duration-300 motion-reduce:transition-none ${isActive ? "opacity-100" : "invisible opacity-0"
                                            }`}
                                    >
                                        <p className="font-display text-sm font-semibold text-navy-400">
                                            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                                        </p>
                                        <span className="mt-4 block text-xs font-medium uppercase tracking-wide text-navy-400">
                                            {bl.category}
                                        </span>
                                        <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-navy-900">
                                            {bl.name}
                                        </h3>
                                        <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-navy-500">
                                            {bl.summary}
                                        </p>

                                        <ul className="mt-6 divide-y divide-navy-100 border-y border-navy-100 text-sm text-navy-700">
                                            {bl.services.slice(0, SERVICES_SHOWN).map((service) => (
                                                <li key={service} className="py-2.5">
                                                    {service}
                                                </li>
                                            ))}
                                        </ul>

                                        {bl.badges && bl.badges.length > 0 && (
                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {bl.badges.map((badge) => (
                                                    <Badge
                                                        key={badge}
                                                        variant="outline"
                                                        className="border-navy-200 text-navy-600"
                                                    >
                                                        {badge}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}

                                        <Link
                                            href={`/business-line/${bl.slug}`}
                                            tabIndex={isActive ? 0 : -1}
                                            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-navy-600"
                                        >
                                            Explore {bl.shortName}
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}