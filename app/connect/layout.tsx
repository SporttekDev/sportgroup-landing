import type { ReactNode } from "react";
import { ConnectHeader } from "./_components/connect-header";
import { ConnectFooter } from "./_components/connect-footer";

// Layout khusus /connect. Navbar dan Footer situs disembunyikan oleh
// <SiteChrome> di root layout, jadi header dan footer di sini berdiri sendiri.
export default function ConnectLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-navy-900">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 15% 25%, white 1.5px, transparent 1.5px)",
                    backgroundSize: "26px 26px",
                }}
                aria-hidden
            />
            <ConnectHeader />
            <main className="relative z-10 flex-1">{children}</main>
            <ConnectFooter />
        </div>
    );
}