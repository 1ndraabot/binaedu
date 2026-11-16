"use client";

/**
 * Antrean admin — docs/layouts.md §9 & docs/components.md §8.
 * Dua panel: daftar kiri, pratinjau kanan. Laporan "data salah" tab terpisah
 * dan diprioritaskan. Aksi: Setujui (biru), Minta revisi, Tolak (alasan wajib).
 * Tanpa doodle/blob di area ini (layouts.md §1). Aksi nyata ke Supabase;
 * setiap keputusan tercatat di admin_logs (PRD §8 Keamanan).
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { CircleAlert, ShieldCheck, Lock } from "lucide-react";
import {
  OPPORTUNITY_STATUS_LABELS,
  newVerification,
  type AdminLog,
  type Opportunity,
  type OpportunityStatus,
  type Report,
} from "@/lib/schema";
import {
  approveKiriman,
  decideKiriman,
  listAdminLogs,
  listKiriman,
  listReports,
  resolveReport,
} from "@/lib/repository";
import { formatDateShort, todayIso } from "@/lib/format";
import { useSession, useToast } from "@/lib/store";
import { Button } from "@/components/ui";

/** Warna pil status sesuai docs/components.md §8. */
const STATUS_PILL: Record<OpportunityStatus, string> = {
  draf: "bg-line text-ink-600",
  menunggu_verifikasi: "bg-yellow-100 text-ink-800",
  terverifikasi: "bg-green-100 text-green-700",
  kedaluwarsa: "bg-line text-ink-600",
  diarsipkan: "bg-line text-ink-600",
  perlu_revisi: "bg-orange-100 text-orange-700",
  ditolak: "bg-red-100 text-red-600",
};

function StatusPill({ status }: { status: OpportunityStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_PILL[status]}`}
    >
      {OPPORTUNITY_STATUS_LABELS[status]}
    </span>
  );
}

export default function AdminClient() {
  const toast = useToast();
  const { user } = useSession();

  // Akses: hanya role admin (dicek dari baris users milik sesi)
  const [me, setMe] = useState<{ id: string; role: string } | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { getMe } = await import("@/lib/repository");
        const row = await getMe();
        if (!cancelled) setMe(row ? { id: row.id, role: row.role } : null);
      } catch {
        if (!cancelled) setMe(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const isAdmin = me?.role === "admin";

  // Data antrean — hanya dimuat setelah admin terverifikasi
  const [subs, setSubs] = useState<Opportunity[] | null>(null);
  const [reports, setReports] = useState<Report[] | null>(null);
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [tab, setTab] = useState<"kiriman" | "laporan">("kiriman");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [action, setAction] = useState<"revisi" | "tolak" | null>(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    let cancelled = false;
    (async () => {
      try {
        const [kiriman, laporan, logDb] = await Promise.all([
          listKiriman(),
          listReports(),
          listAdminLogs(),
        ]);
        if (cancelled) return;
        setSubs(kiriman);
        setReports(laporan);
        setLogs(logDb);
      } catch {
        if (!cancelled) {
          setSubs([]);
          setReports([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  const list = subs ?? [];
  const selected = list.find((s) => s.id === selectedId) ?? list[0] ?? null;
  const openReports = (reports ?? []).filter((r) => r.status === "menunggu")
    .length;

  /** Setujui → terverifikasi + jadwal verifikasi ulang 14 hari (§6.3 no. 4). */
  async function approve() {
    if (!selected || !me || busy) return;
    setBusy(true);
    const today = todayIso();
    const { lastVerifiedAt, verifiedUntil } = newVerification(today);
    const err = await approveKiriman(selected, me.id, lastVerifiedAt, verifiedUntil);
    setBusy(false);
    if (err) {
      toast("Gagal menyetujui kiriman. Coba lagi sebentar.");
      return;
    }
    setSubs((prev) => (prev ?? []).filter((s) => s.id !== selected.id));
    setSelectedId(null);
    setAction(null);
    toast("Kiriman disetujui dan tayang di dashboard.");
  }

  /** Minta revisi / tolak — alasan wajib, masuk alasan penolakan. */
  async function decide(status: "perlu_revisi" | "ditolak", detail: string) {
    if (!selected || !me || busy) return;
    setBusy(true);
    const err = await decideKiriman(selected, status, detail, me.id);
    setBusy(false);
    if (err) {
      toast("Gagal menyimpan keputusan. Coba lagi sebentar.");
      return;
    }
    setSubs((prev) =>
      (prev ?? []).map((s) =>
        s.id === selected.id
          ? { ...s, status, rejectionReason: detail }
          : s
      )
    );
    setAction(null);
    setReason("");
    toast(status === "ditolak" ? "Kiriman ditolak." : "Permintaan revisi terkirim.");
  }

  /** Tandai laporan selesai (antrean prioritas, §6.3 no. 5). */
  async function resolve(r: Report) {
    if (busy) return;
    setBusy(true);
    const err = await resolveReport(r.id, todayIso());
    setBusy(false);
    if (err) {
      toast("Gagal menandai laporan. Coba lagi sebentar.");
      return;
    }
    setReports((prev) =>
      (prev ?? []).map((x) =>
        x.id === r.id
          ? { ...x, status: "selesai" as const, resolvedAt: todayIso() }
          : x
      )
    );
    toast("Laporan ditandai selesai.");
  }

  /* ---------- Tampilan non-admin ---------- */
  if (me === null) {
    return (
      <section className="bg-bg">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6">
          <div className="h-6 w-56 animate-pulse rounded-md bg-line" />
          <div className="mt-6 h-64 animate-pulse rounded-lg bg-line" />
        </div>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="bg-bg">
        <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center md:px-6">
          <Lock className="h-14 w-14 text-ink-400" aria-hidden="true" />
          <h1 className="mt-5 text-h3 text-ink-900 md:text-[22px]">
            Halaman khusus admin
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            Antrean verifikasi hanya dapat diakses tim BinaEdu. Masuk dengan akun
            admin untuk melanjutkan.
          </p>
          <Button href="/masuk" variant="primary" className="mt-6">
            Masuk
          </Button>
          <p className="mt-4 text-xs text-ink-400">
            <Link
              href="/"
              className="text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
            >
              Kembali ke beranda
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
        <h1 className="text-h3 text-ink-900 md:text-[22px]">Antrean verifikasi</h1>
        <p className="mt-1 text-sm text-ink-600">
          Periksa kiriman sebelum tayang. Target waktu verifikasi maksimal 2×24 jam.
        </p>

        {/* Tab kiriman / laporan */}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            aria-pressed={tab === "kiriman"}
            onClick={() => {
              setTab("kiriman");
              setSelectedId(null);
            }}
            className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 focus-ring ${
              tab === "kiriman"
                ? "border-transparent bg-blue-600 text-white"
                : "border-line bg-surface text-ink-800 hover:bg-bg"
            }`}
          >
            Kiriman (
            {list.filter((s) => s.status === "menunggu_verifikasi").length}
            )
          </button>
          <button
            type="button"
            aria-pressed={tab === "laporan"}
            onClick={() => setTab("laporan")}
            className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 focus-ring ${
              tab === "laporan"
                ? "border-transparent bg-blue-600 text-white"
                : "border-line bg-surface text-ink-800 hover:bg-bg"
            }`}
          >
            Laporan data salah
            {openReports > 0 && (
              <span
                aria-hidden="true"
                className="flex h-5 items-center rounded-full bg-red-100 px-1.5 text-[11px] font-semibold text-red-600"
              >
                {openReports}
              </span>
            )}
          </button>
        </div>

        {tab === "kiriman" ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Daftar kiri: tabel padat */}
            <div className="overflow-x-auto rounded-lg border border-line bg-surface">
              <table className="w-full min-w-[640px] text-left text-sm">
                <caption className="sr-only">Antrean kiriman peluang</caption>
                <thead>
                  <tr className="border-b border-line text-xs text-ink-600">
                    <th className="px-4 py-3 font-medium">Judul</th>
                    <th className="px-4 py-3 font-medium">Penyelenggara</th>
                    <th className="px-4 py-3 font-medium">Tenggat</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((s) => {
                    const isSelected = s.id === selected?.id;
                    return (
                      <tr
                        key={s.id}
                        onClick={() => {
                          setSelectedId(s.id);
                          setAction(null);
                        }}
                        className={`cursor-pointer border-b border-line transition-colors duration-200 last:border-0 ${
                          isSelected ? "bg-blue-100" : "hover:bg-bg"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-ink-900">
                          {s.title}
                        </td>
                        <td className="px-4 py-3 text-ink-800">{s.organizer}</td>
                        <td className="px-4 py-3 text-ink-600">
                          {formatDateShort(s.deadline)}
                        </td>
                        <td className="px-4 py-3">
                          <StatusPill status={s.status} />
                        </td>
                      </tr>
                    );
                  })}
                  {list.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-ink-600">
                        Tidak ada kiriman menunggu verifikasi.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pratinjau kanan */}
            <aside className="self-start rounded-lg bg-surface p-5 shadow-card">
              {selected ? (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-sm font-semibold text-ink-900">
                      Pratinjau kiriman
                    </h2>
                    <StatusPill status={selected.status} />
                  </div>
                  <p className="mt-3 text-base font-semibold text-ink-900">
                    {selected.title}
                  </p>
                  <p className="mt-1 text-[13px] text-ink-600">
                    {selected.organizer} • {selected.level}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-800">
                    {selected.summary}
                  </p>
                  <dl className="mt-4 space-y-2 border-t border-line pt-4 text-[13px]">
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-600">Tenggat</dt>
                      <dd className="text-ink-900">
                        {formatDateShort(selected.deadline)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-600">Biaya</dt>
                      <dd className="text-ink-900">
                        {selected.fee === 0
                          ? "Gratis"
                          : `Rp${selected.fee.toLocaleString("id-ID")}`}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-ink-600">Tautan resmi</dt>
                      <dd className="truncate text-blue-600">
                        <a
                          href={selected.officialUrl}
                          className="underline underline-offset-2 focus-ring rounded-sm"
                        >
                          Buka tautan
                        </a>
                      </dd>
                    </div>
                    {selected.rejectionReason && (
                      <div>
                        <dt className="text-ink-600">Alasan</dt>
                        <dd className="mt-1 flex items-start gap-1.5 text-red-600">
                          <CircleAlert
                            className="mt-0.5 h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                          {selected.rejectionReason}
                        </dd>
                      </div>
                    )}
                  </dl>

                  {/* Aksi */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={approve}
                      disabled={selected.status !== "menunggu_verifikasi" || busy}
                    >
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                      Setujui
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAction("revisi");
                        setReason("");
                      }}
                      disabled={selected.status !== "menunggu_verifikasi" || busy}
                    >
                      Minta revisi
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-600"
                      onClick={() => {
                        setAction("tolak");
                        setReason("");
                      }}
                      disabled={selected.status !== "menunggu_verifikasi" || busy}
                    >
                      Tolak
                    </Button>
                  </div>

                  {action && (
                    <div className="mt-4 rounded-md bg-bg p-3">
                      <label
                        htmlFor="alasan"
                        className="text-xs font-medium text-ink-900"
                      >
                        Alasan {action === "tolak" ? "penolakan" : "revisi"} (wajib)
                      </label>
                      <textarea
                        id="alasan"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={3}
                        placeholder="Jelaskan dengan jelas apa yang perlu diperbaiki atau alasan penolakan."
                        className="mt-1.5 w-full rounded-sm border border-line bg-surface px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus-ring"
                      />
                      <div className="mt-2 flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={!reason.trim() || busy}
                          onClick={() =>
                            decide(
                              action === "tolak" ? "ditolak" : "perlu_revisi",
                              reason.trim()
                            )
                          }
                        >
                          Kirim
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setAction(null)}
                        >
                          Batal
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-ink-600">Pilih kiriman dari daftar.</p>
              )}
            </aside>
          </div>
        ) : (
          /* Tab laporan "data salah" — diprioritaskan */
          <div className="mt-6 space-y-4">
            {(reports ?? []).map((r) => (
              <div
                key={r.id}
                className="flex flex-col gap-3 rounded-lg bg-surface p-4 shadow-card sm:flex-row sm:items-center"
              >
                <CircleAlert
                  className="h-5 w-5 shrink-0 text-red-600"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink-900">
                    {r.opportunityTitle ?? r.opportunityId}
                  </p>
                  <p className="mt-0.5 text-sm text-ink-800">{r.message}</p>
                  <p className="mt-0.5 text-xs text-ink-400">
                    Dilaporkan {formatDateShort(r.createdAt)}
                    {r.resolvedAt && ` • Selesai ${formatDateShort(r.resolvedAt)}`}
                  </p>
                </div>
                <span
                  className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    r.status === "selesai"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {r.status === "selesai" ? "Selesai" : "Menunggu"}
                </span>
                {r.status === "menunggu" && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="shrink-0"
                    onClick={() => resolve(r)}
                    disabled={busy}
                  >
                    Tandai selesai
                  </Button>
                )}
              </div>
            ))}
            {(reports ?? []).length === 0 && (
              <p className="rounded-lg bg-surface p-6 text-sm text-ink-600 shadow-card">
                Tidak ada laporan.
              </p>
            )}
          </div>
        )}

        {/* Catatan aktivitas admin (PRD §8 Keamanan) — log dari admin_logs */}
        {logs.length > 0 && (
          <div className="mt-8 rounded-lg bg-surface p-5 shadow-card">
            <h2 className="text-sm font-semibold text-ink-900">
              Catatan aktivitas admin
            </h2>
            <ul className="mt-3 space-y-1.5 text-[13px] text-ink-600">
              {logs.map((log) => (
                <li key={log.id}>
                  {formatDateShort(log.createdAt)} — {log.action.replace("_", " ")}{" "}
                  pada &quot;{log.opportunityId}&quot;: {log.detail}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-8 text-xs text-ink-400">
          <Link
            href="/"
            className="text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
          >
            Kembali ke beranda
          </Link>
        </p>
      </div>
    </section>
  );
}
