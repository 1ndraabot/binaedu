import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, CalendarClock, Search } from "lucide-react";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tentang BinaEdu — BinaEdu",
  description:
    "BinaEdu menyatukan informasi beasiswa, lomba, dan jalur masuk dalam satu dashboard yang rapi dan terverifikasi.",
};

const PRINCIPLES = [
  {
    icon: Search,
    title: "Satu sumber rujukan",
    desc: "Informasi yang tadinya tersebar di media sosial, grup chat, dan situs kampus kini terkumpul rapi di satu dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Verifikasi sebagai inti",
    desc: "Setiap peluang diperiksa tim kami sebelum tayang dan diverifikasi ulang secara berkala. Label Terverifikasi dan tanggal pembaruan selalu terlihat.",
  },
  {
    icon: CalendarClock,
    title: "Tenggat tidak terlewat",
    desc: "Kalender tenggat dengan pengingat email H-7 dan H-1 untuk setiap peluang yang kamu simpan.",
  },
];

export default function TentangPage() {
  return (
    <>
      <section className="bg-surface">
        <div className="mx-auto max-w-[960px] px-4 py-12 md:px-6 md:py-16">
          <p className="text-xs font-bold tracking-[0.06em] text-orange-700 uppercase">
            Tentang BinaEdu
          </p>
          <h1 className="mt-3 text-h1 text-ink-900 md:text-[40px]">
            Semua peluang kuliahmu, di satu tempat
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-600">
            BinaEdu adalah platform terpusat yang mengumpulkan, merapikan, dan
            mempersonalisasi informasi peluang akademik: beasiswa, lomba, jalur
            masuk perguruan tinggi, hibah, magang, dan pertukaran. Kami dimulai
            dari Semarang, lalu meluas ke tingkat nasional.
          </p>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">
            Prinsip inti kami sederhana: kepercayaan pada data. Setiap peluang
            harus punya status verifikasi dan tanggal pembaruan yang jelas.
          </p>
          <Button href="/cari" variant="primary" className="mt-7">
            Cari peluang
          </Button>
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-[960px] px-4 py-12 md:px-6 md:py-16">
          <h2 className="text-h2 text-ink-900 md:text-[32px]">Prinsip kami</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="rounded-lg bg-surface p-6 shadow-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600">
                  <p.icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {p.desc}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-lg bg-surface p-6 shadow-card">
            <h2 className="text-base font-semibold text-ink-900">
              BinaEdu dikelola oleh PT Lentera Bina Teknologi
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600">
              Kami bekerja bersama kampus, sekolah, dan penyelenggara kegiatan di
              Semarang untuk menjaga akurasi data. Punya pertanyaan atau ingin
              bermitra?{" "}
              <Link
                href="/kontak"
                className="font-medium text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
              >
                Hubungi kami
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
