import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paxá",
  description: "Desenvolvedor FullStack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <header className="sticky z-50 bg-gray-300 top-0 p-4">
            header contents
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="sticky z-50 bg-gray-300 bottom-0 p-4">
            footer contents
          </footer>
        </div>
      </body>
    </html>
  );
}
