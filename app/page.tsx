import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VerificationLookup } from "@/components/VerificationLookup";

export default function Home() {
  return <main className="min-h-screen overflow-x-clip bg-mist"><SiteHeader />
    <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_90%_16%,#a7e5ef_0,transparent_22rem),radial-gradient(circle_at_12%_86%,#cce1ff_0,transparent_25rem),linear-gradient(135deg,#fff_0%,#edf5ff_56%,#d7e4f2_100%)] pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div aria-hidden="true" className="absolute right-[8%] top-32 h-52 w-52 rounded-full border-[18px] border-cobalt/10 sm:h-72 sm:w-72" />
      <div className="relative mx-auto grid w-[min(1080px,calc(100%-2rem))] items-start gap-12 lg:grid-cols-[.75fr_1.25fr]">
        <div className="lg:pt-9"><p className="eyebrow text-cobalt">GOBEYOND INNOVATIONS · TEACHER REGISTRY</p><h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-.025em] text-ink sm:text-7xl">Training you<br /><em className="font-serif font-medium text-cobalt">can trust.</em></h1><p className="mt-7 max-w-md text-base leading-8 text-slate">Use a GoBeyond verification ID or a registered email address to confirm that a teacher has an active, verified training record.</p><div className="mt-9 border-l-2 border-cobalt pl-4 text-sm leading-6 text-slate"><p className="font-medium text-ink">Verification, not document access.</p><p className="mt-1">For privacy, certificate files and personal details are held securely by GoBeyond.</p></div></div>
        <VerificationLookup />
      </div>
    </section>
    <section className="bg-white py-16 sm:py-20"><div className="mx-auto grid w-[min(1080px,calc(100%-2rem))] gap-7 md:grid-cols-3"><article><p className="font-mono text-xs text-cobalt">01</p><h2 className="mt-4 text-xl font-semibold tracking-[-.01em]">Enter the details</h2><p className="mt-3 text-sm leading-6 text-slate">Use the verification ID on the teacher’s certificate or their registered email address.</p></article><article><p className="font-mono text-xs text-cobalt">02</p><h2 className="mt-4 text-xl font-semibold tracking-[-.01em]">Check active status</h2><p className="mt-3 text-sm leading-6 text-slate">The registry checks that the training record is active, approved, and still valid.</p></article><article><p className="font-mono text-xs text-cobalt">03</p><h2 className="mt-4 text-xl font-semibold tracking-[-.01em]">Confirm capability</h2><p className="mt-3 text-sm leading-6 text-slate">See the approved areas of teaching and credentials verified by GoBeyond.</p></article></div></section>
    <SiteFooter />
  </main>;
}
