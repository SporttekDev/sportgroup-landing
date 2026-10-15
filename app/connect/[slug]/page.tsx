import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    ArrowUpRight,
    FileDown,
    Globe,
    MessageCircle,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    CONNECT_GROUP,
    CONNECT_PROFILES,
    buildConnectLinks,
    getConnectProfile,
    normalizeAccent,
    normalizeWebUrl,
    type ConnectLink,
    type LinkGroup,
    type LinkKind,
} from "@/lib/connect-links";
import { ConnectShell } from "../_components/connect-shell";

type Props = { params: Promise<{ slug: string }> };

// Hanya slug yang terdaftar di CONNECT_PROFILES yang ada; selain itu 404.
export const dynamicParams = false;

export function generateStaticParams() {
    return CONNECT_PROFILES.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const profile = getConnectProfile(slug);
    if (!profile) return {};
    return {
        title: profile.eventName
            ? `${profile.eventName} | ${profile.name}`
            : `${profile.name} | ${CONNECT_GROUP.name}`,
        description: profile.tagline,
    };
}

// Manual SVG (lucide tidak lagi menyertakan ikon brand), gaya stroke sama
// dengan di halaman business-line.
function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

const KIND_ICON: Record<LinkKind, LucideIcon | typeof InstagramIcon> = {
    whatsapp: MessageCircle,
    download: FileDown,
    website: Globe,
    instagram: InstagramIcon,
};

const GROUP_LABEL: Record<LinkGroup, string> = {
    sales: "Hubungi Sales",
    materials: "Unduh Materi",
    more: "Tautan Lainnya",
};

const GROUP_ORDER: LinkGroup[] = ["sales", "materials", "more"];

function LinkButton({ link, accent }: { link: ConnectLink; accent: string }) {
    const Icon = KIND_ICON[link.kind];
    // Tautan internal (/connect/<slug>/sales, yang mengalihkan ke WhatsApp) dan
    // file unduhan dibuka di tab ini; tautan luar dibuka di tab baru.
    // Sengaja <a> biasa, bukan <Link>, agar tidak di-prefetch (rute acak).
    const isInternal = link.href.startsWith("/");
    const sameTab = isInternal || link.download;

    return (
        <a
            href={link.href}
            target={sameTab ? undefined : "_blank"}
            rel={sameTab ? undefined : "noopener noreferrer"}
            download={link.download ? true : undefined}
            style={link.primary ? { color: accent } : undefined}
            className={cn(
                "group flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition duration-200 active:scale-[0.99]",
                link.primary
                    ? "bg-white shadow-lg shadow-black/25 hover:-translate-y-0.5 hover:shadow-xl"
                    : "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            )}
        >
            <span
                style={link.primary ? { backgroundColor: accent } : undefined}
                className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white",
                    !link.primary && "bg-white/15"
                )}
            >
                <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block truncate text-base font-semibold leading-tight">
                    {link.label}
                </span>
                {link.description && (
                    <span
                        className={cn(
                            "mt-0.5 block truncate text-xs",
                            link.primary ? "text-black/55" : "text-white/70"
                        )}
                    >
                        {link.description}
                    </span>
                )}
            </span>
            <ArrowUpRight
                className="h-5 w-5 shrink-0 opacity-70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
            />
        </a>
    );
}

export default async function ConnectProfilePage({ params }: Props) {
    const { slug } = await params;
    const profile = getConnectProfile(slug);
    if (!profile) notFound();

    const accent = normalizeAccent(profile.accent);
    const links = buildConnectLinks(profile);
    const website = normalizeWebUrl(profile.website);

    return (
        <ConnectShell accent={accent} website={website}>
            <div className="mx-auto w-full max-w-md px-5 pb-12 pt-2">
                <div className="flex flex-col items-center text-center">
                    {/* Kartu putih: logo berwarna/transparan selalu terbaca di latar apa pun. */}
                    <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white shadow-xl shadow-black/25">
                        <Image
                            src={profile.logoSrc}
                            alt={profile.name}
                            width={128}
                            height={128}
                            priority
                            className="h-full w-full object-contain p-4"
                        />
                    </div>

                    {profile.eventName && (
                        <span className="mt-5 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/80">
                            {profile.eventName}
                        </span>
                    )}
                    <h1
                        className={cn(
                            "font-display text-3xl font-semibold leading-display-safe tracking-tight text-white",
                            profile.eventName ? "mt-4" : "mt-5"
                        )}
                    >
                        {profile.name}
                    </h1>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-white/65">
                        {profile.category}
                    </p>
                    <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-white/80">
                        {profile.tagline}
                    </p>
                </div>

                {links.length === 0 ? (
                    <p className="mt-10 rounded-2xl border border-dashed border-white/25 p-6 text-center text-sm text-white/70">
                        Belum ada tautan yang diatur.
                    </p>
                ) : (
                    <div className="mt-10 space-y-8">
                        {GROUP_ORDER.map((group) => {
                            const items = links.filter((link) => link.group === group);
                            if (items.length === 0) return null;
                            return (
                                <section key={group} aria-labelledby={`group-${group}`}>
                                    <h2
                                        id={`group-${group}`}
                                        className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-white/60"
                                    >
                                        {GROUP_LABEL[group]}
                                    </h2>
                                    <div className="space-y-3">
                                        {items.map((link) => (
                                            <LinkButton key={link.id} link={link} accent={accent} />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>
        </ConnectShell>
    );
}