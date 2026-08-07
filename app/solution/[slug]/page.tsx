import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/motion/reveal";
import { ContactCTASection } from "@/components/contact-cta-section";
import {
    getSolutionBySlug,
    getAllSolutionSlugs,
} from "@/data/solutions";
import { businessLines } from "@/data/business-lines";

interface SolutionDetailPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return getAllSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: SolutionDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const solution = getSolutionBySlug(slug);

    if (!solution) {
        return { title: "Solution Not Found | Sport Group Indonesia" };
    }

    return {
        title: `${solution.name} | Sport Group Indonesia`,
        description: solution.summary,
    };
}

export default async function SolutionDetailPage({
    params,
}: SolutionDetailPageProps) {
    const { slug } = await params;
    const solution = getSolutionBySlug(slug);

    if (!solution) {
        notFound();
    }

    const relatedBusinessLines = businessLines
        .filter((line) => solution.relatedBusinessLineSlugs.includes(line.slug))
        .sort((a, b) => a.order - b.order);

    return (
        <>
            {/* Dedicated hero */}
            <section className="relative overflow-hidden bg-navy-900 pt-24">
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 85% 20%, white 1.5px, transparent 1.5px)",
                        backgroundSize: "26px 26px",
                    }}
                    aria-hidden
                />
                <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                    <Breadcrumb
                        variant="dark"
                        items={[
                            { label: "Solution", href: "/solution" },
                            { label: solution.name },
                        ]}
                    />

                    <Reveal mode="mount" className="mt-8 max-w-3xl">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                                <Lightbulb className="h-6 w-6 text-white" strokeWidth={1.5} />
                            </div>
                            {solution.isDraft && (
                                <Badge variant="outline" className="border-navy-500 text-navy-200">
                                    Draft Solution
                                </Badge>
                            )}
                        </div>
                        <h1 className="mt-6 font-display text-4xl font-semibold leading-display-safe tracking-tighter text-white md:text-5xl">
                            {solution.name}
                        </h1>
                        <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-navy-300 md:text-lg">
                            {solution.tagline}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Full description */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                    <div className="lg:col-span-2">
                        <h2 className="font-display text-2xl font-semibold text-navy-900">
                            Overview
                        </h2>
                        <div className="mt-4 space-y-4">
                            {solution.description.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="text-base leading-relaxed text-navy-600"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Example use case */}
                        <div className="mt-10 rounded-xl border border-navy-100 bg-navy-50 p-6">
                            <h3 className="font-display text-lg font-semibold text-navy-900">
                                Example Use Case
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-navy-600">
                                {solution.exampleUseCase}
                            </p>
                        </div>
                    </div>

                    {/* Related business lines */}
                    <div className="lg:col-span-1">
                        <div className="rounded-xl border border-navy-100 p-6">
                            <h3 className="font-display text-lg font-semibold text-navy-900">
                                Related Business Lines
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {relatedBusinessLines.map((line) => (
                                    <li key={line.slug}>
                                        <Link
                                            href={`/business-line/${line.slug}`}
                                            className="group flex items-center justify-between rounded-lg border border-navy-100 px-4 py-3 transition-colors hover:border-navy-300"
                                        >
                                            <div>
                                                <div className="text-sm font-medium text-navy-900">
                                                    {line.shortName}
                                                </div>
                                                <div className="text-xs text-navy-400">
                                                    {line.category}
                                                </div>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-navy-400 transition-transform group-hover:translate-x-1 group-hover:text-navy-800" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <ContactCTASection
                variant="solution"
                heading={`Want to explore ${solution.name}?`}
                body="This is a draft offering — reach out and we'll help scope what a real engagement would look like."
            />
        </>
    );
}