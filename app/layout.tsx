import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoBeyond Innovations | AI, Cloud & Cybersecurity for Nepal schools",
  description: "A GoBeyond Innovations learning pathway for Grades 6–12, delivered by an IBM Silver Business Partner.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
