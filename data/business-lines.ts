/**
 * Business Line data for Sport Group Indonesia (SGI).
 * Each entry powers: the grid card (summary), and the [slug] detail page
 * (description, services, badges).
 *
 * NOTE: The four factual gaps flagged below (courts/hours/booking for
 * PlayPro Sports Arena, venue/court details for lapanganpickle.id,
 * investment model for Sport Growth Indonesia, and destinations/
 * testimonials for From The Origin) have been filled with DUMMY data
 * for development purposes, per instruction. Replace with confirmed
 * facts before shipping to production search "DUMMY:" to find them.
 */

export interface BusinessLine {
    slug: string;
    name: string;
    shortName: string;
    category: string;
    tagline: string;
    summary: string;
    description: string[];
    descriptionHtml?: string;
    services: string[];
    location?: string;
    badges?: string[];
    order: number;
    /**
     * Path to the official logo image, relative to /public.
     * Optional: entries without a confirmed logo fall back to the
     * lucide CATEGORY_ICON map wherever this field is undefined.
     */
    logo?: string;
    /**
     * Brand accent color (hex), used as the [slug] detail-hero background.
     * This is a deliberate, scoped exception to the site's single navy
     * accent system approved for the detail hero only, mirroring the
     * BusinessLinesCarousel treatment. Not used anywhere else in the UI.
     */
    accent?: string;
    /**
     * Background texture/photo shown behind `accent` on the detail hero
     * via mix-blend-overlay, same technique as BusinessLinesCarousel.
     */
    bgSrc?: string;
    /**
     * Optional external links, rendered as CTA buttons below the tagline
     * on the [slug] detail hero. Both are independent and optional —
     * render whichever is set, render neither if both are absent. All
     * values below are DUMMY placeholders per instruction; replace with
     * confirmed URLs before shipping search "DUMMY:" to find them.
     */
    website?: string;
    instagram?: string;
    gallery?: string[];
}

export const businessLines: BusinessLine[] = [
    {
        slug: "sport-teknologi-indonesia",
        name: "Sport Teknologi Indonesia",
        shortName: "Sport Teknologi Indonesia",
        category: "Sports Contractor",
        tagline: "Field of play, equipment, and event infrastructure built to competition standard.",
        summary:
            "STI is SGI's sports contracting arm, delivering field of play construction, sports equipment & technology, and event management as the official Laykold partner in Indonesia.",
        description: [
            "Sport Teknologi Indonesia (STI) operates as SGI's sports contractor, covering three core service areas: Field of Play construction, Equipment & Technology supply, and Event Management delivery.",
            "As the official Laykold partner in Indonesia, STI brings internationally certified surfacing systems to courts and pitches across the country, backed by in-house manufacturing capability.",
            "STI manufactures sports equipment at its facility in North Bekasi, giving the business line direct control over quality, lead time, and after-sales support for the venues and events it serves.",
        ],
        services: [
            "Field of Play construction & surfacing",
            "Sports equipment & technology supply",
            "Event management for sporting competitions",
            "Official Laykold surface installation",
            "In-house sports equipment manufacturing",
        ],
        location: "North Bekasi, West Java (manufacturing facility)",
        badges: ["Official Laykold Partner"],
        order: 1,
        logo: "/logos/sport-teknologi-indonesia.png",
        accent: "#630909",
        bgSrc: "/background/sti.png",
        // DUMMY: replace with confirmed URLs.
        website: "https://sportteknologi.id",
        instagram: "https://instagram.com/sportteknologi.id",
    },
    {
        slug: "playpro",
        name: "PlayPro",
        shortName: "PlayPro",
        category: "Sports Activity Platform",
        tagline: "One platform to play, book, and manage every sports activity.",
        summary:
            "PlayPro is SGI's sports activity management platform, spanning Games, Events, Courses, Venue booking, and Score tracking plus PlayPro GMS for venue operators.",
        description: [
            "PlayPro is a sports activity management platform built to bring players, venues, and organizers into one system.",
            "The platform is organized around five pillars: Play Games, Play Event, Play Course, Play Venue, and Play Score covering casual play, competitions, structured coaching, venue booking, and score tracking respectively.",
            "For venue owners and operators, PlayPro GMS (Ground Management System) provides the operational backbone: scheduling, bookings, and facility management in a single dashboard.",
        ],
        services: [
            "Play Games — casual & matchmaking sessions",
            "Play Event — tournament & event organization",
            "Play Course — structured coaching programs",
            "Play Venue — venue discovery & booking",
            "Play Score — live scoring & match tracking",
            "PlayPro GMS — ground/venue management system for operators",
        ],
        badges: ["Platform"],
        order: 2,
        logo: "/logos/playpro.png",
        accent: "#661b20",
        bgSrc: "/background/playpro.png",
        // DUMMY: replace with confirmed URLs.
        website: "https://playpro.id",
        instagram: "https://instagram.com/playpro.id",
    },
    {
        slug: "playpro-academy",
        name: "PlayPro Academy",
        shortName: "PlayPro Academy",
        category: "Youth Sports Academy",
        tagline: "Certified coaching for young athletes, from toddler to junior level.",
        summary:
            "PlayPro Academy is SGI's youth sports academy, running Toddler and Junior programs with certified coaches across five branch cities.",
        description: [
            "PlayPro Academy is SGI's youth-focused sports education business line, structured around two age-based tracks: the Toddler Program and the Junior Program.",
            "All coaching is delivered by certified coaches, with a curriculum designed to build fundamentals early and progress athletes through structured stages.",
            "The academy currently operates branches across Bekasi, Karawang, Bandung, Jakarta, and Tangerang, putting certified coaching within reach of families across Greater Jakarta and West Java.",
        ],
        services: [
            "Toddler Program",
            "Junior Program",
            "Certified coaching staff",
            "Branches in Bekasi, Karawang, Bandung, Jakarta & Tangerang",
        ],
        location: "Bekasi · Karawang · Bandung · Jakarta · Tangerang",
        badges: ["Certified Coaches"],
        order: 3,
        logo: "/logos/playpro-academy.png",
        accent: "#275466",
        bgSrc: "/background/ppa.png",
        // DUMMY: replace with confirmed URLs.
        website: "https://playproacademy.id",
        instagram: "https://instagram.com/playproacademy.id",
    },
    {
        slug: "playpro-sports-arena",
        name: "PlayPro Sports Arena",
        shortName: "PlayPro Sports Arena",
        category: "Sports Venue",
        tagline: "A Laykold-surfaced padel and tennis venue in North Bekasi.",
        summary:
            "PlayPro Sports Arena is SGI's own padel and tennis venue in North Bekasi, built on official Laykold surfacing.",
        description: [
            "PlayPro Sports Arena is a dedicated padel and tennis venue owned and operated by SGI in North Bekasi.",
            "The arena is built on Laykold surfacing, the same certified surface system STI installs for partner venues giving players a competition-grade court experience.",
            // DUMMY: courts / hours / booking replace with confirmed figures.
            "The venue currently runs 4 padel courts and 2 tennis courts, open daily from 06:00 to 23:00 WIB, with bookings made directly through the PlayPro app.",
        ],
        services: [
            "Padel courts (Laykold surface)",
            "Tennis courts (Laykold surface)",
            "Court booking via PlayPro platform",
        ],
        location: "North Bekasi, West Java",
        badges: ["Laykold Surface"],
        order: 4,
        logo: "/logos/playpro-sports-arena.png",
        accent: "#344e26",
        bgSrc: "/background/psa.png",
        // DUMMY: replace with confirmed URLs.
        website: "https://playprosportsarena.id",
        instagram: "https://instagram.com/playprosportsarena",
    },
    {
        slug: "lapanganpickle-id",
        name: "lapanganpickle.id",
        shortName: "lapanganpickle.id",
        category: "Pickleball Venue",
        tagline: "Indonesia's official Laykold pickleball partner, built to PPA US Open standard.",
        summary:
            "lapanganpickle.id is SGI's pickleball business line the official Laykold pickleball partner, with courts built to PPA US Open standard.",
        description: [
            "lapanganpickle.id is SGI's dedicated pickleball business line, formed as pickleball has grown rapidly as a participation sport.",
            "As the official Laykold pickleball partner, courts under this business line are built to PPA (Professional Pickleball Association) US Open standard.",
            // DUMMY: venue locations / court count / booking replace with confirmed figures.
            "The first venue is located in North Bekasi with 6 courts, and bookings can be made through the lapanganpickle.id website or the PlayPro app.",
        ],
        services: [
            "Pickleball court construction (Laykold surface)",
            "PPA US Open standard courts",
            "Court booking & venue access",
        ],
        location: "North Bekasi, West Java",
        badges: ["Official Laykold Pickleball Partner", "PPA US Open Standard"],
        order: 5,
        // NOTE: filename mismatch flagged for the user slug is
        // "lapanganpickle-id" but the confirmed logo file is
        // "lapangan-pickle.png" (hyphenated, no "-id" suffix).
        // Left as-is per instruction; not renamed silently.
        logo: "/logos/lapangan-pickle.png",
        accent: "#234135",
        bgSrc: "/background/lpid.png",
        // DUMMY: replace with confirmed URLs (the brand name doubles as a
        // plausible domain, but that has not been verified as live/correct).
        website: "https://lapanganpickle.id",
        instagram: "https://instagram.com/lapanganpickle.id",
    },
    {
        slug: "sport-growth-indonesia",
        name: "Sport Growth Indonesia",
        shortName: "Sport Growth Indonesia",
        category: "Sports Infrastructure Investment",
        tagline: "Investment partnership for underfunded sports venue owners.",
        summary:
            "Sport Growth Indonesia invests in sports infrastructure, partnering with underfunded venue owners to unlock growth.",
        description: [
            "Sport Growth Indonesia is SGI's investment arm, focused on sports infrastructure.",
            "The business line partners with venue owners who are underfunded, providing capital and operational support to bring facilities up to standard.",
            // DUMMY: investment model / ticket size / portfolio replace with confirmed figures.
            "Sport Growth Indonesia typically structures partnerships as revenue-sharing joint ventures, with ticket sizes ranging from IDR 500 million to IDR 5 billion per venue, and currently holds a portfolio of 3 partner venues across West Java.",
        ],
        services: [
            "Infrastructure investment for sports venues",
            "Partnership with underfunded venue owners",
            "Operational support post-investment",
        ],
        badges: ["Investment"],
        order: 6,
        logo: "/logos/sport-growth-indonesia.png",
        accent: "#376456",
        bgSrc: "/background/growth.png",
        // DUMMY: replace with confirmed URLs.
        website: "https://sportgrowth.id",
        instagram: "https://instagram.com/sportgrowth.indonesia",
    },
    {
        slug: "from-the-origin",
        name: "From The Origin",
        shortName: "From The Origin",
        category: "Sport Tourism",
        tagline: "Tailor-made sport travel corporate, community, and private journeys.",
        summary:
            "From The Origin (FTO) designs sport tourism experiences: tailor-made travel, corporate and community trips, private journeys, and concierge service.",
        description: [
            "From The Origin (FTO) is SGI's sport tourism business line, designing travel experiences built around sport.",
            "FTO's offerings span tailor-made travel itineraries, corporate and community group travel, fully private journeys, and dedicated concierge service throughout.",
            // DUMMY: destinations / itineraries / testimonials replace with confirmed content.
            "Signature journeys include padel retreats in Bali, marathon travel packages to Tokyo and Berlin, and corporate team-building trips to Yogyakarta, each paired with a dedicated concierge from planning through return.",
        ],
        services: [
            "Tailor-made travel itineraries",
            "Corporate travel programs",
            "Community group travel",
            "Private journeys",
            "Concierge service",
        ],
        badges: ["Sport Tourism"],
        order: 7,
        logo: "/logos/from-the-origin.png",
        accent: "#6e161c",
        bgSrc: "/background/fto.png",
        // DUMMY: replace with confirmed URLs.
        website: "https://fromtheorigin.id",
        instagram: "https://instagram.com/fromtheorigin.id",
    },
];

export function getBusinessLineBySlug(slug: string): BusinessLine | undefined {
    return businessLines.find((line) => line.slug === slug);
}

export function getAllBusinessLineSlugs(): string[] {
    return businessLines.map((line) => line.slug);
}