# Layout Halaman — [Nama Produk]

Susunan tiap halaman utama. Komponen merujuk ke `components.md`, nilai ke `design-tokens.md`. Halaman pemasaran (Beranda) mengikuti gambar referensi; halaman fungsional dirancang untuk produk ini **(usulan)**.

---

## 1. Aturan Umum

- Kontainer maksimum 1200 px, konten inti sekitar 960 px, rata tengah.
- Urutan dari atas: navigasi, banner (opsional), konten, footer.
- Latar bergantian putih dan `--color-bg` antarbagian agar terpisah tanpa garis.
- Jarak antarbagian: `--space-8` (desktop), `--space-7` (mobile).
- Dekorasi (blob, doodle) hanya di halaman pemasaran dan keadaan kosong. **Tidak** di dashboard, kalender, tabel, atau formulir.
- Mobile-first: rancang layar 360 px lebih dulu.

---

## 2. Beranda (halaman pemasaran) **[referensi]**

Urutan bagian mengikuti gambar referensi:

1. **Navigasi + banner kuning.**
2. **Hero:** kiri berisi eyebrow (contoh: "SEMUA PELUANG, SATU TEMPAT"), judul besar dengan garis bawah tulisan tangan kuning pada kata kunci, satu kalimat penjelasan, tombol kuning "Mulai" dan tombol putar "Lihat cara kerja". Kanan berisi empat foto/ilustrasi dalam bingkai blob dengan doodle di sudut.
3. **Pita statistik biru** (4 angka).
4. **Manfaat** ("Kenapa [Nama Produk]"): judul tengah, empat kartu fitur (Satu tempat, Kalender tenggat, Rekomendasi untukmu, Terverifikasi).
5. **Bagian gambar-teks selang-seling** (2 bagian): satu tentang kalender dan pengingat, satu tentang rekomendasi dan syarat. Gambar di satu sisi dalam bingkai blob, teks dengan eyebrow, judul, paragraf pendek, tombol kuning di sisi lain; sisi digantikan di bagian berikutnya.
6. **Kategori:** judul "Cari peluang menurut kategori", grid 4 × 2 kartu kategori.
7. **Testimoni** (hanya bila ada yang nyata).
8. **Ajakan penutup:** pita biru dengan judul dan tombol kuning, termasuk ajakan untuk penyelenggara.
9. **Footer.**

```
┌ Navigasi ──────────────────────────────┐
│ ▓▓ Banner kuning ▓▓                    │
│ EYEBROW            [foto][foto]        │
│ Judul besar         [foto][foto]       │
│ [Mulai] [▶ Cara kerja]                 │
├────────────────────────────────────────┤
│ ███ 100+ │ 10+ │ 20+ │ 1.000+ ███      │
├────────────────────────────────────────┤
│ Kenapa [Nama Produk]                   │
│ [kartu][kartu][kartu][kartu]           │
├────────────────────────────────────────┤
│ [gambar]  teks + [Mulai]               │
│ teks + [Mulai]  [gambar]               │
├────────────────────────────────────────┤
│ Kategori  [ ][ ][ ][ ] / [ ][ ][ ][ ]  │
└────────────────────────────────────────┘
```

---

## 3. Dashboard dan Pencarian **[baru, usulan]**

Halaman paling sering dipakai.

**Desktop**
```
┌ Navigasi ──────────────────────────────────────┐
│ Cari peluang                                   │
│ [ Cari beasiswa, lomba, atau jalur masuk ][Cari]│
│ Chip kategori: [Semua][Beasiswa][Lomba]...      │
├──────────────┬─────────────────────────────────┤
│ FILTER       │ 48 peluang   Urutkan: [Tenggat▾]│
│ Jenjang      │ [kartu peluang] [kartu peluang] │
│ Bidang       │ [kartu peluang] [kartu peluang] │
│ Lokasi       │ ...                             │
│ Biaya        │ [Muat lebih banyak]             │
│ Tenggat      │                                 │
│ [Hapus semua]│                                 │
└──────────────┴─────────────────────────────────┘
```

- Panel filter 260 px di kiri, hasil di kanan dalam grid 2 kolom (atau daftar satu kolom).
- Hanya peluang berstatus terverifikasi yang tampil. Peluang berakhir disembunyikan kecuali filter "Telah berakhir" dipilih.
- Strip "Segera berakhir" di atas daftar bila ada peluang ≤ 7 hari.

**Mobile:** pencarian di atas, chip kategori bisa digeser menyamping, tombol "Filter" membuka lembar dari bawah, kartu satu kolom.

**Keadaan kosong:** doodle kecil, "Belum ada peluang yang cocok", tombol "Hapus filter".

---

## 4. Halaman Detail Peluang **[baru, usulan]**

Format seragam untuk semua peluang.

```
┌ Navigasi ──────────────────────────────────────┐
│ ← Kembali ke hasil                             │
│ [BEASISWA]  ✔ Terverifikasi                    │
│ Judul peluang (H1)                             │
│ Penyelenggara • Lokasi • Jenjang               │
│ Diperbarui 2 hari lalu • Diverifikasi 1 Nov    │
├───────────────────────────┬────────────────────┤
│ Ringkasan                 │ ⏰ Tutup 17 Des    │
│ Persyaratan  (daftar)     │ 31 hari lagi       │
│ Benefit                   │ [Kunjungi situs    │
│ Tahapan seleksi (langkah) │  resmi]  ← kuning  │
│ Kontak penyelenggara      │ [🔖 Simpan]        │
│                           │ [Lapor data salah] │
│                           │ Kecocokan syarat   │
└───────────────────────────┴────────────────────┘
```

- Kolom kanan (sticky di desktop) berisi tenggat, aksi utama "Kunjungi situs resmi" (kuning), simpan, dan lapor data salah.
- Bagian "Kecocokan syarat" muncul jika profil terisi: daftar syarat bertanda ✔ memenuhi, ✖ belum, ? perlu dicek manual (ikon dan teks, bukan hanya warna).
- Tahapan seleksi ditampilkan sebagai urutan langkah bernomor.
- Mobile: kolom kanan pindah ke atas isi, tombol "Kunjungi situs resmi" lebar penuh dan menempel di bawah layar.

---

## 5. Kalender **[baru, usulan]**

```
┌ Navigasi ──────────────────────────────────────┐
│ Kalender tenggat    [Bulan | Daftar]           │
│ ‹  November 2026  ›              [Hari ini]    │
├────────────────────────────┬───────────────────┤
│ Sen Sel Rab Kam Jum Sab Min│ 17 November       │
│ grid bulan dengan titik    │ • Peluang A  H-7  │
│ penanda tenggat            │ • Peluang B  H-1  │
└────────────────────────────┴───────────────────┘
```

- Default menampilkan peluang yang disimpan pengguna; pilihan "Tampilkan semua peluang".
- Panel kanan menampilkan daftar tanggal yang dipilih.
- Mobile: tampilan Daftar sebagai default, dikelompokkan per minggu.
- Pengaturan pengingat tersedia lewat ikon lonceng pada setiap entri.

---

## 6. Peluang Saya **[baru, usulan]**

- Tab status: Semua, Belum daftar, Sudah daftar, Tahap seleksi, Hasil.
- Kartu peluang versi padat dengan pemilih status (dropdown) di kanan.
- Ringkasan di atas: jumlah peluang tersimpan dan tenggat terdekat.

---

## 7. Profil dan Preferensi **[baru, usulan]**

- Formulir pendek dalam satu kolom: jenjang, jurusan, semester, IPK, minat, domisili.
- Teks jelas tentang kegunaan data ("Dipakai untuk mencocokkan peluang, tidak dibagikan").
- Tombol hapus data tersedia dan mudah ditemukan.
- Pengaturan pengingat (H-7, H-1, saluran).

---

## 8. Formulir Kiriman Penyelenggara **[baru, usulan]**

- Beberapa langkah pendek: Informasi dasar, Persyaratan dan benefit, Tenggat dan tautan resmi, Tinjau dan kirim.
- Indikator kemajuan di atas. Simpan sebagai draf otomatis.
- Setelah kirim: halaman konfirmasi dengan perkiraan waktu verifikasi dan status yang dapat dilacak.

---

## 9. Antrean Admin **[baru, usulan]**

- Tata letak dua panel: daftar kiri (tabel padat dengan filter status), pratinjau di kanan (halaman detail seperti yang dilihat pengguna).
- Tindakan di bawah pratinjau: Setujui, Minta revisi, Tolak (alasan wajib).
- Penanda "perlu dicek ulang" untuk peluang yang melewati batas verifikasi berkala.
- Antrean laporan "data salah" sebagai tab terpisah dan diprioritaskan.

---

## 10. Masuk dan Daftar **[baru, usulan]**

- Panel tengah berukuran sedang di atas latar `--color-bg`, dengan satu blob dan doodle kecil di sisi.
- Formulir singkat, tombol utama kuning, tautan alternatif di bawah.
- Teks privasi singkat, tautan ke kebijakan.

---

## 11. Footer

- Latar `--color-ink-900` atau biru gelap, teks putih.
- Kolom: tentang, untuk pengguna, untuk penyelenggara, kontak.
- Baris bawah: nama PT Lentera Bina Teknologi, kebijakan privasi, syarat penggunaan.

---

## 12. Responsif Singkat

| Lebar | Perilaku |
|---|---|
| < 640 px | Satu kolom, menu panel penuh, filter sebagai lembar bawah, doodle disembunyikan |
| 640–1023 px | Dua kolom kartu, panel filter jadi lembar |
| ≥ 1024 px | Susunan penuh, panel filter tetap, kolom kanan sticky |
