"use client";

export default function Footer() {
  return (
    <footer className="mt-4 sm:mt-10 mb-14 pt-8 border-t border-[#e5e5e5] text-center text-[#787670] text-xs sm:text-sm">
      <p className="text-[#999792] leading-relaxed">
        chúc bạn đọc một ngày bình yên 🌱
      </p>
      <p>&copy; {new Date().getFullYear()} chuyeminhke</p>
    </footer>
  );
}
