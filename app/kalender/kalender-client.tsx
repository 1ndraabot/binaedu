"use client";

/**
 * Kalender tenggat — docs/layouts.md §5 & docs/components.md §6.
 * Default menampilkan peluang tersimpan; tampilan Daftar adalah default mobile.
 * Pengingat masih mock lokal (FE dulu) — nanti tersambung ke backend (PRD F2).
 */
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Opportunity } from "@/lib/schema";
import { listAktif, listBySlugs } from "@/lib/repository";
import {
  daysUntil,
  deadlineInfo,
  formatDateLong,
  formatMonthYear,
} from "@/lib/format";
import { useSaved, useToast } from "@/lib/store";
import { IconButton, Button } from "@/components/ui";
import { DeadlineLabel } from "@/components/deadline";
import { EmptyCalendarArt } from "@/components/empty-art";

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

/** Berlangganan perubahan breakpoint desktop (≥1024 px). */
function subscribeDesktop(cb: () => void) {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Warna titik penanda tenggat sesuai docs/components.md §4.5. */
function dotColor(days: number): string {
  if (days < 0) return "bg-ink-400";
  if (days <= 1) return "bg-red-600";
  if (days <= 7) return "bg-orange-500";
  return "bg-ink-600";
}

export default function KalenderClient() {
  const { savedIds } = useSaved();
  const toast = useToast();

  const now = new Date();
  const todayIso = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const [userView, setUserView] = useState<"bulan" | "daftar" | null>(null);
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => true
  );
  // Mobile: tampilan Daftar sebagai default (layouts.md §5)
  const view = userView ?? (isDesktop ? "bulan" : "daftar");
  const [showAll, setShowAll] = useState(false);
  const [cursor, setCursor] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });
  const [selectedDate, setSelectedDate] = useState(todayIso);
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  // Peluang dari Supabase: tayang semua, atau yang tersimpan (termasuk berakhir)
  const [items, setItems] = useState<Opportunity[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = showAll ? await listAktif() : await listBySlugs(savedIds);
        if (!cancelled) setItems(list);
      } catch {
        if (!cancelled) setItems([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [showAll, savedIds]);

  const itemsByDate = useMemo(() => {
    const map: Record<string, Opportunity[]> = {};
    for (const o of items ?? []) {
      (map[o.deadline] ??= []).push(o);
    }
    return map;
  }, [items]);

  const monthDates = useMemo(() => {
    const { year, month } = cursor;
    const offset = (new Date(year, month, 1).getDay() + 6) % 7; // Senin = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (string | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(`${year}-${pad(month + 1)}-${pad(d)}`);
    }
    return cells;
  }, [cursor]);

  const selectedItems = itemsByDate[selectedDate] ?? [];

  // Tampilan daftar: semua tenggat bulan ini, urut tanggal
  const listGroups = useMemo(() => {
    const prefix = `${cursor.year}-${pad(cursor.month + 1)}`;
    return Object.entries(itemsByDate)
      .filter(([iso]) => iso.startsWith(prefix))
      .sort(([a], [b]) => a.localeCompare(b));
  }, [itemsByDate, cursor]);

  function toggleReminder(id: string) {
    setReminders((prev) => {
      const next = { ...prev, [id]: !(prev[id] ?? true) };
      return next;
    });
    toast(
      (reminders[id] ?? true)
        ? "Pengingat untuk peluang ini dimatikan."
        : "Pengingat H-7 dan H-1 aktif."
    );
  }

  if (items === null) {
    // Kerangka selagi memuat (docs/components.md §9)
    return (
      <section className="bg-surface">
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
          <div className="h-6 w-48 animate-pulse rounded-md bg-line" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="h-96 animate-pulse rounded-lg bg-line" />
            <div className="h-64 animate-pulse rounded-lg bg-line" />
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-surface">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 py-20 text-center md:px-6">
          <EmptyCalendarArt />
          <h1 className="mt-5 text-lg font-semibold text-ink-900">
            Belum ada tenggat
          </h1>
          <p className="mt-1 max-w-xs text-sm text-ink-600">
            Simpan peluang untuk melihat tenggatnya di sini.
          </p>
          <Button href="/cari" variant="primary" className="mt-5">
            Cari peluang
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-h3 text-ink-900 md:text-[22px]">Kalender tenggat</h1>
          <div className="flex items-center gap-2">
            {/* Beralih tampilan Bulan / Daftar */}
            <div
              role="group"
              aria-label="Tampilan kalender"
              className="flex rounded-full border border-line p-1"
            >
              {(["bulan", "daftar"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => setUserView(v)}
                  className={`h-8 rounded-full px-4 text-sm font-medium transition-colors duration-200 focus-ring ${
                    view === v
                      ? "bg-blue-600 text-white"
                      : "text-ink-800 hover:bg-bg"
                  }`}
                >
                  {v === "bulan" ? "Bulan" : "Daftar"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sumber data + navigasi bulan */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            aria-pressed={showAll}
            onClick={() => setShowAll(!showAll)}
            className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 focus-ring ${
              showAll
                ? "border-transparent bg-blue-600 text-white"
                : "border-line bg-surface text-ink-800 hover:bg-bg"
            }`}
          >
            Tampilkan semua peluang
          </button>
          {view === "bulan" && (
            <div className="flex items-center gap-2">
              <IconButton
                icon={ChevronLeft}
                label="Bulan sebelumnya"
                onClick={() =>
                  setCursor((c) =>
                    c.month === 0
                      ? { year: c.year - 1, month: 11 }
                      : { ...c, month: c.month - 1 }
                  )
                }
              />
              <p className="w-40 text-center text-sm font-semibold text-ink-900">
                {formatMonthYear(cursor.year, cursor.month)}
              </p>
              <IconButton
                icon={ChevronRight}
                label="Bulan berikutnya"
                onClick={() =>
                  setCursor((c) =>
                    c.month === 11
                      ? { year: c.year + 1, month: 0 }
                      : { ...c, month: c.month + 1 }
                  )
                }
              />
              <button
                type="button"
                onClick={() => {
                  setCursor({ year: now.getFullYear(), month: now.getMonth() });
                  setSelectedDate(todayIso);
                }}
                className="h-10 rounded-full border border-line bg-surface px-4 text-sm font-medium text-ink-900 hover:bg-bg focus-ring"
              >
                Hari ini
              </button>
            </div>
          )}
        </div>

        {view === "bulan" ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
            {/* Grid bulan */}
            <div>
              <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-line bg-line text-center text-xs font-semibold text-ink-600">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="bg-surface py-2">
                    {d}
                  </div>
                ))}
                {monthDates.map((iso, i) => {
                  if (!iso) return <div key={`x${i}`} className="bg-bg" />;
                  const day = Number(iso.slice(8));
                  const cellItems = itemsByDate[iso] ?? [];
                  const isToday = iso === todayIso;
                  const isSelected = iso === selectedDate;
                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => setSelectedDate(iso)}
                      aria-pressed={isSelected}
                      className={`flex min-h-[64px] flex-col items-center bg-surface px-1 py-1.5 transition-colors duration-200 hover:bg-bg focus-ring md:min-h-[84px] ${
                        isSelected ? "bg-blue-100" : ""
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                          isToday
                            ? "bg-blue-600 font-semibold text-white"
                            : "text-ink-900"
                        }`}
                      >
                        {day}
                      </span>
                      <span className="mt-auto flex gap-0.5 pb-0.5">
                        {cellItems.slice(0, 3).map((o) => (
                          <span
                            key={o.id}
                            aria-hidden="true"
                            className={`h-1.5 w-1.5 rounded-full ${dotColor(daysUntil(o.deadline))}`}
                          />
                        ))}
                        {cellItems.length > 3 && (
                          <span className="text-[9px] leading-3 text-ink-400">
                            +{cellItems.length - 3}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-ink-400">
                Titik penanda: abu (lebih dari 7 hari), oranye (2–7 hari), merah
                (≤1 hari).
              </p>
            </div>

            {/* Daftar tanggal terpilih */}
            <aside className="self-start rounded-lg bg-surface p-5 shadow-card">
              <h2 className="text-sm font-semibold text-ink-900">
                {formatDateLong(selectedDate)}
              </h2>
              {selectedItems.length === 0 ? (
                <p className="mt-3 text-sm text-ink-600">
                  Tidak ada tenggat pada tanggal ini.
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-line">
                  {selectedItems.map((o) => (
                    <li key={o.id} className="flex items-start gap-2 py-3 first:pt-0">
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/peluang/${o.id}`}
                          className="text-sm font-medium text-ink-900 hover:text-blue-600 focus-ring rounded-sm"
                        >
                          {o.title}
                        </Link>
                        <DeadlineLabel
                          info={deadlineInfo(o.deadline)}
                          className="mt-1 text-xs"
                        />
                      </div>
                      <IconButton
                        icon={Bell}
                        label={
                          reminders[o.id] ?? true
                            ? "Matikan pengingat"
                            : "Aktifkan pengingat"
                        }
                        active={reminders[o.id] ?? true}
                        filled={reminders[o.id] ?? true}
                        onClick={() => toggleReminder(o.id)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </aside>
          </div>
        ) : (
          /* Tampilan daftar — dikelompokkan per tanggal */
          <div className="mt-6 space-y-6">
            {listGroups.length === 0 ? (
              <p className="rounded-lg bg-surface p-6 text-sm text-ink-600 shadow-card">
                Tidak ada tenggat pada {formatMonthYear(cursor.year, cursor.month)}.
              </p>
            ) : (
              listGroups.map(([iso, group]) => (
                <div key={iso} className="rounded-lg bg-surface p-5 shadow-card">
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                    <CalendarDays className="h-4 w-4 text-blue-600" aria-hidden="true" />
                    {formatDateLong(iso)}
                  </h2>
                  <ul className="mt-3 divide-y divide-line">
                    {group.map((o) => (
                      <li key={o.id} className="flex items-start gap-2 py-3 first:pt-0">
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/peluang/${o.id}`}
                            className="text-sm font-medium text-ink-900 hover:text-blue-600 focus-ring rounded-sm"
                          >
                            {o.title}
                          </Link>
                          <DeadlineLabel
                            info={deadlineInfo(o.deadline)}
                            className="mt-1 text-xs"
                          />
                        </div>
                        <IconButton
                          icon={Bell}
                          label={
                            reminders[o.id] ?? true
                              ? "Matikan pengingat"
                              : "Aktifkan pengingat"
                          }
                          active={reminders[o.id] ?? true}
                          filled={reminders[o.id] ?? true}
                          onClick={() => toggleReminder(o.id)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
