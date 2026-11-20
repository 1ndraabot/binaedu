import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Compass,
  Layers,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tentang Kami — BinaEdu | PT Lentera Bina Teknologi",
  description:
    "PT Lentera Bina Teknologi menghadirkan BinaEdu — platform agregator informasi perguruan tinggi, beasiswa, kompetisi akademik, dan jalur masuk universitas.",
};

const MISI_LIST = [
  "Mengintegrasikan berbagai informasi pendidikan, beasiswa, kompetisi, dan jalur masuk perguruan tinggi dalam satu platform digital.",
  "Mempermudah pengguna dalam menemukan informasi melalui fitur pencarian dan penyaringan berdasarkan kategori.",
  "Menyajikan informasi pendidikan secara terstruktur agar mudah dipahami dan dimanfaatkan oleh pengguna.",
  "Mendukung pemerataan akses informasi mengenai peluang pendidikan bagi pelajar dan mahasiswa.",
  "Mengembangkan layanan digital yang inovatif sesuai dengan kebutuhan pencari informasi pendidikan.",
];

const KEUNGGULAN = [
  {
    icon: Layers,
    title: "Informasi Terpusat",
    desc: "Berbagai informasi pendidikan tersedia dalam satu platform sehingga pengguna tidak perlu mencari dari banyak sumber secara terpisah.",
  },
  {
    icon: Search,
    title: "Pencarian Mudah",
    desc: "Temukan informasi yang dibutuhkan melalui fitur pencarian berdasarkan kata kunci.",
  },
  {
    icon: SlidersHorizontal,
    title: "Filter Sesuai Kebutuhan",
    desc: "Saring informasi berdasarkan kategori, jenjang pendidikan, maupun tenggat waktu pendaftaran.",
  },
  {
    icon: LayoutGrid,
    title: "Tampilan Terorganisir",
    desc: "Informasi disajikan dalam bentuk kartu yang ringkas dan mudah dipahami sehingga pengguna dapat menemukan peluang yang sesuai.",
  },
];

export default function TentangPage() {
  return (
    <>
      {/* ===== Intro & Tentang Perusahaan ===== */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[960px] px-4 py-12 md:px-6 md:py-16">
          <div className="grid items-start gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-xs font-bold tracking-[0.06em] text-orange-700 uppercase">
                Tentang Kami • PT Lentera Bina Teknologi
              </p>
              <h1 className="mt-3 text-h1 text-ink-900 md:text-[40px]">
                Temukan Peluang, Raih Masa Depan.
              </h1>

              <div className="mt-5 space-y-4 text-justify leading-relaxed text-ink-600">
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

              <Button href="/cari" variant="primary" className="mt-7">
                Mulai Jelajahi Sekarang
              </Button>
            </div>

            {/* Kartu Logo & Identitas PT */}
            <div className="md:col-span-4">
              <div className="rounded-lg border border-line bg-bg p-6 text-center shadow-card">
                <div className="flex items-center justify-center rounded-md bg-white p-4">
                  <img
                    src="/logo-binaedu.jpeg"
                    alt="Logo BinaEdu — Temukan Peluang, Raih Masa Depan"
                    className="h-24 w-auto object-contain"
                  />
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                  <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>PT Lentera Bina Teknologi</span>
                </div>
                <p className="mt-1 text-xs text-ink-500">
                  Educational Technology (EdTech)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Visi & Misi ===== */}
      <section className="bg-bg">
        <div className="mx-auto max-w-[960px] px-4 py-12 md:px-6 md:py-16">
          <h2 className="text-h2 text-ink-900 md:text-[32px]">
            Visi &amp; Misi BinaEdu
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-12">
            {/* Visi */}
            <div className="rounded-lg bg-surface p-6 shadow-card md:col-span-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600">
                <Target className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink-900">Visi</h3>
              <p className="mt-2 text-justify text-sm leading-relaxed text-ink-600">
                Menjadi platform agregator informasi pendidikan yang terpercaya,
                inovatif, dan mudah diakses untuk memperluas kesempatan
                masyarakat dalam memperoleh informasi serta peluang pendidikan.
              </p>
            </div>

            {/* Misi */}
            <div className="rounded-lg bg-surface p-6 shadow-card md:col-span-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600">
                  <Compass className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-ink-900">Misi</h3>
              </div>
              <ol className="mt-4 space-y-3 text-justify text-sm leading-relaxed text-ink-600">
                {MISI_LIST.map((misi, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                      {idx + 1}
                    </span>
                    <span>{misi}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Keunggulan BinaEdu & Kontak ===== */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[960px] px-4 py-12 md:px-6 md:py-16">
          <h2 className="text-h2 text-ink-900 md:text-[32px]">
            Mengapa Memilih BinaEdu?
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {KEUNGGULAN.map((item) => (
              <li
                key={item.title}
                className="rounded-lg border border-line bg-bg p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600">
                  <item.icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-lg border border-line bg-bg p-6">
            <h3 className="text-base font-semibold text-ink-900">
              BinaEdu dikelola oleh PT Lentera Bina Teknologi
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600">
              Punya pertanyaan, masukan, atau ingin bekerja sama mempublikasikan
              peluang pendidikan?{" "}
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