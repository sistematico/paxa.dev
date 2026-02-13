import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext";
import { Nunito } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
  preload: false,
});

export const metadata: Metadata = {
  title: "Paxá",
  description: "Desenvolvedor FullStack",
  openGraph: {
    title: "Paxá",
    description: "Desenvolvedor FullStack",
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
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/images/favicon.svg"
          type="image/svg+xml"
          sizes="any"
        />
      </head>
      <body className={`${nunito.variable} font-(family-name:--font-nunito)`}>
        <AudioPlayerProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto p-2">{children}</main>
            <Footer />
          </div>
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
