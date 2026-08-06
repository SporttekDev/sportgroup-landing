"use client";

// NOTE: the original static file used one IntersectionObserver + a single
// hamburger-toggle script for the whole page, so every section needs client
// interactivity (Framer Motion hooks + useState for the mobile menu). Next.js
// requires the "use client" directive to apply to the whole file it's placed
// in, so — to stay within the "exactly 3 files" constraint — this directive
// sits at the top of page.tsx rather than being isolated to a 4th subcomponent
// file, which is how this would normally be split in a larger app.

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BusinessLinesCarousel } from "@/components/business-lines-carousel";

// ---------- shared motion variants (replaces .reveal / IntersectionObserver) ----------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 0.8, 0.28, 1] },
  },
};

const viewportOnce = { once: true, margin: "0px 0px -60px 0px", amount: 0.15 };

// ---------- content data (kept 1:1 with the original HTML) ----------
const navLinks = [
  { href: "#business-lines", label: "Business Lines" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// Full business-line data (icon, accent color, description) now lives in
// business-lines-carousel.tsx. Only the plain names are still needed here,
// for the footer's "Business lines" quick-link column.
const businessLineNames = [
  "Sport Teknologi Indonesia",
  "PlayPro",
  "PlayPro Academy",
  "PlayPro Sports Arena",
  "lapanganpickle.id",
  "Sport Growth Indonesia",
  "From The Origin",
];

const stats = [
  { num: "7", label: "Integrated business lines" },
  { num: "5", label: "Cities with academy programs" },
  { num: "1", label: "Official Laykold partner in Indonesia" },
  { num: "360°", label: "Coverage — build, play, grow, invest" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ============ NAVBAR ============ */}
      <nav className="navbar fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-[72px]">
            <a
              href="#top"
              className="font-display font-bold text-[1.05rem] tracking-tight text-[var(--navy)]"
            >
              Sport Group Indonesia
            </a>

            {/* Kept as plain anchors (not shadcn NavigationMenu) to preserve the
                custom underline-on-hover .nav-link effect exactly as designed */}
            <div className="hidden md:flex items-center gap-9 text-[0.92rem] font-medium">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <Button
                asChild
                variant="outline"
                className="btn-ghost-navy rounded-full text-sm font-medium border-0 bg-transparent px-5 py-2.5 h-auto"
              >
                <a href="#contact">Partner with us</a>
              </Button>
            </div>

            <button
              id="hamburger"
              className={`hamburger md:hidden ${menuOpen ? "open" : ""}`}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden ${menuOpen ? "flex" : "hidden"} flex-col px-6 pb-6 gap-4 border-t border-[var(--navy-10)]`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            variant="outline"
            className="btn-ghost-navy rounded-full text-sm font-medium border-0 bg-transparent text-center px-5 py-2.5 h-auto mt-1"
          >
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Partner with us
            </a>
          </Button>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section
        id="top"
        className="hero pt-[72px] min-h-[92vh] flex items-center relative"
        style={{ background: "var(--navy)", overflow: "hidden" }}
      >
        {/* abstract court line-art background — kept as CSS keyframe (.draw), a
            one-time load-in animation, not a scroll-triggered effect */}
        {/* <svg
          className="hero-lines absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect className="draw" x="80" y="120" width="1280" height="660" rx="2" />
          <line className="draw draw-d2" x1="720" y1="120" x2="720" y2="780" />
          <line className="draw draw-d2" x1="80" y1="450" x2="1360" y2="450" />
          <rect className="draw draw-d3" x="80" y="330" width="1280" height="240" />
          <line className="draw draw-d3" x1="200" y1="120" x2="200" y2="780" />
          <line className="draw draw-d3" x1="1240" y1="120" x2="1240" y2="780" />
          <circle className="draw draw-d4" cx="720" cy="450" r="230" />
          <circle className="draw draw-d4" cx="150" cy="150" r="60" />
          <circle className="draw draw-d4" cx="1300" cy="760" r="80" />
        </svg> */}

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 w-full py-20">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <h1 className="font-display font-bold text-white text-[2.4rem] leading-[1.08] sm:text-5xl md:text-[3.4rem] md:leading-[1.08]">
              One ecosystem behind every field, court, and game in Indonesia.
            </h1>
            <p className="text-white/70 mt-6 text-base md:text-lg max-w-xl leading-relaxed">
              Sport Group Indonesia builds the infrastructure, technology,
              education, venues, capital, and travel experiences that move
              Indonesian sport forward — under one roof, across seven business
              lines.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button
                asChild
                className="btn-solid rounded-full font-medium text-sm px-7 py-3.5 h-auto"
              >
                <a href="#business-lines">Explore our business lines</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="btn-ghost rounded-full font-medium text-sm px-7 py-3.5 h-auto border-0 bg-transparent"
              >
                <a href="#about">Our story</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ BUSINESS LINES ============ */}
      {/* Decorative background shapes from the static-grid version were dropped
          here — the carousel already carries its own animated pastel
          background per card, and the two together looked visually busy. */}
      <section id="business-lines" className="relative py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <div className="rule mb-6"></div>
            <h2 className="font-display font-bold text-3xl md:text-[2.6rem] leading-tight">
              Seven business lines, one field of play.
            </h2>
            <p className="text-[var(--navy-60)] mt-4 text-base md:text-lg max-w-xl">
              Each unit plays a distinct position — together they cover the
              full lifecycle of sport, from ground-breaking to game day.
            </p>
          </motion.div>

          <motion.div
            className="mt-14"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <BusinessLinesCarousel />
          </motion.div>
        </div>
      </section>

      {/* ============ ABOUT / VALUE PROP ============ */}
      <section id="about" className="about-bg relative py-24 md:py-32 overflow-hidden">
        {/* <svg
          className="absolute -bottom-24 -right-24 opacity-10 pointer-events-none"
          width="500"
          height="500"
          viewBox="0 0 500 500"
        >
          <circle cx="250" cy="250" r="200" fill="none" stroke="var(--white)" strokeWidth="1" />
          <circle cx="250" cy="250" r="140" fill="none" stroke="var(--white)" strokeWidth="1" />
        </svg> */}

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
            >
              <div className="rule rule-white mb-6"></div>
              <h2 className="font-display font-bold text-white text-3xl md:text-[2.6rem] leading-tight">
                Built as one ecosystem, not a portfolio of unrelated bets.
              </h2>
              <p className="text-white/70 mt-6 text-base md:text-lg leading-relaxed">
                From breaking ground on a new court to coaching a child&apos;s
                first serve, from funding community venues to flying fans to
                the world&apos;s biggest matches — every business line feeds
                the next. Construction becomes technology. Technology becomes
                education. Education becomes community. Community becomes
                investment. Investment becomes experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={fadeUp}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.4 } }}
                >
                  <Card className="stat-card glass-dark rounded-2xl p-6 border-[var(--white-18)] hover:border-[var(--white-40)] transition-colors duration-400">
                    <CardContent className="p-0">
                      <div className="stat-num text-white text-4xl md:text-5xl font-bold">
                        {stat.num}
                      </div>
                      <p className="text-white/60 text-sm mt-2">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer
        id="contact"
        className="bg-[var(--navy)] text-white pt-20 pb-8 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          <div className="grid md:grid-cols-4 gap-12 pb-14">
            <div>
              <div className="font-display font-bold text-lg">
                Sport Group Indonesia
              </div>
              <p className="text-white/60 text-sm mt-4 leading-relaxed max-w-xs">
                An integrated sports ecosystem — facilities, technology,
                education, venues, investment, and travel — built for
                Indonesian sport.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="#" className="social-icon" aria-label="Instagram">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="var(--white)" stroke="none" />
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="7" y1="10" x2="7" y2="17" />
                    <circle cx="7" cy="7" r="0.6" fill="var(--white)" stroke="none" />
                    <path d="M11 17v-4a2 2 0 0 1 4 0v4" />
                    <line x1="11" y1="10" x2="11" y2="17" />
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="YouTube">
                  <svg viewBox="0 0 24 24">
                    <rect x="2.5" y="6" width="19" height="12" rx="3" />
                    <path d="M11 10l4 2-4 2v-4z" fill="var(--white)" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <div className="font-medium text-white/90 mb-4 text-sm tracking-wide">
                Quick links
              </div>
              <ul className="space-y-3 text-sm text-white/60">
                <li>
                  <a href="#top">Home</a>
                </li>
                <li>
                  <a href="#business-lines">Business Lines</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-medium text-white/90 mb-4 text-sm tracking-wide">
                Business lines
              </div>
              <ul className="space-y-3 text-sm text-white/60">
                {businessLineNames.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-medium text-white/90 mb-4 text-sm tracking-wide">
                Contact
              </div>
              <ul className="space-y-3 text-sm text-white/60">
                <li>North Bekasi, Indonesia</li>
                <li>hello@sportsgroup.id</li>
              </ul>
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs">
              © 2026 Sport Group Indonesia. All rights reserved.
            </p>
            <div className="court-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}