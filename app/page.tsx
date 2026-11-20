/**
- Beranda (halaman pemasaran) — docs/layouts.md §2, gaya docs/style.md.
- Dekorasi (blob, doodle) hanya di halaman ini dan keadaan kosong.
 */
import {
  Search,
  Layers,
  SlidersHorizontal,
  LayoutGrid,
  Play,
  CalendarDays,
  Building2,
  Target,
  Compass,
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
    icon: Layers,
    color: "blue" as const,
    title: "Informasi Terpusat",
    desc: "Berbagai informasi pendidikan tersedia dalam satu platform sehingga pengguna tidak perlu mencari dari banyak sumber secara terpisah.",
  },
  {
    icon: Search,
    color: "green" as const,
    title: "Pencarian Mudah",
    desc: "Temukan informasi yang dibutuhkan melalui fitur pencarian berdasarkan kata kunci.",
  },
  {
    icon: SlidersHorizontal,
    color: "pink" as const,
    title: "Filter Sesuai Kebutuhan",
    desc: "Saring informasi berdasarkan kategori, jenjang pendidikan, maupun tenggat waktu pendaftaran.",
  },
  {
    icon: LayoutGrid,
    color: "orange" as const,
    title: "Tampilan Terorganisir",
    desc: "Informasi disajikan dalam bentuk kartu yang ringkas dan mudah dipahami sehingga pengguna dapat menemukan peluang yang sesuai.",
  },
];

const MISI_LIST = [
  "Mengintegrasikan berbagai informasi pendidikan, beasiswa, kompetisi, dan jalur masuk perguruan tinggi dalam satu platform digital.",
  "Mempermudah pengguna dalam menemukan informasi melalui fitur pencarian dan penyaringan berdasarkan kategori.",
  "Menyajikan informasi pendidikan secara terstruktur agar mudah dipahami dan dimanfaatkan oleh pengguna.",
  "Mendukung pemerataan akses informasi mengenai peluang pendidikan bagi pelajar dan mahasiswa.",
  "Mengembangkan layanan digital yang inovatif sesuai dengan kebutuhan pencari informasi pendidikan.",
];

export default function Home() {
  return (
    <>
      <AnnouncementBanner />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 pt-10 pb-12 md:grid-cols-2 md:px-6 md:pt-16 md:pb-20">
          <div className="relative">
            <Eyebrow>BinaEdu • Temukan Peluang, Raih Masa Depan</Eyebrow>
            <h1 className="mt-3 text-display max-w-md text-ink-900 md:max-w-lg md:text-[56px]">
              Temukan Peluang,{" "}
              <span className="relative inline-block whitespace-nowrap">
                Raih Masa Depan.
                <DoodleUnderline className="absolute -bottom-2 left-0 h-3 w-full text-yellow-400" />
              </span>
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-ink-600">
              Temukan berbagai informasi kampus, beasiswa, dan kompetisi dalam
              satu platform. BinaEdu membantu kamu mendapatkan informasi
              pendidikan secara lebih mudah, praktis, dan terorganisir.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              {/* Satu tombol kuning per bagian */}
              <Button href="/cari" variant="primary">
                Mulai Jelajahi Sekarang
              </Button>
              <a
                href="#tentang-kami"
                className="group flex items-center gap-2.5 text-sm font-medium text-ink-900 focus-ring rounded-full"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 transition-colors duration-200 group-hover:bg-blue-700">
                  <Play
                    className="h-4 w-4 fill-blue-600 text-blue-600 transition-colors duration-200 group-hover:fill-white group-hover:text-white"
                    aria-hidden="true"
                  />
                </span>
                Tentang BinaEdu
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

      {/* ===== Tentang Kami (PT Lentera Bina Teknologi) ===== */}
      <section id="tentang-kami" className="bg-surface py-12 md:py-20">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Kartu Identitas Perusahaan */}
            <div className="relative lg:col-span-5">
              <div className="rounded-3xl bg-blue-600 p-7 text-white shadow-sm md:p-8">
                {/* Logo BinaEdu */}
                <div className="flex items-center justify-center rounded-2xl bg-white px-6 py-4 shadow-sm">
                  <img
                    src="/logo-binaedu.jpeg"
                    alt="Logo BinaEdu — Temukan Peluang, Raih Masa Depan"
                    className="h-24 w-auto object-contain"
                  />
                </div>

                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold tracking-wide">
                    <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Profil Perusahaan
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-bold leading-snug md:text-[28px]">
                  PT Lentera Bina Teknologi
                </h2>
                <p className="mt-1.5 text-sm font-medium text-blue-100">
                  Educational Technology (EdTech) • Pengembang BinaEdu
                </p>

                <div className="my-6 h-px bg-white/20" />

                <p className="text-sm leading-relaxed text-white/95">
                  <span className="font-semibold text-yellow-400">
                    “Temukan Peluang, Raih Masa Depan”
                  </span>{" "}
                  — menghubungkan pelajar dan mahasiswa dengan informasi
                  perguruan tinggi, beasiswa, kompetisi akademik, dan jalur
                  masuk universitas dalam satu tempat.
                </p>
              </div>
              <DoodleCircle className="absolute -bottom-3 -left-3 hidden h-4 text-yellow-400 sm:block" />
            </div>

            {/* Narasi Tentang Kami */}
            <div className="lg:col-span-7">
              <Eyebrow>Tentang Kami</Eyebrow>
              <h2 className="mt-2 text-h2 text-ink-900 md:text-[32px]">
                Solusi Digital untuk Mempermudah Akses Informasi Pendidikan
              </h2>
              <div className="mt-4 space-y-4 text-justify leading-relaxed text-ink-600">
                <p>
                  <strong className="font-semibold text-ink-900">
                    PT Lentera Bina Teknologi
                  </strong>{" "}
                  merupakan perusahaan yang bergerak di bidang{" "}
                  <strong className="font-semibold text-ink-900">
                    Educational Technology (EdTech)
                  </strong>{" "}
                  dengan menghadirkan solusi digital untuk mempermudah akses
                  informasi pendidikan.
                </p>
                <p>
                  Melalui brand{" "}
                  <strong className="font-semibold text-blue-600">
                    BinaEdu
                  </strong>
                  , kami menghadirkan platform agregator informasi yang
                  mengumpulkan berbagai informasi seputar perguruan tinggi,
                  beasiswa, kompetisi akademik, dan jalur masuk universitas
                  dalam satu tempat.
                </p>
                <p>
                  Kami percaya bahwa setiap individu memiliki kesempatan untuk
                  meraih pendidikan dan mengembangkan potensinya. Oleh karena
                  itu, BinaEdu hadir untuk membantu masyarakat menemukan
                  berbagai peluang pendidikan melalui informasi yang lebih mudah
                  diakses, terstruktur, dan praktis.
                </p>
                <p>
                  Dengan memanfaatkan teknologi digital, kami berupaya menjadi
                  penghubung antara pencari informasi dengan berbagai peluang
                  pendidikan yang tersedia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Visi & Misi ===== */}
      <section id="visi-misi" className="bg-bg py-12 md:py-20">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Arah &amp; Komitmen Kami</Eyebrow>
            <h2 className="mt-2 text-h2 text-ink-900 md:text-[32px]">
              Visi &amp; Misi BinaEdu
            </h2>
          </div>

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
            {/* Visi */}
            <div className="rounded-3xl border border-ink-900/10 bg-surface p-7 shadow-sm md:p-8 lg:col-span-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink-900">Visi</h3>
              <p className="mt-3 text-justify leading-relaxed text-ink-600">
                Menjadi platform agregator informasi pendidikan yang terpercaya,
                inovatif, dan mudah diakses untuk memperluas kesempatan
                masyarakat dalam memperoleh informasi serta peluang pendidikan.
              </p>
            </div>

            {/* Misi */}
            <div className="rounded-3xl border border-ink-900/10 bg-surface p-7 shadow-sm md:p-8 lg:col-span-7">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/25 text-ink-900">
                  <Compass className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-ink-900">Misi</h3>
              </div>

              <ol className="mt-6 space-y-4 text-justify">
                {MISI_LIST.map((misi, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed text-ink-600">{misi}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Keunggulan BinaEdu ===== */}
      <section id="keunggulan" className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Keunggulan BinaEdu</Eyebrow>
            <h2 className="mt-2 text-h2 text-ink-900 md:text-[32px]">
              Mengapa Memilih BinaEdu?
            </h2>
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
              <Button href="/profil" variant="primary" className="mt-6">
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

      {/* ===== Ajakan penutup (CTA) ===== */}
      <section className="bg-blue-600 py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center md:px-6">
          <h2 className="text-h2 mx-auto max-w-xl text-white md:text-[32px]">
            Jangan Lewatkan Peluang Pendidikanmu!
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/90">
            Temukan informasi kampus, beasiswa, dan kompetisi yang sesuai dengan
            minat dan tujuanmu bersama BinaEdu.
          </p>
          <Button href="/cari" variant="primary" className="mt-7">
            Mulai Jelajahi Sekarang
          </Button>
          <p className="mt-8 text-sm text-white/90">
            Punya lomba atau beasiswa?{" "}
            <a
              href="/kirim"
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