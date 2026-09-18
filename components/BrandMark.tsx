import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
  href?: string;
  layout?: "stack" | "row";
};

export function BrandMark({
  compact = false,
  href = "/",
  layout = "stack",
}: BrandMarkProps) {
  if (layout === "row") {
    return (
      <Link href={href} className="group flex min-w-0 items-center gap-2 sm:gap-3">
        <Image
          src="/logo-source.webp"
          alt="Logo Leonessa Cup"
          width={48}
          height={56}
          priority
          className="h-9 w-auto drop-shadow-[0_0_18px_rgba(0,237,175,0.35)] sm:h-10 md:h-12"
        />
        <span className="min-w-0">
          <span className="block font-display text-[17px] tracking-[0.1em] text-white sm:text-xl sm:tracking-[0.12em] md:text-3xl md:tracking-[0.18em]">
            LEONESSA CUP
          </span>
          <span className="block text-[10px] uppercase tracking-[0.22em] text-mint md:text-xs md:tracking-[0.28em]">
            Candidatura staff
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link href={href} className="group flex flex-col items-center text-center">
      <Image
        src="/logo-source.webp"
        alt="Logo Leonessa Cup"
        width={compact ? 88 : 132}
        height={compact ? 102 : 152}
        priority
        className="drop-shadow-[0_0_28px_rgba(0,237,175,0.35)] transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <p
        className={`mt-3 font-display tracking-[0.22em] text-white ${
          compact ? "text-2xl" : "text-4xl sm:text-5xl"
        }`}
      >
        LEONESSA CUP
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.38em] text-mint sm:text-sm">
        {compact ? "Pannello staff" : "Candidatura staff"}
      </p>
    </Link>
  );
}
