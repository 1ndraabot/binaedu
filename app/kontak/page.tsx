import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, CircleAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak — BinaEdu",
  description: "Hubungi tim BinaEdu untuk pertanyaan, kemitraan, atau laporan data salah.",
};

export default function KontakPage() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-[960px] px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-h1 text-ink-900 md:text-[40px]">Kontak</h1>
        <p className="mt-3 max-w-xl leading-relaxed text-ink-600">
          Kami membalas setiap pesan dalam 2×24 jam kerja.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg bg-surface p-6 shadow-card">
            <Mail className="h-6 w-6 text-blue-600" aria-hidden="true" />
            <h2 className="mt-3 text-base font-semibold text-ink-900">Email</h2>
            <p className="mt-1 text-sm text-ink-600">
              <a
                href="mailto:halo@binaedu.id"
                className="font-medium text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
              >
                halo@binaedu.id
              </a>
            </p>
          </div>
          <div className="rounded-lg bg-surface p-6 shadow-card">
            <MapPin className="h-6 w-6 text-blue-600" aria-hidden="true" />
            <h2 className="mt-3 text-base font-semibold text-ink-900">
              Kantor
            </h2>
            <p className="mt-1 text-sm text-ink-600">
              Semarang, Jawa Tengah, Indonesia
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-surface p-6 shadow-card">
          <CircleAlert className="h-6 w-6 text-orange-700" aria-hidden="true" />
          <h2 className="mt-3 text-base font-semibold text-ink-900">
            Menemukan data yang salah?
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-600">
            Laporan masuk ke antrean prioritas kami. Kirim tautan halaman peluang
            dan penjelasan singkatnya ke{" "}
            <a
              href="mailto:halo@binaedu.id?subject=Laporan%20data%20salah"
              className="font-medium text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
            >
              halo@binaedu.id
            </a>
            . Terima kasih, laporanmu membantu pengguna lain.
          </p>
        </div>

        <p className="mt-8 text-sm text-ink-600">
          Penyelenggara kegiatan?{" "}
          <Link
            href="/kirim"
            className="font-semibold text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
          >
            Kirim info kegiatan
          </Link>{" "}
          lewat formulir sederhana.
        </p>
      </div>
    </section>
  );
}
