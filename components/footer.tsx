import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { businessLines } from "@/data/business-lines";
import { solutions } from "@/data/solutions";
import Image from "next/image";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-navy-950 text-navy-200">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div className="md:col-span-1">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-display text-lg font-semibold text-white"
                        >
                            <Image
                                src="/logos/sport-group-indonesia-white.png"
                                alt="Sport Group Indonesia Logo"
                                width={100}
                                height={100}
                                className="relative h-10 w-10 object-contain"
                            />
                            Sport Group Indonesia
                        </Link>
                        <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-navy-300">
                            A sports-industry holding company building infrastructure, platforms, and experiences across Indonesia.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="https://instagram.com/sportgroupindonesia"
                                aria-label="Instagram"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-700 text-navy-300 transition-colors hover:border-white hover:text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                >
                                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                                    <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/company/sportgroupindonesia"
                                aria-label="LinkedIn"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-700 text-navy-300 transition-colors hover:border-white hover:text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                            <a
                                href="https://youtube.com/@sportgroupindonesia"
                                aria-label="YouTube"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-700 text-navy-300 transition-colors hover:border-white hover:text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                >
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                            Business Line
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {businessLines
                                .sort((a, b) => a.order - b.order)
                                .map((line) => (
                                    <li key={line.slug}>
                                        <Link
                                            href={`/business-line/${line.slug}`}
                                            className="text-sm text-navy-300 transition-colors hover:text-white"
                                        >
                                            {line.shortName}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                            Solution
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {solutions
                                .sort((a, b) => a.order - b.order)
                                .map((solution) => (
                                    <li key={solution.slug}>
                                        <Link
                                            href={`/solution/${solution.slug}`}
                                            className="text-sm text-navy-300 transition-colors hover:text-white"
                                        >
                                            {solution.name}
                                        </Link>
                                    </li>
                                ))}
                            <li>
                                <Link
                                    href="/about-us"
                                    className="text-sm text-navy-300 transition-colors hover:text-white"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                            Contact
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-navy-300">
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>Jl. Jenderal Sudirman Kav. 52-53, Jakarta Selatan 12190, Indonesia</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 shrink-0" />
                                <span>+62 21 5140 1234</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 shrink-0" />
                                <span>info@sportgroupindonesia.com</span>
                            </li>
                        </ul>
                    </div>
                </div >

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-800 pt-8 sm:flex-row">
                    <p className="text-xs text-navy-400">
                        © {year} Sport Group Indonesia. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-navy-400">
                        <Link href="/contact" className="hover:text-white">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div >
        </footer >
    );
}