import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowRight,
    CheckCircle2,
    Hammer,
    Smartphone,
    GraduationCap,
    Trophy,
    CircleDot,
    TrendingUp,
    Plane,
    MapPin,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/motion/reveal";
import { ContactCTASection } from "@/components/contact-cta-section";
import {
    businessLines,
    getBusinessLineBySlug,
    getAllBusinessLineSlugs,
} from "@/data/business-lines";

const CATEGORY_ICON: Record<string, LucideIcon> = {
    "sport-teknologi-indonesia": Hammer,
    playpro: Smartphone,
    "playpro-academy": GraduationCap,
    "playpro-sports-arena": Trophy,
    "lapanganpickle-id": CircleDot,
    "sport-growth-indonesia": TrendingUp,
    "from-the-origin": Plane,
};

interface BusinessLineDetailPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return getAllBusinessLineSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: BusinessLineDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const businessLine = getBusinessLineBySlug(slug);

    if (!businessLine) {
        return { title: "Business Line Not Found | Sport Group Indonesia" };
    }

    return {
        title: `${businessLine.name} | Sport Group Indonesia`,
        description: businessLine.summary,
    };
}

export default async function BusinessLineDetailPage({
    params,
}: BusinessLineDetailPageProps) {
    const { slug } = await params;
    const businessLine = getBusinessLineBySlug(slug);

    if (!businessLine) {
        notFound();
    }

    const Icon = CATEGORY_ICON[businessLine.slug] ?? Hammer;

    // Themed hero is a deliberate, scoped exception to the site's single
    // navy accent system (mirrors BusinessLinesCarousel). Entries without
    // both `accent` and `bgSrc` fall back to the original navy + dot-pattern
    // hero so the page never breaks on missing theme data.
    const hasTheme = Boolean(businessLine.accent && businessLine.bgSrc);

    const otherLines = businessLines
        .filter((line) => line.slug !== businessLine.slug)
        .sort((a, b) => a.order - b.order)
        .slice(0, 3);

    return (
        <>
            {/* Dedicated hero — themed per business line when accent/bgSrc exist */}
            <section
                className={cn(
                    "relative overflow-hidden pt-24",
                    !hasTheme && "bg-navy-900"
                )}
                style={hasTheme ? { backgroundColor: businessLine.accent } : undefined}
            >
                {hasTheme ? (
                    <>
                        <div className="absolute inset-0 mix-blend-overlay" aria-hidden>
                            <Image
                                src={businessLine.bgSrc as string}
                                alt=""
                                fill
                                priority
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black/20" aria-hidden />
                    </>
                ) : (
                    <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 15% 25%, white 1.5px, transparent 1.5px)",
                            backgroundSize: "26px 26px",
                        }}
                        aria-hidden
                    />
                )}

                <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                    <Breadcrumb
                        variant="dark"
                        items={[
                            { label: "Business Line", href: "/business-line" },
                            { label: businessLine.shortName },
                        ]}
                    />

                    <Reveal mode="mount" className="mt-8 grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_auto]">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                                    {businessLine.logo ? (
                                        <Image
                                            src={businessLine.logo}
                                            alt={businessLine.name}
                                            width={40}
                                            height={40}
                                            className="h-8 w-8 object-contain"
                                        />
                                    ) : (
                                        <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                                    )}
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
                                    {businessLine.category}
                                </span>
                            </div>
                            <h1 className="mt-6 font-display text-4xl font-semibold leading-display-safe tracking-tighter text-white md:text-5xl">
                                {businessLine.name}
                            </h1>
                            <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-white/80 md:text-lg">
                                {businessLine.tagline}
                            </p>

                            {businessLine.badges && businessLine.badges.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {businessLine.badges.map((badge) => (
                                        <Badge
                                            key={badge}
                                            variant="outline"
                                            className="border-white/25 bg-white/10 text-white/85 backdrop-blur-md"
                                        >
                                            {badge}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        {businessLine.location && (
                            <div className="flex items-start gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-sm text-white/85 backdrop-blur-md lg:max-w-xs">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>{businessLine.location}</span>
                            </div>
                        )}
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
                            {businessLine.description.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="text-base leading-relaxed text-navy-600"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Services list */}
                    <div className="lg:col-span-1">
                        <div className="rounded-xl border border-navy-100 p-6">
                            <h3 className="font-display text-lg font-semibold text-navy-900">
                                Services & Programs
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {businessLine.services.map((service) => (
                                    <li key={service} className="flex items-start gap-2.5">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-navy-800" />
                                        <span className="text-sm leading-relaxed text-navy-600">
                                            {service}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery — explicit pending-asset empty state (not a finished
                gallery). Dashed border + per-slot label signal "awaiting real
                photography" rather than reading as a broken finished component. */}
            <section className="border-t border-navy-100 bg-navy-50">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <h2 className="font-display text-2xl font-semibold text-navy-900">
                        Gallery
                    </h2>
                    <p className="mt-2 text-sm text-navy-500">
                        [PLACEHOLDER: replace with real {businessLine.name} facility / activity photography]
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-navy-200 bg-white"
                            >
                                {businessLine.logo ? (
                                    <Image
                                        src={businessLine.logo}
                                        alt={businessLine.name}
                                        width={64}
                                        height={64}
                                        className="h-8 w-8 object-contain opacity-60"
                                    />
                                ) : (
                                    <Icon className="h-8 w-8 text-navy-200" strokeWidth={1.5} />
                                )}
                                <span className="text-[11px] font-medium text-navy-300">
                                    Photo slot {index + 1}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related business lines */}
            {otherLines.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between">
                        <h2 className="font-display text-2xl font-semibold text-navy-900">
                            Other Business Lines
                        </h2>
                        <Link
                            href="/business-line"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-800 hover:text-navy-600"
                        >
                            View All
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {otherLines.map((line) => (
                            <Link
                                key={line.slug}
                                href={`/business-line/${line.slug}`}
                                className="group rounded-xl border border-navy-100 p-5 transition-colors hover:border-navy-300"
                            >
                                <span className="text-xs font-medium uppercase tracking-wide text-navy-400">
                                    {line.category}
                                </span>
                                <h3 className="mt-1.5 font-display text-base font-semibold text-navy-900">
                                    {line.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <ContactCTASection
                variant="business-line"
                heading={`Interested in working with ${businessLine.shortName}?`}
                body="Tell us about your project and our team will follow up directly."
            />
        </>
    );
}