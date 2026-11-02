"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { GalleryImage } from "@/components/gallery-image";

interface BusinessLineGalleryProps {
    /** Image URLs, already sanitized by the page (non-empty strings only). */
    images: string[];
    /** Business line name, used for alt text. */
    name: string;
}

/** Start downloading once the gallery is this close to the viewport. */
const ARM_MARGIN = "800px 0px";
/** Slides loaded as soon as the gallery is armed (covers the first screen). */
const INITIAL_LOAD = 6;
/** Extra slides kept loaded beyond the furthest slide currently in view. */
const LOOKAHEAD = 4;

/**
 * Gallery carousel that downloads images in stages instead of all at once.
 *
 * - Nothing is downloaded until the gallery is near the viewport, so it never
 *   competes with the hero image on first paint.
 * - Then only the first screenful (plus a small buffer) loads. As the user
 *   moves through the carousel, images stay loaded LOOKAHEAD slides ahead, so
 *   the next slide is normally ready before it slides into view.
 * - Slides that are not loaded yet show the same skeleton GalleryImage uses,
 *   so the swap is invisible.
 *
 * Images come straight from the CMS (unoptimized, see GalleryImage), so the
 * real lever for load time is the file size and the CMS cache headers.
 */
export function BusinessLineGallery({ images, name }: BusinessLineGalleryProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [armed, setArmed] = useState(false);
    const [loadCount, setLoadCount] = useState(INITIAL_LOAD);
    const [api, setApi] = useState<CarouselApi>();

    const single = images.length === 1;

    // Arm loading when the gallery gets near the viewport.
    useEffect(() => {
        const node = rootRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setArmed(true);
                    observer.disconnect();
                }
            },
            { rootMargin: ARM_MARGIN }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // Extend the loaded window as slides come into view.
    useEffect(() => {
        if (!api) return;

        const extend = () => {
            const inView = api.slidesInView();
            if (inView.length === 0) return;
            const furthest = Math.max(...inView) + LOOKAHEAD + 1;
            setLoadCount((prev) =>
                furthest > prev ? Math.min(furthest, images.length) : prev
            );
        };

        api.on("slidesInView", extend);
        api.on("select", extend);
        api.on("reInit", extend);
        return () => {
            api.off("slidesInView", extend);
            api.off("select", extend);
            api.off("reInit", extend);
        };
    }, [api, images.length]);

    return (
        <div ref={rootRef}>
            <Carousel
                setApi={setApi}
                opts={{ align: "start", loop: images.length > 4 }}
                className="mt-8"
            >
                <CarouselContent className="-ml-4">
                    {images.map((src, index) => {
                        const shouldLoad = armed && index < loadCount;

                        return (
                            <CarouselItem
                                key={`${src}-${index}`}
                                className={cn(
                                    "pl-4",
                                    single
                                        ? "basis-full"
                                        : "basis-3/4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                )}
                            >
                                <div
                                    className={cn(
                                        "relative overflow-hidden rounded-xl bg-white",
                                        single ? "aspect-video max-w-3xl" : "aspect-square"
                                    )}
                                >
                                    {shouldLoad ? (
                                        <GalleryImage
                                            eager
                                            className="hover:scale-105"
                                            src={src}
                                            alt={`${name} gallery ${index + 1}`}
                                            sizes={
                                                single
                                                    ? "(min-width: 1024px) 768px, 100vw"
                                                    : "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 75vw"
                                            }
                                        />
                                    ) : (
                                        <div
                                            className="absolute inset-0 animate-pulse bg-navy-100"
                                            aria-hidden
                                        />
                                    )}
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                {images.length > 1 && (
                    <div className="mt-6 flex justify-end gap-2">
                        <CarouselPrevious className="static translate-y-0 border-navy-200 text-navy-800 hover:bg-navy-800 hover:text-white" />
                        <CarouselNext className="static translate-y-0 border-navy-200 text-navy-800 hover:bg-navy-800 hover:text-white" />
                    </div>
                )}
            </Carousel>
        </div>
    );
}