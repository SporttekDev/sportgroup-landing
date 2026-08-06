import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type ContactCTAVariant = "default" | "about" | "business-line" | "solution";

interface ContactCTASectionProps {
    variant?: ContactCTAVariant;
    /** Override the default heading/body for this variant if needed. */
    heading?: string;
    body?: string;
}

const VARIANT_COPY: Record<ContactCTAVariant, { heading: string; body: string }> = {
    default: {
        heading: "Let's build the next stage of Indonesian sport together.",
        body: "Whether you're a venue owner, organizer, or brand partner, our team is ready to talk through what you need.",
    },
    about: {
        heading: "Want to know more about how SGI operates?",
        body: "Reach out and we'll walk you through the business lines and solutions relevant to you.",
    },
    "business-line": {
        heading: "Looking to work with one of our business lines?",
        body: "Tell us which business line fits your need and our team will follow up directly.",
    },
    solution: {
        heading: "Interested in one of our solutions?",
        body: "Share your requirements and we'll help scope the right solution for your organization.",
    },
};

export function ContactCTASection({
    variant = "default",
    heading,
    body,
}: ContactCTASectionProps) {
    const copy = VARIANT_COPY[variant];

    return (
        <section className="bg-navy-900">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    <div className="max-w-xl">
                        <h2 className="font-display text-3xl font-semibold leading-display-safe tracking-tight text-white md:text-4xl">
                            {heading ?? copy.heading}
                        </h2>
                        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-navy-300">
                            {body ?? copy.body}
                        </p>
                    </div>
                    <Button
                        asChild
                        size="lg"
                        className="shrink-0 bg-white text-navy-900 hover:bg-navy-100"
                    >
                        <Link href="/contact" className="inline-flex items-center gap-2">
                            Contact Us
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}