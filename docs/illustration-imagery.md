# Ilustrasi dan Citra — [Nama Produk]

Aturan foto, bentuk dekoratif (blob dan doodle), dan ikon agar seluruh visual terasa satu keluarga dengan gambar referensi.

---

## 1. Prinsip

1. **Orang nyata, suasana positif.** Pelajar dan mahasiswa yang tersenyum, memegang buku atau laptop, berwarna cerah.
2. **Bingkai seragam.** Semua foto masuk dalam bingkai berbentuk blob atau persegi dengan sudut besar membulat.
3. **Dekorasi menemani, bukan menutupi.** Doodle di sudut, tidak menutupi wajah atau teks.
4. **Satu gaya per halaman.** Jangan mencampur foto dan ilustrasi vektor kartun dalam satu bagian.

---

## 2. Foto

### 2.1 Gaya
- Latar polos berwarna (kuning, biru langit, pink, cyan) di balik subjek, seperti pada referensi, atau latar alami yang bersih.
- Ekspresi ramah, pose natural. Properti pendidikan (buku, map, laptop, headphone) menguatkan tema.
- Keberagaman: gender, hijab/non-hijab, usia pelajar SMA hingga mahasiswa.

### 2.2 Sumber dan hak pakai
- Prioritas utama: foto asli pelajar dan mahasiswa Semarang dengan izin tertulis (lebih tepercaya dan sesuai strategi satu daerah dulu) **(usulan)**.
- Sementara itu, foto stok berlisensi komersial diperbolehkan.
- Catat sumber dan lisensi setiap foto dalam daftar internal.
- Foto subjek di bawah 18 tahun hanya dipakai bila ada izin wali dan bukti izin disimpan.
- Foto referensi yang diunggah sebagai contoh gaya **tidak boleh** langsung dipakai di produk.

### 2.3 Teknis
- Rasio: 1:1 dan 4:5 untuk bingkai kecil, 3:2 untuk bingkai lebar.
- Format modern (WebP/AVIF) dengan cadangan JPEG; ukuran file kecil untuk koneksi ponsel.
- Teks alternatif wajib: deskripsi singkat isi foto, bukan "gambar".

---

## 3. Bingkai Blob

Bentuk bingkai yang dipakai di hero dan bagian gambar-teks:

| Bentuk | Deskripsi |
|---|---|
| Daun | Persegi dengan dua sudut berseberangan sangat membulat (radius 50%) dan dua lainnya kecil |
| Setengah lingkaran | Satu sisi lurus, sisi lainnya melengkung penuh |
| Persegi lembut | Radius `--radius-xl` di semua sudut |
| Lingkaran | Untuk avatar dan foto kecil |

- Latar bingkai memakai warna `--color-sky-200`, `--color-cyan-100`, atau `--color-yellow-400`, tergantung warna latar foto.
- Gabungkan dua foto bertumpuk (satu lebih besar, satu menimpa di sudut) untuk bagian gambar-teks, seperti pada referensi.
- Tambahkan lingkaran penanda (kuning) di sudut yang menampilkan objek kecil, misalnya kalender, untuk memperkuat pesan.

---

## 4. Doodle

### 4.1 Daftar bentuk
- Zig-zag/gelombang
- Segitiga garis dengan sudut membulat
- Persegi miring bersudut membulat
- Lingkaran padat (kuning, abu muda, cyan muda)
- Percikan kecil atau daun di dekat judul
- Garis bawah tulisan tangan di bawah kata kunci judul

### 4.2 Aturan
- Warna: biru `--color-blue-600` untuk garis, kuning `--color-yellow-400` untuk garis dan isi, `--color-cyan-100` serta abu muda untuk lingkaran padat.
- Tebal garis 2–3 px, ujung membulat.
- Maksimal 3–4 doodle per bagian layar, ditempatkan di tepi atau sudut.
- Jangan menaruh doodle di belakang teks panjang, di dalam tabel, filter, kalender, atau formulir.
- Di layar < 640 px, kurangi menjadi 1–2 atau sembunyikan.
- Doodle bersifat dekoratif: sembunyikan dari pembaca layar.
- Simpan sebagai SVG sehingga mudah diwarnai dan ukurannya fleksibel.

### 4.3 Garis bawah judul
- Satu per halaman, di bawah satu kata kunci pada judul hero.
- Warna kuning, tebal sekitar 4 px, lengkungan lembut seperti ditulis tangan.

---

## 5. Ikon

### 5.1 Gaya
- Ikon garis tegas dengan sudut membulat dan tebal garis konsisten (disarankan satu pustaka ikon saja, misalnya Lucide) **(usulan)**.
- Ikon fitur tampil putih di dalam kotak warna 40 px dengan radius `--radius-md`.
- Ikon kategori tampil berwarna di dalam kotak 32 px berlatar warna muda.

### 5.2 Warna kotak ikon fitur

| Warna | Dipakai untuk |
|---|---|
| Biru `#0065FF` | Pencarian, informasi umum |
| Hijau `#76C100` | Waktu, kalender, tersedia |
| Oranye `#FF6600` | Pengingat, pengumuman |
| Pink `#FF70B1` | Komunitas, interaksi |

Warna di atas hanya untuk kotak ikon dekoratif. Untuk teks atau status, pakai varian gelap di `design-tokens.md`.

### 5.3 Ikon untuk status
- Terverifikasi: centang dalam perisai atau lingkaran.
- Perlu dicek ulang: segitiga peringatan.
- Tenggat: jam.
- Lokasi: pin peta.
- Simpan: penanda buku (outline saat belum, terisi saat tersimpan).

---

## 6. Ilustrasi dan Keadaan Kosong

- Keadaan kosong memakai kombinasi doodle sederhana dan satu ikon besar, bukan foto.
- Contoh: pencarian tanpa hasil memakai kaca pembesar dengan zig-zag di sampingnya.
- Halaman error memakai warna yang sama dan pesan ramah (lihat `content-voice.md`).

---

## 7. Logo dan Merek

- Placeholder `[Nama Produk]` memakai wordmark teks tebal berwarna `--color-ink-900` dengan ikon sederhana berwarna biru di kiri, seperti logo "Tutor" pada referensi.
- Logo final menyusul setelah nama produk ditetapkan.
- Ruang bebas di sekitar logo minimal setinggi huruf besar di wordmark.

---

## 8. Daftar Periksa Sebelum Memakai Visual

- [ ] Foto berlisensi dan sumbernya dicatat.
- [ ] Ada izin untuk subjek foto, terutama yang di bawah 18 tahun.
- [ ] Bingkai dan warna latar mengikuti panduan ini.
- [ ] Doodle tidak menutupi teks atau data.
- [ ] Teks alternatif sudah ditulis.
- [ ] Ukuran file sudah dioptimalkan.
