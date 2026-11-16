# Style Guide — [Nama Produk]

Panduan gaya visual utama untuk platform agregator informasi kampus, beasiswa, dan lomba milik PT Lentera Bina Teknologi.

Semua desain (oleh manusia maupun AI) wajib mengikuti dokumen ini dan file pendampingnya:

| File | Fungsi |
|---|---|
| `style.md` | Karakter, prinsip, aturan pakai (dokumen ini) |
| `design-tokens.md` | Nilai warna, ukuran, jarak, radius |
| `components.md` | Spesifikasi komponen |
| `layouts.md` | Susunan halaman |
| `illustration-imagery.md` | Foto, doodle, ikon |
| `content-voice.md` | Gaya bahasa dan contoh teks |

> **Asal gaya:** mengikuti gambar referensi landing page "Tutor" (biru terang + kuning, kartu membulat, doodle). Nilai warna diambil dari sampel gambar tersebut, lalu disesuaikan seperlunya untuk keterbacaan. Bagian bertanda **(usulan)** adalah keputusan perancang dokumen.

---

## 1. Karakter Visual

**Tiga kata kunci:** *ramah, ceria, tepercaya.*

- **Ramah:** sudut membulat, bahasa santai, ilustrasi dan foto pelajar yang tersenyum.
- **Ceria:** biru terang dan kuning sebagai warna khas, doodle tangan sebagai hiasan.
- **Tepercaya:** karena produk ini hidup dari kepercayaan pada data, elemen verifikasi, tanggal pembaruan, dan tenggat harus selalu jelas dan tidak tersaing oleh dekorasi.

## 2. Prinsip

1. **Informasi dulu, dekorasi kemudian.** Doodle dan blob mengisi ruang kosong, bukan menutupi data.
2. **Satu aksi utama per area.** Tombol kuning hanya satu per bagian.
3. **Kuning untuk ajakan bertindak, biru untuk struktur.** Jangan tukar perannya.
4. **Lega.** Jarak antarbagian besar; kartu tidak saling menempel.
5. **Status selalu terlihat.** Label "Terverifikasi", tenggat, dan tanggal pembaruan tampil di setiap kartu peluang.
6. **Satu bahasa visual di semua layar,** dari landing page sampai antrean admin, hanya kepadatannya yang berbeda.

## 3. Warna (ringkasan)

Nilai lengkap ada di `design-tokens.md`.

| Peran | Warna | Pemakaian |
|---|---|---|
| Biru utama | `#0065FF` | Pita statistik, tombol sekunder, tautan, navigasi aktif |
| Kuning utama | `#FFD03A` | Tombol utama, banner pengumuman, aksen doodle |
| Latar halaman | `#FAFBFD` | Latar bagian dalam halaman |
| Latar luar | `#E2EFF7` | Latar di luar kontainer (jika ada) |
| Biru langit | `#B7DBFF` dan `#C1F8FF` | Blob, bingkai foto, latar ikon |
| Teks | `#111111` / `#1E1E1E` | Judul dan isi |
| Oranye | `#FF6600` (dekorasi), `#C2410C` (teks) | Label kecil di atas judul |
| Hijau | `#76C100` (dekorasi), `#15803D` (teks/badge) | Status terverifikasi |
| Merah | `#DC2626` | Tenggat sangat dekat dan error |

**Proporsi** *(usulan)*: sekitar 70% putih/latar terang, 20% biru, 10% kuning dan aksen lain.

## 4. Tipografi

- **Keluarga huruf:** Plus Jakarta Sans *(usulan; gambar referensi memakai sans-serif geometris sejenis)*. Cadangan: Outfit, lalu `system-ui, sans-serif`.
- **Judul besar:** tebal sedang, rapat, huruf kapital hanya di awal kalimat.
- **Label kecil di atas judul (eyebrow):** huruf kapital, tebal, jarak huruf sedikit renggang, warna oranye gelap `#C2410C`.
- **Isi teks:** 14–16 px, tinggi baris longgar (1,5–1,6).
- **Penekanan di judul:** boleh memakai garis bawah tulisan tangan berwarna kuning pada satu kata kunci per halaman.

Skala ukuran lengkap ada di `design-tokens.md`.

## 5. Bentuk

- **Sudut membulat di mana-mana:** kartu 16 px, tombol berbentuk pil penuh, ikon dalam kotak 10–12 px.
- **Bingkai foto:** bentuk blob atau persegi dengan satu sudut besar membulat. Lihat `illustration-imagery.md`.
- **Doodle tangan:** zig-zag, segitiga garis, persegi miring, lingkaran. Warna biru atau kuning, tebal garis sekitar 2–3 px.
- **Bayangan:** sangat lembut, hanya untuk kartu dan dropdown.
- **Tanpa garis tepi tebal.** Pemisah memakai latar, jarak, atau garis 1 px abu muda.

## 6. Pakai dan Hindari

**Pakai**
- Tombol kuning dengan teks gelap untuk aksi utama ("Mulai", "Cari peluang").
- Pita biru penuh lebar untuk angka penting.
- Kartu putih dengan ikon di kotak berwarna.
- Selang-seling gambar dan teks pada halaman pemasaran.

**Hindari**
- Teks kuning di atas putih (tidak terbaca).
- Teks oranye `#FF6600` terang untuk teks kecil (kontras kurang). Pakai `#C2410C`.
- Lebih dari satu tombol kuning dalam satu bagian.
- Doodle di dalam area data (tabel, filter, kalender).
- Gradasi dan efek kaca; gaya ini datar dan bersih.
- Membuat gaya baru per halaman.

## 7. Aksesibilitas

- Teks isi minimal kontras 4,5:1; teks besar minimal 3:1.
- Teks gelap di atas kuning (kontras sangat tinggi). Teks putih di atas `#0065FF` hanya untuk ukuran ≥ 14 px tebal atau ≥ 16 px biasa (kontras sekitar 4,9:1, tipis di atas batas).
- Status tidak boleh hanya dibedakan lewat warna: selalu sertakan ikon atau teks.
- Fokus keyboard terlihat jelas (cincin biru 2 px dengan jarak 2 px).
- Semua gambar punya teks alternatif; doodle dekoratif ditandai kosong/disembunyikan dari pembaca layar.
- Hormati preferensi "kurangi gerakan" pada animasi apa pun.

## 8. Responsif

- **Mobile-first.** Pengguna utama memakai ponsel.
- Kontainer maksimum 1200 px, konten inti sekitar 960 px, tengah halaman.
- Doodle dan blob dikecilkan atau disembunyikan di layar kecil agar tidak menutupi konten.

## 9. Catatan untuk AI dan Perancang Baru

1. Baca file ini, lalu `design-tokens.md`, sebelum membuat apa pun.
2. Pakai token, jangan menulis nilai warna atau ukuran sendiri.
3. Jika ada komponen di `components.md`, pakai persis spesifikasinya.
4. Bila ragu antara dekorasi dan keterbacaan, pilih keterbacaan.
