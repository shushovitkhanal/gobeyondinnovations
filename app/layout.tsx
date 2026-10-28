import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verify a teacher | GoBeyond Innovations",
  description: "Check whether a teacher has an active GoBeyond Innovations training verification.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
