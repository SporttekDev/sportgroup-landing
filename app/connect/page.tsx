import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CONNECT_GROUP, CONNECT_PROFILES } from "@/lib/connect-links";
import { ConnectShell } from "./_components/connect-shell";

// Halaman grup: pintu masuk ke halaman /connect tiap business line.
// (QR booth sebaiknya langsung mengarah ke /connect/<slug>.)
export const metadata: Metadata = {
    title: `Connect | ${CONNECT_GROUP.name}`,
    description: "Pilih business line untuk terhubung dengan tim kami.",
};

export default function ConnectHubPage() {
    return (
        <ConnectShell>
            <div className="mx-auto w-full max-w-md px-5 pb-12 pt-2">
                <div className="flex flex-col items-center text-center">
                    <h1 className="font-display text-3xl font-semibold leading-display-safe tracking-tight text-white">
                        {CONNECT_GROUP.name}
                    </h1>
                    <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-white/75">
                        Pilih business line untuk terhubung dengan tim kami.
                    </p>
                </div>

                <ul className="mt-10 space-y-3">
                    {CONNECT_PROFILES.map((profile) => (
                        <li key={profile.slug}>
                            <Link
                                href={`/connect/${profile.slug}`}
                                className="group flex w-full items-center gap-4 rounded-2xl border border-white/25 bg-white/10 px-4 py-3.5 text-left text-white backdrop-blur-md transition duration-200 hover:bg-white/20 active:scale-[0.99]"
                            >
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white">
                                    <Image
                                        src={profile.logoSrc}
                                        alt=""
                                        width={48}
                                        height={48}
                                        className="h-full w-full object-contain p-1"
                                    />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-base font-semibold leading-tight">
                                        {profile.name}
                                    </span>
                                    <span className="mt-0.5 block truncate text-xs text-white/70">
                                        {profile.category}
                                    </span>
                                </span>
                                <ArrowUpRight
                                    className="h-5 w-5 shrink-0 opacity-70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    aria-hidden
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </ConnectShell>
    );
}