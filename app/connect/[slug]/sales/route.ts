import { NextRequest, NextResponse } from "next/server";
import { getConnectProfile, getSalesTargets, pickSalesTarget } from "@/lib/connect-links";

// Wajib dinamis: setiap klik harus dihitung ulang, tidak boleh di-cache.
export const dynamic = "force-dynamic";

const COOKIE = "sgi_last_sales";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const profile = getConnectProfile(slug);

    // Business line tidak dikenal: kembali ke halaman utama /connect.
    if (!profile) {
        return NextResponse.redirect(new URL("/connect", request.url), 302);
    }

    const last = request.cookies.get(COOKIE)?.value;
    const pick = pickSalesTarget(getSalesTargets(profile), last);

    // Belum ada sales valid: kembali ke halaman business line itu.
    if (!pick) {
        return NextResponse.redirect(new URL(`/connect/${profile.slug}`, request.url), 302);
    }

    const response = NextResponse.redirect(pick.href, 302);
    response.headers.set("Cache-Control", "no-store");
    // Cookie dibatasi ke path business line ini, jadi pilihan terakhir
    // tiap business line tidak saling memengaruhi.
    response.cookies.set(COOKIE, pick.id, {
        path: `/connect/${profile.slug}`,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        httpOnly: true,
    });
    return response;
}