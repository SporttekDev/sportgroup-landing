// Konfigurasi halaman /connect (halaman link untuk QR), satu halaman per
// business line: /connect/sti, /connect/playpro, dst.
//
// Menambah business line baru = menambah satu blok di CONNECT_PROFILES.
// Aturan: tombol yang datanya kosong atau tidak valid otomatis TIDAK dirender,
// jadi aman membiarkan sebagian kolom kosong.

export interface SalesContact {
    /** Nama yang tampil di tombol, mis. "Budi - Sales Konstruksi". */
    name: string;
    /** Keterangan kecil di bawah nama (opsional), mis. "Lapangan & surface". */
    role?: string;
    /** Nomor WhatsApp: boleh 0812..., +62812..., atau 62812.... */
    phone: string;
}

export interface BrochureFile {
    label: string;
    /** Path file di /public (mis. "/brosur/sti-company-profile.pdf") atau URL penuh. */
    href: string;
    description?: string;
}

/** Identitas grup: tampil di header dan footer semua halaman /connect. */
export const CONNECT_GROUP = {
    name: "Sport Group Indonesia",
    /** Logo putih di /public (latar halaman /connect selalu gelap). */
    logoSrc: "/logos/sport-group-indonesia-white.png",
};

export interface ConnectProfile {
    /** Bagian alamat: /connect/<slug>. Jangan diubah setelah QR dicetak. */
    slug: string;
    name: string;
    /** Dipakai di teks pesan WhatsApp, mis. "Halo STI, ...". */
    shortName: string;
    category: string;
    tagline: string;
    /** Logo di /public. Ditampilkan di kartu putih, jadi logo berwarna aman. */
    logoSrc: string;
    /** Warna merek (hex 6 digit). Dipakai sebagai latar halaman; harus cukup gelap untuk teks putih. */
    accent: string;
    /**
     * Nama acara (opsional). Tampil sebagai badge dan masuk ke teks pesan
     * WhatsApp. Kosongkan setelah acara selesai agar halaman bersifat umum.
     */
    eventName?: string;
    /**
     * "rotate" (bawaan): satu tombol "Chat dengan Sales"; tiap ditekan diarahkan
     *   ke sales acak (tidak sama dengan pilihan sebelumnya di HP itu).
     * "list": tiap sales punya tombol sendiri.
     */
    salesMode?: "rotate" | "list";
    sales: SalesContact[];
    brochures: BrochureFile[];
    /** Boleh tanpa "https://". */
    website?: string;
    /** Boleh "@handle", "handle", atau URL lengkap. */
    instagram?: string;
}

export const CONNECT_PROFILES: ConnectProfile[] = [
    {
        slug: "sti",
        name: "Sport Teknologi Indonesia",
        shortName: "STI",
        category: "Sports Contractor",
        tagline: "Konstruksi lapangan, peralatan, dan infrastruktur event berstandar kompetisi.",
        logoSrc: "/logos/sport-teknologi-indonesia.png",
        accent: "#630909",
        eventName: "",
        // TODO: isi dengan data sebenarnya.
        sales: [
            // { name: "Nama Sales", role: "Konstruksi lapangan", phone: "0812xxxxxxxx" },
            { name: "Iyan", role: "Sales", phone: "085156239714" },
            { name: "Rizky", role: "Sales", phone: "087780216333" },
            { name: "Haykal", role: "Sales", phone: "08569381" },
        ],
        // TODO: taruh PDF di /public/brosur lalu isi path-nya.
        brochures: [
            // { label: "Company Profile", href: "/brosur/sti-company-profile.pdf" },
            { label: "Company Profile STI", href: "/brosur/sti-company-profile.pdf" },
        ],
        // TODO: isi alamat yang sudah dikonfirmasi (di data lama masih DUMMY).
        website: "sportteknologi.id",
        instagram: "sporttek.id",
    },
    {
        slug: "playpro",
        name: "PlayPro",
        shortName: "PlayPro",
        category: "Sports Activity Platform",
        tagline: "Satu platform untuk bermain, memesan, dan mengelola semua aktivitas olahraga.",
        logoSrc: "/logos/playpro.png",
        accent: "#b8181f",
        eventName: "",
        sales: [],
        brochures: [],
        website: "",
        instagram: "",
    },
    {
        slug: "playpro-academy",
        name: "PlayPro Academy",
        shortName: "PlayPro Academy",
        category: "Youth Sports Academy",
        tagline: "Pelatihan bersertifikat untuk atlet muda, dari balita hingga junior.",
        logoSrc: "/logos/playpro-academy.png",
        accent: "#275466",
        eventName: "",
        sales: [],
        brochures: [],
        website: "",
        instagram: "",
    },
];

export function getConnectProfile(slug: string): ConnectProfile | undefined {
    return CONNECT_PROFILES.find((profile) => profile.slug === slug);
}

// ---------------------------------------------------------------------------
// Pembentuk daftar tombol
// ---------------------------------------------------------------------------

export type LinkKind = "whatsapp" | "download" | "website" | "instagram";
export type LinkGroup = "sales" | "materials" | "more";

export interface ConnectLink {
    id: string;
    kind: LinkKind;
    group: LinkGroup;
    label: string;
    description?: string;
    href: string;
    /** Tombol utama (putih solid). Hanya sales pertama. */
    primary?: boolean;
    /** Atribut download untuk file brosur. */
    download?: boolean;
}

/**
 * Nomor Indonesia -> format internasional tanpa "+" (untuk wa.me).
 * Mengembalikan undefined jika tidak masuk akal.
 *   "0812-3456-7890" -> "6281234567890"
 *   "+62 812 3456 7890" -> "6281234567890"
 *   "81234567890" -> "6281234567890"
 */
export function normalizePhone(raw: string | undefined): string | undefined {
    if (!raw) return undefined;
    let digits = raw.replace(/\D/g, "");
    if (!digits) return undefined;

    if (digits.startsWith("62")) {
        // sudah internasional
    } else if (digits.startsWith("0")) {
        digits = `62${digits.slice(1)}`;
    } else if (digits.startsWith("8")) {
        digits = `62${digits}`;
    } else {
        return undefined;
    }

    // Nomor Indonesia setelah 62: 9-12 digit, dan diawali 8 (seluler).
    const national = digits.slice(2);
    if (!/^8\d{8,11}$/.test(national)) return undefined;
    return digits;
}

export function buildWhatsAppUrl(phone: string, message: string): string | undefined {
    const normalized = normalizePhone(phone);
    if (!normalized) return undefined;
    return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

/** Terima "domain.id", "https://domain.id" dan sejenisnya; tolak skema selain http(s). */
export function normalizeWebUrl(raw: string | undefined): string | undefined {
    const value = raw?.trim();
    if (!value) return undefined;
    const candidate = /^https?:\/\//i.test(value)
        ? value
        : `https://${value.replace(/^\/+/, "")}`;
    try {
        const url = new URL(candidate);
        const ok =
            (url.protocol === "http:" || url.protocol === "https:") &&
            url.hostname.includes(".") &&
            !url.username &&
            !url.password;
        return ok ? url.href : undefined;
    } catch {
        return undefined;
    }
}

const INSTAGRAM_HANDLE = /^[A-Za-z0-9._]{1,30}$/;

export function normalizeInstagram(raw: string | undefined): string | undefined {
    const value = raw?.trim();
    if (!value) return undefined;
    if (/^https?:\/\//i.test(value) || value.includes("/") || /^(www\.)?instagram\.com/i.test(value)) {
        return normalizeWebUrl(value);
    }
    const handle = value.replace(/^@/, "");
    return INSTAGRAM_HANDLE.test(handle) ? `https://instagram.com/${handle}` : undefined;
}

function normalizeFileHref(raw: string | undefined): string | undefined {
    const value = raw?.trim();
    if (!value) return undefined;
    if (value.startsWith("/") && !value.startsWith("//")) return value;
    return normalizeWebUrl(value);
}

const FALLBACK_ACCENT = "#0b1f3a";

/** Hanya hex 6 digit yang diterima; selain itu pakai warna cadangan. */
export function normalizeAccent(raw: string | undefined): string {
    const value = raw?.trim();
    return value && /^#[0-9a-fA-F]{6}$/.test(value) ? value : FALLBACK_ACCENT;
}

function buildMessage(profile: ConnectProfile): string {
    return profile.eventName?.trim()
        ? `Halo ${profile.shortName}, saya mengunjungi booth Anda di ${profile.eventName.trim()}. Saya ingin informasi lebih lanjut.`
        : `Halo ${profile.shortName}, saya ingin informasi lebih lanjut.`;
}

export interface SalesTarget {
    id: string;
    name: string;
    role?: string;
    href: string;
}

/** Sales yang nomornya valid, lengkap dengan tautan WhatsApp-nya. */
export function getSalesTargets(profile: ConnectProfile): SalesTarget[] {
    const message = buildMessage(profile);
    const targets: SalesTarget[] = [];
    profile.sales.forEach((contact, index) => {
        const href = buildWhatsAppUrl(contact.phone, message);
        if (!href || !contact.name.trim()) return;
        targets.push({
            id: String(index),
            name: contact.name.trim(),
            role: contact.role?.trim() || undefined,
            href,
        });
    });
    return targets;
}

/** Pilih sales acak; hindari `lastId` (sales sebelumnya) bila ada pilihan lain. */
export function pickSalesTarget(
    targets: SalesTarget[],
    lastId?: string
): SalesTarget | undefined {
    if (targets.length === 0) return undefined;
    const pool = targets.length > 1 ? targets.filter((t) => t.id !== lastId) : targets;
    return pool[Math.floor(Math.random() * pool.length)];
}

export function salesRotatePath(profile: ConnectProfile): string {
    return `/connect/${profile.slug}/sales`;
}

export function buildConnectLinks(profile: ConnectProfile): ConnectLink[] {
    const links: ConnectLink[] = [];
    const targets = getSalesTargets(profile);

    if ((profile.salesMode ?? "rotate") === "rotate" && targets.length > 0) {
        links.push({
            id: "sales-rotate",
            kind: "whatsapp",
            group: "sales",
            label: "Chat dengan Sales",
            description: "Tim kami siap membantu via WhatsApp",
            href: salesRotatePath(profile),
            primary: true,
        });
    } else {
        targets.forEach((target) => {
            links.push({
                id: `sales-${target.id}`,
                kind: "whatsapp",
                group: "sales",
                label: `Chat ${target.name}`,
                description: target.role || "via WhatsApp",
                href: target.href,
                primary: links.length === 0,
            });
        });
    }

    profile.brochures.forEach((file, index) => {
        const href = normalizeFileHref(file.href);
        if (!href || !file.label.trim()) return;
        links.push({
            id: `brochure-${index}`,
            kind: "download",
            group: "materials",
            label: file.label.trim(),
            description: file.description?.trim() || "Unduh PDF",
            href,
            download: true,
        });
    });

    const website = normalizeWebUrl(profile.website);
    if (website) {
        links.push({
            id: "website",
            kind: "website",
            group: "more",
            label: "Website Utama",
            description: new URL(website).hostname.replace(/^www\./, ""),
            href: website,
        });
    }

    const instagram = normalizeInstagram(profile.instagram);
    if (instagram) {
        links.push({
            id: "instagram",
            kind: "instagram",
            group: "more",
            label: "Instagram",
            description: "Ikuti kami",
            href: instagram,
        });
    }

    return links;
}