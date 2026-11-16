import type { Metadata } from "next";
import { Suspense } from "react";
import DashboardClient from "./dashboard-client";
import { OPPORTUNITIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cari Peluang — BinaEdu",
  description:
    "Cari dan saring beasiswa, lomba, jalur masuk, hibah, magang, dan pertukaran sesuai profilmu.",
};

/** Skeleton saat /cari masih disiapkan (docs/components.md §9: kerangka abu muda). */
function CariFallback() {
  return (
    <section className="bg-surface" aria-busy="true">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
        <div className="h-7 w-36 animate-pulse rounded-md bg-line" />
        <div className="mt-4 h-12 animate-pulse rounded-full bg-line" />
        <div className="mt-4 flex gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-line" />
          ))}
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-52 animate-pulse rounded-lg bg-line" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CariPage() {
  return (
    <Suspense fallback={<CariFallback />}>
      <DashboardClient data={OPPORTUNITIES} />
    </Suspense>
  );
}
