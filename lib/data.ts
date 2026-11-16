/**
 * Mock data peluang untuk pengembangan front-end.
 * Data ini FIKTIF — nanti diganti data nyata dari backend/verifikasi admin.
 * Struktur mengikuti PRD F4 (halaman detail terstandar).
 */
import {
  GraduationCap,
  Trophy,
  DoorOpen,
  HandCoins,
  Briefcase,
  Plane,
  type LucideIcon,
} from "lucide-react";

export type Category =
  | "Beasiswa"
  | "Lomba"
  | "Jalur Masuk"
  | "Hibah"
  | "Magang"
  | "Pertukaran";

export const CATEGORIES: Category[] = [
  "Beasiswa",
  "Lomba",
  "Jalur Masuk",
  "Hibah",
  "Magang",
  "Pertukaran",
];

export type Level = "SMA/SMK" | "Mahasiswa" | "SMA/SMK & Mahasiswa";
export type Scope = "Semarang" | "Nasional";
export type Field =
  | "Umum"
  | "Sains & Teknologi"
  | "Sosial & Humaniora"
  | "Seni & Desain"
  | "Ekonomi & Bisnis";

export const LEVELS: Level[] = ["SMA/SMK", "Mahasiswa", "SMA/SMK & Mahasiswa"];
export const FIELDS: Field[] = [
  "Umum",
  "Sains & Teknologi",
  "Sosial & Humaniora",
  "Seni & Desain",
  "Ekonomi & Bisnis",
];

export interface Opportunity {
  id: string;
  title: string;
  category: Category;
  organizer: string;
  location: string;
  scope: Scope;
  level: Level;
  field: Field;
  /** Biaya pendaftaran dalam rupiah; 0 = gratis. */
  fee: number;
  deadline: string; // ISO yyyy-mm-dd
  updatedAt: string;
  summary: string;
  requirements: string[];
  benefits: string[];
  steps: string[];
  contact: string;
  officialUrl: string;
  verified: boolean;
}

/** Gaya chip/ikon per kategori — warna muda sesuai docs/components.md §4.2–4.3 */
export const CATEGORY_META: Record<
  Category,
  { icon: LucideIcon; lightBg: string; darkText: string }
> = {
  Beasiswa: { icon: GraduationCap, lightBg: "bg-blue-100", darkText: "text-blue-700" },
  Lomba: { icon: Trophy, lightBg: "bg-yellow-100", darkText: "text-orange-700" },
  "Jalur Masuk": { icon: DoorOpen, lightBg: "bg-green-100", darkText: "text-green-700" },
  Hibah: { icon: HandCoins, lightBg: "bg-cyan-100", darkText: "text-blue-700" },
  Magang: { icon: Briefcase, lightBg: "bg-sky-200", darkText: "text-blue-700" },
  Pertukaran: { icon: Plane, lightBg: "bg-pink-100", darkText: "text-ink-800" },
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "beasiswa-unggulan-2027",
    title: "Beasiswa Unggulan Mahasiswa 2027",
    category: "Beasiswa",
    organizer: "Kementerian Pendidikan Tinggi",
    location: "Nasional",
    scope: "Nasional",
    level: "Mahasiswa",
    field: "Umum",
    fee: 0,
    deadline: "2026-12-17",
    updatedAt: "2026-11-14",
    summary:
      "Beasiswa penuh untuk mahasiswa berprestasi dengan keringanan biaya kuliah dan bantuan hidup. Terbuka untuk seluruh jenjang S1 di perguruan tinggi terakreditasi.",
    requirements: [
      "Mahasiswa aktif semester 3–8",
      "IPK minimal 3,00",
      "Tidak menerima beasiswa lain berupa uang",
    ],
    benefits: ["Biaya kuliah penuh", "Uang hidup Rp800.000/bulan", "Dukungan pengembangan diri"],
    steps: ["Pendaftaran daring", "Seleksi administrasi", "Wawancara daring", "Pengumuman hasil"],
    contact: "humas@beasiswaunggulan.kemdikt.go.id",
    officialUrl: "https://example.com/beasiswa-unggulan",
    verified: true,
  },
  {
    id: "lomba-esai-ilmiah-undip",
    title: "Lomba Esai Ilmiah Nasional 2026",
    category: "Lomba",
    organizer: "BEM Universitas Diponegoro",
    location: "Semarang, Jawa Tengah",
    scope: "Semarang",
    level: "Mahasiswa",
    field: "Sosial & Humaniora",
    fee: 50000,
    deadline: "2026-11-20",
    updatedAt: "2026-11-13",
    summary:
      "Kompetisi esai ilmiah bertema pembangunan daerah untuk mahasiswa seluruh Indonesia. Pendaftaran berbayar melalui situs resmi panitia.",
    requirements: [
      "Mahasiswa aktif jenjang S1/D4",
      "Tim 1–3 orang dari kampus yang sama",
      "Esai belum pernah dilombakan",
    ],
    benefits: ["Juara 1: Rp3.000.000", "Sertifikat nasional", "Publikasi prosiding"],
    steps: ["Pendaftaran dan unggah naskah", "Semifinal daring", "Final dan presentasi di Semarang"],
    contact: "humas@esaiilmiah-bemundip.org",
    officialUrl: "https://example.com/lomba-esai-undip",
    verified: true,
  },
  {
    id: "snbp-2027",
    title: "SNBP 2027 — Pendaftaran Sekolah",
    category: "Jalur Masuk",
    organizer: "SNPMB Kemendiktisaintek",
    location: "Nasional",
    scope: "Nasional",
    level: "SMA/SMK",
    field: "Umum",
    fee: 0,
    deadline: "2027-02-14",
    updatedAt: "2026-11-12",
    summary:
      "Seleksi berdasarkan nilai rapor dan portofolio untuk siswa kelas 12 yang ditunjuk sekolah. Pendaftaran dilakukan pihak sekolah, bukan individu.",
    requirements: [
      "Siswa kelas 12 yang diusulkan sekolah",
      "Nilai rapor semester 1–5 lengkap",
      "Memenuhi kuota sekolah",
    ],
    benefits: ["Tanpa ujian tulis", "Hasil terbit sebelum SNBT", "Gratis tanpa biaya pendaftaran"],
    steps: ["Sekolah mengunggah data siswa", "Siswa memilih program studi", "Pengumuman hasil"],
    contact: "info@snpmb.kemdiktisaintek.go.id",
    officialUrl: "https://example.com/snbp-2027",
    verified: true,
  },
  {
    id: "snbt-2027-gel1",
    title: "SNBT 2027 Gelombang 1",
    category: "Jalur Masuk",
    organizer: "SNPMB Kemendiktisaintek",
    location: "Nasional",
    scope: "Nasional",
    level: "SMA/SMK",
    field: "Umum",
    fee: 200000,
    deadline: "2026-12-08",
    updatedAt: "2026-11-10",
    summary:
      "Seleksi ujian tulis untuk masuk perguruan tinggi negeri. Pendaftaran dilakukan individu dengan biaya ujian Rp200.000.",
    requirements: [
      "Lulusan SMA/SMK/MA 2025–2027",
      "Memiliki akun SNPMB",
      "Membayar biaya ujian",
    ],
    benefits: ["Pilihan 2 program studi", "Hasil keluar bersamaan", "Bisa ikut SNKPT cadangan"],
    steps: ["Buat akun SNPMB", "Pilih program studi dan pusat ujian", "Ujian tulis", "Pengumuman hasil"],
    contact: "info@snpmb.kemdiktisaintek.go.id",
    officialUrl: "https://example.com/snbt-2027",
    verified: true,
  },
  {
    id: "beasiswa-bukit-asam",
    title: "Beasiswa Bukit Asam Foundation 2026",
    category: "Beasiswa",
    organizer: "Bukit Asam Foundation",
    location: "Nasional",
    scope: "Nasional",
    level: "Mahasiswa",
    field: "Sains & Teknologi",
    fee: 0,
    deadline: "2026-11-17",
    updatedAt: "2026-11-15",
    summary:
      "Beasiswa pendidikan dan pengembangan diri untuk mahasiswa teknik dan sains. Sertakan esai motivasi dan laporan keuangan keluarga.",
    requirements: [
      "Mahasiswa semester 3–6",
      "IPK minimal 3,25",
      "Esai motivasi maksimal 500 kata",
      "Bukti penghasilan keluarga",
    ],
    benefits: ["Uang pendidikan Rp1.500.000/semester", "Pelatihan kepemimpinan", "Komunitas alumni"],
    steps: ["Pendaftaran daring", "Seleksi berkas", "Wawancara", "Pengumuman"],
    contact: "beasiswa@bukitasamfoundation.co.id",
    officialUrl: "https://example.com/beasiswa-baf",
    verified: true,
  },
  {
    id: "lomba-poster-smk",
    title: "Lomba Desain Poster Digital SMK",
    category: "Lomba",
    organizer: "Dinas Kominfo Kota Semarang",
    location: "Semarang, Jawa Tengah",
    scope: "Semarang",
    level: "SMA/SMK",
    field: "Seni & Desain",
    fee: 0,
    deadline: "2026-11-16",
    updatedAt: "2026-11-15",
    summary:
      "Lomba poster digital bertema literasi digital untuk siswa SMK se-Kota Semarang. Pendaftaran gratis melalui formulir daring.",
    requirements: [
      "Siswa SMK se-Kota Semarang",
      "Karya orisinal satu orang",
      "Format A3, 300 dpi",
    ],
    benefits: ["Juara 1: Rp1.000.000", "Sertifikat dinas", "Pameran karya daring"],
    steps: ["Pendaftaran dan unggah karya", "Penjurian", "Pengumuman di akun resmi"],
    contact: "anakpenting@kominfo.semarangkota.go.id",
    officialUrl: "https://example.com/lomba-poster-smk",
    verified: true,
  },
  {
    id: "hibah-kegiatan-mahasiswa",
    title: "Hibah Kegiatan Mahasiswa 2026",
    category: "Hibah",
    organizer: "Kementerian KPPA",
    location: "Nasional",
    scope: "Nasional",
    level: "Mahasiswa",
    field: "Umum",
    fee: 0,
    deadline: "2026-11-28",
    updatedAt: "2026-11-09",
    summary:
      "Dana hibah untuk organisasi mahasiswa yang mengadakan program pengabdian masyarakat. Proposal ditulis bersama dosen pembimbing.",
    requirements: [
      "Organisasi mahasiswa terdaftar di kampus",
      "Proposal program maksimal 10 halaman",
      "Rekomendasi dosen pembimbing",
    ],
    benefits: ["Dana hingga Rp7.500.000", "Pendampingan pelaporan", "Sertifikat penyelenggara"],
    steps: ["Unduh formulir proposal", "Kirim proposal daring", "Evaluasi proposal", "Pencairan dana tahap 1"],
    contact: "hibah@kemenkppa.go.id",
    officialUrl: "https://example.com/hibah-mahasiswa",
    verified: true,
  },
  {
    id: "magang-bumn-batch8",
    title: "Magang Bersertifikat BUMN Batch 8",
    category: "Magang",
    organizer: "Talent Hub BUMN",
    location: "Nasional",
    scope: "Nasional",
    level: "Mahasiswa",
    field: "Ekonomi & Bisnis",
    fee: 0,
    deadline: "2026-11-23",
    updatedAt: "2026-11-14",
    summary:
      "Program magang 3 bulan di BUMN dengan sertifikat resmi. Terbuka untuk mahasiswa semester 4 ke atas dari semua jurusan.",
    requirements: [
      "Mahasiswa semester 4 ke atas",
      "IPK minimal 3,00",
      "Tulis esai alasan magang 300 kata",
    ],
    benefits: ["Sertifikat BUMN", "Insentif transport", "Kesempatan rekrutmen lanjutan"],
    steps: ["Daftar di situs Talent Hub", "Pilih posisi dan lokasi", "Seleksi administrasi", "Penempatan"],
    contact: "support@talenthubbumn.id",
    officialUrl: "https://example.com/magang-bumn",
    verified: true,
  },
  {
    id: "pertukaran-pelajar-malaysia",
    title: "Pertukaran Pelajar Indonesia–Malaysia 2027",
    category: "Pertukaran",
    organizer: "Kementerian Pendidikan Dasar dan Menengah",
    location: "Nasional",
    scope: "Nasional",
    level: "SMA/SMK",
    field: "Umum",
    fee: 0,
    deadline: "2026-12-01",
    updatedAt: "2026-11-08",
    summary:
      "Program pertukaran budaya dan belajar selama 2 minggu di Malaysia. Seluruh biaya ditanggung pemerintah kedua negara.",
    requirements: [
      "Siswa kelas 10–11",
      "Rata-rata rapor minimal 80",
      "Surat rekomendasi sekolah",
      "Paspor aktif",
    ],
    benefits: ["Biaya penuh ditanggung", "Sertifikat kemendikbud", "Jejaring pelajar internasional"],
    steps: ["Pendaftaran lewat sekolah", "Seleksi provinsi", "Seleksi nasional", "Orientasi pra-keberangkatan"],
    contact: "kerjasama@kemendikdasmen.go.id",
    officialUrl: "https://example.com/pertukaran-malaysia",
    verified: true,
  },
  {
    id: "beasiswa-djarum-plus",
    title: "Beasiswa Djarum Plus 2026",
    category: "Beasiswa",
    organizer: "Djarum Foundation",
    location: "Nasional",
    scope: "Nasional",
    level: "Mahasiswa",
    field: "Sains & Teknologi",
    fee: 0,
    deadline: "2026-12-05",
    updatedAt: "2026-11-11",
    summary:
      "Beasiswa prestasi dan pengembangan karakter untuk mahasiswa semester 4–7. Fokus pada inisiatif kepemimpinan dan proyek sosial.",
    requirements: [
      "Mahasiswa semester 4–7",
      "IPK minimal 3,00",
      "Rekam jejak organisasi atau proyek",
      "Video profil 2 menit",
    ],
    benefits: ["Uang pendidikan Rp5.000.000/tahun", "Bimbingan mentor", "Tantangan proyek sosial"],
    steps: ["Pendaftaran daring", "Seleksi berkas", "Tantangan proyek mini", "Wawancara akhir"],
    contact: "beasiswa@djarumfoundation.or.id",
    officialUrl: "https://example.com/beasiswa-djarum",
    verified: true,
  },
  {
    id: "lomba-gelarjurnal-unnes",
    title: "GELARJURNAL 2026 — UNNES",
    category: "Lomba",
    organizer: "HMJ Universitas Negeri Semarang",
    location: "Semarang, Jawa Tengah",
    scope: "Semarang",
    level: "Mahasiswa",
    field: "Sains & Teknologi",
    fee: 75000,
    deadline: "2026-11-18",
    updatedAt: "2026-11-15",
    summary:
      "Lomba jurnal ilmiah untuk mahasiswa pendidikan se-Indonesia. Karya dikumpulkan dalam format jurnal dan dipresentasikan secara daring.",
    requirements: [
      "Mahasiswa program studi pendidikan",
      "Tim maksimal 3 orang",
      "Jurnal belum pernah dipublikasikan",
    ],
    benefits: ["Juara 1: Rp2.000.000", "Sertifikat nasional", "Peluang publikasi jurnal mitra"],
    steps: ["Pendaftaran dan unggah naskah", "Penjurian semifinal", "Presentasi final daring"],
    contact: "gelarjurnal@mail.unnes.ac.id",
    officialUrl: "https://example.com/gelarjurnal-unnes",
    verified: true,
  },
  {
    id: "mandiri-unnes-2027",
    title: "Jalur Mandiri UNNES 2027",
    category: "Jalur Masuk",
    organizer: "Universitas Negeri Semarang",
    location: "Semarang, Jawa Tengah",
    scope: "Semarang",
    level: "SMA/SMK",
    field: "Umum",
    fee: 300000,
    deadline: "2027-01-30",
    updatedAt: "2026-11-05",
    summary:
      "Seleksi mandiri Universitas Negeri Semarang berdasarkan nilai ujian mandiri kampus. Informasi lengkap ada di laman resmi penerimaan UNNES.",
    requirements: [
      "Lulusan SMA/SMK/MA 2026–2027",
      "Biaya pendaftaran Rp300.000",
      "Mengikuti ujian mandiri kampus",
    ],
    benefits: ["Tanpa melalui SNBT", "Pilihan seluruh prodi UNNES", "Hasil cepat"],
    steps: ["Registrasi akun penerimaan", "Bayar biaya pendaftaran", "Ujian mandiri", "Pengumuman"],
    contact: "admisi@mail.unnes.ac.id",
    officialUrl: "https://example.com/mandiri-unnes",
    verified: true,
  },
  {
    id: "beasiswa-bpi",
    title: "Beasiswa Pendidikan Indonesia (BPI) 2026",
    category: "Beasiswa",
    organizer: "LPDP Kemenkeu",
    location: "Nasional",
    scope: "Nasional",
    level: "Mahasiswa",
    field: "Umum",
    fee: 0,
    deadline: "2026-11-19",
    updatedAt: "2026-11-13",
    summary:
      "Beasiswa penuh jenjang magister dan doktor untuk dalam dan luar negeri. Seleksi mencakup administrasi, esai, dan wawancara.",
    requirements: [
      "Warga negara Indonesia",
      "Sudah atau akan menempuh jenjang magister/doktor",
      "Surat penerimaan atau daftar peserta seleksi",
      "Esai rencana studi",
    ],
    benefits: ["Biaya kuliah penuh", "Uang hidup dan tiket", "Keluarga alumni LPDP"],
    steps: ["Pendaftaran daring", "Seleksi administrasi", "Tes substansi", "Wawancara"],
    contact: "info@lpdp.kemenkeu.go.id",
    officialUrl: "https://example.com/bpi-lpdp",
    verified: true,
  },
  {
    id: "hibah-inovasi-umkm",
    title: "Hibah Inovasi Digital UMKM 2026",
    category: "Hibah",
    organizer: "Kementerian Koperasi dan UKM",
    location: "Nasional",
    scope: "Nasional",
    level: "SMA/SMK & Mahasiswa",
    field: "Ekonomi & Bisnis",
    fee: 0,
    deadline: "2026-12-10",
    updatedAt: "2026-11-07",
    summary:
      "Hibah untuk tim muda yang membangun solusi digital bagi UMKM daerah. Prioritas bagi tim dari Jawa Tengah pada batch ini.",
    requirements: [
      "Tim 2–5 orang usia 17–30 tahun",
      "Proposal solusi digital maksimal 8 halaman",
      "Ada mitra UMKM lokal",
    ],
    benefits: ["Hibah hingga Rp10.000.000", "Pendampingan mentor industri", "Kesempatan pitching nasional"],
    steps: ["Kirim proposal daring", "Seleksi administrasi", "Presentasi semi-final", "Demo hari final"],
    contact: "inovasi@kemenkopukm.go.id",
    officialUrl: "https://example.com/hibah-umkm",
    verified: true,
  },
  {
    id: "magang-merdeka-batch7",
    title: "Magang Merdeka Batch 7 (Tahun Lalu)",
    category: "Magang",
    organizer: "Kementerian Pendidikan Tinggi",
    location: "Nasional",
    scope: "Nasional",
    level: "Mahasiswa",
    field: "Umum",
    fee: 0,
    deadline: "2026-10-30",
    updatedAt: "2026-10-12",
    summary:
      "Program magang industri batch 7 yang sudah ditutup. Disertakan sebagai arsip; batch berikutnya akan dibuka sesuai jadwal kementerian.",
    requirements: ["Mahasiswa aktif", "SKS minimal 90", "Terdaftar di situs resmi"],
    benefits: ["Konversi 20 SKS", "Sertifikat program", "Pengalaman industri nyata"],
    steps: ["Registrasi MIT", "Pilih mitra", "Pelaksanaan magang", "Laporan akhir"],
    contact: "magangmerdeka@kemdikt.go.id",
    officialUrl: "https://example.com/magang-merdeka",
    verified: true,
  },
];
