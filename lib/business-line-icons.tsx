import {
    Hammer,
    Smartphone,
    GraduationCap,
    Trophy,
    CircleDot,
    TrendingUp,
    Plane,
    type LucideIcon,
} from "lucide-react";

export const BUSINESS_LINE_ICON: Record<string, LucideIcon> = {
    "sport-teknologi-indonesia": Hammer,
    "playpro": Smartphone,
    "playpro-academy": GraduationCap,
    "playpro-sports-arena": Trophy,
    "lapanganpickle-id": CircleDot,
    "sport-growth-indonesia": TrendingUp,
    "from-the-origin": Plane,
};

export function getBusinessLineIcon(slug: string): LucideIcon {
    return BUSINESS_LINE_ICON[slug] ?? Hammer;
}

/** Render ikon fallback berdasarkan slug tanpa membuat komponen saat render. */
export function BusinessLineIcon({
    slug,
    className,
    strokeWidth = 1.5,
}: {
    slug: string;
    className?: string;
    strokeWidth?: number;
}) {
    const Icon = BUSINESS_LINE_ICON[slug] ?? Hammer;
    return <Icon className={className} strokeWidth={strokeWidth} />;
}