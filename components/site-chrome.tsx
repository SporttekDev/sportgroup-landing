"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Route yang punya header/footer sendiri, sehingga Navbar dan Footer situs
// TIDAK ditampilkan. Tambahkan route lain di sini bila perlu.
const CHROMELESS_ROUTES = ["/connect"];

function isChromeless(pathname: string | null): boolean {
    if (!pathname) return false;
    return CHROMELESS_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );
}

interface SiteChromeProps {
    navbar: ReactNode;
    footer: ReactNode;
    children: ReactNode;
}

/**
 * Membungkus Navbar dan Footer situs di root layout. Pada route "chromeless"
 * (mis. /connect) hanya `children` yang dirender; route tersebut mengatur
 * header dan footernya sendiri lewat layout-nya.
 */
export function SiteChrome({ navbar, footer, children }: SiteChromeProps) {
    const pathname = usePathname();

    if (isChromeless(pathname)) return <>{children}</>;

    return (
        <>
            {navbar}
            {children}
            {footer}
        </>
    );
}