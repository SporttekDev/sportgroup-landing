/**
 * Solution data for Sport Group Indonesia (SGI).
 *
 * IMPORTANT: "Solution" is distinct from "Business Line" — these are
 * cross-business-line service offerings, not a re-listing of the 7
 * business lines. All entries below are DRAFTS (isDraft: true) per the
 * brief and should be reviewed/replaced with confirmed offerings before
 * launch — see the [PLACEHOLDER: ...] markers.
 */

export interface Solution {
    slug: string;
    name: string;
    tagline: string;
    summary: string;
    description: string[];
    relatedBusinessLineSlugs: string[];
    exampleUseCase: string;
    isDraft: true;
    order: number;
}

export const solutions: Solution[] = [
    {
        slug: "venue-facility-consulting",
        name: "Venue & Facility Consulting",
        tagline: "Planning and technical guidance for sports venue owners and developers.",
        summary:
            "Advisory support for venue owners and developers — from feasibility and surface selection to operational readiness — drawing on SGI's contracting and venue-operating experience.",
        description: [
            "[PLACEHOLDER: DRAFT SOLUTION — pending confirmation.] Venue & Facility Consulting brings together SGI's experience as a sports contractor (STI) and venue operator (PlayPro Sports Arena, lapanganpickle.id) into an advisory service for third-party venue owners and developers.",
            "[PLACEHOLDER: scope of engagement — feasibility studies, surface/material selection, layout planning, compliance with sport-specific standards such as Laykold or PPA requirements].",
            "[PLACEHOLDER: engagement model — one-off consulting vs. retainer, typical project timeline].",
        ],
        relatedBusinessLineSlugs: ["sport-teknologi-indonesia", "sport-growth-indonesia"],
        exampleUseCase:
            "[PLACEHOLDER: example — a regional venue owner engaging SGI to assess an existing court for Laykold resurfacing and PPA-standard compliance].",
        isDraft: true,
        order: 1,
    },
    {
        slug: "end-to-end-event-management",
        name: "End-to-End Event Management",
        tagline: "Full-cycle delivery for sporting events, from field of play to matchday operations.",
        summary:
            "A combined offering spanning field-of-play construction, equipment supply, and live event operations — for organizers who need a single accountable partner.",
        description: [
            "[PLACEHOLDER: DRAFT SOLUTION — pending confirmation.] End-to-End Event Management packages STI's field-of-play and equipment capability together with PlayPro's Play Event and Play Score tools, giving organizers one point of contact from pre-event build to live scoring.",
            "[PLACEHOLDER: typical event types covered — corporate tournaments, community competitions, professional/certified matches].",
            "[PLACEHOLDER: what's included vs. what requires a separate quote].",
        ],
        relatedBusinessLineSlugs: ["sport-teknologi-indonesia", "playpro"],
        exampleUseCase:
            "[PLACEHOLDER: example — a corporate client engaging SGI to build a temporary field of play and run live scoring for an internal sports day].",
        isDraft: true,
        order: 2,
    },
    {
        slug: "corporate-sport-tourism-programs",
        name: "Corporate Sport Tourism Programs",
        tagline: "Sport-centered travel programs designed for companies and communities.",
        summary:
            "Structured travel programs built around sport for corporate teams and communities, combining From The Origin's tourism design with PlayPro's activity tools.",
        description: [
            "[PLACEHOLDER: DRAFT SOLUTION — pending confirmation.] Corporate Sport Tourism Programs adapt From The Origin's tailor-made and corporate travel offerings into structured, repeatable programs for companies and community groups.",
            "[PLACEHOLDER: program formats — multi-day retreats, single-destination trips, recurring community travel calendars].",
            "[PLACEHOLDER: group size ranges and lead-time requirements].",
        ],
        relatedBusinessLineSlugs: ["from-the-origin", "playpro"],
        exampleUseCase:
            "[PLACEHOLDER: example — a company booking a multi-day sport travel program for an internal team-building event].",
        isDraft: true,
        order: 3,
    },
    {
        slug: "sports-facility-digitalization",
        name: "Sports Facility Digitalization",
        tagline: "Bringing venue operations onto PlayPro GMS.",
        summary:
            "Helping independent venue owners digitize scheduling, booking, and facility management by onboarding onto PlayPro GMS.",
        description: [
            "[PLACEHOLDER: DRAFT SOLUTION — pending confirmation.] Sports Facility Digitalization is an onboarding service that brings independent, non-SGI venues onto the PlayPro GMS operating system used internally by SGI's own venues.",
            "[PLACEHOLDER: onboarding process — data migration, staff training, go-live support].",
            "[PLACEHOLDER: pricing model — subscription vs. one-time setup fee].",
        ],
        relatedBusinessLineSlugs: ["playpro", "sport-growth-indonesia"],
        exampleUseCase:
            "[PLACEHOLDER: example — an independent venue owner migrating from manual booking spreadsheets to PlayPro GMS].",
        isDraft: true,
        order: 4,
    },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
    return solutions.find((solution) => solution.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
    return solutions.map((solution) => solution.slug);
}