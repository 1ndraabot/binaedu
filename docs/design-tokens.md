# Design Tokens — [Nama Produk]

Nilai siap pakai untuk seluruh antarmuka. Nilai warna asli diambil dengan mengambil sampel piksel dari gambar referensi; varian "teks" adalah penyesuaian untuk kontras **(usulan)**.

## 1. Warna

### 1.1 Merek

| Token | Hex | Keterangan |
|---|---|---|
| `--color-blue-600` | `#0065FF` | Biru utama |
| `--color-blue-700` | `#0052CC` | Hover/aktif biru **(usulan)** |
| `--color-blue-100` | `#D8E6FF` | Latar ikon dan chip biru |
| `--color-sky-200` | `#B7DBFF` | Blob dan bingkai foto |
| `--color-cyan-100` | `#C1F8FF` | Blob aksen |
| `--color-yellow-400` | `#FFD03A` | Kuning utama |
| `--color-yellow-500` | `#F5BE16` | Hover/aktif kuning **(usulan)** |
| `--color-yellow-100` | `#FFF3C4` | Latar sorotan lembut **(usulan)** |

### 1.2 Aksen

| Token | Hex | Pemakaian |
|---|---|---|
| `--color-orange-500` | `#FF6600` | Dekorasi dan ikon saja |
| `--color-orange-700` | `#C2410C` | Teks label oranye (kontras sekitar 5,2:1) |
| `--color-green-500` | `#76C100` | Dekorasi dan ikon saja |
| `--color-green-700` | `#15803D` | Teks dan badge terverifikasi (kontras sekitar 5,0:1) |
| `--color-green-100` | `#DCFCE7` | Latar badge terverifikasi **(usulan)** |
| `--color-pink-500` | `#FF70B1` | Aksen ikon kategori |
| `--color-red-600` | `#DC2626` | Error, tenggat ≤ 1 hari |
| `--color-red-100` | `#FEE2E2` | Latar peringatan merah **(usulan)** |

### 1.3 Netral

| Token | Hex | Pemakaian |
|---|---|---|
| `--color-ink-900` | `#111111` | Judul |
| `--color-ink-800` | `#1E1E1E` | Isi teks |
| `--color-ink-600` | `#4B5563` | Teks sekunder **(usulan)** |
| `--color-ink-400` | `#9CA3AF` | Placeholder, ikon nonaktif **(usulan)** |
| `--color-line` | `#E5E7EB` | Garis pemisah 1 px **(usulan)** |
| `--color-bg` | `#FAFBFD` | Latar halaman |
| `--color-bg-outer` | `#E2EFF7` | Latar luar kontainer |
| `--color-surface` | `#FFFFFF` | Kartu dan panel |

### 1.4 Semantik

| Token | Nilai | Pemakaian |
|---|---|---|
| `--color-primary` | `--color-yellow-400` | Tombol aksi utama |
| `--color-on-primary` | `--color-ink-900` | Teks pada tombol utama |
| `--color-secondary` | `--color-blue-600` | Tombol sekunder, tautan |
| `--color-on-secondary` | `#FFFFFF` | Teks pada biru |
| `--color-verified` | `--color-green-700` | Status terverifikasi |
| `--color-deadline-soon` | `--color-orange-700` | Tenggat ≤ 7 hari |
| `--color-deadline-urgent` | `--color-red-600` | Tenggat ≤ 1 hari |
| `--color-deadline-ended` | `--color-ink-400` | Telah berakhir |
| `--color-focus` | `--color-blue-600` | Cincin fokus |

### 1.5 Kontras yang sudah dihitung (perkiraan)

| Kombinasi | Kontras | Status |
|---|---|---|
| `#111111` di atas `#FFD03A` | sekitar 12,9:1 | Lulus |
| `#FFFFFF` di atas `#0065FF` | sekitar 4,9:1 | Lulus AA (tipis) |
| `#0065FF` di atas `#FFFFFF` | sekitar 4,9:1 | Lulus AA (tipis) |
| `#C2410C` di atas `#FFFFFF` | sekitar 5,2:1 | Lulus |
| `#15803D` di atas `#FFFFFF` | sekitar 5,0:1 | Lulus |
| `#FF6600` di atas `#FFFFFF` | sekitar 2,9:1 | **Gagal** untuk teks |
| `#FFD03A` di atas `#FFFFFF` | sekitar 1,5:1 | **Gagal** untuk teks |

> Perhitungan di atas perkiraan; verifikasi ulang dengan alat kontras sebelum rilis.

## 2. Tipografi

| Token | Nilai |
|---|---|
| `--font-sans` | `"Plus Jakarta Sans", "Outfit", system-ui, sans-serif` |
| `--weight-regular` | 400 |
| `--weight-medium` | 500 |
| `--weight-semibold` | 600 |
| `--weight-bold` | 700 |

| Gaya | Ukuran desktop | Ukuran mobile | Berat | Tinggi baris |
|---|---|---|---|---|
| Display (judul hero) | 56 px | 36 px | 600 | 1,1 |
| H1 | 40 px | 30 px | 600 | 1,2 |
| H2 | 32 px | 24 px | 600 | 1,25 |
| H3 | 22 px | 20 px | 600 | 1,3 |
| Isi besar | 18 px | 16 px | 400 | 1,6 |
| Isi | 16 px | 15 px | 400 | 1,6 |
| Isi kecil | 14 px | 14 px | 400 | 1,5 |
| Eyebrow | 12 px, kapital, jarak huruf +0,06em | 12 px | 700 | 1,3 |
| Angka statistik | 32 px | 28 px | 600 | 1,1 |

## 3. Jarak

Skala kelipatan 4 px.

| Token | Nilai |
|---|---|
| `--space-1` | 4 px |
| `--space-2` | 8 px |
| `--space-3` | 12 px |
| `--space-4` | 16 px |
| `--space-5` | 24 px |
| `--space-6` | 32 px |
| `--space-7` | 48 px |
| `--space-8` | 64 px |
| `--space-9` | 96 px |

- Jarak antarbagian halaman: `--space-8` (desktop), `--space-7` (mobile).
- Padding kartu: `--space-5`.
- Jarak antar kartu: `--space-5`.

## 4. Radius

| Token | Nilai | Pemakaian |
|---|---|---|
| `--radius-sm` | 8 px | Chip kecil, input |
| `--radius-md` | 12 px | Kotak ikon, dropdown |
| `--radius-lg` | 16 px | Kartu |
| `--radius-xl` | 24 px | Bingkai foto, panel besar |
| `--radius-pill` | 999 px | Tombol, badge, chip |

## 5. Bayangan

| Token | Nilai |
|---|---|
| `--shadow-card` | `0 2px 12px rgba(17, 24, 39, 0.06)` |
| `--shadow-pop` | `0 8px 24px rgba(17, 24, 39, 0.10)` |

## 6. Tata letak

| Token | Nilai |
|---|---|
| `--container-max` | 1200 px |
| `--content-max` | 960 px |
| `--gutter` | 24 px (desktop), 16 px (mobile) |
| Breakpoint | 640 px, 768 px, 1024 px, 1280 px |
| Kolom kartu | 4 (≥1024), 2 (≥640), 1 (<640) |

## 7. Gerak

| Token | Nilai |
|---|---|
| `--duration-fast` | 120 ms |
| `--duration-base` | 200 ms |
| `--easing` | `cubic-bezier(0.2, 0, 0, 1)` |

Gerak dipakai hemat (hover, buka/tutup panel). Hormati `prefers-reduced-motion`.

## 8. Ketebalan garis dan ikon

| Token | Nilai |
|---|---|
| Garis doodle | 2–3 px |
| Ukuran ikon dalam kotak | 20 px |
| Kotak ikon | 40 px (kartu), 32 px (daftar) |

## 9. Blok CSS siap salin

```css
:root {
  --color-blue-600: #0065FF;
  --color-blue-700: #0052CC;
  --color-blue-100: #D8E6FF;
  --color-sky-200: #B7DBFF;
  --color-cyan-100: #C1F8FF;
  --color-yellow-400: #FFD03A;
  --color-yellow-500: #F5BE16;
  --color-yellow-100: #FFF3C4;
  --color-orange-500: #FF6600;
  --color-orange-700: #C2410C;
  --color-green-500: #76C100;
  --color-green-700: #15803D;
  --color-green-100: #DCFCE7;
  --color-pink-500: #FF70B1;
  --color-red-600: #DC2626;
  --color-red-100: #FEE2E2;

  --color-ink-900: #111111;
  --color-ink-800: #1E1E1E;
  --color-ink-600: #4B5563;
  --color-ink-400: #9CA3AF;
  --color-line: #E5E7EB;
  --color-bg: #FAFBFD;
  --color-bg-outer: #E2EFF7;
  --color-surface: #FFFFFF;

  --font-sans: "Plus Jakarta Sans", "Outfit", system-ui, sans-serif;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 999px;

  --shadow-card: 0 2px 12px rgba(17, 24, 39, 0.06);
  --shadow-pop: 0 8px 24px rgba(17, 24, 39, 0.10);

  --container-max: 1200px;
  --content-max: 960px;
}
```
