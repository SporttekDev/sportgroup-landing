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
} from "./utils";

const CONTENT_TYPE = "company";

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

// Daftar business line dipakai untuk bagian pelengkap (mis. "Other Business
// Lines") dan generateStaticParams. Jika CMS gagal dijangkau (timeout, 5xx,
// env belum diisi), kembalikan daftar kosong dan catat error-nya, supaya satu
// kegagalan sementara tidak menjatuhkan seluruh halaman.
export async function getBusinessLines(): Promise<BusinessLine[]> {
    try {
        const items = await listContents(CONTENT_TYPE);
        return items.map(toBusinessLine).sort((a, b) => a.order - b.order);
    } catch (error) {
        console.error(
            "[cms] getBusinessLines failed:",
            error instanceof Error ? `${error.name}: ${error.message}` : error
        );
        return [];
    }
}

// Sengaja TIDAK menelan error selain CmsNotFoundError. Jika CMS timeout dan
// fungsi ini mengembalikan null, halaman akan memanggil notFound() dan 404
// itu bisa ikut tersimpan di cache. Dengan melempar error, Next.js tetap
// memakai versi halaman terakhir yang berhasil saat revalidasi gagal.
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