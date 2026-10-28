import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VerificationLookup } from "@/components/VerificationLookup";

export default function Home() {
  return <main className="min-h-screen overflow-x-clip bg-mist"><SiteHeader />
    <section className="border-b border-ink/10 bg-[linear-gradient(135deg,#ffffff_0%,#f2f6fc_58%,#dbe4ee_100%)] pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="mx-auto grid w-[min(1180px,calc(100%-2rem))] items-start gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <div className="editorial-reveal lg:pt-7"><p className="eyebrow text-cobalt">GOBEYOND INNOVATIONS · TEACHER REGISTRY</p><h1 className="mt-7 max-w-lg text-5xl font-black leading-[.98] tracking-[-.075em] text-ink [text-shadow:0.35px_0_0_currentColor] sm:text-7xl">Training you<br /><em className="font-serif font-normal italic text-cobalt [text-shadow:none]">can trust.</em></h1><p className="mt-8 max-w-md text-base leading-8 text-slate">Confirm a teacher’s active GoBeyond training record using their verification ID or registered email address.</p><div className="mt-10 border-l border-cobalt pl-5 text-sm leading-6 text-slate"><p className="font-semibold text-ink">A clear public record.</p><p className="mt-1.5">Personal documents and certificate files remain protected by GoBeyond.</p></div></div>
        <div className="editorial-reveal editorial-reveal-delay"><VerificationLookup /></div>
      </div>
    </section>
    <section className="bg-white py-16 sm:py-20"><div className="mx-auto w-[min(860px,calc(100%-2rem))]"><p className="eyebrow text-cobalt">HOW VERIFICATION WORKS</p><h2 className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.02] tracking-[-.06em] text-ink sm:text-5xl">A simple record,<br /><em className="font-serif font-normal italic text-cobalt">checked with confidence.</em></h2><ol className="mt-10 border-t border-ink/10"><li className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-ink/10 py-5"><span className="font-mono text-xs text-cobalt">01</span><div><h3 className="font-semibold text-ink">Enter the details</h3><p className="mt-1.5 text-sm leading-6 text-slate">Use the verification ID or the teacher’s registered email address.</p></div></li><li className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-ink/10 py-5"><span className="font-mono text-xs text-cobalt">02</span><div><h3 className="font-semibold text-ink">Check active status</h3><p className="mt-1.5 text-sm leading-6 text-slate">The registry checks that the training record is current and approved.</p></div></li><li className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-ink/10 py-5"><span className="font-mono text-xs text-cobalt">03</span><div><h3 className="font-semibold text-ink">Confirm capability</h3><p className="mt-1.5 text-sm leading-6 text-slate">See the GoBeyond teaching areas associated with the verified record.</p></div></li></ol></div></section>
    <SiteFooter />
  </main>;
}
