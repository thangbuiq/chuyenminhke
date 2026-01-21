"use client";

export default function Footer() {
  return (
    <footer className="mt-10 sm:mt-16 mb-20 pt-8 border-t border-[#e5e5e5] text-center text-[#787670] text-xs sm:text-sm">
      <div className="flex flex-col items-center gap-4">
        <p className="text-[#999792] leading-relaxed italic">
          &quot;chúc bạn đọc một ngày bình yên 🌱&quot;
        </p>

        <div className="flex items-center gap-6 mt-2">
          <a
            href="https://github.com/thangbuiq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1d1d1d] transition-colors"
          >
            github
          </a>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <a
            href="mailto:thangbuiq@gmail.com"
            className="hover:text-[#1d1d1d] transition-colors"
          >
            contact
          </a>
        </div>

        <p className="mt-4 text-[10px] uppercase tracking-widest opacity-60">
          &copy; {new Date().getFullYear()} chuyenminhke
        </p>
      </div>
    </footer>
  );
}
