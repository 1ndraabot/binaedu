# Komponen — [Nama Produk]

Spesifikasi komponen. Semua nilai merujuk ke `design-tokens.md`. Komponen yang ada di gambar referensi ditandai **[referensi]**; komponen yang dirancang untuk kebutuhan produk ini (belum ada di gambar) ditandai **[baru, usulan]**.

---

## 1. Tombol

### 1.1 Tombol utama (kuning) **[referensi]**
- Bentuk pil, latar `--color-primary`, teks `--color-on-primary`, berat 600.
- Tinggi 44 px (default), 36 px (kecil). Padding horizontal 24 px.
- Hover: `--color-yellow-500`. Fokus: cincin biru 2 px. Nonaktif: latar `--color-line`, teks `--color-ink-400`.
- Aturan: satu per bagian. Contoh teks: "Mulai", "Cari peluang", "Daftar".

### 1.2 Tombol sekunder (biru) **[referensi]**
- Bentuk pil, latar `--color-blue-600`, teks putih.
- Dipakai untuk aksi pelengkap di navigasi ("Daftar") atau di dalam area biru.
- Hover: `--color-blue-700`.

### 1.3 Tombol teks/ghost **[referensi]**
- Tanpa latar, teks `--color-ink-900`, berat 500. Contoh: "Masuk".
- Hover: garis bawah.

### 1.4 Tombol putar (lihat cara kerja) **[referensi]**
- Lingkaran 44 px berlatar `--color-blue-100` dengan ikon segitiga biru, diikuti teks kecil.
- Dipakai untuk tautan video atau penjelasan singkat "Lihat cara kerja".

### 1.5 Tombol ikon **[baru, usulan]**
- Lingkaran 40 px, latar putih, garis 1 px `--color-line`, ikon `--color-ink-800`. Dipakai untuk simpan (penanda), bagikan, dan navigasi bulan di kalender.
- Status aktif (tersimpan): latar `--color-blue-100`, ikon biru terisi.

---

## 2. Navigasi dan banner

### 2.1 Navigasi atas **[referensi]**
- Latar putih, tinggi 72 px. Kiri: logo. Tengah: tautan (Beranda, Cari Peluang, Kalender, Tentang, Kontak). Kanan: "Masuk" (ghost) dan "Daftar" (biru).
- Tautan aktif berwarna `--color-blue-600`; lainnya `--color-ink-800`, ukuran 14 px.
- Mobile: logo + tombol menu; menu terbuka sebagai panel penuh.
- Setelah masuk: kanan berisi avatar dan menu ("Peluang Saya", "Profil", "Keluar").

### 2.2 Banner pengumuman **[referensi]**
- Pita kuning `--color-yellow-400` setinggi 32–40 px tepat di bawah navigasi, teks gelap 13–14 px tengah, tautan berwarna biru dan bergaris bawah.
- Isi contoh: "Penyelenggara lomba atau beasiswa? Kirim info kegiatanmu di sini."
- Bisa ditutup. Satu pesan saja.

---

## 3. Pita statistik **[referensi]**

- Pita biru `--color-blue-600` penuh lebar, padding vertikal 40 px.
- Empat kolom: angka (Angka statistik, putih) dan keterangan (Isi, putih 90%). Pemisah vertikal tipis putih 30%.
- Isi contoh: "Peluang aktif", "Kampus & sekolah", "Penyelenggara", "Pengguna".
- Angka harus nyata dan bisa dipertanggungjawabkan; tidak boleh angka rekaan.
- Mobile: 2 × 2.

---

## 4. Kartu

### 4.1 Kartu fitur/manfaat **[referensi]**
- Latar putih, radius `--radius-lg`, `--shadow-card`, padding 24 px.
- Isi: kotak ikon 40 px berwarna (biru/hijau/oranye/pink, ikon putih), judul H3 kecil (16–18 px, berat 600), deskripsi 2–3 baris `--color-ink-600`.
- Satu baris berisi 4 kartu di desktop.

### 4.2 Kartu kategori **[referensi]**
- Kartu putih garis 1 px, tinggi 56 px, kotak ikon 32 px dengan latar warna muda (`--color-blue-100` dan sejenis) di kiri, nama kategori di kanan.
- Kategori: Beasiswa, Lomba, Jalur Masuk, Hibah, Magang, Pertukaran, Lihat semua.
- Klik membuka dashboard dengan filter kategori aktif.

### 4.3 Kartu peluang **[baru, usulan]**

Komponen utama produk.

```
┌─────────────────────────────────────────┐
│ [BEASISWA]            ✔ Terverifikasi   │  ← chip kategori + badge
│                                         │
│ Beasiswa Unggulan Mahasiswa 2027        │  ← judul (H3)
│ Kementerian ... • Semarang / Nasional   │  ← penyelenggara • lokasi
│                                         │
│ ⏰ Tutup 17 Des 2026 • 31 hari lagi     │  ← label tenggat
│ Diperbarui 2 hari lalu                  │  ← tanggal pembaruan
│                                         │
│ [Lihat detail]               [🔖 Simpan]│
└─────────────────────────────────────────┘
```

- Latar putih, radius `--radius-lg`, `--shadow-card`, padding 20–24 px.
- Chip kategori: pil kecil, latar warna muda sesuai kategori, teks gelap.
- Badge terverifikasi: lihat 4.4.
- Label tenggat: lihat 4.5.
- Teks "Diperbarui ..." berukuran 12–13 px `--color-ink-600`. **Wajib ada** di setiap kartu.
- Hover: bayangan naik ke `--shadow-pop`. Seluruh kartu dapat diklik; tombol "Simpan" tetap terpisah.
- Tampilan daftar (satu kolom, padat) dan tampilan grid (2–4 kolom) memakai isi yang sama.

### 4.4 Badge terverifikasi **[baru, usulan]**
- Pil kecil, latar `--color-green-100`, teks dan ikon centang `--color-green-700`, teks "Terverifikasi".
- Tidak pernah memakai warna lain. Tidak boleh ditampilkan pada peluang yang belum diverifikasi.
- Tooltip: "Diperiksa tim [Nama Produk] pada [tanggal]."
- Varian "Perlu dicek ulang": latar `--color-yellow-100`, teks `--color-ink-800`, ikon peringatan; dipakai bila verifikasi sudah lewat batas.
- Varian "Dipromosikan": latar `--color-blue-100`, teks biru; wajib muncul pada listing berbayar, dan listing berbayar tetap menampilkan badge terverifikasi bila lolos verifikasi.

### 4.5 Label tenggat **[baru, usulan]**

| Kondisi | Warna teks/ikon | Contoh teks |
|---|---|---|
| Lebih dari 7 hari | `--color-ink-600` | "Tutup 17 Des 2026 • 31 hari lagi" |
| 2–7 hari | `--color-orange-700` | "Tutup 20 Nov 2026 • 4 hari lagi" |
| 1 hari atau hari ini | `--color-red-600` | "Tutup besok" / "Tutup hari ini" |
| Berakhir | `--color-ink-400` | "Telah berakhir" |

Selalu disertai ikon jam dan teks, tidak hanya warna.

### 4.6 Kartu testimoni **[referensi]**
- Karusel dengan avatar bulat kecil di atas, avatar tengah membesar dengan cincin biru. Di bawahnya nama, keterangan, bintang, dan kutipan di antara tanda kutip besar abu muda.
- Dipakai hanya setelah ada testimoni nyata. Tidak boleh memakai testimoni rekaan.

---

## 5. Pencarian dan filter **[baru, usulan]**

### 5.1 Kolom pencarian
- Tinggi 48 px, radius pil, latar putih, garis 1 px, ikon kaca pembesar di kiri, tombol "Cari" kuning di kanan (desktop).
- Placeholder: "Cari beasiswa, lomba, atau jalur masuk".

### 5.2 Chip filter
- Pil, tinggi 36 px, garis 1 px. Terpilih: latar `--color-blue-600`, teks putih.
- Filter: kategori, jenjang, bidang, lokasi, biaya pendaftaran, tenggat.
- Desktop: panel filter di kiri atau baris chip di atas daftar. Mobile: tombol "Filter" membuka lembar dari bawah, tombol "Terapkan" kuning.
- Tampilkan jumlah filter aktif dan tombol "Hapus semua".

### 5.3 Urutkan
- Dropdown: "Tenggat terdekat" (default), "Terbaru", "Paling cocok" (jika profil terisi).

---

## 6. Kalender **[baru, usulan]**

- Tampilan bulan dengan sel putih, garis 1 px. Hari ini diberi lingkaran biru.
- Penanda tenggat berupa titik kecil berwarna sesuai urgensi (lihat 4.5) dan tidak hanya warna; daftar di sampingnya menjelaskan teks.
- Klik tanggal membuka daftar peluang yang tutup pada hari itu.
- Beralih tampilan: Bulan / Daftar. Di mobile, tampilan Daftar adalah default.
- Navigasi bulan memakai tombol ikon (1.5).

---

## 7. Formulir **[baru, usulan]**

- Label di atas kolom, 14 px berat 500. Kolom: tinggi 44 px, radius `--radius-sm`, garis 1 px `--color-line`, fokus garis biru 2 px.
- Teks bantu 12–13 px di bawah kolom. Bidang wajib ditandai "(wajib)" dalam teks, bukan hanya tanda bintang.
- Error: garis merah, ikon, dan pesan yang menjelaskan cara memperbaiki (lihat `content-voice.md`).
- Tombol kirim: kuning, di kanan bawah (desktop) atau lebar penuh (mobile).
- Formulir kiriman penyelenggara dibagi menjadi langkah pendek dengan indikator kemajuan.

---

## 8. Antrean admin **[baru, usulan]**

- Tabel padat: judul, penyelenggara, pengirim, tanggal kirim, status, aksi.
- Status berupa pil berwarna: Menunggu verifikasi (kuning muda), Perlu revisi (oranye muda), Terverifikasi (hijau muda), Ditolak (merah muda), Kedaluwarsa (abu).
- Aksi: Setujui (biru), Minta revisi, Tolak (teks merah). Penolakan dan revisi wajib berisi alasan.
- Tidak memakai doodle atau blob di area ini.

---

## 9. Umpan balik

- **Toast:** kartu putih kecil di kanan atas dengan ikon dan pesan, hilang setelah 5 detik.
- **Keadaan kosong:** ilustrasi sederhana atau doodle, judul ramah, satu tombol aksi (contoh: "Belum ada peluang yang cocok. Coba ubah filter.").
- **Memuat:** kerangka abu muda berbentuk kartu, bukan putaran penuh layar.
- **Error halaman:** pesan jujur dan tombol "Coba lagi".

---

## 10. Status interaksi umum

| Status | Perlakuan |
|---|---|
| Hover | Naik satu tingkat (bayangan atau warna) |
| Fokus | Cincin biru 2 px, jarak 2 px |
| Aktif/ditekan | Warna satu tingkat lebih gelap |
| Nonaktif | Latar `--color-line`, teks `--color-ink-400`, tanpa kursor interaktif |
| Terpilih | Latar biru, teks putih (chip) atau latar `--color-blue-100` (daftar) |
