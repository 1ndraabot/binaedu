"use client";

/**
 * Dashboard & pencarian — docs/layouts.md §3, komponen docs/components.md §5.
 * Tanpa doodle/blob (aturan layouts.md §1). Penyaringan bekerja di atas data Supabase.
 */
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import { CATEGORY_META } from "@/lib/data";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  FIELDS,
  LEVELS,
  SCOPE_LABELS,
  type Category,
  type Opportunity,
} from "@/lib/schema";
import { daysUntil, deadlineInfo } from "@/lib/format";
import { listAktif, listBerakhir } from "@/lib/repository";
import OpportunityCard from "@/components/opportunity-card";
import { Button } from "@/components/ui";
import { DoodleZigzag } from "@/components/doodles";

const SCOPE_OPTIONS: Option[] = [
  { value: "lokal", label: SCOPE_LABELS.lokal },
  { value: "regional", label: SCOPE_LABELS.regional },
  { value: "nasional", label: SCOPE_LABELS.nasional },
];
const FEE_OPTIONS = [
  { value: "gratis", label: "Gratis" },
  { value: "berbayar", label: "Berbayar" },
];
const DEADLINE_OPTIONS = [
  { value: "soon", label: "Segera (≤7 hari)" },
  { value: "month", label: "Bulan ini (8–30 hari)" },
  { value: "ended", label: "Telah berakhir" },
];

type FilterGroups = Record<string, Set<string>>;

interface Option {
  value: string;
  label: string;
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: readonly (string | Option)[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink-900">{title}</p>
      <ul className="mt-2 space-y-2">
        {options.map((opt) => {
          const value = typeof opt === "string" ? opt : opt.value;
          const label = typeof opt === "string" ? opt : opt.label;
          return (
            <li key={value}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-800">
                <input
                  type="checkbox"
                  checked={selected.has(value)}
                  onChange={() => onToggle(value)}
                  className="h-4 w-4 rounded-sm accent-blue-600"
                />
                {label}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-surface px-6 py-16 text-center shadow-card">
      <div className="relative">
        <SearchX className="h-14 w-14 text-ink-400" aria-hidden="true" />
        <DoodleZigzag className="absolute -right-6 -top-2 w-8 text-yellow-400" />
      </div>
      <h2 className="mt-5 text-lg font-semibold text-ink-900">Belum ada yang cocok</h2>
      <p className="mt-1 max-w-xs text-sm text-ink-600">
        Coba ubah kata kunci atau kurangi filter.
      </p>
      <Button variant="secondary" size="sm" className="mt-5" onClick={onClear}>
        Hapus filter
      </Button>
    </div>
  );
}

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") ?? "Semua";

  // Data dari Supabase — dimuat di dalam Suspense (diizinkan membaca waktu)
  const [data, setData] = useState<Opportunity[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    Promise.all([listAktif(), listBerakhir()])
      .then(([aktif, berakhir]) => {
        if (!cancelled) setData([...aktif, ...berakhir]);
      })
      .catch(() => {
        if (!cancelled) setData([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    (CATEGORIES as readonly string[]).includes(initialCategory) ? initialCategory : "Semua"
  );
  const [filters, setFilters] = useState<FilterGroups>({});
  const [sort, setSort] = useState<"deadline" | "newest">("deadline");
  const [visibleCount, setVisibleCount] = useState(9);
  const [sheetOpen, setSheetOpen] = useState(false);

  function toggleFilter(group: string, value: string) {
    setFilters((prev) => {
      const next = { ...prev };
      const set = new Set(next[group] ?? []);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      next[group] = set;
      return next;
    });
  }

  function clearAll() {
    setQuery("");
    setCategory("Semua");
    setFilters({});
  }

  const activeFilterCount = Object.values(filters).reduce(
    (sum, set) => sum + set.size,
    0
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = (data ?? []).filter((o) => {
      if (category !== "Semua" && o.category !== category) return false;
      if (q && !`${o.title} ${o.organizer}`.toLowerCase().includes(q)) return false;
      if (filters.level?.size && !filters.level.has(o.level)) return false;
      if (filters.field?.size && !filters.field.has(o.field)) return false;
      if (filters.scope?.size && !filters.scope.has(o.scope)) return false;
      if (filters.fee?.size && !filters.fee.has(o.fee === 0 ? "gratis" : "berbayar"))
        return false;
      const days = daysUntil(o.deadline);
      if (filters.deadline?.size) {
        const inBucket =
          (filters.deadline.has("soon") && days >= 0 && days <= 7) ||
          (filters.deadline.has("month") && days >= 8 && days <= 30) ||
          (filters.deadline.has("ended") && days < 0);
        if (!inBucket) return false;
      } else if (days < 0) {
        // Peluang yang berakhir disembunyikan otomatis (PRD F1)
        return false;
      }
      return true;
    });
    return [...list].sort((a, b) =>
      sort === "newest"
        ? b.lastUpdatedAt.localeCompare(a.lastUpdatedAt)
        : daysUntil(a.deadline) - daysUntil(b.deadline)
    );
  }, [data, query, category, filters, sort]);

  const soon = filtered.filter((o) => {
    const days = daysUntil(o.deadline);
    return days >= 0 && days <= 7;
  });

  const shown = filtered.slice(0, visibleCount);

  // Belum termuat: kerangka kartu (gaya docs/components.md §9 skeleton)
  if (data === null) {
    return (
      <section className="bg-surface">
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
          <div className="h-6 w-40 animate-pulse rounded-md bg-line" />
          <div className="mt-4 h-12 w-full animate-pulse rounded-full bg-line" />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-lg bg-line"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const filterPanel: ReactNode = (
    <div className="space-y-5">
      <FilterGroup
        title="Jenjang"
        options={LEVELS}
        selected={filters.level ?? new Set()}
        onToggle={(v) => toggleFilter("level", v)}
      />
      <FilterGroup
        title="Bidang"
        options={FIELDS}
        selected={filters.field ?? new Set()}
        onToggle={(v) => toggleFilter("field", v)}
      />
      <FilterGroup
        title="Lokasi"
        options={SCOPE_OPTIONS}
        selected={filters.scope ?? new Set()}
        onToggle={(v) => toggleFilter("scope", v)}
      />
      <FilterGroup
        title="Biaya pendaftaran"
        options={FEE_OPTIONS}
        selected={filters.fee ?? new Set()}
        onToggle={(v) => toggleFilter("fee", v)}
      />
      <FilterGroup
        title="Tenggat"
        options={DEADLINE_OPTIONS}
        selected={filters.deadline ?? new Set()}
        onToggle={(v) => toggleFilter("deadline", v)}
      />
      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="text-sm font-medium text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
        >
          Hapus semua
        </button>
      )}
    </div>
  );

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
        <h1 className="text-h3 text-ink-900 md:text-[22px]">Cari peluang</h1>

        {/* Kolom pencarian — docs/components.md §5.1 */}
        <form
          role="search"
          className="relative mt-4 flex items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <Search
            className="pointer-events-none absolute left-4 h-4 w-4 text-ink-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari beasiswa, lomba, atau jalur masuk"
            aria-label="Cari peluang"
            className="h-12 w-full rounded-full border border-line bg-surface pr-4 pl-11 text-sm text-ink-900 placeholder:text-ink-400 sm:pr-28 focus-ring"
          />
          <Button type="submit" size="sm" className="absolute right-1.5 hidden sm:inline-flex">
            Cari
          </Button>
        </form>

        {/* Chip kategori — mobile: bisa digeser menyamping */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {["Semua", ...CATEGORIES].map((cat) => {
            const selected = category === cat;
            const Icon =
              cat !== "Semua" ? CATEGORY_META[cat as Category].icon : null;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setCategory(cat);
                  setVisibleCount(9);
                }}
                className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors duration-200 focus-ring ${
                  selected
                    ? "border-transparent bg-blue-600 font-semibold text-white"
                    : "border-line bg-surface text-ink-800 hover:bg-bg"
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                {cat === "Semua" ? "Semua" : CATEGORY_LABELS[cat as Category]}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex gap-8 lg:grid lg:grid-cols-[260px_1fr]">
          {/* Panel filter — desktop */}
          <aside
            aria-label="Filter peluang"
            className="sticky top-24 hidden h-fit shrink-0 self-start lg:block lg:w-[260px]"
          >
            {filterPanel}
          </aside>

          {/* Hasil */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-ink-600">
                {filtered.length} peluang
              </p>
              <div className="flex items-center gap-2">
                {/* Mobile: tombol Filter membuka lembar dari bawah */}
                <button
                  type="button"
                  onClick={() => setSheetOpen(true)}
                  aria-haspopup="dialog"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium text-ink-900 focus-ring lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  Filter
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[11px] font-semibold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <label className="flex items-center gap-2 text-sm text-ink-600">
                  <span className="hidden sm:inline">Urutkan:</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as "deadline" | "newest")}
                    aria-label="Urutkan hasil"
                    className="h-10 rounded-md border border-line bg-surface px-3 text-sm text-ink-900 focus-ring"
                  >
                    <option value="deadline">Tenggat terdekat</option>
                    <option value="newest">Terbaru</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Strip "Segera berakhir" — docs/layouts.md §3 */}
            {soon.length > 0 && (
              <div className="mt-4 rounded-lg bg-yellow-100 p-4">
                <p className="text-sm font-semibold text-ink-900">Segera berakhir</p>
                <ul className="mt-2 space-y-1.5">
                  {soon.slice(0, 3).map((o) => {
                    const info = deadlineInfo(o.deadline);
                    return (
                      <li
                        key={o.id}
                        className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm"
                      >
                        <span className="text-ink-800">{o.title}</span>
                        <span
                          className={`shrink-0 font-semibold ${
                            info.tone === "urgent" ? "text-red-600" : "text-orange-700"
                          }`}
                        >
                          {info.text}
                        </span>
                      </li>
                    );
                  })}
                  {soon.length > 3 && (
                    <li className="text-sm text-ink-600">
                      dan {soon.length - 3} lainnya…
                    </li>
                  )}
                </ul>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="mt-6">
                <EmptyState onClear={clearAll} />
              </div>
            ) : (
              <>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {shown.map((opp) => (
                    <OpportunityCard key={opp.id} opp={opp} />
                  ))}
                </div>
                {visibleCount < filtered.length && (
                  <div className="mt-8 text-center">
                    <Button
                      variant="secondary"
                      onClick={() => setVisibleCount((c) => c + 9)}
                    >
                      Muat lebih banyak
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lembar filter dari bawah — mobile */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filter peluang">
          <div
            className="absolute inset-0 bg-ink-900/40"
            onClick={() => setSheetOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-xl bg-surface p-6 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-ink-900">Filter</h2>
              <button
                type="button"
                aria-label="Tutup filter"
                onClick={() => setSheetOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-800 hover:bg-bg focus-ring"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            {filterPanel}
            <Button className="mt-6 w-full" onClick={() => setSheetOpen(false)}>
              Terapkan
            </Button>
          </div>
        </div>
      )}

      {/* Doodle dekoratif dilarang di dashboard (docs/layouts.md §1) */}
    </section>
  );
}
