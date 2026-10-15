import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CONNECT, normalizeWebUrl } from "@/lib/connect-links";

// Header khusus /connect: hanya brand dan satu tautan ke website utama.
// Sengaja tidak ada menu navigasi supaya pengunjung tetap fokus pada tombol.
export function ConnectHeader() {
    const website = normalizeWebUrl(CONNECT.website);

    return (
        <header className="relative z-10">
            <div className="mx-auto flex w-full max-w-md items-center justify-between gap-4 px-5 py-5">
                {CONNECT.logoSrc ? (
                    <Image
                        src={CONNECT.logoSrc}
                        alt={CONNECT.title}
                        width={160}
                        height={40}
                        priority
                        className="h-8 w-auto max-w-[60%] object-contain object-left"
                    />
                ) : (
                    <span className="font-display text-sm font-semibold tracking-tight text-white">
                        {CONNECT.title}
                    </span>
                )}

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