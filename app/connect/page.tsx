import type { Metadata } from "next";
import {
    ArrowUpRight,
    FileDown,
    Globe,
    MessageCircle,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    CONNECT,
    buildConnectLinks,
    type LinkGroup,
    type LinkKind,
    type ConnectLink,
} from "@/lib/connect-links";

// Halaman link untuk QR (booth, brosur, banner): tidak perlu muncul di Google.
// Header dan footer halaman ini ada di ./layout.tsx.
export const metadata: Metadata = {
    title: CONNECT.eventName
        ? `${CONNECT.eventName} | ${CONNECT.title}`
        : CONNECT.title,
    description: CONNECT.tagline,
    robots: { index: false, follow: false },
};

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

function LinkButton({ link }: { link: ConnectLink }) {
    const Icon = KIND_ICON[link.kind];

    return (
        <a
            href={link.href}
            // wa.me membuka aplikasi WhatsApp; file brosur diunduh di tab ini.
            target={link.download ? undefined : "_blank"}
            rel={link.download ? undefined : "noopener noreferrer"}
            download={link.download ? true : undefined}
            className={cn(
                "group flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition duration-200 active:scale-[0.99]",
                link.primary
                    ? "bg-white text-navy-900 shadow-lg shadow-black/25 hover:-translate-y-0.5 hover:shadow-xl"
                    : "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
            )}
        >
            <span
                className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                    link.primary ? "bg-navy-900 text-white" : "bg-white/15 text-white"
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
                            link.primary ? "text-navy-500" : "text-white/70"
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

export default function ConnectPage() {
    const links = buildConnectLinks();

    return (
        <div className="mx-auto w-full max-w-md px-5 pb-12 pt-4">
            <div className="flex flex-col items-center text-center">
                {CONNECT.eventName && (
                    <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/80">
                        {CONNECT.eventName}
                    </span>
                )}
                <h1 className="mt-4 font-display text-3xl font-semibold leading-display-safe tracking-tight text-white">
                    {CONNECT.title}
                </h1>
                <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-white/75">
                    {CONNECT.tagline}
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
                                        <LinkButton key={link.id} link={link} />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );
}