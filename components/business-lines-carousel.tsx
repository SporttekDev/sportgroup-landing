"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronUp, ChevronDown, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface BusinessLine {
    name: string;
    role: string;
    description: string;
    logoSrc: string;
    bgSrc: string;
    accent: string;
    /** Short category label shown as a badge, e.g. "Sports Tech" */
    tag: string;
    /** One standout fact/stat shown as a second badge, e.g. "Official Laykold Partner" */
    stat: string;
    /** External link to the business line's own site/portal, opened in a new tab */
    href: string;
}

const BUSINESS_LINES: BusinessLine[] = [
    {
        name: "Sport Teknologi Indonesia",
        role: "Sports Contractor & Technology Partner",
        description:
            "Sports contractor specializing in field-of-play construction and sports equipment technology the official Laykold partner in Indonesia.",
        logoSrc: "/logos/sport-teknologi-indonesia.png",
        bgSrc: "/background/sti.png",
        accent: "#630909",
        tag: "Sports Tech",
        stat: "Official Laykold Partner",
        href: "#",
    },
    {
        name: "PlayPro",
        role: "All-in-One Sports Platform",
        description:
            "All-in-one platform for sports activities games, events, courses, venues, and live scoring powered by the PlayPro GMS operations portal.",
        logoSrc: "/logos/playpro.png",
        bgSrc: "/background/playpro.png",
        accent: "#661b20",
        tag: "Platform",
        stat: "Games · Events · Venues",
        href: "#",
    },
    {
        name: "PlayPro Academy",
        role: "Youth Sports Academy",
        description:
            "A modern sports academy for kids and teens Toddler and Junior programs led by certified coaches on a national-standard curriculum across 5 cities.",
        logoSrc: "/logos/playpro-academy.png",
        bgSrc: "/background/ppa.png",
        accent: "#275466",
        tag: "Education",
        stat: "5 Kota",
        href: "#",
    },
    {
        name: "PlayPro Sports Arena",
        role: "Padel & Tennis Venue",
        description:
            "A premium padel and tennis center in North Bekasi, built on professional Laykold court surfaces.",
        logoSrc: "/logos/playpro-sports-arena.png",
        bgSrc: "/background/psa.png",
        accent: "#344e26",
        tag: "Venue",
        stat: "North Bekasi",
        href: "#",
    },
    {
        name: "lapanganpickle.id",
        role: "Pickleball Court Builder",
        description:
            "Indonesia's official Laykold partner for pickleball court construction, built to PPA US Open standards.",
        logoSrc: "/logos/lapangan-pickle.png",
        bgSrc: "/background/lpid.png",
        accent: "#234135",
        tag: "Court Builder",
        stat: "PPA US Open Standard",
        href: "#",
    },
    {
        name: "Sport Growth Indonesia",
        role: "Infrastructure Investment",
        description:
            "The group's infrastructure investment arm funding and developing community-owned land into sports venues.",
        logoSrc: "/logos/sport-growth-indonesia.png",
        bgSrc: "/background/growth.png",
        accent: "#376456",
        tag: "Investment",
        stat: "Community-Owned Land",
        href: "#",
    },
    {
        name: "From The Origin",
        role: "Sport Travel & Tourism",
        description:
            "A sport tourism and travel brand curating trips to iconic sporting events around the world.",
        logoSrc: "/logos/from-the-origin.png",
        bgSrc: "/background/fto.png",
        accent: "#6e161c",
        tag: "Travel",
        stat: "Curated Journeys",
        href: "#",
    },
];

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const DURATION = 0.8;
const COLOR_TRANSITION = { duration: DURATION, ease: EASE };

const DISTANCES = {
    desktop: { d1: 150, d2: 300, z1: -100, z2: -300 },
    mobile: { d1: 80, d2: 160, z1: -100, z2: -300 },
};

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = React.useState(false);
    React.useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, [breakpoint]);
    return isMobile;
}

function getOffset(index: number, current: number, total: number) {
    return (index - current + total) % total;
}

function getCardTarget(offset: number, total: number, d: typeof DISTANCES.desktop) {
    if (offset === 0) return { y: 0, z: 0, scale: 1.1, opacity: 1, zIndex: 10 };
    if (offset === 1) return { y: d.d1, z: d.z1, scale: 0.9, opacity: 0.9, zIndex: 5 };
    if (offset === 2) return { y: d.d2, z: d.z2, scale: 0.8, opacity: 0.7, zIndex: 1 };
    if (offset === total - 1) return { y: -d.d1, z: d.z1, scale: 0.9, opacity: 0.9, zIndex: 5 };
    if (offset === total - 2) return { y: -d.d2, z: d.z2, scale: 0.8, opacity: 0.7, zIndex: 1 };
    return { y: 0, z: -400, scale: 0.7, opacity: 0, zIndex: 0 };
}

function NavArrow({
    direction,
    onClick,
    className,
}: {
    direction: "up" | "down";
    onClick: () => void;
    className?: string;
}) {
    const label = direction === "up" ? "Previous" : "Next";
    const description =
        direction === "up"
            ? "Show the previous business line."
            : "Show the next business line.";
    const Icon = direction === "up" ? ChevronUp : ChevronDown;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <motion.button
                    type="button"
                    onClick={onClick}
                    aria-label={label}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-full",
                        "border border-white/25 bg-white/10 backdrop-blur-md",
                        "shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
                        "transition-colors hover:bg-white/20",
                        className
                    )}
                >
                    <Icon className="h-6 w-6 text-white" />
                </motion.button>
            </TooltipTrigger>
            <TooltipContent className="max-w-55 border border-white/20 bg-white/10 text-white backdrop-blur-md">
                <p className="font-display font-semibold">{label}</p>
                <p className="text-xs opacity-90">{description}</p>
            </TooltipContent>
        </Tooltip>
    );
}

/** Small pill badge used for both the category tag and the stat highlight */
function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md",
                "px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white/85",
                "md:px-3 md:py-1 md:text-xs"
            )}
        >
            {children}
        </span>
    );
}

export function BusinessLinesCarousel() {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const isMobile = useIsMobile();
    const distances = isMobile ? DISTANCES.mobile : DISTANCES.desktop;
    const total = BUSINESS_LINES.length;
    const active = BUSINESS_LINES[currentIndex];

    const goTo = React.useCallback(
        (index: number) => {
            if (isAnimating) return;
            setIsAnimating(true);
            setCurrentIndex(((index % total) + total) % total);
            window.setTimeout(() => setIsAnimating(false), DURATION * 1000);
        },
        [isAnimating, total]
    );

    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") goTo(currentIndex - 1);
            else if (e.key === "ArrowDown") goTo(currentIndex + 1);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [currentIndex, goTo]);

    const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50;
        const velocityThreshold = 300;
        if (info.offset.y < -swipeThreshold || info.velocity.y < -velocityThreshold) {
            goTo(currentIndex + 1);
        } else if (info.offset.y > swipeThreshold || info.velocity.y > velocityThreshold) {
            goTo(currentIndex - 1);
        }
    };

    return (
        <TooltipProvider delayDuration={150}>
            <motion.div
                className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden rounded-3xl p-6"
                animate={{ backgroundColor: active.accent }}
                transition={COLOR_TRANSITION}
            >
                {/* ---------- background overlay image (blends with the accent color) ---------- */}
                <AnimatePresence mode="sync">
                    <motion.div
                        key={active.bgSrc}
                        className="absolute inset-0 z-0 mix-blend-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={COLOR_TRANSITION}
                    >
                        <Image
                            src={active.bgSrc}
                            alt=""
                            fill
                            priority={currentIndex === 0}
                            sizes="100vw"
                            className="object-cover"
                        />
                    </motion.div>
                    <div className="absolute inset-0 z-0 bg-black/10" />
                </AnimatePresence>

                <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-10 md:h-[70vh] md:flex-row md:gap-16">
                    {/* ---------- carousel ---------- */}
                    <div className="flex flex-1 items-center justify-center">
                        <div
                            className="relative flex h-[60vh] w-full max-w-87.5 flex-col items-center justify-center md:h-full md:max-w-125"
                            style={{ perspective: 1000 }}
                        >
                            <NavArrow
                                direction="up"
                                onClick={() => goTo(currentIndex - 1)}
                                className="absolute left-1/2 top-2 z-20 -translate-x-1/2 md:hidden"
                            />

                            <motion.div
                                drag="y"
                                dragConstraints={{ top: 0, bottom: 0 }}
                                dragElastic={0.15}
                                dragMomentum={false}
                                onDragEnd={handleDragEnd}
                                className="relative flex h-full w-87.5 cursor-grab flex-col items-center justify-center active:cursor-grabbing md:w-112.5"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {BUSINESS_LINES.map((line, i) => {
                                    const offset = getOffset(i, currentIndex, total);
                                    const isCenter = offset === 0;
                                    const target = getCardTarget(offset, total, distances);

                                    return (
                                        <Tooltip key={line.name}>
                                            <TooltipTrigger asChild>
                                                <motion.button
                                                    type="button"
                                                    aria-label={`${line.name}, ${line.role} ${line.description}`}
                                                    onClick={() => goTo(i)}
                                                    animate={{
                                                        y: target.y,
                                                        z: target.z,
                                                        scale: target.scale,
                                                        opacity: target.opacity,
                                                    }}
                                                    transition={{ duration: DURATION, ease: EASE }}
                                                    style={{ zIndex: target.zIndex, pointerEvents: target.opacity === 0 ? "none" : "auto" }}
                                                    className={cn(
                                                        "absolute flex h-45 w-[320px] items-center justify-center rounded-2xl md:h-56.25 md:w-100",
                                                        "border border-white/25 bg-white/10 backdrop-blur-md",
                                                        "shadow-[0_20px_40px_rgba(0,0,0,0.25)]",
                                                        "outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4"
                                                    )}
                                                >
                                                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-white/15 via-transparent to-transparent" />

                                                    <motion.div
                                                        className={cn(
                                                            "relative flex items-center justify-center overflow-hidden rounded-full",
                                                            "border border-white/30 bg-white backdrop-blur-md"
                                                        )}
                                                        animate={{
                                                            width: isCenter ? 178 : 148,
                                                            height: isCenter ? 178 : 148,
                                                        }}
                                                        transition={COLOR_TRANSITION}
                                                    >
                                                        <Image
                                                            src={line.logoSrc}
                                                            alt={`${line.name} logo`}
                                                            fill
                                                            sizes="(max-width: 768px) 132px, 168px"
                                                            className={cn(
                                                                "object-contain transition-[padding] duration-700",
                                                                isCenter ? "p-3" : "p-2.5"
                                                            )}
                                                        />
                                                    </motion.div>
                                                </motion.button>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                className="max-w-60 border border-white/20 bg-white/10 text-center text-white backdrop-blur-md"
                                            >
                                                <p className="font-display font-semibold">{line.role}</p>
                                                <p className="text-xs opacity-90">{line.description}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    );
                                })}
                            </motion.div>

                            <NavArrow
                                direction="down"
                                onClick={() => goTo(currentIndex + 1)}
                                className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 md:hidden"
                            />
                        </div>
                    </div>

                    {/* ---------- controls / content panel ---------- */}
                    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 md:gap-10 md:px-0">
                        <div className="hidden items-center justify-center gap-8 md:flex">
                            <NavArrow direction="up" onClick={() => goTo(currentIndex - 1)} />
                            <NavArrow direction="down" onClick={() => goTo(currentIndex + 1)} />
                        </div>

                        <div className="w-full max-w-95 text-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                    className={cn(
                                        "relative rounded-2xl border border-white/20 bg-white/10 px-5 py-5 backdrop-blur-md md:px-8 md:py-6",
                                        "shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                                    )}
                                >
                                    {/* Row 1: category tag (left) + CTA (right) — kept on one line at every breakpoint */}
                                    <div className="mb-3 flex items-center justify-between gap-2">
                                        <Badge>{active.tag}</Badge>

                                        {/* Mobile: icon-only CTA. Desktop: icon + label. Both link out to the
                                            business line's own site — swap `href="#"` above for the real URLs. */}
                                        <a
                                            href={active.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={`Kunjungi situs ${active.name}`}
                                            className={cn(
                                                "inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 backdrop-blur-md",
                                                "px-2.5 py-1.5 text-white/90 transition-colors hover:bg-white/20 md:px-3"
                                            )}
                                        >
                                            <span className="hidden text-xs font-medium md:inline">
                                                Kunjungi Situs
                                            </span>
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </a>
                                    </div>

                                    {/* Row 2: title */}
                                    <h3 className="relative mb-1 font-display text-2xl font-bold text-white md:text-3xl">
                                        {active.name}
                                    </h3>

                                    {/* Row 3: role */}
                                    <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-widest text-white/80 md:text-xs">
                                        {active.role}
                                    </p>

                                    {/* Row 4: description, clamped to 2 lines on mobile so the card never
                                        grows tall enough to push the dot indicator off-screen */}
                                    <p className="mx-auto line-clamp-2 text-xs text-white/70 md:line-clamp-none md:text-sm">
                                        {active.description}
                                    </p>

                                    {/* Row 5: stat badge, wraps to its own line if there's no room */}
                                    <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                                        <Badge>{active.stat}</Badge>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div
                            role="tablist"
                            aria-label="Select a business line"
                            className="flex justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
                        >
                            {BUSINESS_LINES.map((line, i) => (
                                <motion.button
                                    key={line.name}
                                    type="button"
                                    aria-label={`${line.name}, ${line.role}`}
                                    onClick={() => goTo(i)}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    animate={{
                                        backgroundColor: i === currentIndex ? "#ffffff" : "rgba(255,255,255,0.35)",
                                        scale: i === currentIndex ? 1.2 : 1,
                                    }}
                                    transition={COLOR_TRANSITION}
                                    className="h-3 w-3 rounded-full focus-visible:outline focus-visible:outline-white"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </TooltipProvider >
    );
}

export default BusinessLinesCarousel;