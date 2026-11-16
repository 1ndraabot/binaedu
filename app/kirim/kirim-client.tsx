"use client";

/**
 * Formulir kiriman penyelenggara — docs/layouts.md §8 & docs/components.md §7.
 * Langkah pendek dengan indikator kemajuan; gaya bahasa sesuai content-voice.md
 * ("Anda" untuk penyelenggara). Kiriman masuk antrean admin (Supabase, PRD F6).
 */
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleAlert, CircleCheck, ChevronLeft } from "lucide-react";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  FIELDS,
  type Category,
  type Field,
} from "@/lib/schema";
import { useToast } from "@/lib/store";
import { getMe, listLocations, submitKiriman } from "@/lib/repository";
import { Button } from "@/components/ui";

const STEPS = [
  { title: "Informasi dasar" },
  { title: "Persyaratan dan benefit" },
  { title: "Tenggat dan tautan resmi" },
  { title: "Tinjau dan kirim" },
];

interface FormState {
  title: string;
  category: string;
  organizer: string;
  location: string;
  level: string;
  field: string;
  fee: string;
  summary: string;
  requirements: string;
  benefits: string;
  deadline: string;
  url: string;
  contact: string;
}

const INITIAL: FormState = {
  title: "",
  category: "",
  organizer: "",
  location: "",
  level: "SMA/SMK & Mahasiswa",
  field: "Umum",
  fee: "0",
  summary: "",
  requirements: "",
  benefits: "",
  deadline: "",
  url: "",
  contact: "",
};

const inputClass =
  "mt-1.5 h-11 w-full rounded-sm border border-line bg-surface px-3 text-sm text-ink-900 placeholder:text-ink-400 focus-ring";
const labelClass = "text-sm font-medium text-ink-900";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 flex items-start gap-1 text-xs text-red-600">
      <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export default function KirimClient() {
  const toast = useToast();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(current: number): boolean {
    const next: Record<string, string> = {};
    if (current === 0) {
      if (!form.title.trim()) next.title = "Kolom ini wajib diisi.";
      if (!form.category) next.category = "Kolom ini wajib diisi.";
      if (!form.organizer.trim()) next.organizer = "Kolom ini wajib diisi.";
      if (!form.location.trim()) next.location = "Kolom ini wajib diisi.";
    }
    if (current === 1) {
      if (!form.summary.trim()) next.summary = "Kolom ini wajib diisi.";
      if (!form.requirements.trim()) next.requirements = "Kolom ini wajib diisi.";
    }
    if (current === 2) {
      if (!form.deadline) next.deadline = "Kolom ini wajib diisi.";
      if (!form.url.trim()) {
        next.url = "Kolom ini wajib diisi.";
      } else if (!form.url.trim().startsWith("https://")) {
        next.url = "Tautan resmi belum benar. Pastikan diawali https://.";
      }
      if (!form.contact.trim()) next.contact = "Kolom ini wajib diisi.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validate(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function submit() {
    if (submitting) return;
    setSubmitting(true);
    try {
      // Kirim hanya untuk pengguna berakun (RLS: created_by = pemilik sesi)
      const me = await getMe();
      if (!me) {
        toast("Kirim info harus lewat akun. Masuk atau daftar dulu, ya.");
        router.push("/masuk");
        return;
      }
      // Cocokkan teks lokasi dengan data lokasi seed; bila tidak ada, nasional
      const locations = await listLocations();
      const loc = locations.find(
        (l) => l.name.toLowerCase() === form.location.trim().toLowerCase()
      );
      const err = await submitKiriman({
        title: form.title.trim(),
        category: form.category as Category,
        organizer: form.organizer.trim(),
        summary: form.summary.trim(),
        contact: form.contact.trim(),
        scope: loc ? "lokal" : "nasional",
        locationId: loc?.id ?? null,
        level: form.level as "SMA/SMK" | "Mahasiswa" | "SMA/SMK & Mahasiswa",
        field: form.field as Field,
        fee: Math.max(0, Number(form.fee) || 0),
        deadline: form.deadline,
        officialUrl: form.url.trim(),
        requirements: form.requirements
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        benefits: form.benefits
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        createdBy: me.id,
      });
      if (err) {
        setErrors({ _submit: "Gagal mengirim kiriman. Coba lagi sebentar." });
        return;
      }
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="bg-bg">
        <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center md:px-6">
          <CircleCheck className="h-14 w-14 text-green-700" aria-hidden="true" />
          <h1 className="mt-5 text-h3 text-ink-900 md:text-[22px]">
            Kiriman diterima
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            Terima kasih! Infomu sedang kami periksa, biasanya selesai dalam
            2×24 jam.
          </p>
          <span className="mt-4 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-ink-800">
            Menunggu verifikasi
          </span>
          <p className="mt-2 text-xs text-ink-400">
            Status kiriman dapat dilacak dari tautan yang kami kirim ke email Anda.
          </p>
          <Button href="/" variant="primary" className="mt-6">
            Kembali ke beranda
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-[960px] px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-h2 text-ink-900 md:text-[32px]">Kirim info kegiatan</h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-600">
          Formulir ini untuk penyelenggara. Setelah dikirim, tim kami memeriksa
          info Anda sebelum tayang.
        </p>

        {/* Indikator kemajuan */}
        <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {STEPS.map((s, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={s.title} className="flex items-center gap-2">
                <span
                  aria-current={current ? "step" : undefined}
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-blue-600 text-white"
                      : current
                        ? "border-2 border-blue-600 text-blue-600"
                        : "bg-line text-ink-600"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-sm ${
                    current
                      ? "font-semibold text-ink-900"
                      : done
                        ? "text-ink-800"
                        : "text-ink-400"
                  }`}
                >
                  {s.title}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 max-w-lg rounded-lg bg-surface p-5 shadow-card md:p-6">
          {step === 0 && (
            <>
              <div>
                <label htmlFor="judul" className={labelClass}>
                  Judul kegiatan (wajib)
                </label>
                <input
                  id="judul"
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Contoh: Lomba Esai Ilmiah 2027"
                  className={inputClass}
                />
                <FieldError message={errors.title} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="kategori" className={labelClass}>
                    Kategori (wajib)
                  </label>
                  <select
                    id="kategori"
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Pilih kategori</option>
                    {CATEGORIES.map((c: Category) => (
                      <option key={c} value={c}>
                        {CATEGORY_LABELS[c]}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.category} />
                </div>
                <div>
                  <label htmlFor="penyelenggara" className={labelClass}>
                    Penyelenggara (wajib)
                  </label>
                  <input
                    id="penyelenggara"
                    type="text"
                    value={form.organizer}
                    onChange={(e) => set("organizer", e.target.value)}
                    className={inputClass}
                  />
                  <FieldError message={errors.organizer} />
                </div>
                <div>
                  <label htmlFor="lokasi" className={labelClass}>
                    Lokasi (wajib)
                  </label>
                  <input
                    id="lokasi"
                    type="text"
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                    placeholder="Contoh: Semarang, Jawa Tengah"
                    className={inputClass}
                  />
                  <FieldError message={errors.location} />
                </div>
                <div>
                  <label htmlFor="jenjang" className={labelClass}>
                    Jenjang peserta
                  </label>
                  <select
                    id="jenjang"
                    value={form.level}
                    onChange={(e) => set("level", e.target.value)}
                    className={inputClass}
                  >
                    {["SMA/SMK", "Mahasiswa", "SMA/SMK & Mahasiswa"].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="bidang" className={labelClass}>
                    Bidang
                  </label>
                  <select
                    id="bidang"
                    value={form.field}
                    onChange={(e) => set("field", e.target.value)}
                    className={inputClass}
                  >
                    {FIELDS.map((f: Field) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="biaya" className={labelClass}>
                    Biaya pendaftaran (Rp)
                  </label>
                  <input
                    id="biaya"
                    type="number"
                    min={0}
                    value={form.fee}
                    onChange={(e) => set("fee", e.target.value)}
                    className={inputClass}
                  />
                  <p className="mt-1 text-xs text-ink-400">
                    Tulis 0 bila gratis.
                  </p>
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <label htmlFor="ringkasan" className={labelClass}>
                  Ringkasan (wajib)
                </label>
                <textarea
                  id="ringkasan"
                  value={form.summary}
                  onChange={(e) => set("summary", e.target.value)}
                  rows={4}
                  placeholder="2–3 kalimat: apa, untuk siapa, apa manfaat utamanya."
                  className="mt-1.5 w-full rounded-sm border border-line bg-surface px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus-ring"
                />
                <FieldError message={errors.summary} />
              </div>
              <div className="mt-4">
                <label htmlFor="persyaratan" className={labelClass}>
                  Persyaratan (wajib)
                </label>
                <textarea
                  id="persyaratan"
                  value={form.requirements}
                  onChange={(e) => set("requirements", e.target.value)}
                  rows={4}
                  placeholder="Satu syarat per baris, tulis angka dengan jelas (misalnya: IPK minimal 3,00)."
                  className="mt-1.5 w-full rounded-sm border border-line bg-surface px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus-ring"
                />
                <FieldError message={errors.requirements} />
              </div>
              <div className="mt-4">
                <label htmlFor="benefit" className={labelClass}>
                  Benefit
                </label>
                <textarea
                  id="benefit"
                  value={form.benefits}
                  onChange={(e) => set("benefits", e.target.value)}
                  rows={3}
                  placeholder="Satu benefit per baris, sebutkan nilai atau bentuknya bila ada."
                  className="mt-1.5 w-full rounded-sm border border-line bg-surface px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus-ring"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="tenggat" className={labelClass}>
                    Tenggat pendaftaran (wajib)
                  </label>
                  <input
                    id="tenggat"
                    type="date"
                    value={form.deadline}
                    onChange={(e) => set("deadline", e.target.value)}
                    className={inputClass}
                  />
                  <FieldError message={errors.deadline} />
                </div>
                <div>
                  <label htmlFor="kontak" className={labelClass}>
                    Kontak penyelenggara (wajib)
                  </label>
                  <input
                    id="kontak"
                    type="text"
                    value={form.contact}
                    onChange={(e) => set("contact", e.target.value)}
                    placeholder="Email, nomor, atau akun resmi"
                    className={inputClass}
                  />
                  <FieldError message={errors.contact} />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="tautan" className={labelClass}>
                  Tautan resmi (wajib)
                </label>
                <input
                  id="tautan"
                  type="url"
                  value={form.url}
                  onChange={(e) => set("url", e.target.value)}
                  placeholder="https://"
                  className={inputClass}
                />
                <FieldError message={errors.url} />
                <p className="mt-1 text-xs text-ink-400">
                  Peluang tanpa tautan resmi tidak dapat tayang.
                </p>
              </div>
            </>
          )}

          {step === 3 && (
            <dl className="space-y-4 text-sm">
              {[
                ["Judul", form.title],
                ["Kategori", form.category ? CATEGORY_LABELS[form.category as Category] : ""],
                ["Penyelenggara", form.organizer],
                ["Lokasi", form.location],
                ["Jenjang", form.level],
                ["Bidang", form.field],
                [
                  "Biaya pendaftaran",
                  Number(form.fee) === 0 ? "Gratis" : `Rp${Number(form.fee).toLocaleString("id-ID")}`,
                ],
                ["Ringkasan", form.summary],
                ["Persyaratan", form.requirements],
                ["Benefit", form.benefits || "—"],
                ["Tenggat", form.deadline],
                ["Tautan resmi", form.url],
                ["Kontak", form.contact],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[140px_1fr] gap-2">
                  <dt className="font-medium text-ink-600">{label}</dt>
                  <dd className="text-ink-900">{value || "—"}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* Navigasi langkah */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <div className="flex gap-2">
              {step > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Kembali
                </Button>
              )}
              <button
                type="button"
                onClick={() => toast("Draf tersimpan.")}
                className="text-sm font-medium text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
              >
                Simpan draf
              </button>
            </div>
            {step < STEPS.length - 1 ? (
              <Button variant="primary" onClick={goNext}>
                Lanjut
              </Button>
            ) : (
              <Button variant="primary" onClick={submit} disabled={submitting}>
                {submitting ? "Mengirim…" : "Kirim"}
              </Button>
            )}
          </div>
          <FieldError message={errors._submit} />
        </div>

        <p className="mt-4 text-xs text-ink-400">
          Sudah punya pertanyaan?{" "}
          <Link
            href="/kontak"
            className="text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
          >
            Hubungi kami
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
