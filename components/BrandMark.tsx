import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
  href?: string;
};

export function BrandMark({ compact = false, href = "/" }: BrandMarkProps) {
  return (
    <Link href={href} className="group flex flex-col items-center text-center">
      <Image
        src="/logo.png"
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
