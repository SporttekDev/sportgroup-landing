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

/**
 * Single flexible block covering the "Quote-or-Statistics" section referenced
 * in the page structure. No statistics or quotes are fabricated here — callers
 * must pass real copy or [PLACEHOLDER: ...] markers.
 */
export function QuoteBlock(props: QuoteBlockProps) {
    if (props.variant === "quote") {
        return (
            <section className="bg-navy-50">
                <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
                    <Quote className="mx-auto h-8 w-8 text-navy-300" strokeWidth={1.5} />
                    <blockquote className="mt-6 font-display text-2xl font-medium leading-relaxed text-navy-900 md:text-3xl">
                        &ldquo;{props.quote}&rdquo;
                    </blockquote>
                    <p className="mt-6 text-sm font-medium text-navy-500">
                        {props.attribution}
                        {props.role && (
                            <span className="text-navy-400"> · {props.role}</span>
                        )}
                    </p>
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