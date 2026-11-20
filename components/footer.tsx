/** Footer sesuai docs/layouts.md §11: latar gelap, teks putih, 4 kolom. */
import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Tentang",
    links: [
      { label: "Tentang BinaEdu", href: "/tentang" },
      { label: "Cara kerja verifikasi", href: "/tentang" },
      { label: "Kebijakan privasi", href: "#" },
    ],
  },
  {
    title: "Untuk pengguna",
    links: [
      { label: "Cari peluang", href: "/cari" },
      { label: "Kalender tenggat", href: "/kalender" },
      { label: "Peluang saya", href: "/peluang-saya" },
    ],
  },
  {
    title: "Untuk penyelenggara",
    links: [
      { label: "Kirim info kegiatan", href: "/kirim" },
      { label: "Kemitraan", href: "/kontak" },
    ],
  },
  {
    title: "Kontak",
    links: [
      { label: "halo@binaedu.id", href: "mailto:halo@binaedu.id" },
      { label: "Halaman kontak", href: "/kontak" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center rounded-xl bg-white px-3.5 py-2 shadow-sm focus-ring"
            >
              <img
                src="/logo-binaedu.jpeg"
                alt="BinaEdu — Temukan Peluang, Raih Masa Depan"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Agregator informasi kampus, beasiswa, dan lomba untuk pelajar dan
              mahasiswa. Diperiksa tim kami sebelum tayang.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white focus-ring rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 PT Lentera Bina Teknologi</p>
          <p className="flex gap-4">
            <Link href="#" className="hover:text-white focus-ring rounded-sm">
              Kebijakan privasi
            </Link>
            <Link href="#" className="hover:text-white focus-ring rounded-sm">
              Syarat penggunaan
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}