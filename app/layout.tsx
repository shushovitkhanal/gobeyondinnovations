import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verify a teacher | GoBeyond Innovations",
  description: "Check whether a teacher has an active GoBeyond Innovations training verification.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;1,400;1,500&display=swap" rel="stylesheet" /></head><body>{children}</body></html>;
}
