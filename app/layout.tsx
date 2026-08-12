import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Muyu Liu | Generative AI Researcher",
    template: "%s | Muyu Liu",
  },
  description:
    "Personal homepage of Muyu Liu, a graduate researcher at ShanghaiTech University working on generative model inference, inverse problems, and efficient video generation.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
