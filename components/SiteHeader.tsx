"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import goBeyondLogo from "../public/brands/gobeyond-logo.png";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { damping: 28, mass: 0.2, stiffness: 180 });
  const background = useTransform(scrollY, [0, 60], ["rgba(239,246,255,.82)", "rgba(239,246,255,.96)"]);
  return <motion.header style={{ background }} className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 backdrop-blur-xl">
    <motion.div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-cobalt" style={{ scaleX: progress, transformOrigin: "0%" }} />
    <div className="mx-auto flex h-20 w-[min(1080px,calc(100%-2rem))] items-center justify-between gap-4">
      <a href="https://gobeyond.com.np" aria-label="Go to GoBeyond Innovations"><Image src={goBeyondLogo} width={122} height={56} priority alt="GoBeyond Innovations" className="h-12 w-auto object-contain" /></a>
      <a href="https://gobeyond.com.np" className="border-b border-cobalt/40 pb-1 text-xs font-medium tracking-[.01em] text-cobalt transition hover:border-ink hover:text-ink sm:text-sm">← Go back to GoBeyond.com.np</a>
    </div>
  </motion.header>;
}
