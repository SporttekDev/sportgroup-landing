// lib/cms/server-client.ts
// HANYA untuk Server Component, generateMetadata, dan generateStaticParams.
// Jangan diimport dari client component ("use client").

import "server-only";

const API_URL = process.env.LARAVEL_API_URL?.replace(/\/$/, "");
const API_KEY = process.env.LARAVEL_API_KEY;
const DOMAIN = process.env.LARAVEL_COMPANY_DOMAIN;

// Total percobaan per request (1 percobaan awal + 1 retry) khusus untuk
// kegagalan sementara: timeout atau error jaringan.
const MAX_ATTEMPTS = 2;

export type CmsContent = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    body: string | null;
    cover_image_url: string | null;
    display_order: number;
    is_published: boolean;
    published_at: string | null;
    content_type: {
        slug: string;
        display_name: string;
    };
    attributes: Record<string, unknown>;
    children?: CmsContent[];
    created_at: string;
    updated_at: string;
};

// Format response Laravel: { status, message, data }
type CmsResponse<T> = {
    status: boolean;
    message: string;
    data: T;
};

export class CmsNotFoundError extends Error {
    constructor(path: string) {
        super(`CMS content not found: ${path}`);
        this.name = "CmsNotFoundError";
    }
}

/**
 * fetch dengan retry untuk kegagalan sementara (timeout / error jaringan).
 * Response HTTP apa pun (termasuk 404 dan 5xx) dikembalikan apa adanya dan
 * TIDAK di-retry. AbortSignal dibuat baru di setiap percobaan.
 */
async function fetchWithRetry(
    url: string,
    headers: Record<string, string>
): Promise<Response> {
    for (let attempt = 1; ; attempt++) {
        try {
            return await fetch(url, {
                headers,
                next: { revalidate: 60 },
                signal: AbortSignal.timeout(10000),
            });
        } catch (error) {
            const retryable =
                error instanceof TypeError ||
                (error instanceof Error &&
                    (error.name === "TimeoutError" || error.name === "AbortError"));

            if (!retryable || attempt >= MAX_ATTEMPTS) throw error;
        }
    }
}

async function fetchCms<T>(path: string): Promise<T> {
    if (!API_URL || !API_KEY || !DOMAIN) {
        const missing = [
            !API_URL && "LARAVEL_API_URL",
            !API_KEY && "LARAVEL_API_KEY",
            !DOMAIN && "LARAVEL_COMPANY_DOMAIN",
        ].filter(Boolean);
        throw new Error(`Missing env: ${missing.join(", ")}`);

    }

    const res = await fetchWithRetry(`${API_URL}/api/public/${path}`, {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
        "X-Company-Domain": DOMAIN,
    });

    if (res.status === 404) {
        throw new CmsNotFoundError(path);
    }

    if (!res.ok) {
        // Jangan log header (berisi API key).
        throw new Error(`CMS error ${res.status} ${res.statusText} for ${path}`);
    }

    const json = (await res.json()) as CmsResponse<T>;
    return json.data;
}

/**
 * List semua konten published dari satu content type.
 * @example listContents("company")
 */
export function listContents(contentType: string): Promise<CmsContent[]> {
    const params = new URLSearchParams({ content_type: contentType });
    return fetchCms<CmsContent[]>(`contents?${params}`);
}

/**
 * Resolve konten lewat rantai slug (parent -> child).
 * @example resolveContent(["playpro"], "company")
 */
export function resolveContent(
    slugs: string[],
    contentType?: string
): Promise<CmsContent> {
    const path = slugs.filter(Boolean).join("/");
    const params = new URLSearchParams();
    if (contentType) params.set("content_type", contentType);
    const query = params.toString() ? `?${params}` : "";
    return fetchCms<CmsContent>(`contents/${path}${query}`);
}