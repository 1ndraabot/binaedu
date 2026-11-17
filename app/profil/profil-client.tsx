"use client";

/**
 * Profil dan preferensi — docs/layouts.md §7 (PRD F3, opsional).
 * Formulir pendek satu kolom, teks privasi jelas, tombol hapus data.
 * Input tak terkendali (uncontrolled) dengan defaultValue mengikuti profil
 * tersimpan; kunci per bidang agar terisi ulang setelah data dimuat/dihapus.
 */
import { useState } from "react";
import Link from "next/link";
import { CircleAlert, ShieldCheck } from "lucide-react";
import { useProfile, useSession, useToast } from "@/lib/store";
import {
  REMINDER_CHANNELS,
  REMINDER_CHANNEL_LABELS,
  USER_ROLE_LABELS,
  type ReminderChannel,
} from "@/lib/schema";
import { Button } from "@/components/ui";

const inputClass =
  "mt-1.5 h-11 w-full rounded-sm border border-line bg-surface px-3 text-sm text-ink-900 placeholder:text-ink-400 focus-ring";
const labelClass = "text-sm font-medium text-ink-900";

export default function ProfilClient() {
  const { profile, saveProfile, clearProfile } = useProfile();
  const { user, signOut } = useSession();
  const toast = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Admin & penyelenggara: kartu akun, bukan formulir pelajar (jenjang/IPK
  // tidak relevan untuk mereka). Formulir hanya untuk role pengguna/tamu.
  if (user && user.role !== "pengguna") {
    return (
      <section className="bg-bg">
        <div className="mx-auto max-w-[960px] px-4 py-8 md:px-6 md:py-12">
          <h1 className="text-h2 text-ink-900 md:text-[32px]">Profil akun</h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-600">
            Identitas akun kerja Anda di BinaEdu. Formulir profil pelajar tidak
            berlaku untuk peran ini.
          </p>

          <div className="mt-8 max-w-md rounded-lg bg-surface p-5 shadow-card md:p-6">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-base font-bold text-blue-700"
              >
                {user.name.slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink-900">
                  {user.name}
                </p>
                <p className="truncate text-xs text-ink-600">{user.email}</p>
              </div>
              <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {USER_ROLE_LABELS[user.role]}
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
              {user.role === "penyelenggara" && (
                <>
                  <Button href="/penyelenggara" variant="secondary">
                    Buka dashboard penyelenggara
                  </Button>
                  <Button href="/kirim" variant="ghost">
                    Kirim kegiatan baru
                  </Button>
                </>
              )}
              {user.role === "admin" && (
                <Button href="/admin" variant="secondary">
                  Buka dashboard admin
                </Button>
              )}
              <Button variant="ghost" onClick={() => signOut()}>
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const next: Record<string, string> = {};
    const ipk = get("ipk").replace(",", ".");
    if (ipk !== "" && (Number.isNaN(Number(ipk)) || Number(ipk) < 0 || Number(ipk) > 4)) {
      next.ipk = "IPK harus antara 0,00 dan 4,00.";
    }
    const semester = get("semester");
    if (semester !== "" && (!/^\d+$/.test(semester) || Number(semester) < 1)) {
      next.semester = "Semester harus berupa angka, minimal 1.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    saveProfile({
      jenjang: get("jenjang"),
      jurusan: get("jurusan"),
      semester,
      ipk: get("ipk"),
      minat: get("minat")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      domisili: get("domisili"),
      remindH7: data.get("remindH7") === "on",
      remindH1: data.get("remindH1") === "on",
      channel: (get("channel") || "email") as ReminderChannel,
    });
    toast("Profil tersimpan.");
  }

  function onDelete() {
    if (window.confirm("Hapus seluruh data profil?")) {
      clearProfile();
      setErrors({});
      toast("Datamu sudah dihapus.");
    }
  }

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-[960px] px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-h2 text-ink-900 md:text-[32px]">Profil dan preferensi</h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-600">
          Pengisian profil bersifat opsional. Dipakai untuk mencocokkan peluang,
          tidak dibagikan.{" "}
          <Link
            href="/tentang"
            className="font-medium text-blue-600 underline underline-offset-2 focus-ring rounded-sm"
          >
            Kebijakan privasi
          </Link>
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 max-w-md rounded-lg bg-surface p-5 shadow-card md:p-6"
          noValidate
        >
          {/* Jenjang */}
          <div>
            <label htmlFor="jenjang" className={labelClass}>
              Jenjang
            </label>
            <select
              id="jenjang"
              key={`jenjang:${profile.jenjang}`}
              name="jenjang"
              defaultValue={profile.jenjang}
              className={inputClass}
            >
              <option value="">Pilih jenjang</option>
              {["SMA/SMK", "Mahasiswa"].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label htmlFor="jurusan" className={labelClass}>
              Jurusan
            </label>
            <input
              id="jurusan"
              key={`jurusan:${profile.jurusan}`}
              name="jurusan"
              type="text"
              defaultValue={profile.jurusan}
              placeholder="Contoh: Teknik Informatika"
              className={inputClass}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="semester" className={labelClass}>
                Semester
              </label>
              <input
                id="semester"
                key={`semester:${profile.semester}`}
                name="semester"
                type="number"
                min={1}
                defaultValue={profile.semester}
                className={inputClass}
              />
              {errors.semester && (
                <p className="mt-1 flex items-start gap-1 text-xs text-red-600">
                  <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {errors.semester}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="ipk" className={labelClass}>
                IPK
              </label>
              <input
                id="ipk"
                key={`ipk:${profile.ipk}`}
                name="ipk"
                type="text"
                inputMode="decimal"
                defaultValue={profile.ipk}
                placeholder="3,50"
                className={inputClass}
              />
              {errors.ipk && (
                <p className="mt-1 flex items-start gap-1 text-xs text-red-600">
                  <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {errors.ipk}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="minat" className={labelClass}>
              Minat
            </label>
            <input
              id="minat"
              key={`minat:${profile.minat}`}
              name="minat"
              type="text"
              defaultValue={profile.minat}
              placeholder="Contoh: teknologi, desain"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-ink-400">
              Pisahkan dengan koma bila lebih dari satu.
            </p>
          </div>

          <div className="mt-4">
            <label htmlFor="domisili" className={labelClass}>
              Domisili
            </label>
            <input
              id="domisili"
              key={`domisili:${profile.domisili}`}
              name="domisili"
              type="text"
              defaultValue={profile.domisili}
              placeholder="Contoh: Semarang, Jawa Tengah"
              className={inputClass}
            />
          </div>

          {/* Pengaturan pengingat */}
          <fieldset className="mt-6 border-t border-line pt-5">
            <legend className="text-sm font-semibold text-ink-900">
              Pengaturan pengingat
            </legend>
            <div className="mt-3 space-y-2">
              <label className="flex items-center gap-2.5 text-sm text-ink-800">
                <input
                  type="checkbox"
                  name="remindH7"
                  key={`h7:${profile.remindH7}`}
                  defaultChecked={profile.remindH7}
                  className="h-4 w-4 rounded-sm accent-blue-600"
                />
                Ingatkan H-7
              </label>
              <label className="flex items-center gap-2.5 text-sm text-ink-800">
                <input
                  type="checkbox"
                  name="remindH1"
                  key={`h1:${profile.remindH1}`}
                  defaultChecked={profile.remindH1}
                  className="h-4 w-4 rounded-sm accent-blue-600"
                />
                Ingatkan H-1
              </label>
              <label className="flex items-center gap-2.5 text-sm text-ink-800">
                Saluran
                <select
                  name="channel"
                  key={`channel:${profile.channel}`}
                  defaultValue={profile.channel}
                  className="h-10 rounded-sm border border-line bg-surface px-2.5 text-sm text-ink-900 focus-ring"
                >
                  {REMINDER_CHANNELS.map((c) => (
                    <option key={c} value={c}>
                      {REMINDER_CHANNEL_LABELS[c]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <Button type="submit" variant="primary">
              Simpan
            </Button>
            <button
              type="button"
              onClick={onDelete}
              className="text-sm font-medium text-red-600 hover:underline focus-ring rounded-sm"
            >
              Hapus data
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
