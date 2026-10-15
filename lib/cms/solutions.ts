// lib/cms/solutions.ts
// Mengubah konten CMS (content type "solution") ke interface Solution.
//
// Pemetaan:
//   title                              -> name
//   excerpt                            -> summary
//   body (HTML)                        -> description (array paragraf)
//   display_order                      -> order
//   attributes.tagline                 -> tagline
//   attributes.related_business_line_slugs -> relatedBusinessLineSlugs
//   attributes.example_use_case        -> exampleUseCase
//   attributes.is_draft                -> isDraft (label "Draft", bukan status publish)

import "server-only";
import type { Solution } from "@/data/solutions";
import {
    CmsNotFoundError,
    listContents,
    resolveContent,
    type CmsContent,
} from "./server-client";
import {
    asString,
    asStringArray,
    htmlToParagraphs,
    sanitizeBodyHtml,
} from "./utils";

const CONTENT_TYPE = "solution";

export function toSolution(content: CmsContent): Solution {
    const attrs = content.attributes ?? {};

    return {
        slug: content.slug,
        name: content.title,
        tagline: asString(attrs.tagline) ?? "",
        summary: content.excerpt ?? "",
        description: htmlToParagraphs(content.body),
        // HTML bersih dari editor CMS (tebal, tautan, daftar, dst.); kosong jika body kosong.
        descriptionHtml: sanitizeBodyHtml(content.body),
        relatedBusinessLineSlugs: asStringArray(attrs.related_business_line_slugs),
        exampleUseCase: asString(attrs.example_use_case) ?? "",
        isDraft: attrs.is_draft === true,
        order: content.display_order,
    };
}

export async function getSolutions(): Promise<Solution[]> {
    const items = await listContents(CONTENT_TYPE);
    return items.map(toSolution).sort((a, b) => a.order - b.order);
}

export async function getSolutionBySlug(slug: string): Promise<Solution | null> {
    try {
        const content = await resolveContent([slug], CONTENT_TYPE);
        return toSolution(content);
    } catch (error) {
        if (error instanceof CmsNotFoundError) return null;
        throw error;
    }
}

export async function getAllSolutionSlugs(): Promise<string[]> {
    const solutions = await getSolutions();
    return solutions.map((solution) => solution.slug);
}