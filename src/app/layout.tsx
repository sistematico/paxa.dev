import {Nunito} from "next/font/google";
import {ThemeProvider} from "@/context/ThemeContext";
import {FontSizeProvider} from "@/context/FontSizeContext";
import Header from "@/components/Header";
import type {Metadata} from "next";
import "../styles/main.css";
import Footer from "@/components/Footer";

const nunito = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
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
        alt: "Paxá - Desenvolvedor Web",
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
    <html lang="pt-BR">
    <head>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/favicon.svg"
        sizes="any"
      />
    </head>
    <body className={`${nunito.variable} antialiased min-h-screen`}>
    <ThemeProvider>
      <FontSizeProvider>
        <div className="min-h-screen flex items-center justify-center p-4">
          <main className="w-full max-w-4xl mx-auto">
            <div className="main-container">
              <section className="relative mb-12">
                <Header/>
                {children}
                <Footer/>
              </section>
            </div>
          </main>
        </div>
      </FontSizeProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
