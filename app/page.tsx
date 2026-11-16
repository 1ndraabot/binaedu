/**
 * Beranda (halaman pemasaran) — docs/layouts.md §2, gaya docs/style.md.
 * Dekorasi (blob, doodle) hanya di halaman ini dan keadaan kosong.
 */
import {
  Search,
  CalendarClock,
  Sparkles,
  ShieldCheck,
  Play,
  CalendarDays,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
import AnnouncementBanner from "@/components/announcement-banner";
import StatBand from "@/components/stat-band";
import { FeatureCard, CategoryGrid } from "@/components/cards";
import {
  DoodleZigzag,
  DoodleTriangle,
  DoodleCircle,
  DoodleSquare,
  DoodleUnderline,
} from "@/components/doodles";
import {
  BlobFrame,
  MarkerCircle,
  MiniCalendarMock,
  MiniChecklistMock,
  HERO_BLOBS,
} from "@/components/blobs";

const FEATURES = [
  {
    icon: Search,
    color: "blue" as const,
    title: "Satu tempat",
    desc: "Beasiswa, lomba, dan jalur masuk terkumpul rapi di satu dashboard yang mudah dicari.",
  },
  {
    icon: CalendarClock,
    color: "green" as const,
    title: "Kalender tenggat",
    desc: "Semua tenggat tersimpan di kalender dengan pengingat H-7 dan H-1 lewat email.",
  },
  {
    icon: Sparkles,
    color: "pink" as const,
    title: "Rekomendasi untukmu",
    desc: "Isi profil singkat, dapatkan peluang yang paling cocok dengan jurusan dan minatmu.",
  },
  {
    icon: ShieldCheck,
    color: "orange" as const,
    title: "Terverifikasi",
    desc: "Setiap info diperiksa tim kami sebelum tayang. Tanggal pembaruan selalu terlihat.",
  },
];

export default function Home() {
  return (
    <>
      <AnnouncementBanner />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 pt-10 pb-12 md:grid-cols-2 md:px-6 md:pt-16 md:pb-20">
          <div className="relative">
            <Eyebrow>Semua peluang, satu tempat</Eyebrow>
            <h1 className="mt-3 text-display max-w-md text-ink-900 md:max-w-lg md:text-[56px]">
              Semua peluang kuliahmu,{" "}
              <span className="relative inline-block whitespace-nowrap">
                di satu tempat
                <DoodleUnderline className="absolute -bottom-2 left-0 h-3 w-full text-yellow-400" />
              </span>
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-ink-600">
              Cari beasiswa, lomba, dan jalur masuk yang cocok untukmu. Gratis,
              rapi, dan selalu diperbarui.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              {/* Satu tombol kuning per bagian */}
              <Button href="/cari" variant="primary">
                Mulai
              </Button>
              <a
                href="#"
                className="group flex items-center gap-2.5 text-sm font-medium text-ink-900 focus-ring rounded-full"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 transition-colors duration-200 group-hover:bg-blue-700">
                  <Play
                    className="h-4 w-4 fill-blue-600 text-blue-600 transition-colors duration-200 group-hover:fill-white group-hover:text-white"
                    aria-hidden="true"
                  />
                </span>
                Lihat cara kerja
              </a>
            </div>

            {/* Doodle dekoratif — disembunyikan dari pembaca layar */}
            <DoodleZigzag className="absolute -top-6 right-4 hidden w-10 text-blue-600 lg:block" />
            <DoodleCircle className="absolute -bottom-4 left-56 hidden h-4 text-yellow-400 lg:block" />
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {HERO_BLOBS.map((blob, i) => (
                <div key={i} className="relative">
                  <BlobFrame {...blob} />
                  {i === 1 && <MarkerCircle icon={CalendarDays} />}
                </div>
              ))}
            </div>
            <DoodleTriangle className="absolute -top-4 -right-2 hidden w-9 text-yellow-400 sm:block" />
            <DoodleSquare className="absolute -bottom-3 -left-2 hidden w-8 text-blue-600 sm:block" />
          </div>
        </div>
      </section>

      {/* ===== Pita statistik ===== */}
      <StatBand />

      {/* ===== Manfaat ===== */}
      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-h2 text-ink-900 md:text-[32px]">Kenapa BinaEdu?</h2>
            <p className="mt-3 text-ink-600">
              Empat alasan pelajar dan mahasiswa memantau peluang di sini.
            </p>
          </div>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <li key={feature.title}>
                <FeatureCard {...feature} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Bagian gambar-teks selang-seling ===== */}
      <section className="bg-bg py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] space-y-16 px-4 md:px-6 md:space-y-20">
          {/* 1: kalender & pengingat (gambar kiri, teks kanan) */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="relative mx-auto w-fit">
              <MiniCalendarMock />
              <DoodleCircle className="absolute -top-3 -right-3 h-4 text-cyan-100" />
            </div>
            <div>
              <Eyebrow>Jangan sampai terlewat</Eyebrow>
              <h2 className="mt-2 text-h2 text-ink-900 md:text-[32px]">
                Tenggat di kalender, pengingat ke email
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-ink-600">
                Simpan peluang yang menarik. Kami ingatkan lewat email pada H-7
                dan H-1, sesuai zona waktu WIB.
              </p>
              <Button href="/cari" variant="primary" className="mt-6">
                Cari peluang
              </Button>
            </div>
          </div>

          {/* 2: rekomendasi & syarat (teks kiri, gambar kanan) */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <Eyebrow>Cocok denganmu</Eyebrow>
              <h2 className="mt-2 text-h2 text-ink-900 md:text-[32px]">
                Rekomendasi sesuai profilmu
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-ink-600">
                Isi jenjang, jurusan, dan IPK-mu sekali saja. Kami tandai syarat
                mana yang sudah dan belum terpenuhi.
              </p>
              <Button href="#" variant="primary" className="mt-6">
                Isi profil
              </Button>
            </div>
            <div className="relative mx-auto w-fit order-1 md:order-2">
              <MiniChecklistMock />
              <DoodleTriangle className="absolute -right-4 -bottom-4 hidden w-8 text-yellow-400 sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Kategori ===== */}
      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <h2 className="text-h2 text-center text-ink-900 md:text-[32px]">
            Cari peluang menurut kategori
          </h2>
          <div className="mt-8">
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* ===== Ajakan penutup ===== */}
      <section className="bg-blue-600 py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center md:px-6">
          <h2 className="text-h2 mx-auto max-w-xl text-white md:text-[32px]">
            Mulai temukan peluangmu hari ini
          </h2>
          <p className="mt-3 text-white/90">Gratis untuk pelajar dan mahasiswa.</p>
          <Button href="/cari" variant="primary" className="mt-7">
            Mulai sekarang
          </Button>
          <p className="mt-8 text-sm text-white/90">
            Punya lomba atau beasiswa?{" "}
            <a
              href="#"
              className="font-semibold text-yellow-400 underline underline-offset-2 focus-ring rounded-sm"
            >
              Bagikan ke ribuan pelajar
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
