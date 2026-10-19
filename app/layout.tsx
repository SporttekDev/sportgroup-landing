import type { Metadata } from "next";
import { preconnect } from "react-dom";
import { Archivo, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SiteChrome } from "@/components/site-chrome";

// Heading: Archivo — grotesk tegas, terminal kotak, athletic
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Sport Group Indonesia",
  description:
    "Sport Group Indonesia builds the infrastructure, technology, education, venues, capital, and travel experiences that move Indonesian sport forward — under one roof, across seven business lines.",
};

// The browser downloads CMS images straight from the CMS host (unoptimized),
// so open that connection early.
const cmsOrigin = process.env.LARAVEL_API_URL
  ? new URL(process.env.LARAVEL_API_URL).origin
  : null;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (cmsOrigin) preconnect(cmsOrigin);

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <SiteChrome navbar={<Navbar />} footer={<Footer />}>
            {children}
          </SiteChrome>
        </TooltipProvider>
      </body>
    </html>
  );
}