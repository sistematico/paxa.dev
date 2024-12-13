import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "./components/nav";
import { Footer } from "./components/footer";
import "./styles/main.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paxá",
  description: "Full-stack developer, designer, and writer.",
  icons: "https://paxa.dev/images/favicon.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-center justify-center mx-auto h-full`}
      >
        <main className="flex flex-col flex-auto min-w-0 max-w-[640px] w-full my-10">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
