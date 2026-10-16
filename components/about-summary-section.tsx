import Link from "next/link";
import {
    Activity,
    ArrowRight,
    Building2,
    Compass,
    GraduationCap,
    HardHat,
    TrendingUp,
} from "lucide-react";

const focusAreas = [
    { icon: HardHat, label: "Sports contracting" },
    { icon: Activity, label: "Activity platforms" },
    { icon: GraduationCap, label: "Youth academies" },
    { icon: Building2, label: "Venues" },
    { icon: TrendingUp, label: "Infrastructure investment" },
    { icon: Compass, label: "Sport tourism" },
];

/* About summary + inline CTA */
export function AboutSummarySection() {
    return (
        <section className="relative isolate overflow-hidden border-t border-navy-100 bg-navy-50">
            {/* Subtle dot texture, fades out toward the bottom */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(var(--navy-200)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
            />

            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-16">
                    <div className="lg:col-span-1">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-navy-400">
                            About SGI
                        </span>
                        <h2 className="mt-3 text-balance font-display text-3xl font-semibold leading-display-safe tracking-tight text-navy-900">
                            One holding company, seven ways to grow sport.
                        </h2>
                    </div>

                    <div className="lg:col-span-2">
                        <p className="border-l-2 border-navy-900 pl-6 text-base leading-relaxed text-navy-600 md:text-lg md:leading-relaxed">
                            Sport Group Indonesia brings together sports contracting, activity
                            platforms, youth academies, venues, infrastructure investment, and
                            sport tourism under one holding company. Each business line
                            operates independently, connected by a shared standard for how
                            sport should be built and experienced in Indonesia.
                        </p>

                        <ul className="mt-6 flex flex-wrap gap-2">
                            {focusAreas.map(({ icon: Icon, label }) => (
                                <li
                                    key={label}
                                    className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-3.5 py-1.5 text-sm font-medium text-navy-700"
                                >
                                    <Icon className="h-4 w-4 text-navy-400" strokeWidth={1.75} />
                                    {label}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/about-us"
                            className="group mt-7 inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-5 py-2.5 text-sm font-medium text-navy-800 shadow-sm transition-colors hover:border-navy-800 hover:bg-navy-900 hover:text-white"
                        >
                            Learn more about SGI
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}