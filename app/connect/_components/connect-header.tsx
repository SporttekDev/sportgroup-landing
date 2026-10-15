import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CONNECT_GROUP } from "@/lib/connect-links";

// Header /connect: merek grup di kiri, satu tautan ke website business line di
// kanan (jika ada). Sengaja tanpa menu navigasi supaya pengunjung fokus.
// `website` sudah dinormalisasi oleh pemanggil.
export function ConnectHeader({ website }: { website?: string }) {
    return (
        <header className="relative z-10">
            <div className="mx-auto flex w-full max-w-md items-center justify-between gap-4 px-5 py-5">
                <Image
                    src={CONNECT_GROUP.logoSrc}
                    alt={CONNECT_GROUP.name}
                    width={160}
                    height={40}
                    priority
                    className="h-7 w-auto max-w-[60%] object-contain object-left"
                />

                {website && (
                    <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
                    >
                        Website
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                )}
            </div>
        </header>
    );
}