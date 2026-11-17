"use client";

/**
 * Bagian halaman detail yang bergantung waktu ("hari ini").
 * Dijadikan komponen client agar prerender statis tetap mungkin
 * (nilai `new Date()` tidak stabil di server prerender).
 */
import { deadlineInfo, updatedInfo, formatDateShort, daysUntil } from "@/lib/format";
import { DeadlineLabel } from "@/components/deadline";
import {
  NeedsRecheckBadge,
  VerifiedBadge,
} from "@/components/badge";

export function DetailDeadlineLine({ iso }: { iso: string }) {
  return <DeadlineLabel info={deadlineInfo(iso)} className="text-[15px]" />;
}

export function DetailUpdatedLine({
  lastUpdatedAt,
  lastVerifiedAt,
}: {
  lastUpdatedAt: string;
  lastVerifiedAt: string;
}) {
  return (
    <p className="mt-1 text-[13px] text-ink-600">
      Diperbarui {updatedInfo(lastUpdatedAt).replace("Diperbarui ", "")} •
      Diverifikasi {formatDateShort(lastVerifiedAt)}
    </p>
  );
}

/** Badge status verifikasi: "Perlu dicek ulang" bila melewati batas 14 hari. */
export function DetailVerifyBadge({
  lastVerifiedAt,
  verifiedUntil,
}: {
  lastVerifiedAt: string;
  verifiedUntil: string;
}) {
  return daysUntil(verifiedUntil) < 0 ? (
    <NeedsRecheckBadge />
  ) : (
    <VerifiedBadge verifiedAt={formatDateShort(lastVerifiedAt)} />
  );
}
