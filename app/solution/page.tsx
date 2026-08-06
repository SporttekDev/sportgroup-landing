import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/motion/reveal";
import { SolutionGrid } from "@/components/solution-grid";
import { ContactCTASection } from "@/components/contact-cta-section";

export const metadata: Metadata = {
    title: "Solution | Sport Group Indonesia",
    description:
        "Cross-business-line solutions from Sport Group Indonesia, combining multiple business lines to solve a single partner need.",
};

export default function SolutionPage() {
    return (
        <>
            <section className="bg-white pt-24">
                <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                    <Breadcrumb items={[{ label: "Solution" }]} />
                    <Reveal mode="mount" className="mt-8 max-w-3xl">
                        <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                            Solution
                        </span>
                        <h1 className="mt-2 font-display text-4xl font-semibold leading-display-safe tracking-tighter text-navy-900 md:text-5xl">
                            Solutions that draw on the whole of SGI.
                        </h1>
                        <p className="mt-6 text-base leading-relaxed text-navy-500 md:text-lg">
                            Where a single business line isn&apos;t enough, our solutions combine capabilities across SGI to solve one problem end to end.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-start gap-3 rounded-lg border border-navy-200 bg-navy-50 px-4 py-3">
                    <span className="text-sm text-navy-600">
                        The solutions below are early drafts pending internal confirmation. Details marked{" "}
                        <span className="font-medium text-navy-900">[PLACEHOLDER]</span> will be finalized before launch.
                    </span>
                </div>
            </div> */}

            <SolutionGrid title="All Solutions" />

            <ContactCTASection variant="solution" />
        </>
    );
}