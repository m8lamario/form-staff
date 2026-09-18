import type { StaffRoleId } from "@/lib/staff";
import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, className, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`h-5 w-5 shrink-0 lg:h-[1.15rem] lg:w-[1.15rem] ${className ?? ""}`}
      {...props}
    >
      {children}
    </svg>
  );
}

function RacchettaPalleIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 3.8c-3.6 3.2-3.6 13.2 0 16.4" />
      <path d="M12 3.8c3.6 3.2 3.6 13.2 0 16.4" />
    </Icon>
  );
}

function CassaIcon() {
  return (
    <Icon>
      <rect x="3.2" y="8.2" width="17.6" height="11.2" rx="1.8" />
      <path d="M7.2 8.2V6.6A2.4 2.4 0 0 1 9.6 4.2h4.8a2.4 2.4 0 0 1 2.4 2.4v1.6" />
      <path d="M3.2 13.2h17.6" />
      <circle cx="8.2" cy="16.4" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.4 16.4h6.2" />
    </Icon>
  );
}

function IntervisteIcon() {
  return (
    <Icon>
      <rect x="8.2" y="3.2" width="7.6" height="11.2" rx="3.8" />
      <path d="M6.4 11.2a5.6 5.6 0 0 0 11.2 0" />
      <path d="M12 16.8v3.6" />
      <path d="M8.8 20.4h6.4" />
    </Icon>
  );
}

function GiornaleIcon() {
  return (
    <Icon>
      <path d="M5.2 6.2h10.4A2.2 2.2 0 0 1 17.8 8.4v11H7.2A2 2 0 0 1 5.2 17.4V6.2Z" />
      <path d="M17.8 8.8h1.4A1.6 1.6 0 0 1 20.8 10.4v8.2a1.8 1.8 0 0 1-1.8 1.8h-1.2" />
      <path d="M8 9.4h6.4" />
      <path d="M8 12.2h6.4" />
      <path d="M8 15h4.2" />
    </Icon>
  );
}

function FotografiaIcon() {
  return (
    <Icon>
      <path d="M4.2 8.4h2.1l1.3-2.2h8.8l1.3 2.2h2.1A1.8 1.8 0 0 1 21.6 10.2v8A1.8 1.8 0 0 1 19.8 20H4.2A1.8 1.8 0 0 1 2.4 18.2v-8A1.8 1.8 0 0 1 4.2 8.4Z" />
      <circle cx="12" cy="14.1" r="3.15" />
      <path d="M17.8 10.6h.02" />
    </Icon>
  );
}

function SocialIcon() {
  return (
    <Icon>
      <circle cx="6.2" cy="12" r="2.35" />
      <circle cx="17.4" cy="6.4" r="2.35" />
      <circle cx="17.4" cy="17.6" r="2.35" />
      <path d="M8.3 11.1 15.2 7.4" />
      <path d="M8.3 12.9 15.2 16.6" />
    </Icon>
  );
}

function ButtaFuoriIcon() {
  return (
    <Icon>
      <path d="M12 3.2 19.4 6.2v5.3c0 4.4-3 7.2-7.4 8.9C7.6 18.7 4.6 15.9 4.6 11.5V6.2L12 3.2Z" />
      <path d="M9.1 12.1 11.1 14.1 15.2 9.8" />
    </Icon>
  );
}

const ICONS: Record<StaffRoleId, () => ReactNode> = {
  RACCHETTA_PALLE: RacchettaPalleIcon,
  CASSA: CassaIcon,
  INTERVISTE: IntervisteIcon,
  GIORNALE: GiornaleIcon,
  FOTOGRAFIA: FotografiaIcon,
  SOCIAL: SocialIcon,
  BUTTA_FUORI: ButtaFuoriIcon,
};

export function RoleIcon({ role }: { role: StaffRoleId }) {
  const Glyph = ICONS[role];
  return <Glyph />;
}
