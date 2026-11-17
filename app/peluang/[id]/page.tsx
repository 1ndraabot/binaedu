/**
 * Halaman detail peluang — docs/layouts.md §4 (format seragam, PRD F4).
 * Kolom kanan sticky berisi tenggat + aksi; mobile pindah ke atas dengan
 * tombol "Kunjungi situs resmi" menempel di bawah layar.
 * Data diambil dari Supabase; FE memakai slug sebagai id (URL stabil).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowLeft,
  CircleHelp,
  ExternalLink,
} from "lucide-react";
import { CATEGORY_META } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/schema";
import { getCachedOpportunity, getCachedSlugs } from "@/lib/opp-server";
import { locationLabel } from "@/lib/repository";
import { formatFee, formatDateLong } from "@/lib/format";
import {
  PromotedBadge,
} from "@/components/badge";
import SaveButton from "@/components/save-button";
import ReportButton from "@/components/report-button";
import { Button } from "@/components/ui";
import {
  DetailDeadlineLine,
  DetailUpdatedLine,
  DetailVerifyBadge,
} from "@/components/detail-times";

export async function generateStaticParams() {
  const slugs = await getCachedSlugs();
  return slugs.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const opp = await getCachedOpportunity(id);
  if (!opp) return { title: "Tidak ditemukan — BinaEdu" };
  return {
    title: `${opp.title} — BinaEdu`,
    description: opp.summary,
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold text-ink-900 md:text-lg">{title}</h2>
      <div className="mt-3 text-[15px] leading-relaxed text-ink-800">{children}</div>
    </section>
  );
}

export default async function PeluangPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opp = await getCachedOpportunity(id);
  if (!opp) notFound();

  const meta = CATEGORY_META[opp.category];
  const Icon = meta.icon;

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-[960px] px-4 pt-6 pb-28 md:px-6 lg:pb-16">
        {/* Kembali ke hasil */}
        <Link
          href="/cari"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline focus-ring rounded-sm"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke hasil
        </Link>

        {/* Kepala halaman */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.lightBg} ${meta.darkText}`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {CATEGORY_LABELS[opp.category]}
          </span>
          {opp.promoted && <PromotedBadge />}
          {opp.status === "terverifikasi" && (
            <Suspense fallback={null}>
              <DetailVerifyBadge
                lastVerifiedAt={opp.lastVerifiedAt}
                verifiedUntil={opp.verifiedUntil}
              />
            </Suspense>
          )}
        </div>
        <h1 className="mt-3 text-h1 text-ink-900 md:text-[40px]">{opp.title}</h1>
        <p className="mt-2 text-ink-600">
          {opp.organizer} • {locationLabel(opp)} • {opp.level}
        </p>
        <Suspense
          fallback={<div className="mt-1 h-5 w-64 animate-pulse rounded-md bg-line" />}
        >
          <DetailUpdatedLine
            lastUpdatedAt={opp.lastUpdatedAt}
            lastVerifiedAt={opp.lastVerifiedAt}
          />
        </Suspense>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Kolom kanan (di mobile tampil lebih dulu) */}
          <aside className="order-1 self-start lg:order-2 lg:sticky lg:top-24">
            <div className="rounded-lg bg-surface p-5 shadow-card md:p-6">
              <Suspense
                fallback={
                  <div className="h-5 w-52 animate-pulse rounded-md bg-line" />
                }
              >
                <DetailDeadlineLine iso={opp.deadline} />
              </Suspense>
              <p className="mt-1 text-[13px] text-ink-600">
                Biaya pendaftaran: {formatFee(opp.fee)}
              </p>

              {/* Satu tombol kuning per bagian */}
              <Button
                href={opp.officialUrl}
                variant="primary"
                className="mt-4 w-full"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Kunjungi situs resmi
              </Button>
              <div className="mt-3">
                <SaveButton id={opp.id} />
              </div>
              <div className="mt-4">
                <ReportButton slug={opp.id} title={opp.title} />
              </div>

              {/* Kecocokan syarat — muncul bila profil terisi */}
              <div className="mt-6 border-t border-line pt-5">
                <h2 className="text-sm font-semibold text-ink-900">
                  Kecocokan syarat
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {opp.requirements.slice(0, 3).map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm">
                      <CircleHelp
                        className="mt-0.5 h-4 w-4 shrink-0 text-orange-700"
                        aria-hidden="true"
                      />
                      <span className="text-ink-800">
                        {req}
                        <span className="block text-xs text-ink-600">
                          Perlu dicek manual
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-ink-600">
                  Isi profil untuk penilaian otomatis.{" "}
                  <Link
                    href="/profil"
                    className="font-semibold text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
                  >
                    Isi profil
                  </Link>
                </p>
              </div>
            </div>
          </aside>

          {/* Isi utama */}
          <div className="order-2 lg:order-1">
            <Section title="Ringkasan">
              <p>{opp.summary}</p>
            </Section>

            <Section title="Persyaratan">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-ink-400">
                {opp.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Section>

            <Section title="Benefit">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-ink-400">
                {opp.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Section>

            <Section title="Tahapan seleksi">
              <ol className="space-y-3">
                {opp.steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </Section>

            <Section title="Kontak penyelenggara">
              <p>
                {opp.contact}
                <span className="block text-[13px] text-ink-600">
                  Tautan resmi: {opp.officialUrl}
                </span>
              </p>
            </Section>

            <p className="mt-8 border-t border-line pt-4 text-xs text-ink-400">
              Tanggal pembaruan terakhir: {formatDateLong(opp.lastUpdatedAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: tombol utama menempel di bawah layar (layouts.md §4) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface p-3 lg:hidden">
        <Button href={opp.officialUrl} variant="primary" className="w-full">
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Kunjungi situs resmi
        </Button>
      </div>
    </section>
  );
}
