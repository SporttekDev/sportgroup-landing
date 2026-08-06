import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/motion/reveal";
import { QuoteBlock } from "@/components/quote-block";
import { BusinessLineGrid } from "@/components/business-line-grid";
import { ContactCTASection } from "@/components/contact-cta-section";

export const metadata: Metadata = {
    title: "Business Line | Sport Group Indonesia",
    description:
        "Explore Sport Group Indonesia's seven business lines: STI, PlayPro, PlayPro Academy, PlayPro Sports Arena, lapanganpickle.id, Sport Growth Indonesia, and From The Origin.",
};

export default function BusinessLinePage() {
    return (
        <>
            <section className="bg-white pt-24">
                <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                    <Breadcrumb items={[{ label: "Business Line" }]} />
                    <Reveal mode="mount" className="mt-8 max-w-3xl">
                        <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                            Business Line
                        </span>
                        <h1 className="mt-2 font-display text-4xl font-semibold leading-display-safe tracking-tighter text-navy-900 md:text-5xl">
                            Seven business lines, one ecosystem.
                        </h1>
                        <p className="mt-6 text-base leading-relaxed text-navy-500 md:text-lg">
                            From field of play construction to sport tourism, each SGI business line focuses on a distinct part of the sports value chain.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* <QuoteBlock
                variant="stats"
                stats={[
                    { value: "7", label: "Business Lines" },
                    { value: "[PLACEHOLDER]", label: "Branches Nationwide" },
                    { value: "[PLACEHOLDER]", label: "Years of Operation" },
                    { value: "[PLACEHOLDER]", label: "Athletes Reached" },
                ]}
            /> */}

            <BusinessLineGrid title="All Business Lines" />

            <ContactCTASection variant="business-line" />
        </>
    );
}