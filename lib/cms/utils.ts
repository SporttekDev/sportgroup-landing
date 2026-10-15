// lib/cms/utils.ts
// Helper bersama untuk semua transformer CMS (business line, solution, dst.).

import "server-only";
import sanitizeHtml from "sanitize-html";

const API_ORIGIN = process.env.LARAVEL_API_URL?.replace(/\/$/, "");

export const asString = (value: unknown): string | undefined =>
    typeof value === "string" && value.length > 0 ? value : undefined;

export const asStringArray = (value: unknown): string[] =>
    Array.isArray(value)
        ? value.filter((item): item is string => typeof item === "string")
        : [];

/** Array string, atau satu string tunggal (mis. satu file dari form admin). */
export const asStringList = (value: unknown): string[] => {
    if (typeof value === "string") return value.length > 0 ? [value] : [];
    return asStringArray(value);
};

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
 * Aturan path gambar:
 * - URL penuh (http/https)              -> dipakai apa adanya
 * - diawali "/" selain "/storage/"      -> file lokal di folder public SGI,
 *                                          mis. "/logos/x.png", "/background/x.png"
 * - selain itu                          -> file di storage CMS:
 *     "/storage/company/x.webp", "storage/company/x.webp", dan
 *     "company/x.webp" (path relatif yang disimpan panel admin saat upload)
 *     semuanya menjadi  {origin CMS}/storage/company/x.webp
 */
export function resolveImage(path: string | null | undefined): string | undefined {
    const value = path?.trim();
    if (!value) return undefined;
    if (/^https?:\/\//i.test(value)) return value;

    if (value.startsWith("/") && !value.startsWith("/storage/")) return value;

    if (!API_ORIGIN) return undefined;

    // Buang awalan "storage/" (juga yang ganda) lalu susun ulang satu kali.
    const relative = value.replace(/^\/?(storage\/)+/, "").replace(/^\/+/, "");
    return `${API_ORIGIN}/storage/${relative}`;
}

// ---------------------------------------------------------------------------
// HTML dari editor rich text CMS (Summernote)
// ---------------------------------------------------------------------------

const COLOR_VALUES = [
    /^#[0-9a-f]{3,8}$/i,
    /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/i,
    /^[a-z]{3,20}$/i,
];

/**
 * Bersihkan HTML dari CMS agar aman dirender dengan dangerouslySetInnerHTML.
 *
 * Diizinkan: paragraf, tebal/miring/garis bawah/coret, tautan, daftar,
 * heading, kutipan, tabel, kode, garis pemisah, serta style warna teks,
 * warna latar, dan perataan teks.
 * Dibuang: script, iframe, gambar, event handler (onclick dst.), protokol
 * selain http/https/mailto/tel, dan style lain.
 * Heading h1 diturunkan jadi h2 karena halaman sudah punya satu h1.
 *
 * @returns HTML bersih, atau undefined kalau isinya kosong.
 */
export function sanitizeBodyHtml(html: string | null | undefined): string | undefined {
    if (!html || !html.trim()) return undefined;

    const clean = sanitizeHtml(html, {
        allowedTags: [
            "p", "br", "hr", "span", "div",
            "strong", "b", "em", "i", "u", "s", "strike", "del", "sub", "sup",
            "a",
            "ul", "ol", "li",
            "h2", "h3", "h4", "h5", "h6",
            "blockquote", "pre", "code",
            "table", "thead", "tbody", "tfoot", "tr", "th", "td",
        ],
        allowedAttributes: {
            a: ["href", "title", "target", "rel"],
            th: ["colspan", "rowspan", "style"],
            td: ["colspan", "rowspan", "style"],
            "*": ["style"],
        },
        allowedStyles: {
            "*": {
                color: COLOR_VALUES,
                "background-color": COLOR_VALUES,
                "text-align": [/^(left|right|center|justify)$/],
            },
        },
        allowedSchemes: ["http", "https", "mailto", "tel"],
        allowProtocolRelative: false,
        transformTags: {
            h1: "h2",
            a: (tagName, attribs) => {
                const external = /^https?:\/\//i.test(attribs.href ?? "");
                return {
                    tagName,
                    attribs: external
                        ? { ...attribs, target: "_blank", rel: "noopener noreferrer" }
                        : attribs,
                };
            },
        },
        // Buang paragraf kosong seperti <p><br></p> yang sering dihasilkan editor.
        exclusiveFilter: (frame) => frame.tag === "p" && !frame.text.trim(),
    }).trim();

    return clean.length > 0 ? clean : undefined;
}