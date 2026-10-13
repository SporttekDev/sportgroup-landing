// lib/cms/utils.ts
// Helper bersama untuk semua transformer CMS (business line, solution, dst.).

import "server-only";

const API_ORIGIN = process.env.LARAVEL_API_URL?.replace(/\/$/, "");

export const asString = (value: unknown): string | undefined =>
    typeof value === "string" && value.length > 0 ? value : undefined;

export const asStringArray = (value: unknown): string[] =>
    Array.isArray(value)
        ? value.filter((item): item is string => typeof item === "string")
        : [];

const NAMED_ENTITIES: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
};

/**
 * Decode entity HTML bernama dan numerik (&amp; &#039; &#x27; dst.).
 * PHP e() / htmlspecialchars menulis tanda petik sebagai &#039;, jadi
 * entity numerik wajib ikut didecode.
 */
function decodeEntities(text: string): string {
    return text.replace(
        /&(?:#(\d+)|#x([0-9a-f]+)|(amp|lt|gt|quot|apos|nbsp));/gi,
        (match, dec?: string, hex?: string, name?: string) => {
            if (name) return NAMED_ENTITIES[name.toLowerCase()] ?? match;

            const code = dec ? Number(dec) : parseInt(hex as string, 16);
            if (!Number.isInteger(code) || code < 0 || code > 0x10ffff) return match;
            return String.fromCodePoint(code);
        }
    );
}

/**
 * Ambil teks per paragraf dari HTML editor rich text.
 * Tag dibuang (tidak ada HTML mentah yang dirender), jadi aman dari XSS.
 * Format seperti tebal atau tautan tidak terbawa.
 */
export function htmlToParagraphs(html: string | null | undefined): string[] {
    if (!html) return [];

    return html
        .replace(/<\/(p|li|h[1-6]|div)>/gi, "\n")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .split("\n")
        .map((line) => decodeEntities(line))
        .map((line) => line.trim())
        .filter(Boolean);
}

/**
 * - URL penuh (http/https)      -> dipakai apa adanya
 * - path "/storage/..." (CMS)   -> ditambah origin API CMS
 * - path lain ("/logos/...")    -> file lokal di folder public SGI
 *
 * next/image mewajibkan path lokal diawali "/" (atau URL absolut), jadi path
 * tanpa slash di depan dinormalkan.
 */
export function resolveImage(path: string | null | undefined): string | undefined {
    const value = path?.trim();
    if (!value) return undefined;
    if (/^https?:\/\//i.test(value)) return value;

    const normalized = value.startsWith("/") ? value : `/${value}`;

    if (normalized.startsWith("/storage/") && API_ORIGIN) {
        return `${API_ORIGIN}${normalized}`;
    }
    return normalized;
}