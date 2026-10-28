"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const background = useTransform(scrollY, [0, 60], ["rgba(255,255,255,0)", "rgba(255,255,255,.92)"]);
  return <motion.header style={{ background }} className="fixed inset-x-0 top-0 z-50 border-b border-transparent backdrop-blur-xl">
    <div className="mx-auto flex h-20 w-[min(1080px,calc(100%-2rem))] items-center">
      <a href="/" aria-label="GoBeyond Innovations home"><Image src="/brands/gobeyond-logo.png" width={122} height={56} priority alt="GoBeyond Innovations" className="h-12 w-auto object-contain" /></a>
    </div>
  </motion.header>;
}
