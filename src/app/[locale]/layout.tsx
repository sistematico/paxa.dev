import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext";
import { Nunito } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { locales, type Locale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import "../globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
  preload: false,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const safeLocale = (
    locales.includes(locale as Locale) ? locale : defaultLocale
  ) as Locale;
  const dict = await getDictionary(safeLocale);
  const ogLocale = safeLocale === "pt" ? "pt_BR" : "en_US";

  return {
    title: "Paxá",
    description: dict.home.tagline,
    openGraph: {
      title: "Paxá",
      description: dict.home.tagline,
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
      locale: ogLocale,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const safeLocale = (
    locales.includes(locale as Locale) ? locale : defaultLocale
  ) as Locale;
  const dict = await getDictionary(safeLocale);
  const htmlLang = safeLocale === "pt" ? "pt-BR" : "en";

  return (
    <html lang={htmlLang}>
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
            <Header locale={safeLocale} dict={dict} />
            <main className="flex-1 container mx-auto px-4 py-6">
              {children}
            </main>
            <Footer />
          </div>
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
