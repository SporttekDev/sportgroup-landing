"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryImageProps {
    src: string;
    alt: string;
    sizes: string;
    className?: string;
}

// Gallery image with a loading skeleton and a graceful fallback.
// Must sit inside a `relative` parent with a fixed aspect ratio.
// Remote (CMS) images skip the Next.js image optimizer via `unoptimized`: its
// server-side download of slow CMS images was causing upstream timeouts, and
// the CMS already serves webp. Local files under /public (paths starting with
// "/") keep going through the optimizer.
export function GalleryImage({ src, alt, sizes, className }: GalleryImageProps) {
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const isRemote = /^https?:\/\//i.test(src);

    if (failed) {
        return (
            <div
                className="absolute inset-0 flex items-center justify-center bg-navy-100 text-navy-300"
                role="img"
                aria-label={`${alt} (failed to load)`}
            >
                <ImageOff className="h-6 w-6" strokeWidth={1.5} />
            </div>
        );
    }

    return (
        <>
            {!loaded && (
                <div
                    className="absolute inset-0 animate-pulse bg-navy-100"
                    aria-hidden
                />
            )}
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                unoptimized={isRemote}
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                className={cn(
                    "object-cover transition-[opacity,transform,scale] duration-500",
                    loaded ? "opacity-100" : "opacity-0",
                    className
                )}
            />
        </>
    );
}