import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-6 border-t border-line px-6 py-12 text-center md:px-12">
      <div className="flex items-center gap-2">
        <Image src="/brand/logo-mark.png" alt="MA Tech Studio" width={22} height={22} />
        <span className="font-display text-sm font-bold text-ink">MA Tech Studio</span>
      </div>
      <p className="font-sans text-xs text-ink/40">
        &copy; {new Date().getFullYear()} MA Tech Studio &middot; Digital Products, Built Better
      </p>
    </footer>
  );
}
