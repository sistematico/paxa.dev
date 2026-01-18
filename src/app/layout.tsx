import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Paxá",
  description: "Desenvolvedor Web",
  openGraph: {
    title: "Paxá",
    description: "Desenvolvedor Web",
    url: "https://paxa.dev",
    siteName: "Paxá",
    images: [
      {
        url: "https://paxa.dev/images/favicon.png",
        width: 256,
        height: 256,
        alt: "Paxá",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.className}>
      <body>{children}</body>
    </html>
  );
}
