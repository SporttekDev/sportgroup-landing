// Konfigurasi halaman /connect (halaman link untuk QR), satu halaman per
// business line: /connect/sti, /connect/playpro, dst.
//
// Menambah business line baru = menambah satu blok di CONNECT_PROFILES.
// Aturan: tombol yang datanya kosong atau tidak valid otomatis TIDAK dirender,
// jadi aman membiarkan sebagian kolom kosong.

export interface SalesContact {
    /**
     * Kode pendek untuk QR kartu nama: /connect/<slug>?sales=<id>.
     * Bawaan: nama dalam huruf kecil ("Iyan" -> "iyan"). Isi manual bila ada
     * nama kembar. Jangan diubah setelah kartu nama dicetak.
     */
    id?: string;
    /** Nama yang tampil di tombol, mis. "Budi - Sales Konstruksi". */
    name: string;
    /** Keterangan kecil di bawah nama (opsional), mis. "Lapangan & surface". */
    role?: string;
    /** Nomor WhatsApp: boleh 0812..., +62812..., atau 62812.... */
    phone: string;
    /**
     * Ikut rotasi acak di /connect/<slug> atau tidak. Bila minimal satu sales
     * di business line ini bertanda `rotate: true`, rotasi HANYA memakai yang
     * bertanda itu; sales lain tetap bisa dipakai lewat ?sales=<id> (kartu nama).
     * Bila tidak ada yang bertanda, semua sales ikut rotasi.
     */
    rotate?: boolean;
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
    /** Judul grup kontak WhatsApp (bawaan "Hubungi Sales"), mis. "Hubungi Admin". */
    salesHeading?: string;
    sales: SalesContact[];
    brochures: BrochureFile[];
    /** Boleh tanpa "https://". */
    website?: string;
    /** Boleh "@handle", "handle", atau URL lengkap. */
    instagram?: string;
    /** Boleh "@handle", "handle", atau URL lengkap (termasuk tautan pendek vm.tiktok.com). */
    tiktok?: string;
}

export const CONNECT_PROFILES: ConnectProfile[] = [
    {
        slug: "sti",
        name: "Sport Teknologi Indonesia",
        shortName: "STI",
        category: "Sports Contractor",
        tagline: "All-in-One Field, Equipment & Event Solutions",
        logoSrc: "/logos/sport-teknologi-indonesia.png",
        accent: "#630909",
        eventName: "",
        sales: [
            // { name: "Nama Sales", role: "Konstruksi lapangan", phone: "0812xxxxxxxx" },
            // Hanya yang bertanda `rotate: true` ikut rotasi di /connect/sti.
            // Sales tanpa tanda hanya muncul lewat QR kartu nama: /connect/sti?sales=<nama>

            { name: "Sondang", role: "Sales", phone: "081282333766" },
            { name: "Rizky", role: "Sales", phone: "087780216333", rotate: true },
            { name: "Iyan", role: "Sales", phone: "085156239714", rotate: true },
            { name: "Diva", role: "Sales", phone: "085693815606", rotate: true },
        ],
        brochures: [
            { label: "Company Profile STI", href: "/brosur/sti-company-profile.pdf" },
        ],
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
        category: "Multisport Academy",
        tagline: "Program olahraga anak dari usia dini hingga junior. \nBe pro player with Playpro Academy",
        logoSrc: "/logos/playpro-academy.png",
        accent: "#275466",
        eventName: "",
        // Tiap admin melayani wilayahnya sendiri, jadi tampil sebagai daftar
        // tombol (bukan diacak): orang tua di Depok harus tersambung ke admin Depok.
        salesMode: "list",
        salesHeading: "Hubungi Admin",
        // TODO: isi nomor WhatsApp tiap admin. Selama `phone` masih "", tombolnya
        // otomatis disembunyikan.
        sales: [
            { name: "Admin Jakarta", role: "Wilayah Jakarta", phone: "082131111549" },
            { name: "Admin Depok", role: "Wilayah Depok", phone: "082131111549" },
            { name: "Admin Tangerang", role: "Wilayah Tangerang", phone: "082131111549" },
            { name: "Admin Jawa Barat", role: "Bekasi · Karawang · Bandung", phone: "082131111246" },
        ],
        brochures: [],
        website: "https://playpro-academy.id/",
        // TODO: isi akun yang sudah dikonfirmasi (di data lama masih DUMMY).
        instagram: "playproacademy_id",
        tiktok: "playpro.academy",
    },
];

export function getConnectProfile(slug: string): ConnectProfile | undefined {
    return CONNECT_PROFILES.find((profile) => profile.slug === slug);
}

// ---------------------------------------------------------------------------
// Pembentuk daftar tombol
// ---------------------------------------------------------------------------

export type LinkKind = "whatsapp" | "download" | "website" | "instagram" | "tiktok";
export type LinkGroup = "sales" | "materials" | "more";

export interface ConnectLink {
    id: string;
    kind: LinkKind;
    group: LinkGroup;
    label: string;
    description?: string;
    href: string;
    /** Tombol utama (putih solid): tombol sales acak, atau sales tunggal. */
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

// Nama pengguna TikTok: 2-24 karakter (huruf, angka, garis bawah, titik),
// tidak boleh diakhiri titik.
const TIKTOK_HANDLE = /^(?=.{2,24}$)[A-Za-z0-9._]*[A-Za-z0-9_]$/;

export function normalizeTikTok(raw: string | undefined): string | undefined {
    const value = raw?.trim();
    if (!value) return undefined;
    if (/^https?:\/\//i.test(value) || value.includes("/") || /^([a-z]+\.)?tiktok\.com/i.test(value)) {
        return normalizeWebUrl(value);
    }
    const handle = value.replace(/^@/, "");
    return TIKTOK_HANDLE.test(handle) ? `https://www.tiktok.com/@${handle}` : undefined;
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
        : `Halo ${profile.shortName}, saya ingin menanyakan terkait layanan pembangunan lapangan. Apakah ${profile.shortName} dapat membantu kami dalam hal tersebut?`;
}

export interface SalesTarget {
    id: string;
    /** Kode untuk parameter ?sales= (huruf kecil, angka, tanda hubung). */
    key: string;
    name: string;
    role?: string;
    href: string;
    /** Bertanda `rotate: true` pada datanya. */
    rotate: boolean;
}

/** "Iyan" -> "iyan", "Budi S." -> "budi-s". */
export function toSalesKey(raw: string): string {
    return raw
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
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
            key: toSalesKey(contact.id || contact.name),
            name: contact.name.trim(),
            role: contact.role?.trim() || undefined,
            href,
            rotate: contact.rotate === true,
        });
    });
    return targets;
}

/** Sales yang boleh keluar di rotasi acak (lihat `rotate` pada SalesContact). */
export function getRotationTargets(profile: ConnectProfile): SalesTarget[] {
    const targets = getSalesTargets(profile);
    const flagged = targets.filter((target) => target.rotate);
    return flagged.length > 0 ? flagged : targets;
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

/** Cari sales berdasarkan nilai ?sales=. Tidak ketemu/tidak valid -> undefined. */
export function findSalesTarget(
    profile: ConnectProfile,
    rawKey: string | undefined
): SalesTarget | undefined {
    const key = rawKey ? toSalesKey(rawKey) : "";
    if (!key) return undefined;
    return getSalesTargets(profile).find((target) => target.key === key);
}

export function salesRotatePath(profile: ConnectProfile): string {
    return `/connect/${profile.slug}/sales`;
}

/**
 * `salesKey` (dari ?sales=): bila cocok dengan seorang sales, tombol WhatsApp
 * menjadi satu tombol tetap ke sales itu (tidak diacak). Bila tidak cocok,
 * halaman berperilaku seperti biasa, jadi kartu nama lama tidak pernah rusak.
 */
export function buildConnectLinks(profile: ConnectProfile, salesKey?: string): ConnectLink[] {
    const links: ConnectLink[] = [];
    const targets = getSalesTargets(profile);
    const rotation = getRotationTargets(profile);
    const fixed = findSalesTarget(profile, salesKey);

    if (fixed) {
        links.push({
            id: `sales-${fixed.key}`,
            kind: "whatsapp",
            group: "sales",
            label: `Chat ${fixed.name}`,
            description: fixed.role || "Langsung via WhatsApp",
            href: fixed.href,
            primary: true,
        });
    } else if ((profile.salesMode ?? "rotate") === "rotate" && rotation.length > 0) {
        links.push({
            id: "sales-rotate",
            kind: "whatsapp",
            group: "sales",
            label: "Chat dengan Sales",
            description: "Langsung via WhatsApp",
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
                // Beberapa kontak setara (mis. admin per wilayah): jangan
                // menonjolkan yang pertama. Sorotan hanya untuk kontak tunggal.
                primary: targets.length === 1,
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

    const tiktok = normalizeTikTok(profile.tiktok);
    if (tiktok) {
        links.push({
            id: "tiktok",
            kind: "tiktok",
            group: "more",
            label: "TikTok",
            description: "Ikuti kami",
            href: tiktok,
        });
    }

    return links;
}