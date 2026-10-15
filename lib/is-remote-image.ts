// lib/is-remote-image.ts
// Sengaja TANPA "server-only": dipakai oleh client component (carousel)
// maupun server component (halaman detail).
//
// Gambar remote (CMS) melewati optimizer Next.js bisa timeout bila CMS lambat,
// jadi dipakai dengan <Image unoptimized />. File lokal di /public tetap dioptimasi.

export const isRemoteImage = (src: string): boolean => /^https?:\/\//i.test(src);