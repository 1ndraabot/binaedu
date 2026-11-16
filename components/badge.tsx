/**
 * Badge status sesuai docs/components.md §4.4 dan content-voice.md §4.3.
 * Badge "Terverifikasi" tidak pernah memakai warna lain.
 */
import { ShieldCheck, AlertTriangle, Megaphone } from "lucide-react";
import type { ReactNode } from "react";

interface BadgeProps {
  icon: ReactNode;
  label: string;
  className: string;
  tooltip?: string;
}

function Badge({ icon, label, className, tooltip }: BadgeProps) {
  return (
    <span
      title={tooltip}
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {icon}
      <span>{label}</span>
    </span>
  );
}

export function VerifiedBadge({ verifiedAt }: { verifiedAt: string }) {
  return (
    <Badge
      icon={<ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />}
      label="Terverifikasi"
      className="bg-green-100 text-green-700"
      tooltip={`Diperiksa tim kami pada ${verifiedAt}`}
    />
  );
}

export function NeedsRecheckBadge() {
  return (
    <Badge
      icon={<AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />}
      label="Perlu dicek ulang"
      className="bg-yellow-100 text-ink-800"
    />
  );
}

export function PromotedBadge() {
  return (
    <Badge
      icon={<Megaphone className="h-3.5 w-3.5" aria-hidden="true" />}
      label="Dipromosikan"
      className="bg-blue-100 text-blue-700"
    />
  );
}
