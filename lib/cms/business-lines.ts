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
    asStringList,
    htmlToParagraphs,
    resolveImage,
    sanitizeBodyHtml,
} from "./utils";

const CONTENT_TYPE = "company";

/**
 * Ambil satu gambar dari field yang bentuknya bisa bermacam-macam:
 * - string tunggal (data seeder lama): "/background/sti.png"
 * - array string (upload dari panel admin): ["/storage/company/x.webp"]
 * - objek / array objek: { url | path | src }
 */
function firstImage(value: unknown): string | undefined {
    const first = Array.isArray(value) ? value[0] : value;

    if (typeof first === "string") return resolveImage(first);

    if (first && typeof first === "object") {
        const obj = first as Record<string, unknown>;
        return resolveImage(asString(obj.url ?? obj.path ?? obj.src));
    }

    return undefined;
}

/**
 * Pastikan link eksternal punya protokol. Tanpa itu, "playpro-academy.id"
 * dianggap link relatif oleh <a href> dan membuka /business-line/playpro-academy.id.
 */
function normalizeUrl(value: string | undefined): string | undefined {
    const trimmed = value?.trim();
    if (!trimmed) return undefined;
    if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return trimmed;
    return `https://${trimmed.replace(/^\/+/, "")}`;
}

export function toBusinessLine(content: CmsContent): BusinessLine {
    const attrs = content.attributes ?? {};

    const paragraphs = htmlToParagraphs(content.body);
    const gallery = asStringList(attrs.gallery)
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
        // HTML bersih dari editor CMS (tebal, tautan, daftar, dst.); kosong jika body kosong.
        descriptionHtml: sanitizeBodyHtml(content.body),
        services: asStringArray(attrs.services),
        location: asString(attrs.location),
        badges: asStringArray(attrs.badges),
        order: content.display_order,
        // Fallback ke attributes.logo untuk record lama.
        logo: resolveImage(content.cover_image_url) ?? resolveImage(asString(attrs.logo)),
        accent: asString(attrs.accent),
        // string lokal (seeder), array string (upload admin), atau objek.
        bgSrc: firstImage(attrs.bg_src),
        website: normalizeUrl(asString(attrs.website)),
        instagram: normalizeUrl(asString(attrs.instagram)),
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