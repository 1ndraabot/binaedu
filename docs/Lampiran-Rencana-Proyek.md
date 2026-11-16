# Lampiran Rencana Proyek

## [Nama Produk] — Agregator Informasi Kampus, Beasiswa & Lomba

| | |
|---|---|
| **Perusahaan** | PT Lentera Bina Teknologi |
| **Versi** | 1.0 (Draft) |
| **Tanggal** | 16 November 2026 |
| **Dokumen induk** | `PRD-Agregator-Peluang-Akademik.md` |

> Seluruh angka jadwal dan pembagian peran di dokumen ini adalah **asumsi perencanaan** yang perlu disesuaikan dengan kapasitas tim sebenarnya. Biaya belum dihitung.

---

## 1. Ringkasan Proyek

**Tujuan proyek:** membangun dan meluncurkan versi awal (MVP) platform agregator peluang akademik untuk wilayah Semarang, dengan fondasi yang siap diperluas ke nasional dan internasional.

**Keluaran utama:** website responsif dengan dashboard dan pencarian, kalender tenggat dan pengingat, halaman detail terstandar, alur kiriman dan verifikasi, serta data awal peluang yang sudah terverifikasi.

**Kriteria sukses proyek (Fase 1):** MVP meluncur, minimal 100 peluang aktif terverifikasi tersedia, dan target metrik Fase 1 pada PRD Bagian 4.3 tercapai.

---

## 2. Pemangku Kepentingan

| Pemangku kepentingan | Peran | Kepentingan | Pengaruh | Cara melibatkan |
|---|---|---|---|---|
| Manajemen PT Lentera Bina Teknologi | Pemilik produk dan pengambil keputusan | Produk berjalan dan berkelanjutan | Tinggi | Laporan progres rutin, persetujuan di setiap milestone |
| Tim proyek (PM, desain, pengembang, admin konten) | Pelaksana | Menyelesaikan sesuai lingkup dan jadwal | Tinggi | Pertemuan mingguan |
| Siswa SMA/SMK dan mahasiswa | Pengguna utama | Informasi akurat dan tepat waktu | Sedang | Uji coba pengguna, survei singkat |
| Penyelenggara (BEM, himpunan, UKM, kampus, lembaga beasiswa) | Pemasok informasi | Jangkauan peserta lebih luas | Sedang | Sosialisasi formulir kiriman, kemitraan awal |
| Sekolah dan kampus di Semarang | Mitra potensial dan kanal sosialisasi | Akses informasi bagi siswa dan mahasiswa mereka | Sedang | Pendekatan kemitraan |
| Dosen/pembimbing mata kuliah | Penilai tugas | Kesesuaian dokumen dengan tujuan tugas | Tinggi (untuk tugas) | Konsultasi dan penyerahan dokumen |

---

## 3. Ruang Lingkup

### 3.1 Dalam lingkup (Fase 1)

- Website responsif (mobile-first).
- Dashboard, pencarian, dan filter peluang (F1).
- Kalender tenggat dan pengingat email (F2).
- Halaman detail terstandar (F4).
- Formulir kiriman penyelenggara dan antrean verifikasi admin (F6).
- Rekomendasi berbasis aturan dan fitur simpan serta lacak progres (F3, F5), sebagai prioritas "sebaiknya".
- Pengisian data awal peluang di Semarang dan peluang nasional yang relevan.
- Struktur lokasi hierarkis agar siap ekspansi.

### 3.2 Di luar lingkup (Fase 1)

- Pengambilan data otomatis (scraping/RSS).
- Bot WhatsApp/Telegram.
- Checklist dokumen, template CV/esai, dan forum.
- Statistik peluang.
- Multi-bahasa, multi-mata uang, dan data internasional.
- Fitur pendaftaran langsung ke penyelenggara.
- Aplikasi mobile native.
- Monetisasi aktif (listing berbayar dan premium).

### 3.3 Pengendalian perubahan

Permintaan di luar lingkup dicatat, dinilai dampaknya pada jadwal dan sumber daya, lalu diputuskan oleh manajemen PT. Tidak ada penambahan lingkup tanpa keputusan tertulis.

---

## 4. Milestone dan Jadwal (asumsi)

| No | Milestone | Perkiraan waktu | Hasil yang diserahkan |
|---|---|---|---|
| M1 | Persiapan dan riset | Minggu 1–2 | PRD final, daftar sumber data Semarang, kriteria peluang yang diterima |
| M2 | Desain UI/UX | Minggu 3–4 | Wireframe dan desain halaman utama, disetujui manajemen |
| M3 | Pengembangan inti | Minggu 5–10 | Dashboard, detail peluang, formulir kiriman, antrean verifikasi, kalender dan pengingat |
| M4 | Pengisian data awal | Minggu 7–11 (paralel dengan M3) | ≥ 100 peluang aktif terverifikasi |
| M5 | Pengujian dan perbaikan | Minggu 11–12 | Hasil uji fungsi dan uji pengguna, daftar perbaikan selesai |
| M6 | Peluncuran terbatas Semarang | Minggu 13 | Website tayang untuk kampus dan sekolah mitra |
| M7 | Evaluasi Fase 1 | Minggu 16 | Laporan metrik dan keputusan lanjut ke Fase 2 |

**Indikatif untuk fase berikutnya:** Fase 2 (nasional) direncanakan setelah evaluasi M7; Fase 3 (internasional) setelah Fase 2 mencapai metriknya. Jadwal rinci disusun saat masing-masing fase dimulai.

---

## 5. Manajemen Risiko

Skala: Kemungkinan (R/S/T) dan Dampak (R/S/T) = Rendah / Sedang / Tinggi.

| No | Risiko | Kemungkinan | Dampak | Mitigasi | Pemilik |
|---|---|---|---|---|---|
| R1 | Data kedaluwarsa atau salah merusak kepercayaan pengguna | T | T | Verifikasi wajib sebelum tayang, verifikasi ulang berkala, tanggal pembaruan tampil, tombol "Laporkan data salah", auto-sembunyi setelah tenggat | Admin konten |
| R2 | Penyelenggara tidak mau atau tidak sempat mengirim info | S | S | Admin mengisi manual di awal, formulir dibuat sangat singkat, pendekatan ke BEM/himpunan kampus mitra | PM |
| R3 | Beban verifikasi melebihi kapasitas admin | S | T | Batasi lingkup data Fase 1, standarkan bidang wajib, rekrut relawan verifikator kampus | PM |
| R4 | Pengguna sedikit di awal (cold start) | S | T | Mulai dari satu daerah dengan sosialisasi lewat sekolah dan kampus, isi data lengkap sebelum peluncuran | PM |
| R5 | Pelanggaran privasi data profil (termasuk pengguna di bawah umur) | R | T | Kumpulkan data seminimal mungkin, profil opsional, kebijakan privasi dan persetujuan, hak hapus data | PM dan pengembang |
| R6 | Pengingat gagal terkirim atau terlambat | S | T | Uji penjadwalan, pantau pengiriman, siapkan cadangan saluran | Pengembang |
| R7 | Jadwal molor karena kapasitas tim terbatas | S | S | Prioritaskan fitur "wajib" dulu, F3 dan F5 boleh digeser bila perlu | PM |
| R8 | Masalah legal/etika saat memakai scraping di Fase 2 | S | S | Kaji ketentuan situs sumber lebih dulu, hasil scraping selalu lewat verifikasi, utamakan kerja sama resmi | Manajemen |
| R9 | Monetisasi mengurangi kepercayaan | R | S | Label "Dipromosikan" wajib, listing berbayar tetap diverifikasi, monetisasi ditunda sampai basis pengguna terbentuk | Manajemen |

---

## 6. Kebutuhan Sumber Daya

### 6.1 Peran (asumsi)

| Peran | Tanggung jawab | Perkiraan kebutuhan |
|---|---|---|
| Manajer proyek/produk | Koordinasi, jadwal, risiko, hubungan dengan mitra | 1 orang |
| Desainer UI/UX | Wireframe, desain, uji kegunaan | 1 orang |
| Pengembang web | Front-end, back-end, pengingat, basis data | 1–2 orang |
| Admin konten dan verifikator | Pengisian data awal, antrean verifikasi, penanganan laporan | 1 orang inti + relawan kampus |
| Penguji | Uji fungsi dan uji pengguna | Bisa dirangkap anggota tim |

### 6.2 Kebutuhan non-manusia

- Hosting dan domain.
- Layanan pengiriman email.
- Perangkat desain dan manajemen proyek.
- Repositori kode dan pencadangan data.
- Anggaran sosialisasi (materi, kegiatan di sekolah dan kampus).

*Estimasi biaya per komponen belum disusun dan perlu dihitung sebelum anggaran disetujui.*

---

## 7. Asumsi dan Ketergantungan

**Asumsi**
1. Ada cukup peluang yang dapat dikumpulkan dari Semarang untuk mencapai ≥ 100 peluang aktif.
2. Setidaknya satu orang dapat didedikasikan sebagai admin verifikator.
3. Pengguna bersedia mengisi profil singkat bila manfaatnya jelas.
4. Penyelenggara bersedia memakai formulir kiriman bila prosesnya singkat.

**Ketergantungan**
1. Persetujuan manajemen pada setiap milestone.
2. Dukungan atau akses ke komunitas sekolah dan kampus di Semarang.
3. Layanan pihak ketiga (hosting, email) yang stabil.
4. Pendaftaran dan pengesahan badan usaha PT berjalan sesuai rencana.

---

## 8. Pemantauan dan Pelaporan

- **Pertemuan tim:** mingguan, membahas progres, hambatan, dan risiko.
- **Laporan ke manajemen:** per milestone, memuat status jadwal, risiko terbuka, dan metrik terkini.
- **Pemantauan metrik setelah peluncuran:** jumlah peluang aktif terverifikasi, kesegaran data, jumlah pengguna, dan penggunaan fitur simpan, sesuai PRD Bagian 4.3.
- **Definisi selesai (per milestone):** hasil yang tercantum di Bagian 4 sudah diserahkan, diuji, dan disetujui oleh pihak yang ditunjuk.
