"use client";

/** Halaman Daftar — docs/layouts.md §10: formulir singkat, tombol utama kuning. */
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { DoodleCircle } from "@/components/doodles";
import { Button } from "@/components/ui";
import { useToast } from "@/lib/store";
import { supabase } from "@/lib/supabase";

const inputClass =
  "mt-1.5 h-11 w-full rounded-sm border border-line bg-surface px-3 text-sm text-ink-900 placeholder:text-ink-400 focus-ring";

export default function DaftarClient() {
  const toast = useToast();
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ nama?: string; email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!nama.trim()) next.nama = "Kolom ini wajib diisi.";
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = "Format email belum benar. Contoh: nama@email.com.";
    }
    if (password.length < 8) {
      next.password = "Kata sandi minimal 8 karakter.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0 || submitting) return;
    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name: nama.trim() } },
    });
    setSubmitting(false);
    if (error) {
      setErrors({ email: "Pendaftaran gagal. Coba lagi sebentar." });
      return;
    }
    if (data.session) {
      toast("Pendaftaran berhasil. Selamat mencoba!");
      router.push("/cari");
    } else {
      // Email konfirmasi aktif — akun dibuat, menunggu verifikasi email
      toast("Pendaftaran berhasil. Cek email untuk konfirmasi, lalu masuk.");
      router.push("/masuk");
    }
  }

  return (
    <section className="bg-bg">
      <div className="mx-auto flex max-w-md flex-col px-4 py-16 md:py-24">
        <div className="relative rounded-xl bg-surface p-6 shadow-card md:p-8">
          <DoodleCircle
            className="absolute -top-3 -right-3 h-6 text-yellow-400"
            aria-hidden="true"
          />
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-blue-600" aria-hidden="true" />
            <span className="text-lg font-bold text-ink-900">BinaEdu</span>
          </div>
          <h1 className="mt-3 text-h3 text-ink-900 md:text-[22px]">Daftar</h1>
          <p className="mt-1 text-sm text-ink-600">
            Gratis untuk pelajar dan mahasiswa.
          </p>

          <form onSubmit={onSubmit} className="mt-6" noValidate>
            <div>
              <label htmlFor="nama" className="text-sm font-medium text-ink-900">
                Nama
              </label>
              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama panggilan"
                className={inputClass}
              />
              {errors.nama && (
                <p className="mt-1 flex items-start gap-1 text-xs text-red-600">
                  <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {errors.nama}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="text-sm font-medium text-ink-900">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className={inputClass}
              />
              {errors.email && (
                <p className="mt-1 flex items-start gap-1 text-xs text-red-600">
                  <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {errors.email}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label htmlFor="sandi" className="text-sm font-medium text-ink-900">
                Kata sandi
              </label>
              <input
                id="sandi"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
              {errors.password && (
                <p className="mt-1 flex items-start gap-1 text-xs text-red-600">
                  <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {errors.password}
                </p>
              )}
              <p className="mt-1 text-xs text-ink-400">
                Minimal 8 karakter.
              </p>
            </div>
            <Button type="submit" variant="primary" className="mt-6 w-full">
              Daftar
            </Button>
          </form>

          <p className="mt-4 text-sm text-ink-600">
            Sudah punya akun?{" "}
            <Link
              href="/masuk"
              className="font-semibold text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
            >
              Masuk
            </Link>
          </p>
          <p className="mt-3 text-xs leading-relaxed text-ink-400">
            Data profil hanya dipakai untuk mencocokkan peluang dan tidak
            dibagikan. Lihat{" "}
            <Link href="#" className="text-ink-600 underline underline-offset-2">
              kebijakan privasi
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
