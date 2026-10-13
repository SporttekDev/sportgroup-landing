import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SolutionGrid } from "@/components/solution-grid";
import { ContactCTASection } from "@/components/contact-cta-section";
import { getSolutions } from "@/lib/cms/solutions";

export const metadata: Metadata = {
    title: "Solution | Sport Group Indonesia",
    description:
        "Cross-business-line solutions from Sport Group Indonesia, combining multiple business lines to solve a single partner need.",
};

export default async function SolutionPage() {
    const solutions = await getSolutions();

    return (
        <>
            <PageHero
                breadcrumbItems={[{ label: "Solution" }]}
                eyebrow="Solution"
                title="Solutions that draw on the whole of SGI."
                description="Where a single business line isn't enough, our solutions combine capabilities across SGI to solve one problem end to end."
                imageSrc="/hero/solution.png" // [PLACEHOLDER: replace with real photo]
                imageAlt="SGI cross-business solutions"
            />

            {/* <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
                <div className="flex items-start gap-3 rounded-lg border border-navy-200 bg-navy-50 px-4 py-3">
                    <span className="text-sm text-navy-600">
                        The solutions below are early drafts pending internal confirmation. Details marked{" "}
                        <span className="font-medium text-navy-900">[PLACEHOLDER]</span> will be finalized before launch.
                    </span>
                </div>
            </div> */}

            <SolutionGrid title="All Solutions" solutions={solutions} />

            <ContactCTASection variant="solution" />
        </>
    );
}