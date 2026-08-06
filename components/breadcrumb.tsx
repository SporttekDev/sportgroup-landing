import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    /**
     * Use "dark" on colored/dark hero backgrounds (e.g. the business-line
     * detail hero, which is either accent-themed or falls back to
     * navy-900 — both dark). Defaults to "light" for the white section
     * backgrounds used on every other hero.
     */
    variant?: "light" | "dark";
}

export function Breadcrumb({ items, variant = "light" }: BreadcrumbProps) {
    const isDark = variant === "dark";

    return (
        <nav aria-label="Breadcrumb" className="w-full">
            <ol
                className={cn(
                    "flex flex-wrap items-center gap-2 text-sm",
                    isDark ? "text-white/60" : "text-navy-400"
                )}
            >
                <li className="flex items-center gap-2">
                    <Link
                        href="/"
                        className={cn(
                            "flex items-center gap-1.5 transition-colors",
                            isDark ? "hover:text-white" : "hover:text-navy-800"
                        )}
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span>Home</span>
                    </Link>
                </li>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                            <ChevronRight
                                className={cn(
                                    "h-3.5 w-3.5",
                                    isDark ? "text-white/40" : "text-navy-300"
                                )}
                            />
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "transition-colors",
                                        isDark ? "hover:text-white" : "hover:text-navy-800"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className={cn(
                                        "font-medium",
                                        isDark ? "text-white" : "text-navy-800"
                                    )}
                                    aria-current={isLast ? "page" : undefined}
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}