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

/**
 * Single source of truth for the fallback icon shown when a business line
 * has no `logo` asset yet. Used by BusinessLineCarousel and the Business
 * Line detail hero — keep both in sync by editing only this file.
 */
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