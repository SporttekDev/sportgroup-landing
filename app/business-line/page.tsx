import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BusinessLineGrid } from "@/components/business-line-grid";
import { ContactCTASection } from "@/components/contact-cta-section";
import { getBusinessLines } from "@/lib/cms/business-lines";

export const metadata: Metadata = {
    title: "Business Line | Sport Group Indonesia",
    description:
        "Explore Sport Group Indonesia's seven business lines: STI, PlayPro, PlayPro Academy, PlayPro Sports Arena, lapanganpickle.id, Sport Growth Indonesia, and From The Origin.",
};

export default async function BusinessLinePage() {
    const businessLines = await getBusinessLines();

    return (
        <>
            <PageHero
                breadcrumbItems={[{ label: "Business Line" }]}
                eyebrow="Business Line"
                title="Seven business lines, one ecosystem."
                description="From field of play construction to sport tourism, each SGI business line focuses on a distinct part of the sports value chain."
                imageSrc="/hero/business-line.png" // [PLACEHOLDER: replace with real photo]
                imageAlt="SGI business line operations"
            />

            <BusinessLineGrid
                title="All Business Lines"
                businessLines={businessLines}
            />

            <ContactCTASection variant="business-line" />
        </>
    );
}