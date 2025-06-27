import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

import "./globals.css";

const playfair = Playfair_Display({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: "chuyện mình kể",
  description: "chuyện mình kể, còn mình là ai thì không quan trọng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={playfair.className}>{children}</body>
    </html>
  );
}
