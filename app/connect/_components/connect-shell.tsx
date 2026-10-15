import type { ReactNode } from "react";
import { ConnectHeader } from "./connect-header";
import { ConnectFooter } from "./connect-footer";

// Bingkai bersama semua halaman /connect: latar berwarna merek, header, footer.
// Tanpa `accent` (halaman grup) latarnya navy SGI.
export function ConnectShell({
    accent,
    website,
    children,
}: {
    accent?: string;
    website?: string;
    children: ReactNode;
}) {
    return (
        <div
            className="relative flex min-h-screen flex-col overflow-hidden bg-navy-900"
            style={accent ? { backgroundColor: accent } : undefined}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 15% 25%, white 1.5px, transparent 1.5px)",
                    backgroundSize: "26px 26px",
                }}
                aria-hidden
            />
            {/* Menggelapkan bagian bawah supaya footer tetap terbaca di warna apa pun. */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.28))",
                }}
                aria-hidden
            />
            <ConnectHeader website={website} />
            <main className="relative z-10 flex-1">{children}</main>
            <ConnectFooter />
        </div>
    );
}