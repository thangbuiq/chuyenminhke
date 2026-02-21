import ScrollToTop from "@/components/ui/scroll-to-top";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[52rem] px-5 sm:px-8">{children}</div>
      <ScrollToTop />
    </div>
  );
}
