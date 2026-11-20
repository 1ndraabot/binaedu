# BinaEdu — Semua peluang kuliahmu, di satu tempat

![Next.js](https://img.shields.io/badge/Next.js-16.4.6-black)
![React](https://img.shields.io/badge/React-19.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-Postgres_17-3ecf8e)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

**BinaEdu** adalah platform agregator informasi peluang akademik — beasiswa, lomba, jalur masuk PTN, hibah, magang, dan pertukaran pelajar — yang dikumpulkan dalam satu dashboard yang rapi, terverifikasi, dan selalu diperbarui.

Informasi peluang selama ini tersebar di berbagai akun Instagram, grup WhatsApp, dan situs penyelenggara yang tidak seragam. Akibatnya siswa dan mahasiswa sering terlambat mengetahui tenggat atau kehilangan syarat penting. BinaEdu menjawab masalah itu dengan tiga prinsip:

1. **Satu sumber rujukan** — semua peluang terkumpul, bisa dicari dan difilter.
2. **Verifikasi sebagai inti** — setiap info diperiksa admin sebelum tayang; tanggal verifikasi selalu terlihat.
3. **Tenggat tidak terlewat** — kalender tenggat dengan pengingat H-7 dan H-1.

> Strategi peluncuran: dimulai dari **Semarang** (Fase 1), meluas ke **nasional** (Fase 2), lalu **internasional** (Fase 3).

- 🌐 Demo: **https://binaedu.vercel.app/**
- 📚 Dokumen desain & PRD: [`docs/`](docs/)

---

## ✨ Fitur

Pemetaan terhadap PRD (`docs/PRD-Agregator-Peluang-Akademik.md`):

| Kode | Fitur | Penjelasan |
|------|-------|------------|
| F1 | **Dashboard sentral & pencarian** (wajib) | Cari dan filter peluang berdasarkan kategori (beasiswa, lomba, jalur masuk, hibah, magang, pertukaran), cakupan (Semarang → internasional), jenjang, bidang studi, dan status tenggat |
| F2 | **Kalender tenggat & pengingat** (wajib) | Semua peluang tersimpan masuk kalender; pengingat email H-7 dan H-1 sesuai zona waktu WIB |
| F3 | **Rekomendasi personal** (sebaiknya) | Isi profil singkat (jenjang, jurusan, minat) untuk mendapat peluang yang paling cocok — opsional, tanpa profil F1–F2 tetap jalan |
| F4 | **Halaman detail terstandar** (wajib) | Ringkasan, syarat, manfaat, langkah pendaftaran, biaya, kontak, dan tautan resmi dalam format yang selalu sama |
| F5 | **Simpan & lacak progres** (sebaiknya) | Simpan peluang dan pantau statusnya: belum daftar → sudah daftar → tahap seleksi → lolos/tidak lolos |
| F6 | **Kontribusi & verifikasi** (wajib) | Penyelenggara mengirim info lewat formulir; admin memverifikasi antrean (setujui / minta revisi / tolak); pengunjung bisa melaporkan data salah |

**Tiga peran pengguna:**

| Peran | Hak akses |
|-------|-----------|
| **Pengguna** | Mencari, menyimpan, melacak progres, mengisi profil, melaporkan data salah |
| **Penyelenggara** | Semua hak pengguna + mengirim & merevisi kiriman peluang (dashboard `/penyelenggara`) |
| **Admin** | Memverifikasi antrean kiriman, menangani laporan, arsip/kelola peluang (`/admin`) |

---

## 🖥️ Demo

Buka **https://binaedu.vercel.app/**

Gunakan akun demo berikut untuk mencoba tiap peran (data di dalamnya **fiktif**, hanya untuk keperluan demo — repo ini publik sehingga kredensial demo sengaja dibuka):

| Peran | Email | Password |
|-------|-------|----------|
| Admin | `admin@binaedu.id` | `BinaeduAdmin1` |
| Penyelenggara | `bem@undip.ac.id` | `BinaeduPenyelenggara1` |
| Pengguna | `rani@example.com` | `BinaeduPengguna1` |

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | [Next.js](https://nextjs.org) 16.4.6 (App Router, Turbopack, `cacheComponents`) |
| UI | React 19.3, [Tailwind CSS](https://tailwindcss.com) 4.3 (via `@tailwindcss/turbopack`), [lucide-react](https://lucide.dev) |
| Bahasa | TypeScript 5 |
| Backend | [Supabase](https://supabase.com) — Postgres 17 + Row Level Security (RLS) + Auth (email/password) |
| Akses data | `@supabase/supabase-js` 2.x melalui lapisan repository (`lib/repository.ts`) |
| Kualitas | ESLint 9 + `eslint-config-next` |

---

## 🚀 Quick Start

**Prasyarat:** Node.js 20+ dan npm.

```bash
# 1. Clone repo
git clone https://github.com/1ndraabot/binaedu.git
cd binaedu

# 2. Install dependensi
npm install

# 3. Salin environment variables (lihat bagian berikutnya)
#    buat file .env.local berisi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Jalankan server pengembangan
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Menyiapkan database Supabase

Skema lengkap ada di folder [`supabase/migrations/`](supabase/migrations/) (11 migrasi berurutan). Dua cara menjalankannya pada project Supabase baru:

**Cara A — Supabase CLI (disarankan):**

```bash
npm install -g supabase          # atau: scoop install supabase
supabase login
supabase link --project-ref <project-ref>
supabase db push
```

**Cara B — manual:** buka **SQL Editor** di dashboard Supabase, lalu jalankan file migrasi **berurutan sesuai nama** (`0001_enums` → `0010_users_self_read_own_row`, termasuk `0008b`).

Catatan:

- Migrasi `0004_seed` mengisi data **fiktif** untuk pengembangan.
- Migrasi `0006` + `0008`/`0008b` membuat 3 akun demo (tabel di atas) beserta trigger yang menautkan pendaftaran baru ke tabel `public.users`.
- Keamanan data dijaga **Row Level Security**: anon key aman dipakai di frontend karena akses dibatasi kebijakan per peran.

### Script yang tersedia

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Server pengembangan di `localhost:3000` |
| `npm run build` | Build produksi |
| `npm run start` | Menjalankan hasil build produksi |
| `npm run lint` | ESLint |

---

## 🔑 Environment Variables

Buat file `.env.local` di root project dengan isi:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

| Variabel | Wajib | Penjelasan |
|----------|-------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | URL project Supabase (Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Publishable/anon key — aman dipublikasikan karena seluruh akses dibatasi RLS |

Kedua variabel berawalan `NEXT_PUBLIC_` karena dipakai di client maupun server (`lib/supabase.ts`). Aplikasi akan menolak jalan jika salah satu kosong.

---

## 📁 Struktur Projek

```
binaedu/
├── app/                        # Halaman (App Router)
│   ├── page.tsx                #   Beranda (pemasaran)
│   ├── cari/                   #   Dashboard pencarian & filter peluang
│   ├── peluang/[id]/           #   Detail peluang (F4)
│   ├── kalender/               #   Kalender tenggat (F2)
│   ├── peluang-saya/           #   Simpan & lacak progres (F5)
│   ├── profil/                 #   Profil & preferensi (F3)
│   ├── masuk/ · daftar/        #   Autentikasi
│   ├── kirim/ · kirim/saya/    #   Kirim info kegiatan (F6) + kiriman milik sendiri
│   ├── penyelenggara/          #   Dashboard penyelenggara
│   ├── admin/                  #   Antrean verifikasi admin
│   ├── tentang/ · kontak/      #   Halaman statis
│   └── <route>/…-client.tsx    #   Komponen client per halaman
├── components/                 # Komponen UI bersama
│   ├── navbar.tsx · footer.tsx
│   ├── opportunity-card.tsx · save-button.tsx · report-button.tsx · deadline.tsx
│   ├── cards.tsx · ui.tsx · badge.tsx · stat-band.tsx
│   └── blobs.tsx · doodles.tsx · empty-art.tsx   # Dekorasi (blob & doodle)
├── lib/
│   ├── schema.ts               # Sumber kebenaran tipe (enum, label, bentuk data)
│   ├── repository.ts           # Lapisan akses data (PostgREST) — satu-satunya yang menyentuh Supabase
│   ├── supabase.ts             # Klien Supabase bersama (anon key)
│   ├── data.ts                 # Metadata tampilan lokal (ikon/warna kategori)
│   ├── format.ts               # Util format (tanggal, rupiah, dsb.)
│   └── store.tsx               # Context/state global (sesi pengguna)
├── docs/                       # Dokumen desain & produk
│   ├── PRD-Agregator-Peluang-Akademik.md
│   ├── Lampiran-Rencana-Proyek.md
│   ├── data-model.md · style.md · layouts.md · components.md
│   ├── design-tokens.md · content-voice.md · illustration-imagery.md
├── supabase/
│   └── migrations/             # 11 migrasi SQL berurutan (enums → tables → RLS → seed → auth)
├── next.config.ts              # cacheComponents, partialPrefetching, turbopack
└── opencode.json               # Konfigurasi MCP (development)
```

---

## ☁️ Deployment

### Vercel

1. Import repo ke [Vercel](https://vercel.com/new).
2. Set **Environment Variables**: `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Deploy — framework preset terdeteksi otomatis sebagai Next.js.

### Supabase

- Migrasi sudah diterapkan pada project Supabase produksi (`supabase db push` dari folder `supabase/migrations/` bila membuat project baru).
- Perubahan skema selanjutnya ditulis sebagai **migrasi baru** di `supabase/migrations/`, bukan mengedit file lama.

---

## 🗺️ Roadmap

- [x] **Fase 1 — Semarang (MVP)**: F1, F2, F4, F6 (wajib) + F3, F5 (sebaiknya); input manual + formulir penyelenggara; kualitas data diutamakan
- [x] Fase 2 — integrasi Supabase Auth + RLS (migrasi `0001`–`0010`)
- [ ] **Fase 2 — Nasional**: perluasan cakupan provinsi dengan data aktif; monetisasi dipertimbangkan setelah basis pengguna terbentuk
- [ ] **Fase 3 — Internasional**: dukungan bahasa, zona waktu, mata uang, dan jenjang antarnegara
- [ ] Pengingat H-7/H-1 terkirim otomatis (cron/scheduled job)

> Pergantian fase ditentukan oleh metrik keberhasilan (PRD §4.3), bukan semata tanggal.

---

## 🤝 Kontribusi

Kontribusi terbuka! Alur singkat:

1. Fork repo ini, lalu buat branch dari `main`:
   ```bash
   git checkout -b feat/nama-fitur    # atau fix/nama-bug
   ```
2. Ikuti konvensi commit: `feat:`, `fix:`, `docs:`, `chore:`.
3. Pastikan `npm run lint` bersih sebelum push.
4. Buka Pull Request ke `main` dengan deskripsi yang jelas.

Pedoman desain, gaya bahasa, dan model data **wajib** merujuk ke folder [`docs/`](docs/) (`style.md`, `content-voice.md`, `data-model.md`) agar produk tetap konsisten.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 👤 Author

**1ndraabot**

- GitHub: [@1ndraabot](https://github.com/1ndraabot)
- Email: [rayindasta@gmail.com](mailto:rayindasta@gmail.com)
