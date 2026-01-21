import ScrollToTop from "@/components/ui/scroll-to-top";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      <div className="w-155 max-w-full px-4">{children}</div>
      <ScrollToTop />
    </div>
  );
}
