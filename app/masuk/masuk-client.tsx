"use client";

/** Halaman Masuk — docs/layouts.md §10: panel tengah di atas latar bg, satu blob kecil. */
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { DoodleCircle, DoodleZigzag } from "@/components/doodles";
import { Button } from "@/components/ui";
import { useToast } from "@/lib/store";
import { supabase } from "@/lib/supabase";

const inputClass =
  "mt-1.5 h-11 w-full rounded-sm border border-line bg-surface px-3 text-sm text-ink-900 placeholder:text-ink-400 focus-ring";

export default function MasukClient() {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = "Format email belum benar. Contoh: nama@email.com.";
    }
    if (password.length < 8) {
      next.password = "Kata sandi minimal 8 karakter.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0 || submitting) return;
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSubmitting(false);
    if (error) {
      setErrors({
        password:
          error.message.includes("Invalid login")
            ? "Email atau kata sandi salah."
            : "Masuk gagal. Coba lagi sebentar.",
      });
      return;
    }
    toast("Masuk berhasil.");
    router.push("/peluang-saya");
  }

  return (
    <section className="bg-bg">
      <div className="mx-auto flex max-w-md flex-col px-4 py-16 md:py-24">
        <div className="relative rounded-xl bg-surface p-6 shadow-card md:p-8">
          {/* Satu blob dan doodle kecil di sisi (layouts.md §10) */}
          <DoodleCircle
            className="absolute -top-3 -right-3 h-6 text-cyan-100"
            aria-hidden="true"
          />
          <DoodleZigzag
            className="absolute -bottom-4 -left-3 w-8 text-yellow-400"
            aria-hidden="true"
          />

          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-blue-600" aria-hidden="true" />
            <span className="text-lg font-bold text-ink-900">BinaEdu</span>
          </div>
          <h1 className="mt-3 text-h3 text-ink-900 md:text-[22px]">Masuk</h1>
          <p className="mt-1 text-sm text-ink-600">
            Simpan peluang dan terima pengingat tenggat.
          </p>

          <form onSubmit={onSubmit} className="mt-6" noValidate>
            <div>
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
            </div>
            <Button type="submit" variant="primary" className="mt-6 w-full">
              Masuk
            </Button>
          </form>

          <p className="mt-4 text-sm text-ink-600">
            Belum punya akun?{" "}
            <Link
              href="/daftar"
              className="font-semibold text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
            >
              Daftar
            </Link>
          </p>
          <p className="mt-3 text-xs leading-relaxed text-ink-400">
            Dengan masuk, Anda menyetujui{" "}
            <Link href="#" className="text-ink-600 underline underline-offset-2">
              syarat penggunaan
            </Link>{" "}
            dan{" "}
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
