"use client";

export default function Footer() {
  return (
    <footer className="mt-10 mb-14 pt-8 border-t border-[#e5e5e5] text-center text-[#787670] text-sm">
      <p className="text-sm text-[#999792] leading-relaxed">
        chúc bạn đọc một ngày bình yên và những điều tốt đẹp 🌱
        <br />
        <span className="text-xs">
          mong rằng những dòng chữ nhỏ này có thể mang đến cho bạn chút ấm áp
        </span>
      </p>
      <p>&copy; {new Date().getFullYear()} chuyeminhke</p>
    </footer>
  );
}
