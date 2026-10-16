import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Hammer,
    Smartphone,
    GraduationCap,
    Trophy,
    CircleDot,
    TrendingUp,
    Plane,
    type LucideIcon,
} from "lucide-react";
import type { BusinessLine } from "@/data/business-lines";
import { Badge } from "@/components/ui/badge";

const CATEGORY_ICON: Record<string, LucideIcon> = {
    "sport-teknologi-indonesia": Hammer,
    "playpro": Smartphone,
    "playpro-academy": GraduationCap,
    "playpro-sports-arena": Trophy,
    "lapanganpickle-id": CircleDot,
    "sport-growth-indonesia": TrendingUp,
    "from-the-origin": Plane,
};

interface BusinessLineCardProps {
    businessLine: BusinessLine;
}

export function BusinessLineCard({ businessLine }: BusinessLineCardProps) {
    const Icon = CATEGORY_ICON[businessLine.slug] ?? Hammer;
    // Two-digit index taken from `order` (01–07), shown in the logo slot.
    // const index = String(businessLine.order).padStart(2, "0");

    return (
        <Link
            href={`/business-line/${businessLine.slug}`}
            className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-navy-100 bg-white transition-all hover:-translate-y-1 hover:border-navy-300 hover:shadow-navy-md"
        >
            {/* Logo visual slot — falls back to the generic lucide icon
                only when a confirmed logo path isn't available for this
                business line. */}
            <div className="relative flex aspect-16/10 shrink-0 items-center justify-center overflow-hidden bg-white">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 20%, navy 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                    }}
                    aria-hidden
                />
                {/* <span
                    className="absolute left-4 top-4 font-display text-xs font-semibold tracking-widest text-navy-400"
                    aria-hidden
                >
                    {index}
                </span> */}
                {businessLine.logo ? (
                    <Image
                        src={businessLine.logo}
                        alt={businessLine.name}
                        width={200}
                        height={200}
                        className="relative h-48 w-48 object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <Icon className="relative h-12 w-12 text-white/90" strokeWidth={1.5} />
                )}
            </div>

            <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-medium uppercase tracking-wide text-navy-400">
                    {businessLine.category}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-navy-900">
                    {businessLine.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">
                    {businessLine.tagline}
                </p>

                {businessLine.badges && businessLine.badges.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {businessLine.badges.map((badge) => (
                            <Badge
                                key={badge}
                                variant="outline"
                                className="border-navy-200 text-navy-600"
                            >
                                {badge}
                            </Badge>
                        ))}
                    </div>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-navy-100 pt-4 text-sm font-medium text-navy-800">
                    View Details
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-200 transition-colors group-hover:border-navy-800 group-hover:bg-navy-800 group-hover:text-white">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                </div>
            </div>

            {/* Bottom accent line that draws in on hover. */}
            <span
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-navy-800 transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden
            />
        </Link>
    );
}