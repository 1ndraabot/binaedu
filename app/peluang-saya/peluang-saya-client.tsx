"use client";

/**
 * Peluang Saya — docs/layouts.md §6 (PRD F5).
 * Tab status + kartu peluang padat dengan pemilih status.
 */
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import {
  TRACK_STATUSES,
  TRACK_STATUS_LABELS,
  type Opportunity,
  type TrackStatus,
} from "@/lib/schema";
import { CATEGORY_META } from "@/lib/data";
import { listBySlugs } from "@/lib/repository";
import { daysUntil, deadlineInfo, formatDateShort } from "@/lib/format";
import { useSaved } from "@/lib/store";
import { IconButton } from "@/components/ui";
import { DeadlineLabel } from "@/components/deadline";
import { EmptyCalendarArt } from "@/components/empty-art";

/** Tab tampilan: "Semua", tiga status, dan gabungan hasil. */
const TABS: { value: "Semua" | TrackStatus | "hasil"; label: string }[] = [
  { value: "Semua", label: "Semua" },
  { value: "belum_daftar", label: TRACK_STATUS_LABELS.belum_daftar },
  { value: "sudah_daftar", label: TRACK_STATUS_LABELS.sudah_daftar },
  { value: "tahap_seleksi", label: TRACK_STATUS_LABELS.tahap_seleksi },
  { value: "hasil", label: "Hasil" },
];

export default function PeluangSayaClient() {
  const { savedIds, toggle, statuses, setStatus } = useSaved();
  const [tab, setTab] = useState<(typeof TABS)[number]["value"]>("Semua");

  // Detail peluang tersimpan dari Supabase (slug → peluang)
  const [savedOpps, setSavedOpps] = useState<Opportunity[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await listBySlugs(savedIds);
        if (!cancelled) setSavedOpps(list);
      } catch {
        if (!cancelled) setSavedOpps([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [savedIds]);

  // Urut tampilan mengikuti urutan daftar tersimpan, bukan urutan kueri
  const ordered = useMemo(() => {
    const byId = new Map((savedOpps ?? []).map((o) => [o.id, o]));
    return savedIds
      .map((id) => byId.get(id))
      .filter((o): o is Opportunity => Boolean(o));
  }, [savedOpps, savedIds]);

  const shown = ordered.filter((o) => {
    if (tab === "Semua") return true;
    const status = statuses[o.id] ?? "belum_daftar";
    if (tab === "hasil") return status === "lolos" || status === "tidak_lolos";
    return status === tab;
  });

  const nearest = ordered
    .map((o) => daysUntil(o.deadline))
    .filter((d) => d >= 0)
    .sort((a, b) => a - b)[0];

  if (savedOpps === null) {
    // Kerangka selagi memuat
    return (
      <section className="bg-surface">
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
          <div className="h-6 w-36 animate-pulse rounded-md bg-line" />
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="mt-4 h-20 animate-pulse rounded-lg bg-line"
              aria-hidden="true"
            />
          ))}
        </div>
      </section>
    );
  }

  if (ordered.length === 0) {
    return (
      <section className="bg-surface">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 py-20 text-center md:px-6">
          <EmptyCalendarArt />
          <h1 className="mt-5 text-lg font-semibold text-ink-900">
            Belum ada peluang tersimpan
          </h1>
          <p className="mt-1 max-w-xs text-sm text-ink-600">
            Simpan peluang yang menarik supaya tidak terlewat.
          </p>
          <Link
            href="/cari"
            className="mt-5 inline-flex h-11 items-center rounded-full bg-yellow-400 px-6 font-semibold text-ink-900 hover:bg-yellow-500 focus-ring"
          >
            Cari peluang
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
        <h1 className="text-h3 text-ink-900 md:text-[22px]">Peluang saya</h1>

        {/* Ringkasan (layouts.md §6) */}
        <p className="mt-2 text-sm text-ink-600">
          {ordered.length} peluang tersimpan
          {nearest !== undefined &&
            ` • Tenggat terdekat: ${nearest === 0 ? "hari ini" : `${nearest} hari lagi`}`}
        </p>

        {/* Tab status */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => {
            const selected = tab === t.value;
            return (
              <button
                key={t.value}
                type="button"
                aria-pressed={selected}
                onClick={() => setTab(t.value)}
                className={`inline-flex h-9 shrink-0 items-center rounded-full border px-4 text-sm transition-colors duration-200 focus-ring ${
                  selected
                    ? "border-transparent bg-blue-600 font-semibold text-white"
                    : "border-line bg-surface text-ink-800 hover:bg-bg"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {shown.length === 0 ? (
          <p className="mt-6 rounded-lg bg-surface p-6 text-sm text-ink-600 shadow-card">
            Tidak ada peluang dengan status{" "}
            {tab === "Semua" ? "ini" : `"${TABS.find((t) => t.value === tab)?.label}"`}{" "}
            di antara peluang tersimpanmu.
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {shown.map((o) => {
              const meta = CATEGORY_META[o.category];
              const Icon = meta.icon;
              const status = statuses[o.id] ?? "belum_daftar";
              return (
                <li
                  key={o.id}
                  className="flex flex-col gap-3 rounded-lg bg-surface p-4 shadow-card sm:flex-row sm:items-center"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${meta.lightBg}`}
                  >
                    <Icon className={`h-4 w-4 ${meta.darkText}`} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/peluang/${o.id}`}
                      className="text-sm font-semibold text-ink-900 hover:text-blue-600 focus-ring rounded-sm"
                    >
                      {o.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-ink-600">
                      {o.organizer} • {formatDateShort(o.deadline)}
                    </p>
                    <DeadlineLabel
                      info={deadlineInfo(o.deadline)}
                      className="mt-1 text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-ink-600">
                      <span className="sr-only">Status {o.title}</span>
                      <select
                        value={status}
                        onChange={(e) =>
                          setStatus(o.id, e.target.value as TrackStatus)
                        }
                        className="h-10 rounded-md border border-line bg-surface px-2.5 text-sm text-ink-900 focus-ring"
                      >
                        {TRACK_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {TRACK_STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    </label>
                    <IconButton
                      icon={Bookmark}
                      label="Hapus dari tersimpan"
                      active
                      filled
                      onClick={() => toggle(o.id)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
