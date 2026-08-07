import Image from "next/image";
import { Breadcrumb, type BreadcrumbItem } from "@/components/breadcrumb";
import { Reveal } from "@/components/motion/reveal";

interface PageHeroProps {
    breadcrumbItems: BreadcrumbItem[];
    eyebrow: string;
    title: string;
    description: string;
    /** Path to the background photo (e.g. /images/hero/about-us-hero.jpg). Falls back to the dot-pattern navy hero if omitted. */
    imageSrc?: string;
    imageAlt?: string;
}

/**
 * Shared navy + photo hero for utility pages (About Us, Business Line index,
 * Solution index, Contact). Uses the same mix-blend-overlay technique as the
 * Business Line detail hero so the photo fuses into the navy tone instead of
 * sitting under a separate scrim — but the base color here is always fixed
 * navy-900, never a per-page accent, keeping this inside the site-wide
 * Color Consistency Lock.
 */
export function PageHero({
    breadcrumbItems,
    eyebrow,
    title,
    description,
    imageSrc,
    imageAlt = "",
}: PageHeroProps) {
    return (
        <section className="relative flex min-h-[440px] items-center overflow-hidden bg-navy-900 pt-20">
            {imageSrc ? (
                <>
                    <div className="absolute inset-0 mix-blend-overlay" aria-hidden>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/5" aria-hidden />    
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

            <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <Breadcrumb variant="dark" items={breadcrumbItems} />

                <Reveal mode="mount" className="mt-8 max-w-3xl">
                    <span className="text-xs font-semibold uppercase tracking-wide text-white/60">
                        {eyebrow}
                    </span>
                    <h1 className="mt-2 font-display text-4xl font-semibold leading-display-safe tracking-tighter text-white md:text-5xl">
                        {title}
                    </h1>
                    <p className="mt-6 text-base leading-relaxed text-white/80 md:text-lg">
                        {description}
                    </p>
                </Reveal>
            </div>
        </section>
    );
}