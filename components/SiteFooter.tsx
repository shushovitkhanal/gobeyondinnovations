import Image from "next/image";
import goBeyondLogo from "../public/brands/gobeyond-logo.png";

export function SiteFooter() {
  return <footer className="bg-ink py-10 text-white"><div className="mx-auto flex w-[min(1080px,calc(100%-2rem))] flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"><Image src={goBeyondLogo} width={116} height={54} alt="GoBeyond Innovations" className="h-12 w-auto rounded-lg bg-white p-1" /><p className="text-xs text-white/55">© 2026 GoBeyond Innovations · Nepal</p></div></footer>;
}
