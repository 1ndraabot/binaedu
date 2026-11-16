import type { Metadata } from "next";
import { Suspense } from "react";
import KalenderClient from "./kalender-client";

export const metadata: Metadata = {
  title: "Kalender Tenggat — BinaEdu",
  description:
    "Semua tenggat peluang yang kamu simpan, lengkap dengan pengingat H-7 dan H-1.",
};

/** Skeleton saat kalender disiapkan (docs/components.md §9). */
function KalenderFallback() {
  return (
    <section className="bg-surface" aria-busy="true">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
        <div className="h-7 w-48 animate-pulse rounded-md bg-line" />
        <div className="mt-4 h-10 w-64 animate-pulse rounded-full bg-line" />
        <div className="mt-6 grid aspect-[7/6] animate-pulse rounded-lg bg-line" />
      </div>
    </section>
  );
}

export default function KalenderPage() {
  return (
    <Suspense fallback={<KalenderFallback />}>
      <KalenderClient />
    </Suspense>
  );
}
