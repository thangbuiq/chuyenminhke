import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://chuyenminhke.com"),
  title: "chuyện mình kể",
  description:
    "mình kể lại những mảnh nhỏ của ngày hôm qua, chuyện con mèo đang ngáp, chuyện cà phê chưa kịp nguội, chuyện mình còn giữ trong tim, chuyện mình học làm người.",
  openGraph: {
    title: "chuyện mình kể",
    description:
      "mình kể lại những mảnh nhỏ của ngày hôm qua, chuyện con mèo đang ngáp, chuyện cà phê chưa kịp nguội, chuyện mình còn giữ trong tim, chuyện mình học làm người.",
    images: [
      {
        url: "/og-images/_main.png",
        width: 1200,
        height: 630,
        alt: "chuyện mình kể",
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
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <body className={playfair.className}>{children}</body>
    </html>
  );
}
