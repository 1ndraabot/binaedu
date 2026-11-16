import type { Metadata } from "next";
import { Suspense } from "react";
import PeluangSayaClient from "./peluang-saya-client";

export const metadata: Metadata = {
  title: "Peluang Saya — BinaEdu",
  description:
    "Peluang yang kamu simpan beserta status pendaftarannya, dari belum daftar sampai hasil.",
};

function PeluangSayaFallback() {
  return (
    <section className="bg-surface" aria-busy="true">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
        <div className="h-7 w-40 animate-pulse rounded-md bg-line" />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-line" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PeluangSayaPage() {
  return (
    <Suspense fallback={<PeluangSayaFallback />}>
      <PeluangSayaClient />
    </Suspense>
  );
}
