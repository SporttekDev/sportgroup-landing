import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { QuoteBlock } from "@/components/quote-block";
import { BusinessLineGrid } from "@/components/business-line-grid";
import { JourneyTimeline } from "@/components/motion/journey-timeline";
import { ContactCTASection } from "@/components/contact-cta-section";

export const metadata: Metadata = {
    title: "About Us | Sport Group Indonesia",
    description:
        "Learn about Sport Group Indonesia's mission, vision, and the journey behind its seven sports-industry business lines.",
};

const journey = [
    {
        year: "2019",
        title: "Company Founded",
        description:
            "Sport Group Indonesia was established with the vision of creating an integrated sports ecosystem, beginning with its sports infrastructure contracting business.",
    },
    {
        year: "2020",
        title: "Business Expansion",
        description:
            "SGI expanded into sports technology and sports education, broadening its range of services to support talent development and sports facilities across Indonesia.",
    },
    {
        year: "2021",
        title: "Venue & Facility Development",
        description:
            "SGI launched its venue and sports facility management business, strengthening public access to high-quality sports facilities across various regions of Indonesia.",
    },
    {
        year: "2022",
        title: "Sports Investment & Tourism",
        description:
            "SGI completed its seven integrated business lines by introducing sports investment and sports tourism, creating a more comprehensive and sustainable national sports ecosystem.",
    },
];


export default function AboutUsPage() {
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
                quote="Minimal resources, maximum impact. That&apos;s the SGI way."
                attribution="Yedi Risdianto"
                role="Founder & CEO"
            />

            {/* Visi Misi: kept as distinct sections, not merged.
                Labels are styled as badges (not uppercase-tracking eyebrows)
                to keep the page's eyebrow count within budget. */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
                    <div className="rounded-xl border border-navy-100 p-8">
                        <span className="inline-flex items-center rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700">
                            Vision
                        </span>
                        <h2 className="mt-3 font-display text-2xl font-semibold text-navy-900">
                            To become Indonesia’s leading integrated sports ecosystem that brings sports to everyone.
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-navy-500">
                            We are building the sports value chain holistically, from infrastructure and technology to education and sports tourism, so that more Indonesians can access quality sports facilities and experiences. Through seven interconnected business lines, SGI strives to become a key reference in the development of Indonesia’s national sports ecosystem.
                        </p>
                    </div>
                    <div className="rounded-xl border border-navy-100 p-8">
                        <span className="inline-flex items-center rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700">
                            Mission
                        </span>
                        <h2 className="mt-3 font-display text-2xl font-semibold text-navy-900">
                            To connect sports infrastructure, technology, and talent within one sustainable ecosystem.
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-navy-500">
                            SGI is committed to delivering reliable sports infrastructure and technology solutions, developing talent through academies and training programs, expanding access to sports facilities for communities, and creating sustainable sports investment and tourism opportunities across Indonesia.
                        </p>
                    </div>
                </div>
            </section>


            <div className="border-t border-navy-100 bg-navy-50">
                <BusinessLineGrid
                    title="Seven business lines, one direction"
                    description="Each business line below plays a distinct role inside SGI's holding structure."
                    limit={3}
                    showViewAll
                />
            </div>

            {/* Jejak Langkah: scroll-animated timeline */}
            <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="text-center">
                    <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                        Our History
                    </span>
                    <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy-900 md:text-4xl">
                        Track Record
                    </h2>
                </div>

                <JourneyTimeline items={journey} />
            </section>

            <ContactCTASection variant="about" />
        </>
    );
}