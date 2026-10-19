import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/data/solutions";
import { Badge } from "@/components/ui/badge";

interface SolutionCardProps {
    solution: Solution;
}

export function SolutionCard({ solution }: SolutionCardProps) {
    return (
        <Link
            href={`/solution/${solution.slug}`}
            className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-navy-100 bg-white transition-all hover:-translate-y-1 hover:border-navy-300 hover:shadow-navy-md"
        >
            <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-navy-900">
                        {solution.name}
                    </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">
                    {solution.tagline}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-400">
                    {solution.summary}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-navy-100 pt-4 text-sm font-medium text-navy-800">
                    View Details
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-200 transition-colors group-hover:border-navy-800 group-hover:bg-navy-800 group-hover:text-white">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                </div>
            </div>

            {/* Garis aksen bawah yang muncul saat hover */}
            <span
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-navy-800 transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden
            />
        </Link>
    );
}