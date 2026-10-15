import { NextRequest, NextResponse } from "next/server";
import { getSalesTargets, pickSalesTarget } from "@/lib/connect-links";

// Wajib dinamis: setiap klik harus dihitung ulang, tidak boleh di-cache.
export const dynamic = "force-dynamic";

const COOKIE = "sgi_last_sales";

export function GET(request: NextRequest) {
    const targets = getSalesTargets();
    const last = request.cookies.get(COOKIE)?.value;
    const pick = pickSalesTarget(targets, last);

    // Tidak ada sales valid: kembali ke halaman /connect.
    if (!pick) {
        return NextResponse.redirect(new URL("/connect", request.url), 302);
    }

    const response = NextResponse.redirect(pick.href, 302);
    response.headers.set("Cache-Control", "no-store");
    response.cookies.set(COOKIE, pick.id, {
        path: "/connect",
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        httpOnly: true,
    });
    return response;
}