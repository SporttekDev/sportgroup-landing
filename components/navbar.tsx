"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Business Line", href: "/business-line" },
    { label: "Solution", href: "/solution" },
];

// Every route below opens on a dark/photo hero (PageHero, or the themed
// Business Line / Solution detail hero) — the navbar needs light text while
// it's still transparent (pre-scroll) on these. Home is excluded: its hero
// sits on white, so the navbar there should stay navy from the start.
const DARK_HERO_EXACT_ROUTES = ["/about-us", "/contact"];
const DARK_HERO_PREFIX_ROUTES = ["/business-line", "/solution"];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 8);
    });

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    const isDarkHeroRoute =
        DARK_HERO_EXACT_ROUTES.includes(pathname) ||
        DARK_HERO_PREFIX_ROUTES.some((route) => pathname.startsWith(route));
    const showLightText = isDarkHeroRoute && !isScrolled;

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-navy-sm border-b border-navy-100"
                    : "bg-transparent"
            )}
        >
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                        "flex items-center gap-2 font-display text-xl font-semibold tracking-tight transition-colors",
                        showLightText ? "text-white" : "text-navy-900"
                    )}
                >
                    <Image
                        src={showLightText ? "/logos/sport-group-indonesia-white.png" : "/logos/sport-group-indonesia.png"}
                        alt="Sport Group Indonesia Logo"
                        width={100}
                        height={100}
                        className="relative h-10 w-10 object-contain"
                    />
                    <span className="hidden sm:inline">Sport Group Indonesia</span>
                </Link>

                {/* Desktop nav - one line, height constrained */}
                <div className="hidden items-center gap-8 md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors",
                                showLightText
                                    ? isActive(link.href)
                                        ? "text-white"
                                        : "text-white/70 hover:text-white"
                                    : isActive(link.href)
                                        ? "text-navy-900"
                                        : "text-navy-500 hover:text-navy-900"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:block">
                    <Button asChild className={showLightText ? "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20" : "bg-navy-800 text-white hover:bg-navy-700"}>
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </div>

                {/* Mobile toggle */}
                <button
                    type="button"
                    onClick={() => setIsOpen((v) => !v)}
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden",
                        showLightText ? "text-white" : "text-navy-900"
                    )}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-navy-100 bg-white md:hidden"
                    >
                        <div className="flex flex-col gap-1 px-4 py-4">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "rounded-lg px-3 py-3 text-base font-medium",
                                        isActive(link.href)
                                            ? "bg-navy-50 text-navy-900"
                                            : "text-navy-600"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Button
                                asChild
                                className="mt-2 bg-navy-800 text-white hover:bg-navy-700"
                            >
                                <Link href="/contact" onClick={() => setIsOpen(false)}>
                                    Contact Us
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}