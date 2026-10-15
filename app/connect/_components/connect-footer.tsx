import Link from "next/link";
import { CONNECT } from "@/lib/connect-links";

// Footer khusus /connect: satu baris, tanpa kolom-kolom panjang.
export function ConnectFooter() {
    return (
        <footer className="relative z-10 mt-auto">
            <div className="mx-auto w-full max-w-md px-5 pb-8 pt-4">
                <div className="flex flex-col items-center gap-3 border-t border-white/15 pt-5 text-center text-xs text-white/60">
                    <nav aria-label="Tautan situs" className="flex gap-5">
                        <Link
                            href="/about-us"
                            className="whitespace-nowrap transition-colors hover:text-white"
                        >
                            Tentang SGI
                        </Link>
                        <Link
                            href="/business-line"
                            className="whitespace-nowrap transition-colors hover:text-white"
                        >
                            Business Line
                        </Link>
                    </nav>
                    <span>
                        &copy; {new Date().getFullYear()} {CONNECT.title}
                    </span>
                </div>
            </div>
        </footer>
    );
}