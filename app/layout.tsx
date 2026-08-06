import type { Metadata } from "next";
import { Sora, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// original HTML loaded Sora (400-800) for headings, Inter (400-600) for body,
// Space Mono (400/700) for the mono badges/stat numbers
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <Navbar />
          {children}
          <Footer />
          {/* <Footer /> */}
        </TooltipProvider>
      </body>
    </html>
  );
}