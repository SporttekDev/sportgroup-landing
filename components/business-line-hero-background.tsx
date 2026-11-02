"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { isRemoteImage } from "@/lib/is-remote-image";

interface BusinessLineHeroBackgroundProps {
    /** Background texture/photo (bgSrc). Rendered over the accent colour. */
    src: string;
}

/**
 * Themed hero background: the accent colour on the parent section is the
 * base, and the photo fades in over it with mix-blend-overlay once it has
 * loaded, instead of popping in half-drawn. A failed load simply leaves the
 * plain accent colour. Must sit inside a `relative` parent.
 */
export function BusinessLineHeroBackground({ src }: BusinessLineHeroBackgroundProps) {
    const [ready, setReady] = useState(false);

    return (
        <>
            <div className="absolute inset-0 mix-blend-overlay" aria-hidden>
                <Image
                    src={src}
                    alt=""
                    fill
                    priority
                    unoptimized={isRemoteImage(src)}
                    sizes="100vw"
                    onLoad={() => setReady(true)}
                    onError={() => setReady(true)}
                    className={cn(
                        "object-cover transition-opacity duration-700 motion-reduce:transition-none",
                        ready ? "opacity-100" : "opacity-0"
                    )}
                />
            </div>
            <div className="absolute inset-0 bg-black/20" aria-hidden />
        </>
    );
}