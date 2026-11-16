"use client";

/**
 * Kiriman saya — pelacak kiriman penyelenggara (PRD F6).
 * Menampilkan status tiap kiriman beserta alasan revisi/penolakan dari admin.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { CircleAlert, CircleCheck, Clock } from "lucide-react";
import { OPPORTUNITY_STATUS_LABELS, type Opportunity } from "@/lib/schema";
import { listKirimanSaya } from "@/lib/repository";
import { formatDateShort } from "@/lib/format";
import { useSession } from "@/lib/store";
import { Button } from "@/components/ui";

/** Warna pil status — konsisten dengan antrean admin (docs/components.md §8). */
const STATUS_PILL: Record<string, { cls: string; icon: typeof Clock }> = {
  draf: { cls: "bg-line text-ink-600", icon: Clock },
  menunggu_verifikasi: { cls: "bg-yellow-100 text-ink-800", icon: Clock },
  terverifikasi: { cls: "bg-green-100 text-green-700", icon: CircleCheck },
  kedaluwarsa: { cls: "bg-line text-ink-600", icon: Clock },
  diarsipkan: { cls: "bg-line text-ink-600", icon: Clock },
  perlu_revisi: { cls: "bg-orange-100 text-orange-700", icon: CircleAlert },
  ditolak: { cls: "bg-red-100 text-red-600", icon: CircleAlert },
};

function StatusPill({ status }: { status: Opportunity["status"] }) {
  const meta = STATUS_PILL[status] ?? STATUS_PILL.draf;
  const Icon = meta.icon;
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.cls}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {OPPORTUNITY_STATUS_LABELS[status]}
    </span>
  );
}

export default function SayaClient() {
  const { user } = useSession();
  const [items, setItems] = useState<Opportunity[] | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const list = await listKirimanSaya(user.id);
        if (!cancelled) setItems(list);
      } catch {
        if (!cancelled) setItems([]);
      }
    })();
    return () => {
      cancelled = true;
    };
    // Efek mengikuti id sesi, bukan objek user (menghindari refetch berulang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Tamu: diminta masuk dulu (kiriman terikat pada akun)
  if (!user) {
    return (
      <section className="bg-bg">
        <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center md:px-6">
          <Clock className="h-14 w-14 text-ink-400" aria-hidden="true" />
          <h1 className="mt-5 text-h3 text-ink-900 md:text-[22px]">
            Masuk untuk melihat kiriman Anda
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            Status kiriman kegiatan terikat pada akun penyelenggara yang
            mengirimkannya.
          </p>
          <Button href="/masuk" variant="primary" className="mt-6">
            Masuk
          </Button>
          <p className="mt-4 text-xs text-ink-400">
            <Link
              href="/kirim"
              className="text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
            >
              Belum mengirim? Buka formulir kiriman
            </Link>
          </p>
        </div>
      </section>
    );
  }

  const list = items ?? [];

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-h3 text-ink-900 md:text-[22px]">Kiriman saya</h1>
            <p className="mt-1 text-sm text-ink-600">
              Pantau status kegiatan yang Anda kirim. Verifikasi biasanya selesai
              dalam 2×24 jam.
            </p>
          </div>
          <Button href="/kirim" variant="secondary" size="sm">
            Kirim kegiatan baru
          </Button>
        </div>

        {items === null ? (
          <div className="mt-6 space-y-4" aria-busy="true">
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-lg bg-line" />
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className="mt-6 flex flex-col items-center rounded-lg bg-surface px-6 py-16 text-center shadow-card">
            <Clock className="h-12 w-12 text-ink-400" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-ink-900">
              Belum ada kiriman
            </h2>
            <p className="mt-1 max-w-xs text-sm text-ink-600">
              Bagikan beasiswa, lomba, atau hibah dari organisasi Anda ke ribuan
              pelajar dan mahasiswa.
            </p>
            <Button href="/kirim" variant="primary" className="mt-5">
              Kirim kegiatan
            </Button>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {list.map((o) => (
              <li
                key={o.id}
                className="flex flex-col gap-3 rounded-lg bg-surface p-4 shadow-card sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {o.status === "terverifikasi" ? (
                      <Link
                        href={`/peluang/${o.id}`}
                        className="text-sm font-semibold text-ink-900 hover:text-blue-600 focus-ring rounded-sm"
                      >
                        {o.title}
                      </Link>
                    ) : (
                      <span className="text-sm font-semibold text-ink-900">
                        {o.title}
                      </span>
                    )}
                    <StatusPill status={o.status} />
                  </div>
                  <p className="mt-0.5 text-xs text-ink-600">
                    {o.organizer} • Tenggat {formatDateShort(o.deadline)}
                  </p>
                  {o.rejectionReason && (
                    <p className="mt-2 flex items-start gap-1.5 rounded-md bg-bg p-2.5 text-[13px] text-red-600">
                      <CircleAlert
                        className="mt-0.5 h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="font-semibold">Catatan admin: </span>
                        {o.rejectionReason}
                      </span>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
