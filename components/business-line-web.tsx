"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { BusinessLine } from "@/data/business-lines";
import { Badge } from "@/components/ui/badge";
import { BusinessLineGrid } from "@/components/business-line-grid";

/**
 * Radial "spider web" view of the business lines: SGI logo in the hub,
 * every business line on the rim of a regular polygon.
 *
 * - md and up: web + detail panel (side by side from lg, stacked on md).
 * - below md: falls back to BusinessLineGrid, because seven tappable
 *   nodes do not fit a phone-width circle.
 *
 * Geometry lives in one 600x600 coordinate space. Node positions are
 * converted to percentages, so the whole thing scales with its container.
 */

const VIEW = 600;
const CENTER = VIEW / 2;
const RADIUS = 260; // distance from hub to node centres
const HUB_CLEAR = 60; // empty zone around the logo; strands stop at this radius
const RINGS = [0.55, 0.78, 1]; // polygon strands, as a fraction of RADIUS
const SERVICES_SHOWN = 3;

function polar(index: number, total: number, r: number) {
    const angle = ((-90 + (360 / total) * index) * Math.PI) / 180;
    return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle) };
}

function polygonPoints(total: number, r: number) {
    return Array.from({ length: total }, (_, i) => {
        const { x, y } = polar(i, total, r);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
}

interface BusinessLineWebProps {
    businessLines: BusinessLine[];
    /** Dark logo shown in the hub, directly on the section background. */
    hubLogoSrc?: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    showViewAll?: boolean;
}

export function BusinessLineWeb({
    businessLines,
    hubLogoSrc = "/logos/sport-group-indonesia.png",
    eyebrow,
    title = "One holding, seven ways into sport.",
    description = "Each business line covers a different part of the sport value chain, from building the court to travelling for the game.",
    showViewAll = false,
}: BusinessLineWebProps) {
    const reduce = useReducedMotion();
    const items = [...businessLines].sort((a, b) => a.order - b.order);
    const total = items.length;
    const [activeIndex, setActiveIndex] = useState(0);
    const activeStart = polar(activeIndex, total, HUB_CLEAR);
    const activeEnd = polar(activeIndex, total, RADIUS);
    const maskId = `web-clear-${useId().replace(/:/g, "")}`;

    const fade = reduce
        ? {}
        : {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true, margin: "-100px" },
              transition: { duration: 0.8 },
          };

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
                        {/* Web */}
                        <div className="lg:col-span-7">
                            <div className="relative mx-auto aspect-square w-full max-w-[640px]">
                                <motion.svg
                                    viewBox={`0 0 ${VIEW} ${VIEW}`}
                                    aria-hidden
                                    className="absolute inset-0 h-full w-full"
                                    {...fade}
                                >
                                    {/* Everything inside the mask stops at HUB_CLEAR,
                                        leaving breathing room around the logo. */}
                                    <defs>
                                        <mask id={maskId}>
                                            <rect width={VIEW} height={VIEW} fill="white" />
                                            <circle cx={CENTER} cy={CENTER} r={HUB_CLEAR} fill="black" />
                                        </mask>
                                    </defs>
                                    <g mask={`url(#${maskId})`}>
                                    {/* Concentric strands */}
                                    {/* {RINGS.map((f) => (
                                        <polygon
                                            key={f}
                                            points={polygonPoints(total, RADIUS * f)}
                                            className="fill-none stroke-navy-900/15"
                                            strokeWidth={1}
                                        />
                                    ))} */}

                                    {/* Spokes */}
                                    {items.map((bl, i) => {
                                        const p = polar(i, total, RADIUS);
                                        const isActive = i === activeIndex;
                                        return (
                                            <line
                                                key={bl.slug}
                                                x1={CENTER}
                                                y1={CENTER}
                                                x2={p.x}
                                                y2={p.y}
                                                strokeWidth={isActive ? 1.5 : 1}
                                                className={`transition-all duration-300 ${
                                                    isActive
                                                        ? "stroke-navy-900"
                                                        : "stroke-navy-900/15"
                                                }`}
                                            />
                                        );
                                    })}
                                    </g>

                                    {/* Signature: a light travelling from hub to the active node */}
                                    {!reduce && (
                                        <circle r={3.5} className="fill-navy-900">
                                            <animateMotion
                                                key={items[activeIndex]?.slug}
                                                dur="2.2s"
                                                repeatCount="indefinite"
                                                path={`M${activeStart.x},${activeStart.y} L${activeEnd.x},${activeEnd.y}`}
                                            />
                                        </circle>
                                    )}
                                </motion.svg>

                                {/* Hub: logo sits directly on the background, no wrapper */}
                                <div className="absolute left-1/2 top-1/2 w-[20%] -translate-x-1/2 -translate-y-1/2">
                                    <Image
                                        src={hubLogoSrc}
                                        alt="Sport Group Indonesia"
                                        width={240}
                                        height={240}
                                        priority
                                        className="h-auto w-full object-contain"
                                    />
                                </div>

                                {/* Nodes */}
                                {items.map((bl, i) => {
                                    const p = polar(i, total, RADIUS);
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
                                            className="absolute w-[25%] -translate-x-1/2 -translate-y-1/2"
                                            style={{
                                                left: `${(p.x / VIEW) * 100}%`,
                                                top: `${(p.y / VIEW) * 100}%`,
                                            }}
                                        >
                                            <motion.div
                                                {...(reduce
                                                    ? {}
                                                    : {
                                                          initial: { opacity: 0, scale: 0.8 },
                                                          whileInView: { opacity: 1, scale: 1 },
                                                          viewport: { once: true, margin: "-100px" },
                                                          transition: {
                                                              duration: 0.5,
                                                              delay: 0.25 + i * 0.07,
                                                              ease: [0.22, 1, 0.36, 1],
                                                          },
                                                      })}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveIndex(i)}
                                                    onMouseEnter={() => setActiveIndex(i)}
                                                    onFocus={() => setActiveIndex(i)}
                                                    aria-pressed={isActive}
                                                    aria-label={`${bl.name}, ${bl.category}`}
                                                    className="group relative block w-full focus-visible:outline-none"
                                                >
                                                    <span
                                                        className={`flex aspect-square w-full items-center justify-center overflow-hidden rounded-full bg-white transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-navy-500 ${
                                                            isActive
                                                                ? "scale-105 ring-2 ring-navy-900"
                                                                : "ring-1 ring-navy-200 group-hover:ring-navy-500"
                                                        }`}
                                                    >
                                                        {bl.logo ? (
                                                            <Image
                                                                src={bl.logo}
                                                                alt=""
                                                                width={200}
                                                                height={200}
                                                                className="h-full w-full object-contain p-4"
                                                            />
                                                        ) : (
                                                            <span className="font-display text-lg font-semibold text-navy-700">
                                                                {initials}
                                                            </span>
                                                        )}
                                                    </span>
                                                    {/* <span
                                                        className={`pointer-events-none absolute left-1/2 top-full mt-2 w-28 -translate-x-1/2 text-center text-xs font-semibold leading-tight transition-colors duration-300 ${
                                                            isActive ? "text-navy-900" : "text-navy-500"
                                                        }`}
                                                    >
                                                        {bl.shortName}
                                                    </span> */}
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
                                        className={`col-start-1 row-start-1 transition-opacity duration-300 motion-reduce:transition-none ${
                                            isActive ? "opacity-100" : "invisible opacity-0"
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