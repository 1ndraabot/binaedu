/**
 * Format data mengikuti docs/content-voice.md §3:
 * - Tanggal ringkas: "17 Des 2026"
 * - Sisa waktu: "X hari lagi", "besok", "hari ini"
 * - Pembaruan relatif: "Diperbarui 2 hari lalu"
 */

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

const MONTHS_FULL = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export function formatDateShort(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDateLong(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return `${d.getDate()} ${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`;
}

/** "November 2026" untuk judul kalender. */
export function formatMonthYear(year: number, month: number): string {
  return `${MONTHS_FULL[month]} ${year}`;
}

/** Selisih hari dari hari ini (negatif = sudah lewat). */
export function daysUntil(iso: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${iso}T00:00:00`);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export type DeadlineTone = "normal" | "soon" | "urgent" | "ended";

export interface DeadlineInfo {
  tone: DeadlineTone;
  text: string;
}

/**
 * Label tenggat sesuai docs/components.md §4.5:
 * - >7 hari  : abu (normal)
 * - 2–7 hari : oranye (soon)
 * - ≤1 hari  : merah (urgent)
 * - berakhir : abu pudar (ended)
 */
export function deadlineInfo(iso: string): DeadlineInfo {
  const days = daysUntil(iso);
  if (days < 0) return { tone: "ended", text: "Telah berakhir" };
  if (days === 0) return { tone: "urgent", text: "Tutup hari ini" };
  if (days === 1) return { tone: "urgent", text: "Tutup besok" };
  if (days <= 7) {
    return {
      tone: "soon",
      text: `Tutup ${formatDateShort(iso)} • ${days} hari lagi`,
    };
  }
  return {
    tone: "normal",
    text: `Tutup ${formatDateShort(iso)} • ${days} hari lagi`,
  };
}

export function updatedInfo(iso: string): string {
  const days = -daysUntil(iso); // negatif dari daysUntil = usia
  if (days <= 0) return "Diperbarui hari ini";
  if (days === 1) return "Diperbarui 1 hari lalu";
  return `Diperbarui ${days} hari lalu`;
}

export function formatFee(fee: number): string {
  if (fee === 0) return "Gratis";
  return `Rp${fee.toLocaleString("id-ID")}`;
}

/** Tanggal hari ini ISO yyyy-mm-dd (WIB) — hanya untuk client/event handler. */
export function todayIso(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;
}
