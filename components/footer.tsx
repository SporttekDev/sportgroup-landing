import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { businessLines } from "@/data/business-lines";
import { solutions } from "@/data/solutions";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-navy-100 bg-navy-950 text-navy-200">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div className="md:col-span-1">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-display text-lg font-semibold text-white"
                        >
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-navy-900">
                                SGI
                            </span>
                            Sport Group Indonesia
                        </Link>
                        <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-navy-300">
                            A sports-industry holding company building infrastructure, platforms, and experiences across Indonesia.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-700 text-navy-300 transition-colors hover:border-white hover:text-white"
                            >
                                {/* <Instagram className="h-4 w-4" /> */}
                            </a>
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-700 text-navy-300 transition-colors hover:border-white hover:text-white"
                            >
                                {/* <Linkedin className="h-4 w-4" /> */}
                            </a>
                            <a
                                href="#"
                                aria-label="YouTube"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-700 text-navy-300 transition-colors hover:border-white hover:text-white"
                            >
                                {/* <Youtube className="h-4 w-4" /> */}
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
                                <span>[PLACEHOLDER: SGI head office address]</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 shrink-0" />
                                <span>[PLACEHOLDER: phone number]</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 shrink-0" />
                                <span>[PLACEHOLDER: email address]</span>
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