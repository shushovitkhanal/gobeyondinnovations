"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const background = useTransform(scrollY, [0, 60], ["rgba(255,255,255,0)", "rgba(255,255,255,.92)"]);
  return <motion.header style={{ background }} className="fixed inset-x-0 top-0 z-50 border-b border-transparent backdrop-blur-xl">
    <nav className="mx-auto flex h-20 w-[min(1180px,calc(100%-2rem))] items-center justify-between" aria-label="Main navigation">
      <a href="/" aria-label="GoBeyond Innovations home"><Image src="/brands/gobeyond-logo.png" width={122} height={56} priority alt="GoBeyond Innovations" className="h-12 w-auto object-contain" /></a>
      <div className="hidden items-center gap-8 text-sm font-bold text-ink md:flex"><a href="/#pathway">Curriculum</a><a href="/#experience">Learning experience</a><a href="/#impact">Impact</a><a href="/verify" className="text-cobalt transition hover:text-ink">Verify a teacher</a><a href="/#contact" className="rounded-full border border-ink px-4 py-2.5 transition hover:border-cobalt hover:bg-cobalt hover:text-white">Partner with us ↗</a></div>
      <a href="/verify" className="rounded-full border border-ink px-3 py-2 text-xs font-bold md:hidden">Verify ↗</a>
    </nav>
  </motion.header>;
}
