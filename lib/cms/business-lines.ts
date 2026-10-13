// lib/cms/business-lines.ts
// Mengubah konten CMS (content type "company") ke interface BusinessLine
// yang sudah dipakai komponen SGI, supaya komponen tidak perlu ditulis ulang.
//
// Pemetaan:
//   title            -> name
//   excerpt          -> summary
//   body (HTML)      -> description (array paragraf)
//   cover_image_url  -> logo
//   display_order    -> order
//   attributes.*     -> field lainnya (short_name, bg_src, gallery, dst.)

import "server-only";
import type { BusinessLine } from "@/data/business-lines";
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
    resolveImage,
} from "./utils";

const CONTENT_TYPE = "company";

export function toBusinessLine(content: CmsContent): BusinessLine {
    const attrs = content.attributes ?? {};

    const paragraphs = htmlToParagraphs(content.body);
    const gallery = asStringArray(attrs.gallery)
        .map(resolveImage)
        .filter((url): url is string => Boolean(url));

    return {
        slug: content.slug,
        name: content.title,
        shortName: asString(attrs.short_name) ?? content.title,
        category: asString(attrs.category) ?? "",
        tagline: asString(attrs.tagline) ?? "",
        summary: content.excerpt ?? "",
        // Fallback ke attributes.description untuk record lama sebelum dipindah ke body.
        description: paragraphs.length ? paragraphs : asStringArray(attrs.description),
        services: asStringArray(attrs.services),
        location: asString(attrs.location),
        badges: asStringArray(attrs.badges),
        order: content.display_order,
        // Fallback ke attributes.logo untuk record lama.
        logo: resolveImage(content.cover_image_url) ?? resolveImage(asString(attrs.logo)),
        accent: asString(attrs.accent),
        bgSrc: resolveImage(asString(attrs.bg_src)),
        website: asString(attrs.website),
        instagram: asString(attrs.instagram),
        gallery: gallery.length ? gallery : undefined,
    };
}

export async function getBusinessLines(): Promise<BusinessLine[]> {
    const items = await listContents(CONTENT_TYPE);
    return items.map(toBusinessLine).sort((a, b) => a.order - b.order);
}

export async function getBusinessLineBySlug(
    slug: string
): Promise<BusinessLine | null> {
    try {
        const content = await resolveContent([slug], CONTENT_TYPE);
        return toBusinessLine(content);
    } catch (error) {
        if (error instanceof CmsNotFoundError) return null;
        throw error;
    }
}

export async function getAllBusinessLineSlugs(): Promise<string[]> {
    const lines = await getBusinessLines();
    return lines.map((line) => line.slug);
}