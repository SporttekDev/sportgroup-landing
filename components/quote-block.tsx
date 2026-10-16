import { Quote } from "lucide-react";

interface QuoteVariant {
    variant: "quote";
    quote: string;
    attribution: string;
    role?: string;
}

interface Stat {
    value: string;
    label: string;
}

interface StatsVariant {
    variant: "stats";
    stats: Stat[];
}

type QuoteBlockProps = QuoteVariant | StatsVariant;

function getInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

/**
 * Single flexible block covering the "Quote-or-Statistics" section referenced
 * in the page structure. No statistics or quotes are fabricated here — callers
 * must pass real copy or [PLACEHOLDER: ...] markers.
 */
export function QuoteBlock(props: QuoteBlockProps) {
    if (props.variant === "quote") {
        return (
            <section className="relative isolate overflow-hidden border-b border-navy-100 bg-navy-50">
                {/* Oversized decorative glyph */}
                <Quote
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 -z-10 h-56 w-56 -translate-x-1/2 text-navy-100 md:h-72 md:w-72"
                    fill="currentColor"
                    strokeWidth={0}
                />

                <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
                    <blockquote className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-navy-900 md:text-5xl md:leading-[1.15]">
                        &ldquo;{props.quote}&rdquo;
                    </blockquote>

                    <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-navy-100 bg-white py-2 pl-2 pr-5 shadow-sm">
                        <span
                            aria-hidden
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-white"
                        >
                            {getInitials(props.attribution)}
                        </span>
                        <span className="text-left">
                            <span className="block text-sm font-semibold leading-tight text-navy-900">
                                {props.attribution}
                            </span>
                            {props.role && (
                                <span className="block text-xs text-navy-500">
                                    {props.role}
                                </span>
                            )}
                        </span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-navy-50">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div
                    className="grid grid-cols-2 gap-8 md:grid-cols-4"
                    role="list"
                >
                    {props.stats.map((stat) => (
                        <div key={stat.label} role="listitem" className="text-center">
                            <div className="font-display text-3xl font-semibold text-navy-900 md:text-4xl">
                                {stat.value}
                            </div>
                            <div className="mt-2 text-sm text-navy-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}