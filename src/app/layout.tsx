// Root layout — html/body are handled in [locale]/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children as React.ReactElement;
}
