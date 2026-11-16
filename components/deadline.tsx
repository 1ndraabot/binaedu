/** Label tenggat sesuai docs/components.md §4.5 — selalu ikon jam + teks, bukan warna saja. */
import { Clock } from "lucide-react";
import { deadlineInfo, type DeadlineInfo } from "@/lib/format";

const toneClasses: Record<DeadlineInfo["tone"], string> = {
  normal: "text-ink-600",
  soon: "text-orange-700",
  urgent: "text-red-600 font-semibold",
  ended: "text-ink-400",
};

export function DeadlineLabel({
  iso,
  info,
  className = "",
}: {
  iso?: string;
  info?: DeadlineInfo;
  className?: string;
}) {
  const data = info ?? deadlineInfo(iso!);
  return (
    <p
      className={`flex items-center gap-1.5 ${toneClasses[data.tone]} ${className}`}
    >
      <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{data.text}</span>
    </p>
  );
}
