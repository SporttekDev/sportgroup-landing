import type { Metadata } from "next";
import { Eye, Target } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { QuoteBlock } from "@/components/quote-block";
import { BusinessLineGrid } from "@/components/business-line-grid";
import { MilestonesTimeline } from "@/components/motion/milestones-timeline";
import { ContactCTASection } from "@/components/contact-cta-section";
import { getBusinessLines } from "@/lib/cms/business-lines";
import { BusinessLineWeb } from "@/components/business-line-web";

export const metadata: Metadata = {
    title: "About Us | Sport Group Indonesia",
    description:
        "Learn about Sport Group Indonesia's mission, vision, and the journey behind its seven sports-industry business lines.",
};

const milestones = [
    {
        year: "2018",
        title: "Foundation",
        description:
            "Sport Teknologi Indonesia was founded with a vision to deliver modern, functional, and high-standard sports solutions for the Indonesian market.",
    },
    {
        year: "2019",
        title: "First Projects",
        description:
            "Initiated the development and construction of sports facilities for commercial and institutional sectors.",
    },
    {
        year: "2020",
        title: "Technology Adaptation",
        description:
            "Adopted technology-driven approaches and more efficient systems to respond to the evolving challenges of the sports industry.",
    },
    {
        year: "2021",
        title: "Product & Service Expansion",
        description:
            "Expanded products and services, covering sports facility planning, development, and maintenance solutions.",
    },
    {
        year: "2022",
        title: "PlayPro Established",
        description:
            "Offering technology solutions for sports event management, venue booking, and online/offline sports classes.",
    },
    {
        year: "2023",
        title: "Event Management",
        description:
            "PlayPro supported various championships, including the \u201C2023 Merdeka Tennis Championship\u201D.",
    },
    {
        year: "2024",
        title: "Facility Construction",
        description:
            "Involved in the construction of international-standard sports facilities. A world-class tennis court was built at the Playpro Sports Arena in Bekasi.",
    },
    {
        year: "2025",
        title: "Continuous Innovation",
        description:
            "Transformed into a technology-driven sports company, ready to meet the future needs of the sports industry.",
    },
    {
        year: "2026",
        title: "Established Sport Group",
        description:
            "The culmination of a transformative evolution that unites all the foundations of the journey into one force evolving into an elite Sport Group powered by groundbreaking innovation to answer the challenges of the future.",
    },
];

export default async function AboutUsPage() {
    const businessLines = await getBusinessLines();

    return (
        <>
            <PageHero
                breadcrumbItems={[{ label: "About Us" }]}
                eyebrow="About Us"
                title="A holding company built around one sport: growth."
                description="SGI operates across contracting, technology, education, venues, investment, and tourism, with every business line designed to strengthen a different part of Indonesia's sport ecosystem."
                imageSrc="/hero/about-us.png" // [PLACEHOLDER: replace with real photo]
                imageAlt="SGI team and facilities"
            />

            <QuoteBlock
                variant="quote"
                quote="Sport has the power to change the world."
                attribution="Nelson Mandela"
                role="Laureus World Sports Awards, 2000"
            />

            {/* Vision & Mission: kept as distinct cards, not merged.
                Vision is dark (anchor), Mission is light (counterweight). */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                    {/* Vision */}
                    <article className="group relative isolate overflow-hidden rounded-2xl bg-navy-900 p-8 text-white md:p-10">
                        <span
                            aria-hidden
                            className="pointer-events-none absolute -right-2 -top-6 font-display text-[9rem] font-semibold leading-none text-white/5"
                        >
                            01
                        </span>
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -bottom-16 -left-16 -z-10 h-48 w-48 rounded-full bg-navy-500/30 blur-3xl"
                        />

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                            <Eye className="h-6 w-6" strokeWidth={1.5} />
                        </div>
                        <span className="mt-8 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-navy-100">
                            Vision
                        </span>
                        <h2 className="mt-4 text-balance font-display text-2xl font-semibold leading-snug md:text-3xl">
                            To become Indonesia&rsquo;s leading integrated sports ecosystem that brings sports to everyone.
                        </h2>
                        <p className="mt-5 text-sm leading-relaxed text-navy-200 md:text-base">
                            We are building the sports value chain holistically, from infrastructure and technology to education and sports tourism, so that more Indonesians can access quality sports facilities and experiences. Through seven interconnected business lines, SGI strives to become a key reference in the development of Indonesia&rsquo;s national sports ecosystem.
                        </p>
                    </article>

                    {/* Mission */}
                    <article className="group relative isolate overflow-hidden rounded-2xl border border-navy-100 bg-navy-50 p-8 text-navy-900 md:p-10">
                        <span
                            aria-hidden
                            className="pointer-events-none absolute -right-2 -top-6 font-display text-[9rem] font-semibold leading-none text-navy-900/5"
                        >
                            02
                        </span>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white">
                            <Target className="h-6 w-6" strokeWidth={1.5} />
                        </div>
                        <span className="mt-8 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-700 ring-1 ring-navy-100">
                            Mission
                        </span>
                        <h2 className="mt-4 text-balance font-display text-2xl font-semibold leading-snug md:text-3xl">
                            To connect sports infrastructure, technology, and talent within one sustainable ecosystem.
                        </h2>
                        <p className="mt-5 text-sm leading-relaxed text-navy-500 md:text-base">
                            SGI is committed to delivering reliable sports infrastructure and technology solutions, developing talent through academies and training programs, expanding access to sports facilities for communities, and creating sustainable sports investment and tourism opportunities across Indonesia.
                        </p>
                    </article>
                </div>
            </section>

            <div className="border-t border-navy-100 bg-navy-50">
                <BusinessLineWeb businessLines={businessLines} showViewAll />
            </div>

            {/* Milestones */}
            <section className="relative isolate overflow-hidden py-20">
                {/* Dekorasi kiri */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-[max(0px,calc(50%-36rem))] items-center justify-center lg:flex"
                >
                    <div className="flex flex-col items-center gap-6">
                        <span className="h-28 w-px bg-linear-to-b from-transparent to-navy-200" />
                        <span className="rotate-180 font-display text-7xl font-semibold text-navy-900/[0.06] [writing-mode:vertical-rl]">
                            2018
                        </span>
                        <span className="rotate-180 text-[10px] font-semibold uppercase tracking-[0.3em] text-navy-400 [writing-mode:vertical-rl]">
                            The Beginning
                        </span>
                        <span className="h-28 w-px bg-linear-to-t from-transparent to-navy-200" />
                    </div>
                </div>

                {/* Dekorasi kanan */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[max(0px,calc(50%-36rem))] items-center justify-center lg:flex"
                >
                    <div className="flex flex-col items-center gap-6">
                        <span className="h-28 w-px bg-linear-to-b from-transparent to-navy-200" />
                        <span className="font-display text-7xl font-semibold text-navy-900/[0.06] [writing-mode:vertical-rl]">
                            2026
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-navy-400 [writing-mode:vertical-rl]">
                            Still on Going
                        </span>
                        <span className="h-28 w-px bg-linear-to-t from-transparent to-navy-200" />
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                            Our History
                        </span>
                        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy-900 md:text-4xl">
                            Milestones
                        </h2>
                    </div>

                    <MilestonesTimeline items={milestones} />
                </div>
            </section>

            <ContactCTASection variant="about" />
        </>
    );
}