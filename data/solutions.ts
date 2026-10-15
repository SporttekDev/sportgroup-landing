/**
 * Solution data for Sport Group Indonesia (SGI).
 *
 * IMPORTANT: "Solution" is distinct from "Business Line" — these are
 * cross-business-line service offerings, not a re-listing of the 7
 * business lines. All entries below are DRAFTS (isDraft: true) per the
 * brief. The former [PLACEHOLDER: ...] markers have been filled with
 * DUMMY content for development purposes — search "DUMMY:" to find
 * them, and replace with confirmed offerings before launch.
 */

export interface Solution {
    slug: string;
    name: string;
    tagline: string;
    summary: string;
    description: string[];
    /** HTML bersih dari CMS; jika ada, dipakai menggantikan description. */
    descriptionHtml?: string;
    relatedBusinessLineSlugs: string[];
    exampleUseCase: string;
    isDraft: boolean;
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
            // DUMMY (draft solution, pending confirmation)
            "Venue & Facility Consulting brings together SGI's experience as a sports contractor (STI) and venue operator (PlayPro Sports Arena, lapanganpickle.id) into an advisory service for third-party venue owners and developers.",
            "Engagements typically cover feasibility studies, surface and material selection, layout planning, and compliance with sport-specific standards such as Laykold or PPA requirements.",
            "SGI offers both one-off consulting engagements for a single assessment and retainer arrangements for ongoing advisory support, with typical projects running 4–12 weeks depending on scope.",
        ],
        relatedBusinessLineSlugs: ["sport-teknologi-indonesia", "sport-growth-indonesia"],
        exampleUseCase:
            "A regional venue owner engages SGI to assess an existing court for Laykold resurfacing and PPA-standard compliance ahead of a planned upgrade.",
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
            // DUMMY (draft solution, pending confirmation)
            "End-to-End Event Management packages STI's field-of-play and equipment capability together with PlayPro's Play Event and Play Score tools, giving organizers one point of contact from pre-event build to live scoring.",
            "Typical event types covered include corporate tournaments, community competitions, and professional or certified matches requiring standard-compliant surfaces.",
            "Field-of-play construction, equipment supply, and live scoring are included as standard; catering, broadcast, and travel logistics are quoted separately per event.",
        ],
        relatedBusinessLineSlugs: ["sport-teknologi-indonesia", "playpro"],
        exampleUseCase:
            "A corporate client engages SGI to build a temporary field of play and run live scoring for an internal sports day.",
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
            // DUMMY (draft solution, pending confirmation)
            "Corporate Sport Tourism Programs adapt From The Origin's tailor-made and corporate travel offerings into structured, repeatable programs for companies and community groups.",
            "Program formats range from multi-day retreats and single-destination trips to recurring community travel calendars run on a quarterly or annual basis.",
            "Programs are typically designed for groups of 10–100 participants, with a recommended lead time of at least 6 weeks for planning and logistics.",
        ],
        relatedBusinessLineSlugs: ["from-the-origin", "playpro"],
        exampleUseCase:
            "A company books a multi-day sport travel program for an internal team-building event.",
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
            // DUMMY (draft solution, pending confirmation)
            "Sports Facility Digitalization is an onboarding service that brings independent, non-SGI venues onto the PlayPro GMS operating system used internally by SGI's own venues.",
            "The onboarding process covers data migration from existing booking systems, staff training on the GMS dashboard, and hands-on go-live support during the first weeks of use.",
            "Pricing follows a monthly subscription model based on venue size, with an optional one-time setup fee for data migration and staff training.",
        ],
        relatedBusinessLineSlugs: ["playpro", "sport-growth-indonesia"],
        exampleUseCase:
            "An independent venue owner migrates from manual booking spreadsheets to PlayPro GMS.",
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