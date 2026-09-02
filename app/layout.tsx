import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://brucelmy02.github.io"),
  title: {
    default: "Muyu Liu",
    template: "%s | Muyu Liu",
  },
  description:
    "Personal homepage of Muyu Liu, a graduate researcher at ShanghaiTech University working on generative model inference, inverse problems, and efficient video generation.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    title: "Muyu Liu | Generative AI Researcher",
    description:
      "Research on generative model inference, inverse problems, and efficient video generation.",
    images: [
      {
        url: "/og.png",
        width: 1730,
        height: 909,
        alt: "Muyu Liu - Generative AI Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muyu Liu | Generative AI Researcher",
    description:
      "Research on generative model inference, inverse problems, and efficient video generation.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
