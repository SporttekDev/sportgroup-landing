import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BusinessLineGrid } from "@/components/business-line-grid";
import { SolutionGrid } from "@/components/solution-grid";
import { ContactCTASection } from "@/components/contact-cta-section";
import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { BusinessLineCarousel } from "@/components/business-line-carousel";

export const metadata: Metadata = {
  title: "Sport Group Indonesia | Building the Future of Indonesian Sport",
  description:
    "Sport Group Indonesia (SGI) is a sports-industry holding company spanning contracting, technology platforms, academies, venues, investment, and sport tourism.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero — split layout, anti-center-bias */}
      <section className="relative overflow-hidden bg-white pt-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-28">
          <Reveal mode="mount">
            <span className="inline-flex items-center rounded-full border border-navy-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-navy-500">
              Sports Industry Holding Company
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-display-safe tracking-tighter text-navy-900 md:text-6xl">
              Building the infrastructure of Indonesian sport.
            </h1>
            <Reveal mode="mount" delay={0.15}>
              <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-navy-500 md:text-lg">
                From field of play construction to sport tourism, SGI operates seven business lines built around one goal: growing sport in Indonesia, end to end.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-navy-800 text-white hover:bg-navy-700">
                  <Link href="/business-line" className="inline-flex items-center gap-2">
                    Explore Business Lines
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-navy-300 text-navy-800 hover:bg-navy-50"
                >
                  <Link href="/about-us">About SGI</Link>
                </Button>
              </div>
            </Reveal>
          </Reveal>

          <Reveal mode="mount" delay={0.2} y={16}>
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-navy-800">
              <Image
                src="/logos/sport-group-indonesia-white.png"
                alt="Sport Group Indonesia"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* About summary + inline CTA */}
      <section className="border-t border-navy-100 bg-navy-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
                About SGI
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-display-safe tracking-tight text-navy-900">
                One holding company, seven ways to grow sport.
              </h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-base leading-relaxed text-navy-600">
                Sport Group Indonesia brings together sports contracting, activity platforms, youth academies, venues, infrastructure investment, and sport tourism under one holding company. Each business line operates independently, connected by a shared standard for how sport should be built and experienced in Indonesia.
              </p>
              <Link
                href="/about-us"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-navy-800 hover:text-navy-600"
              >
                Learn more about SGI
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BusinessLineCarousel
        eyebrow="What We Do"
        title="Our Business Lines"
        description="Seven business lines covering every layer of the sports ecosystem, from field of play to travel."
        
        showViewAll
      />

      <div className="border-t border-navy-100">
        <SolutionGrid
          eyebrow="Cross-Business Offerings"
          title="Explore Our Solutions"
          description="Service offerings that draw on multiple business lines to solve a single problem for our partners."
          limit={3}
          showViewAll
        />
      </div>

      <ContactCTASection variant="default" />
    </>
  );
}