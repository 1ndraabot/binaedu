"use client";

/**
 * Kartu peluang — komponen utama produk (docs/components.md §4.3).
 * Seluruh isi kartu dapat diklik; tombol "Simpan" tetap terpisah.
 * Interaksi simpan masih lokal (FE dulu) — nanti tersambung ke backend.
 */
import { Bookmark } from "lucide-react";
import { CATEGORY_META } from "@/lib/data";
import { CATEGORY_LABELS, type Opportunity } from "@/lib/schema";
import { locationLabel } from "@/lib/repository";
import { deadlineInfo, updatedInfo, daysUntil, formatDateShort } from "@/lib/format";
import {
  VerifiedBadge,
  NeedsRecheckBadge,
  PromotedBadge,
} from "@/components/badge";
import { DeadlineLabel } from "@/components/deadline";
import { IconButton } from "@/components/ui";
import { useSaved } from "@/lib/store";

export default function OpportunityCard({ opp }: { opp: Opportunity }) {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(opp.id);
  const meta = CATEGORY_META[opp.category];
  const Icon = meta.icon;

  return (
    <article className="group flex h-full flex-col rounded-lg bg-surface p-5 shadow-card transition-shadow duration-200 hover:shadow-pop md:p-6">
      <div className="flex items-center justify-between gap-2">
        {/* Chip kategori: pil kecil, latar warna muda, teks gelap */}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.lightBg} ${meta.darkText}`}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {CATEGORY_LABELS[opp.category]}
        </span>
        <span className="inline-flex items-center gap-1.5">
          {opp.promoted && <PromotedBadge />}
          {opp.status === "terverifikasi" &&
            (daysUntil(opp.verifiedUntil) < 0 ? (
              <NeedsRecheckBadge />
            ) : (
              <VerifiedBadge verifiedAt={formatDateShort(opp.lastVerifiedAt)} />
            ))}
        </span>
      </div>

      <h3 className="mt-3 text-lg leading-snug font-semibold">
        <a
          href={`/peluang/${opp.id}`}
          className="text-ink-900 transition-colors duration-200 group-hover:text-blue-600 focus-ring rounded-sm"
        >
          {opp.title}
        </a>
      </h3>
      <p className="mt-1 text-sm text-ink-600">
        {opp.organizer} • {locationLabel(opp)}
      </p>

      <div className="mt-3 space-y-1 pb-5 text-[13px]">
        <DeadlineLabel info={deadlineInfo(opp.deadline)} />
        <p className="text-ink-600">{updatedInfo(opp.lastUpdatedAt)}</p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
        <a
          href={`/peluang/${opp.id}`}
          className="text-sm font-semibold text-blue-600 hover:underline focus-ring rounded-sm"
        >
          Lihat detail
        </a>
        <IconButton
          icon={Bookmark}
          label={saved ? "Hapus dari tersimpan" : "Simpan peluang"}
          active={saved}
          filled={saved}
          onClick={() => toggle(opp.id)}
        />
      </div>
    </article>
  );
}
