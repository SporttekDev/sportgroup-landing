import type { Metadata, } from "next";
import type { ReactNode } from "react";

// Semua halaman /connect (QR booth, brosur, banner) tidak perlu muncul di Google.
// Navbar dan Footer situs disembunyikan oleh <SiteChrome> di root layout;
// header dan footer /connect ada di ./_components/connect-shell.tsx.
export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function ConnectLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}