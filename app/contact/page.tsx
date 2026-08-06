import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
    title: "Contact Us | Sport Group Indonesia",
    description:
        "Get in touch with Sport Group Indonesia, and reach out about our business lines, solutions, or partnership opportunities.",
};

const contactInfo = [
    {
        icon: MapPin,
        label: "Address",
        value: "[PLACEHOLDER: SGI head office address]",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "[PLACEHOLDER: phone number]",
    },
    {
        icon: Mail,
        label: "Email",
        value: "[PLACEHOLDER: email address]",
    },
    {
        icon: Clock,
        label: "Operating Hours",
        value: "[PLACEHOLDER: e.g. Mon–Fri, 09:00–17:00 WIB]",
    },
];

export default function ContactPage() {
    return (
        <>
            <section className="bg-white pt-24">
                <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                    <Reveal mode="mount">
                        <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                            Contact
                        </span>
                        <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-display-safe tracking-tighter text-navy-900 md:text-5xl">
                            Let&apos;s talk about your sport project.
                        </h1>
                        <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-navy-500 md:text-lg">
                            Fill out the form below and our team will get back to you, or reach us directly using the details on this page.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                    {/* Contact information */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            {contactInfo.map((item) => (
                                <div key={item.label} className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50">
                                        <item.icon className="h-4 w-4 text-navy-800" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium uppercase tracking-wide text-navy-400">
                                            {item.label}
                                        </div>
                                        <div className="mt-1 text-sm leading-relaxed text-navy-700">
                                            {item.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map placeholder */}
                        <div className="mt-8 flex aspect-video items-center justify-center rounded-xl border border-navy-100 bg-navy-50">
                            <span className="text-sm text-navy-400">
                                [PLACEHOLDER: embed map here]
                            </span>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-navy-100 p-6 sm:p-10">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Secondary CTA: distinct "social" intent from the form above, per brief */}
            <section className="bg-navy-900">
                <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center lg:px-8">
                    <div>
                        <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
                            Prefer to chat directly?
                        </h2>
                        <p className="mt-2 text-sm text-navy-300">
                            Reach our team on WhatsApp or follow SGI on social media.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="[PLACEHOLDER: WhatsApp link]"
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-navy-900 transition-colors hover:bg-navy-100"
                        >
                            <MessageCircle className="h-4 w-4" />
                            Chat on WhatsApp
                        </a>
                        <a
                            href="[PLACEHOLDER: Instagram link]"
                            className="inline-flex items-center gap-2 rounded-lg border border-navy-700 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-800"
                        >
                            @sportgroupindonesia
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}