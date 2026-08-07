import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
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
        value: "Jl. Jenderal Sudirman Kav. 52-53, Jakarta Selatan 12190, Indonesia",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+62 21 5140 1234",
    },
    {
        icon: Mail,
        label: "Email",
        value: "info@sportgroupindonesia.com",
    },
    {
        icon: Clock,
        label: "Operating Hours",
        value: "Mon–Fri, 09:00–17:00 WIB",
    },
];

export default function ContactPage() {
    return (
        <>
            <PageHero
                breadcrumbItems={[{ label: "Contact" }]}
                eyebrow="Contact"
                title="Let's talk about your sport project."
                description="Fill out the form below and our team will get back to you, or reach us directly using the details on this page."
                imageSrc="/hero/contact.png" // [PLACEHOLDER: replace with real photo]
                imageAlt="Sport Group Indonesia office"
            />

            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
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

                        {/* Map embed (dummy location: Jakarta Selatan) */}
                        <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-navy-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.276!2d106.8195!3d-6.2244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMjcuOSJTIDEwNsKwNDknMTAuMiJF!5e0!3m2!1sen!2sid!4v1000000000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Sport Group Indonesia office location"
                            />
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
                            href="https://wa.me/6281234567890"
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-navy-900 transition-colors hover:bg-navy-100"
                        >
                            <MessageCircle className="h-4 w-4" />
                            Chat on WhatsApp
                        </a>
                        <a
                            href="https://instagram.com/sportgroupindonesia"
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