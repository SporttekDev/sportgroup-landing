import { cn } from "@/lib/utils";

interface CmsContentProps {
    /**
     * HTML yang SUDAH disanitasi lewat sanitizeBodyHtml() di lib/cms/utils.ts.
     * Jangan pernah mengisi dengan HTML mentah dari sumber lain.
     */
    html: string;
    className?: string;
}

// Proyek ini belum memakai plugin typography, jadi gaya elemen dari editor
// rich text (daftar, heading, tautan, tabel, dst.) ditulis di sini.
const CONTENT_STYLES = [
    "[&>*+*]:mt-4",
    "[&_a]:font-medium [&_a]:text-navy-800 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-navy-600",
    "[&_b]:font-bold [&_strong]:font-bold",
    "[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1.5 [&_li>ul]:mt-1.5 [&_li>ol]:mt-1.5",
    "[&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-navy-900",
    "[&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-navy-900",
    "[&_h4]:mt-6 [&_h4]:font-display [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-navy-900",
    "[&_h5]:mt-4 [&_h5]:font-semibold [&_h5]:text-navy-900",
    "[&_h6]:mt-4 [&_h6]:text-sm [&_h6]:font-semibold [&_h6]:uppercase [&_h6]:text-navy-700",
    "[&_blockquote]:border-l-4 [&_blockquote]:border-navy-200 [&_blockquote]:pl-4 [&_blockquote]:italic",
    "[&_hr]:border-navy-100",
    "[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-navy-50 [&_pre]:p-4 [&_pre]:text-sm [&_code]:text-sm",
    "[&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_th]:border [&_th]:border-navy-100 [&_th]:bg-navy-50 [&_th]:p-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-navy-100 [&_td]:p-2",
].join(" ");

export function CmsContent({ html, className }: CmsContentProps) {
    return (
        <div
            className={cn(
                "overflow-x-auto text-base leading-relaxed text-navy-600",
                CONTENT_STYLES,
                className
            )}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}