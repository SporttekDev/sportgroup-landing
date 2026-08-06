import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/motion/reveal";
import { QuoteBlock } from "@/components/quote-block";
import { BusinessLineGrid } from "@/components/business-line-grid";
import { JourneyTimeline } from "@/components/motion/journey-timeline";
import { ContactCTASection } from "@/components/contact-cta-section";

export const metadata: Metadata = {
    title: "About Us | Sport Group Indonesia",
    description:
        "Learn about Sport Group Indonesia's mission, vision, and the journey behind its seven sports-industry business lines.",
};

const journey = [
    {
        year: "2019",
        title: "Awal Berdiri",
        description:
            "Sport Group Indonesia didirikan dengan visi menghadirkan ekosistem olahraga yang terintegrasi, dimulai dari lini bisnis kontraktor infrastruktur olahraga.",
    },
    {
        year: "2020",
        title: "Ekspansi Lini Bisnis",
        description:
            "SGI mulai merambah ke sektor teknologi dan edukasi olahraga, memperluas jangkauan layanan untuk mendukung pengembangan talenta dan fasilitas olahraga di Indonesia.",
    },
    {
        year: "2021",
        title: "Pengembangan Venue & Fasilitas",
        description:
            "Peluncuran lini bisnis venue dan pengelolaan fasilitas olahraga, memperkuat akses masyarakat terhadap sarana olahraga berkualitas di berbagai daerah.",
    },
    {
        year: "2022",
        title: "Investasi & Pariwisata Olahraga",
        description:
            "SGI melengkapi tujuh lini bisnisnya dengan membuka peluang investasi dan pariwisata olahraga, menjadikan ekosistem olahraga nasional semakin berkelanjutan dan menyeluruh.",
    },
];

export default function AboutUsPage() {
    return (
        <>
            <section className="bg-white pt-24">
                <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                    <Breadcrumb items={[{ label: "About Us" }]} />
                    <Reveal mode="mount" className="mt-8 max-w-3xl">
                        <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                            About Us
                        </span>
                        <h1 className="mt-2 font-display text-4xl font-semibold leading-display-safe tracking-tighter text-navy-900 md:text-5xl">
                            A holding company built around one sport: growth.
                        </h1>
                        <p className="mt-6 text-base leading-relaxed text-navy-500 md:text-lg">
                            SGI operates across contracting, technology, education, venues, investment, and tourism, with every business line designed to strengthen a different part of Indonesia&apos;s sport ecosystem.
                        </p>
                    </Reveal>
                </div>
            </section>

            <QuoteBlock
                variant="quote"
                quote="Minimal resources, maximum impact. That&apos;s the SGI way."
                attribution="Yedi Risdianto"
                role="Founder & CEO"
            />

            {/* Visi Misi: kept as distinct sections, not merged.
                Labels are styled as badges (not uppercase-tracking eyebrows)
                to keep the page's eyebrow count within budget. */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
                    <div className="rounded-xl border border-navy-100 p-8">
                        <span className="inline-flex items-center rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700">
                            Visi
                        </span>
                        <h2 className="mt-3 font-display text-2xl font-semibold text-navy-900">
                            Menjadi ekosistem olahraga terintegrasi terdepan di Indonesia yang menghadirkan olahraga untuk semua.
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-navy-500">
                            Kami membangun rantai nilai olahraga secara menyeluruh, mulai dari infrastruktur, teknologi, edukasi, hingga pariwisata olahraga, agar semakin banyak masyarakat Indonesia dapat mengakses fasilitas dan pengalaman olahraga berkualitas. Melalui tujuh lini bisnis yang saling terhubung, SGI berupaya menjadi rujukan utama dalam pengembangan ekosistem olahraga nasional.
                        </p>
                    </div>
                    <div className="rounded-xl border border-navy-100 p-8">
                        <span className="inline-flex items-center rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700">
                            Misi
                        </span>
                        <h2 className="mt-3 font-display text-2xl font-semibold text-navy-900">
                            Menghubungkan infrastruktur, teknologi, dan talenta olahraga dalam satu ekosistem yang berkelanjutan.
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-navy-500">
                            SGI berkomitmen menghadirkan solusi infrastruktur dan teknologi olahraga yang andal, mengembangkan talenta melalui akademi dan program pembinaan, memperluas akses fasilitas olahraga bagi komunitas, serta membuka peluang investasi dan pariwisata olahraga yang berkelanjutan di seluruh Indonesia.
                        </p>
                    </div>
                </div>
            </section>

            <div className="border-t border-navy-100 bg-navy-50">
                <BusinessLineGrid
                    title="Seven business lines, one direction"
                    description="Each business line below plays a distinct role inside SGI's holding structure."
                    limit={3}
                    showViewAll
                />
            </div>

            {/* Jejak Langkah: scroll-animated timeline */}
            <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="text-center">
                    <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                        Our History
                    </span>
                    <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy-900 md:text-4xl">
                        Jejak Langkah
                    </h2>
                </div>

                <JourneyTimeline items={journey} />
            </section>

            <ContactCTASection variant="about" />
        </>
    );
}