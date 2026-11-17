"use client";

/**
 * Dashboard penyelenggara — pusat kelola kegiatan (PRD F6).
 * Terpisah dari halaman pengguna: ringkasan kiriman, status verifikasi,
 * catatan admin, dan pintasan ke formulir kiriman.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CircleAlert,
  Clock,
  FileText,
  Lock,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";
import { OPPORTUNITY_STATUS_LABELS, type Opportunity } from "@/lib/schema";
import { getMe, listKirimanSaya } from "@/lib/repository";
import { formatDateShort } from "@/lib/format";
import { useSession } from "@/lib/store";
import { Button } from "@/components/ui";

/** Pil status — konsisten dengan dashboard admin (docs/components.md §8). */
const STATUS_PILL: Record<string, { cls: string; icon: typeof Clock }> = {
  draf: { cls: "bg-line text-ink-600", icon: Clock },
  menunggu_verifikasi: { cls: "bg-yellow-100 text-ink-800", icon: Clock },
  terverifikasi: { cls: "bg-green-100 text-green-700", icon: ShieldCheck },
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

/** Panel pembatas akses (tamu / role yang tidak sesuai). */
function AccessPanel({
  title,
  description,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <section className="bg-bg">
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center md:px-6">
        <Lock className="h-14 w-14 text-ink-400" aria-hidden="true" />
        <h1 className="mt-5 text-h3 text-ink-900 md:text-[22px]">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>
        <Button href={ctaHref} variant="primary" className="mt-6">
          {ctaLabel}
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

export default function PenyelenggaraClient() {
  const { user } = useSession();

  // Gate tiga keadaan: undefined = memuat, null = bukan penyelenggara, terisi = aktif
  const [me, setMe] = useState<
    { id: string; role: string; name: string; email: string } | null | undefined
  >(undefined);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const row = await getMe();
        if (!cancelled) {
          setMe(
            row
              ? { id: row.id, role: row.role, name: row.name, email: row.email }
              : null
          );
        }
      } catch {
        if (!cancelled) setMe(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const [items, setItems] = useState<Opportunity[] | null>(null);
  useEffect(() => {
    if (!me?.id) return;
    let cancelled = false;
    (async () => {
      try {
        const list = await listKirimanSaya(me.id);
        if (!cancelled) setItems(list);
      } catch {
        if (!cancelled) setItems([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [me?.id]);

  if (me === undefined) {
    return (
      <section className="bg-surface" aria-busy="true">
        <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
          <div className="h-7 w-56 animate-pulse rounded-md bg-line" />
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-lg bg-line" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (me === null) {
    return (
      <AccessPanel
        title="Masuk sebagai penyelenggara"
        description="Dashboard penyelenggara terikat pada akun panitia, BEM, yayasan, atau institusi yang mengirim kegiatan."
        ctaHref="/masuk"
        ctaLabel="Masuk"
      />
    );
  }

  if (me.role === "pengguna") {
    return (
      <AccessPanel
        title="Halaman khusus penyelenggara"
        description={`Akun Anda (${me.email}) terdaftar sebagai pengguna. Formulir kiriman dan dashboard ini hanya untuk penyelenggara kegiatan.`}
        ctaHref="/cari"
        ctaLabel="Cari peluang"
      />
    );
  }

  const list = items ?? [];
  const menunggu = list.filter((o) => o.status === "menunggu_verifikasi").length;
  const perhatian = list.filter(
    (o) => o.status === "perlu_revisi" || o.status === "ditolak"
  ).length;
  const tayang = list.filter((o) => o.status === "terverifikasi").length;

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-h3 text-ink-900 md:text-[22px]">
              Dashboard penyelenggara
            </h1>
            <p className="mt-1 text-sm text-ink-600">
              Kelola kegiatan Anda dan pantau verifikasi tim BinaEdu.
            </p>
          </div>
          <Button href="/kirim" variant="primary" size="sm">
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            Kirim kegiatan baru
          </Button>
        </div>

        {/* Panel identitas */}
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-line bg-bg p-4">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700"
          >
            {me.name.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-900">{me.name}</p>
            <p className="truncate text-xs text-ink-600">{me.email}</p>
          </div>
          <span className="ml-auto inline-flex shrink-0 rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-semibold text-ink-800">
            Penyelenggara
          </span>
        </div>

        {/* Kartu statistik */}
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-lg bg-surface p-4 shadow-card">
            <FileText className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <p className="mt-2 text-2xl font-bold text-ink-900">{list.length}</p>
            <p className="text-xs text-ink-600">Total kiriman</p>
          </div>
          <div className="rounded-lg bg-surface p-4 shadow-card">
            <Clock className="h-5 w-5 text-orange-700" aria-hidden="true" />
            <p className="mt-2 text-2xl font-bold text-ink-900">{menunggu}</p>
            <p className="text-xs text-ink-600">Menunggu verifikasi</p>
          </div>
          <div className="rounded-lg bg-surface p-4 shadow-card">
            <CircleAlert className="h-5 w-5 text-red-600" aria-hidden="true" />
            <p className="mt-2 text-2xl font-bold text-ink-900">{perhatian}</p>
            <p className="text-xs text-ink-600">Perlu revisi / ditolak</p>
          </div>
          <div className="rounded-lg bg-surface p-4 shadow-card">
            <ShieldCheck className="h-5 w-5 text-green-700" aria-hidden="true" />
            <p className="mt-2 text-2xl font-bold text-ink-900">{tayang}</p>
            <p className="text-xs text-ink-600">Tayang di dashboard</p>
          </div>
        </div>

        {/* Daftar kiriman */}
        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink-900">Kiriman Anda</h2>
          <Link
            href="/kirim/saya"
            className="text-sm font-medium text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
          >
            Lihat semua
          </Link>
        </div>

        {items === null ? (
          <div className="mt-4 space-y-3" aria-busy="true">
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-line" />
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className="mt-4 flex flex-col items-center rounded-lg bg-surface px-6 py-12 text-center shadow-card">
            <FileText className="h-10 w-10 text-ink-400" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-ink-900">
              Belum ada kiriman
            </p>
            <p className="mt-1 max-w-xs text-sm text-ink-600">
              Bagikan beasiswa, lomba, atau hibah dari organisasi Anda ke ribuan
              pelajar dan mahasiswa.
            </p>
            <Button href="/kirim" variant="secondary" size="sm" className="mt-4">
              Kirim kegiatan pertama
            </Button>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {list.slice(0, 4).map((o) => (
              <li
                key={o.id}
                className="rounded-lg bg-surface p-4 shadow-card"
              >
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
                  <span className="ml-auto text-xs text-ink-400">
                    Tenggat {formatDateShort(o.deadline)}
                  </span>
                </div>
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
