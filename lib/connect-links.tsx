// Konfigurasi halaman /connect (halaman link untuk QR).
// Edit HANYA file ini untuk mengganti isi halaman.
//
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
    /** Path file di /public (mis. "/brosur/company-profile.pdf") atau URL penuh. */
    href: string;
    description?: string;
}

export const CONNECT = {
    /**
     * Nama acara (opsional). Dipakai di badge header, judul tab, dan teks pesan
     * WhatsApp. Kosongkan ("") setelah acara selesai agar halaman bersifat umum.
     */
    eventName: "Pameran Konstruksi Lapangan",
    /** Nama perusahaan di header halaman. */
    title: "Sport Group Indonesia",
    tagline: "Hubungi tim kami atau unduh brosur langsung dari sini.",
    /** Logo di /public (opsional). Memakai logo putih SGI karena latar halaman gelap. */
    logoSrc: "/logos/sport-group-indonesia-white.png" as string,

    /** Teks awal pesan WhatsApp. Nama acara ditambahkan otomatis. */
    whatsappGreeting: "Halo, saya mengunjungi booth Anda di",

    sales: [
        { name: "Nama Sales", role: "Konstruksi lapangan", phone: "0812xxxxxxxx" },
    ] as SalesContact[],

    brochures: [
        { label: "Company Profile", href: "/brosur/company-profile.pdf" },
    ] as BrochureFile[],

    website: "https://sportteknologi.id" as string,
    instagram: "sporttek.id" as string,
};

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

export function buildConnectLinks(config: typeof CONNECT = CONNECT): ConnectLink[] {
    const links: ConnectLink[] = [];
    const message = config.eventName
        ? `${config.whatsappGreeting} ${config.eventName}. Saya ingin informasi lebih lanjut.`
        : "Halo, saya ingin informasi lebih lanjut.";

    config.sales.forEach((contact, index) => {
        const href = buildWhatsAppUrl(contact.phone, message);
        if (!href || !contact.name.trim()) return;
        links.push({
            id: `sales-${index}`,
            kind: "whatsapp",
            group: "sales",
            label: `Chat ${contact.name.trim()}`,
            description: contact.role?.trim() || "via WhatsApp",
            href,
            primary: links.length === 0,
        });
    });

    config.brochures.forEach((file, index) => {
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

    const website = normalizeWebUrl(config.website);
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

    const instagram = normalizeInstagram(config.instagram);
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