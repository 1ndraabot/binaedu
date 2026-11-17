import type { Metadata } from "next";
import { Suspense } from "react";
import PenyelenggaraClient from "./penyelenggara-client";

export const metadata: Metadata = {
  title: "Dashboard Penyelenggara — BinaEdu",
  description:
    "Kelola kegiatan Anda: kirim info baru dan pantau status verifikasi kiriman.",
};

function PenyelenggaraFallback() {
  return (
    <section className="bg-surface" aria-busy="true">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
        <div className="h-7 w-56 animate-pulse rounded-md bg-line" />
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg bg-line" />
          ))}
        </div>
        <div className="mt-6 h-64 animate-pulse rounded-lg bg-line" />
      </div>
    </section>
  );
}

export default function PenyelenggaraPage() {
  return (
    <Suspense fallback={<PenyelenggaraFallback />}>
      <PenyelenggaraClient />
    </Suspense>
  );
}
