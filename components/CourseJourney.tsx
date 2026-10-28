"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { courseStages } from "@/data/curriculum";

export function CourseJourney() {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });
  const routeWidth = useTransform(smooth, [0.12, 0.86], ["0%", "100%"]);

  return <section id="pathway" ref={target} className="bg-mist py-24 sm:py-32">
    <div className="mx-auto w-[min(1180px,calc(100%-2rem))]">
      <div className="grid gap-5 md:grid-cols-[.7fr_1.3fr] md:gap-16"><p className="eyebrow">THE INTERACTIVE PATHWAY</p><div><h2 className="heading">Scroll through the years.<br /><em>See the depth build.</em></h2><p className="mt-6 max-w-xl leading-7 text-slate">Every step in the curriculum is connected. As students move forward, the tools, questions and evidence of their learning become more sophisticated.</p></div></div>
      <div className="mt-14 grid gap-9 lg:grid-cols-[.78fr_1.22fr]">
        <div className="course-console"><div className="mb-9 flex items-center justify-between"><span className="eyebrow">LEARNING SYSTEM</span><span className="font-mono text-[10px] text-cobalt">SCROLL TO EXPLORE</span></div><div className="relative h-4 overflow-hidden rounded-full bg-cobalt/10"><motion.div style={{ width: routeWidth }} className="h-full rounded-full bg-cobalt" /></div><div className="mt-9 grid grid-cols-2 gap-5 border-t border-ink/10 pt-7"><div><b className="block text-4xl tracking-[-.08em]">7</b><span className="eyebrow text-slate">YEARS CONNECTED</span></div><div><b className="block text-4xl tracking-[-.08em]">406</b><span className="eyebrow text-slate">CONTACT HOURS</span></div></div></div>
        <div className="space-y-3">{courseStages.map((stage, index) => <motion.article key={stage.grade} initial={{ opacity: .25, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .7 }} transition={{ duration: .45, delay: index * .06 }} className="group grid gap-4 rounded-2xl border border-ink/10 bg-white p-5 transition hover:-translate-y-1 hover:border-cobalt/45 hover:shadow-float sm:grid-cols-[76px_1fr_auto] sm:items-center sm:p-6"><span className="text-3xl font-extrabold tracking-[-.1em] text-cobalt">{stage.grade}</span><div><p className="eyebrow text-cobalt">{stage.label} · {stage.modules} MODULES · {stage.hours} HOURS</p><h3 className="mt-2 text-xl font-extrabold tracking-[-.05em]">{stage.name}</h3><p className="mt-2 text-sm leading-6 text-slate">{stage.summary}</p></div><span className="hidden text-2xl text-cobalt sm:block">↗</span></motion.article>)}</div>
      </div>
    </div>
  </section>;
}
