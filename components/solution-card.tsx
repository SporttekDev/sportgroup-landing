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
            className="group flex h-full flex-col rounded-xl border border-navy-100 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-navy-md"
        >
            <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-navy-900">
                    {solution.name}
                </h3>
                {solution.isDraft && (
                    <Badge
                        variant="outline"
                        className="shrink-0 border-navy-300 text-navy-500"
                    >
                        Draft
                    </Badge>
                )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-navy-500">
                {solution.tagline}
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-navy-400">
                {solution.summary}
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-navy-800">
                View Details
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
        </Link>
    );
}