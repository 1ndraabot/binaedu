# Product Requirements Document (PRD)

## [Nama Produk] — Agregator Informasi Kampus, Beasiswa & Lomba

| | |
|---|---|
| **Perusahaan** | PT Lentera Bina Teknologi |
| **Versi** | 1.0 (Draft) |
| **Tanggal** | 16 November 2026 |
| **Jenis produk** | Website responsif (mobile-first) |
| **Dokumen pendamping** | Lampiran Rencana Proyek (`Lampiran-Rencana-Proyek.md`) |

> Catatan: nama produk masih berupa placeholder `[Nama Produk]` dan dapat diganti kapan saja. Bagian bertanda **(usulan)** adalah keputusan perancang dokumen yang perlu dikonfirmasi, bukan keputusan final.

---

## 1. Ringkasan Produk

[Nama Produk] adalah platform terpusat yang mengumpulkan, merapikan, dan mempersonalisasi informasi peluang akademik: beasiswa, lomba, jalur masuk perguruan tinggi (SNBP, SNBT, mandiri), hibah, magang, dan program pertukaran.

Saat ini informasi tersebut tersebar di Instagram, grup WhatsApp, situs kampus, dan portal pemerintah. Akibatnya banyak pelajar dan mahasiswa terlambat tahu atau melewatkan peluang. Platform ini menyatukannya dalam satu dashboard yang rapi, mudah dicari, dan dilengkapi pengingat tenggat.

**Strategi peluncuran:** dimulai dari satu daerah (Semarang), lalu meluas ke tingkat nasional, kemudian internasional. Pada fase awal, kualitas dan kelengkapan data lebih diutamakan daripada luasnya cakupan.

**Prinsip inti produk:** kepercayaan pada data. Setiap peluang harus punya status verifikasi dan tanggal pembaruan yang jelas.

---

## 2. Masalah dan Peluang

### 2.1 Masalah

1. Informasi tersebar di banyak kanal dan tidak terstruktur.
2. Tenggat mudah terlewat karena tidak ada pengingat terpusat.
3. Sulit menilai peluang mana yang sesuai dengan profil dan persyaratan pengguna.
4. Poster dan pengumuman sering tidak lengkap, sehingga pengguna harus mencari detail sendiri.

### 2.2 Peluang

- Menghemat waktu pencarian informasi.
- Mengurangi risiko melewatkan tenggat.
- Meratakan akses informasi, terutama bagi pelajar di daerah yang jarang terjangkau info peluang.
- Memberi penyelenggara jalur promosi yang terarah.

---

## 3. Pengguna dan Persona

| Persona | Siapa | Kebutuhan utama | Kendala saat ini |
|---|---|---|---|
| **Siswa SMA/SMK** | Kelas 11–12 yang menyiapkan masuk universitas | Tahu jalur masuk (SNBP, SNBT, mandiri) dan beasiswa beserta tenggatnya | Informasi tercecer, bingung syarat dan jadwal |
| **Mahasiswa** | Semua jenjang dan semester | Beasiswa, lomba, hibah, magang, pertukaran yang cocok dengan jurusan dan IPK | Tidak sempat memantau banyak kanal, tahu terlambat |
| **Penyelenggara** | Admin BEM, himpunan, UKM, kampus, lembaga beasiswa | Menjangkau peserta lebih luas dengan usaha kecil | Promosi hanya lewat media sosial sendiri |
| **Admin platform** | Tim internal PT | Memeriksa kiriman, menjaga akurasi, menangani laporan data salah | Beban verifikasi manual bila tanpa alat bantu |

---

## 4. Tujuan, Non-Tujuan, dan Metrik

### 4.1 Tujuan

1. Menjadi sumber rujukan tunggal untuk peluang akademik di Semarang pada Fase 1.
2. Memastikan data akurat dan segar melalui proses verifikasi yang menjadi bagian inti produk.
3. Membantu pengguna tidak melewatkan tenggat lewat kalender dan pengingat.
4. Membangun fondasi data yang siap diperluas ke nasional dan internasional.

### 4.2 Non-Tujuan (Fase 1)

- Bukan platform pendaftaran: pengguna tetap mendaftar di situs resmi penyelenggara.
- Tidak ada pengambilan data otomatis (scraping/RSS) pada MVP.
- Tidak ada forum, bot WhatsApp/Telegram, atau template CV pada MVP.
- Tidak ada dukungan multi-bahasa atau multi-mata uang pada MVP.
- Rekomendasi tidak memakai AI/ML; hanya pencocokan aturan **(usulan)**.

### 4.3 Metrik Keberhasilan per Fase

> Angka di bawah adalah target awal berupa asumsi untuk divalidasi, bukan hasil riset.

| Fase | Metrik | Target awal (asumsi) |
|---|---|---|
| **1. Semarang** | Peluang aktif terverifikasi | ≥ 100 |
| | Pengguna terdaftar | ≥ 1.000 |
| | Peluang aktif yang diperbarui/diverifikasi dalam 14 hari terakhir | ≥ 80% |
| | Pengguna yang menyimpan ≥ 1 peluang | ≥ 30% |
| **2. Nasional** | Cakupan provinsi dengan data aktif | Bertahap, ditetapkan saat Fase 2 dimulai |
| | Peluang yang dikirim langsung oleh penyelenggara | ≥ 40% dari peluang baru |
| **3. Internasional** | Negara dengan data aktif | Ditetapkan saat Fase 3 dimulai |

---

## 5. Fitur

Prioritas memakai skala: **Wajib** (harus ada di MVP), **Sebaiknya** (diusahakan di MVP), **Nanti** (setelah MVP).

### F1. Dashboard sentral dan pencarian — *Wajib*

Daftar peluang dalam satu tampilan, dengan pencarian dan filter.

**Filter:** kategori (beasiswa, lomba, jalur masuk, hibah, magang, pertukaran), jenjang, bidang, lokasi, biaya pendaftaran, dan tenggat.

**User story**
- Sebagai pengguna, saya ingin memfilter peluang berdasarkan kategori dan jenjang agar hanya melihat yang relevan.
- Sebagai pengguna, saya ingin mengurutkan berdasarkan tenggat terdekat agar tahu mana yang mendesak.

**Aturan**
- Hanya peluang berstatus *Terverifikasi* yang tampil di dashboard.
- Peluang yang tenggatnya sudah lewat otomatis disembunyikan dari daftar utama dan dapat dilihat lewat filter "Telah berakhir".
- Setiap kartu menampilkan kategori, tenggat, lokasi, label terverifikasi, dan tanggal pembaruan.

**Kriteria penerimaan**
- Kombinasi beberapa filter menghasilkan daftar yang sesuai.
- Pencarian kata kunci menemukan peluang berdasarkan judul dan penyelenggara.
- Halaman termuat dengan baik di layar ponsel.

### F2. Kalender tenggat dan pengingat — *Wajib*

Seluruh tenggat tampil di kalender, dengan pengingat otomatis.

**User story**
- Sebagai pengguna, saya ingin melihat semua tenggat peluang yang saya simpan dalam satu kalender.
- Sebagai pengguna, saya ingin diingatkan sebelum tenggat agar tidak terlewat.

**Aturan**
- Pengingat default: H-7 dan H-1 untuk peluang yang disimpan pengguna.
- Saluran MVP: email (wajib); notifikasi web/push (sebaiknya) **(usulan)**.
- Pengguna dapat mengaktifkan atau menonaktifkan pengingat per peluang.
- Jika tenggat atau tanggal peluang berubah, pengguna yang menyimpannya diberi tahu.

**Kriteria penerimaan**
- Pengingat terkirim pada waktu yang benar sesuai zona waktu WIB (Fase 1).
- Kalender menampilkan tampilan bulan dan daftar.

### F3. Rekomendasi personal — *Sebaiknya*

Pengguna mengisi profil singkat, lalu sistem menampilkan peluang yang paling cocok dan menandai syarat yang sudah atau belum terpenuhi.

**Data profil:** jenjang, jurusan, IPK, minat, semester, domisili.

**User story**
- Sebagai pengguna, saya ingin melihat peluang yang cocok dengan profil saya agar tidak menyaring manual.
- Sebagai pengguna, saya ingin tahu syarat mana yang belum saya penuhi agar bisa mempersiapkan diri.

**Aturan**
- Pencocokan berbasis aturan: setiap peluang memiliki persyaratan terstruktur (misalnya IPK minimum, jenjang, jurusan, domisili) yang dibandingkan dengan profil **(usulan)**.
- Syarat yang tidak bisa dinilai otomatis (misalnya esai, surat rekomendasi) ditampilkan sebagai daftar periksa manual.
- Pengisian profil bersifat opsional. Tanpa profil, pengguna tetap bisa memakai F1 dan F2.

**Kriteria penerimaan**
- Peluang diberi tanda "memenuhi", "belum memenuhi", atau "perlu dicek manual" per syarat.
- Pengguna dapat mengubah atau menghapus profilnya kapan saja.

### F4. Halaman detail terstandar — *Wajib*

Setiap peluang memakai format seragam:

1. Ringkasan
2. Persyaratan
3. Benefit
4. Tahapan seleksi
5. Tautan resmi
6. Kontak penyelenggara
7. Status verifikasi dan tanggal pembaruan terakhir

**Aturan**
- Peluang tanpa tautan resmi tidak dapat tayang.
- Bidang wajib: judul, kategori, penyelenggara, tenggat, ringkasan, persyaratan, tautan resmi.
- Tersedia tombol **"Laporkan data salah"** pada setiap halaman.

**Kriteria penerimaan**
- Semua peluang tayang memiliki seluruh bidang wajib.
- Tanggal pembaruan terakhir tampil jelas.

### F5. Simpan dan lacak progres — *Sebaiknya*

Pengguna menyimpan peluang dan melacak status pendaftarannya.

**Status:** belum daftar, sudah daftar, tahap seleksi, hasil (lolos / tidak lolos).

**User story**
- Sebagai pengguna, saya ingin menyimpan peluang yang menarik agar mudah ditemukan lagi.
- Sebagai pengguna, saya ingin mencatat status pendaftaran agar tahu posisi saya di setiap peluang.

**Aturan**
- Status diubah manual oleh pengguna.
- Peluang yang disimpan otomatis masuk kalender (F2).

**Kriteria penerimaan**
- Daftar "Peluang Saya" dapat difilter menurut status.

### F6. Kontribusi komunitas dan penyelenggara, serta verifikasi admin — *Wajib*

Penyelenggara atau pengguna dapat mengirim info baru, yang diverifikasi admin sebelum tayang.

**User story**
- Sebagai penyelenggara, saya ingin mengirim informasi lomba/beasiswa saya lewat formulir sederhana.
- Sebagai admin, saya ingin antrean kiriman yang jelas agar bisa memeriksa dan menayangkan dengan cepat.
- Sebagai pengguna, saya ingin tahu mana informasi yang sudah diverifikasi.

**Aturan:** lihat Bagian 6 (Alur Data dan Verifikasi).

**Kriteria penerimaan**
- Kiriman baru masuk antrean admin dengan status *Menunggu verifikasi*.
- Admin dapat menyetujui, menolak (dengan alasan), atau meminta revisi.
- Label "Terverifikasi" hanya muncul setelah disetujui admin.

### F7. Pengembangan lanjutan — *Nanti*

Pengingat personal via WhatsApp/Telegram bot, checklist dokumen persyaratan per peluang, panduan dan template (CV, esai motivasi, surat rekomendasi), forum tanya jawab per peluang, serta statistik peluang (tingkat kelolosan, tren beasiswa yang paling banyak dibuka).

---

## 6. Alur Data dan Verifikasi

Akurasi dan pembaruan data adalah tantangan terbesar, sehingga bagian ini menjadi inti produk sejak awal.

### 6.1 Sumber data

| Sumber | Fase | Catatan |
|---|---|---|
| Input manual oleh admin | 1 | Sumber utama pengisian data awal |
| Formulir kiriman penyelenggara/pengguna | 1 | Wajib melalui verifikasi |
| Pengambilan otomatis (scraping/RSS) dari situs resmi | 2 | Hasilnya masuk antrean verifikasi, tidak langsung tayang |

### 6.2 Status peluang

`Draf` → `Menunggu verifikasi` → `Terverifikasi` → `Kedaluwarsa` (otomatis setelah tenggat) → `Diarsipkan`

Cabang lain: `Perlu revisi` (dikembalikan ke pengirim) dan `Ditolak` (dengan alasan).

### 6.3 Aturan kualitas **(usulan)**

1. Peluang hanya tayang jika berstatus *Terverifikasi*, memiliki tautan resmi, dan bidang wajib terisi.
2. Target waktu verifikasi: maksimal 2×24 jam sejak kiriman masuk.
3. Setiap peluang aktif menyimpan dua tanggal: *terakhir diperbarui* dan *terakhir diverifikasi*.
4. Peluang aktif diverifikasi ulang secara berkala (default setiap 14 hari). Yang melewati batas diberi penanda "perlu dicek ulang" bagi admin.
5. Laporan "data salah" dari pengguna masuk antrean prioritas admin.
6. Peluang yang tenggatnya lewat disembunyikan otomatis dari daftar utama.
7. Perubahan penting (tenggat, syarat) memicu pemberitahuan ke pengguna yang menyimpan peluang tersebut.

---

## 7. Struktur Lokasi yang Siap Ekspansi **(usulan)**

Agar ekspansi nanti tidak membongkar ulang basis data, lokasi dimodelkan hierarkis sejak awal:

`Negara` → `Provinsi` → `Kota/Kabupaten`

Setiap peluang memiliki salah satu cakupan: *lokal (kota)*, *regional (provinsi)*, *nasional*, atau *internasional*. Peluang nasional dan internasional tetap dapat dilihat pengguna di Semarang. Fase 1 hanya mengisi data untuk Semarang dan peluang nasional yang relevan.

Kesiapan arsitektur untuk Fase 3 (dicatat, tidak dibangun di MVP): bahasa, zona waktu, mata uang, dan perbedaan jenjang pendidikan antarnegara.

---

## 8. Kebutuhan Non-Fungsional **(usulan)**

| Aspek | Kebutuhan |
|---|---|
| **Tampilan** | Mobile-first, nyaman dipakai di ponsel dengan koneksi biasa |
| **Performa** | Halaman utama termuat cepat; pencarian dan filter responsif |
| **Keamanan** | Autentikasi aman, pemisahan peran (pengguna, penyelenggara, admin), pencatatan aktivitas admin |
| **Privasi** | Data profil (IPK, domisili, minat) hanya dipakai untuk rekomendasi; pengguna dapat mengubah dan menghapus datanya; kepatuhan terhadap UU Pelindungan Data Pribadi |
| **Pengguna di bawah umur** | Sebagian siswa SMA/SMK berusia di bawah 18 tahun. Perlu kebijakan persetujuan dan pengumpulan data seminimal mungkin |
| **Keandalan** | Pengingat tenggat harus terkirim tepat waktu; ada pencadangan data berkala |
| **Aksesibilitas** | Kontras dan ukuran teks yang layak, navigasi dapat dipakai dengan keyboard |

---

## 9. Roadmap

| Fase | Cakupan | Isi utama |
|---|---|---|
| **1. Semarang (MVP)** | Peluang di Semarang + peluang nasional yang relevan | F1, F2, F4, F6 (wajib); F3, F5 (sebaiknya); input manual + formulir penyelenggara |
| **2. Nasional** | Jawa Tengah, lalu provinsi lain | Pengambilan data otomatis dengan verifikasi, bot WhatsApp/Telegram, checklist dokumen, kemitraan kampus dan lembaga beasiswa |
| **3. Internasional** | Negara lain | Multi-bahasa, zona waktu dan mata uang, penyesuaian jenjang pendidikan, panduan dan template, forum, statistik |

Pergantian fase ditentukan oleh pencapaian metrik pada Bagian 4.3, bukan semata oleh tanggal.

---

## 10. Model Pendapatan

Platform tetap **gratis bagi pengguna**. Sumber pendapatan potensial:

1. **Listing unggulan** untuk penyelenggara (promosi berbayar).
2. **Kerja sama** dengan kampus atau lembaga beasiswa.
3. **Fitur premium**, misalnya pengingat lanjutan dan analitik profil.

**Batasan agar kepercayaan terjaga (usulan):**
- Listing unggulan wajib diberi label "Dipromosikan" dan tetap melewati verifikasi yang sama.
- Monetisasi baru dimulai setelah basis pengguna dan kepercayaan terbentuk, kemungkinan besar di Fase 2.

---

## 11. Pertanyaan Terbuka

1. Nama produk final dan identitas merek.
2. Daftar kampus dan sekolah prioritas di Semarang untuk pengisian data awal.
3. Siapa yang bertugas sebagai admin verifikator pada Fase 1 dan berapa kapasitasnya.
4. Kebijakan privasi dan persetujuan pengguna di bawah 18 tahun.
5. Platform pengiriman email/notifikasi dan batas biayanya.
6. Aturan hukum dan etika bila kelak memakai pengambilan data otomatis dari situs pihak lain.
