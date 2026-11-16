/**
 * Skema data BinaEdu — sumber kebenaran tipe untuk FE dan calon backend.
 * Mengikuti PRD: fitur F1–F6, alur data & verifikasi §6, struktur lokasi §7.
 * Pemetaan ke SQL lengkap ada di docs/data-model.md.
 */

/* ---------- Enum & label ---------- */

export const USER_ROLES = ["pengguna", "penyelenggara", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const CATEGORIES = [
  "beasiswa",
  "lomba",
  "jalur_masuk",
  "hibah",
  "magang",
  "pertukaran",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  beasiswa: "Beasiswa",
  lomba: "Lomba",
  jalur_masuk: "Jalur Masuk",
  hibah: "Hibah",
  magang: "Magang",
  pertukaran: "Pertukaran",
};

/** Siklus status sesuai PRD §6.2: Draf → Menunggu verifikasi → Terverifikasi →
 *  Kedaluwarsa → Diarsipkan; cabang: Perlu revisi, Ditolak. */
export const OPPORTUNITY_STATUSES = [
  "draf",
  "menunggu_verifikasi",
  "terverifikasi",
  "kedaluwarsa",
  "diarsipkan",
  "perlu_revisi",
  "ditolak",
] as const;
export type OpportunityStatus = (typeof OPPORTUNITY_STATUSES)[number];

export const OPPORTUNITY_STATUS_LABELS: Record<OpportunityStatus, string> = {
  draf: "Draf",
  menunggu_verifikasi: "Menunggu verifikasi",
  terverifikasi: "Terverifikasi",
  kedaluwarsa: "Kedaluwarsa",
  diarsipkan: "Diarsipkan",
  perlu_revisi: "Perlu revisi",
  ditolak: "Ditolak",
};

export const SCOPES = ["lokal", "regional", "nasional", "internasional"] as const;
export type Scope = (typeof SCOPES)[number];

export const SCOPE_LABELS: Record<Scope, string> = {
  lokal: "Semarang",
  regional: "Jawa Tengah",
  nasional: "Nasional",
  internasional: "Internasional",
};

export const LOCATION_TYPES = ["negara", "provinsi", "kota"] as const;
export type LocationType = (typeof LOCATION_TYPES)[number];

export const LEVELS = ["SMA/SMK", "Mahasiswa", "SMA/SMK & Mahasiswa"] as const;
export type Level = (typeof LEVELS)[number];

export const FIELDS = [
  "Umum",
  "Sains & Teknologi",
  "Sosial & Humaniora",
  "Seni & Desain",
  "Ekonomi & Bisnis",
] as const;
export type Field = (typeof FIELDS)[number];

export const TRACK_STATUSES = [
  "belum_daftar",
  "sudah_daftar",
  "tahap_seleksi",
  "lolos",
  "tidak_lolos",
] as const;
export type TrackStatus = (typeof TRACK_STATUSES)[number];

export const TRACK_STATUS_LABELS: Record<TrackStatus, string> = {
  belum_daftar: "Belum daftar",
  sudah_daftar: "Sudah daftar",
  tahap_seleksi: "Tahap seleksi",
  lolos: "Lolos",
  tidak_lolos: "Tidak lolos",
};

export const REMINDER_TYPES = ["h-7", "h-1"] as const;
export type ReminderType = (typeof REMINDER_TYPES)[number];

export const REMINDER_CHANNELS = ["email", "web"] as const;
export type ReminderChannel = (typeof REMINDER_CHANNELS)[number];

export const REMINDER_CHANNEL_LABELS: Record<ReminderChannel, string> = {
  email: "Email",
  web: "Email dan notifikasi web",
};

export const REPORT_STATUSES = ["menunggu", "selesai"] as const;
export type ReportStatus = (typeof REPORT_STATUSES)[number];

export const ADMIN_ACTIONS = [
  "setujui",
  "minta_revisi",
  "tolak",
  "edit",
  "arsipkan",
  "tandai_laporan",
] as const;
export type AdminAction = (typeof ADMIN_ACTIONS)[number];

/** Verifikasi ulang berkala (PRD §6.3 no. 4). */
export const VERIFICATION_INTERVAL_DAYS = 14;

/* ---------- Entitas ---------- */

/** Hierarki lokasi: negara → provinsi → kota/kabupaten (PRD §7). */
export interface Location {
  id: string;
  type: LocationType;
  name: string;
  parentId: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

/** Profil opsional (PRD F3) — data seminimal mungkin (PRD §8 Privasi). */
export interface UserProfile {
  userId: string;
  jenjang: string;
  jurusan: string;
  semester: string;
  /** Dua desimal, "3,50". */
  ipk: string;
  minat: string[];
  domisiliId: string | null;
  remindH7: boolean;
  remindH1: boolean;
  channel: ReminderChannel;
}

/** Versi profil tanpa userId — dipakai FE sebelum ada autentikasi.
 *  Domisili masih teks bebas; menjadi domisiliId setelah akun ada. */
export type ProfileDraft = Omit<UserProfile, "userId" | "domisiliId"> & {
  domisili: string;
};

/** Entitas inti. Tanggal berformat ISO yyyy-mm-dd (zona WIB, Fase 1). */
export interface Opportunity {
  id: string;
  title: string;
  summary: string;
  /** Nama penyelenggara yang tampil di kartu & detail (PRD F4). */
  organizer: string;
  contact: string;
  category: Category;
  status: OpportunityStatus;
  scope: Scope;
  /** Null untuk peluang nasional/internasional tanpa kota spesifik. */
  locationId: string | null;
  /** Rantai nama lokasi (kota → provinsi) — hanya tampilan, diisi repository. */
  locationPath?: string[];
  level: Level;
  field: Field;
  /** Biaya pendaftaran dalam rupiah; 0 = gratis. */
  fee: number;
  deadline: string;
  officialUrl: string;
  requirements: string[];
  benefits: string[];
  steps: string[];
  createdAt: string;
  lastUpdatedAt: string;
  lastVerifiedAt: string;
  verifiedUntil: string;
  /** Listing unggulan berbayar — wajib tetap lolos verifikasi (PRD §10). */
  promoted: boolean;
  /** Alasan saat Perlu revisi / Ditolak. */
  rejectionReason: string | null;
  createdBy: string;
}

/** Peluang tersimpan + status pendaftaran (PRD F5). */
export interface Save {
  userId: string;
  opportunityId: string;
  status: TrackStatus;
  savedAt: string;
}

/** Pengingat tenggat (PRD F2): default H-7 dan H-1 untuk peluang disimpan. */
export interface Reminder {
  id: string;
  saveKey: string;
  type: ReminderType;
  channel: ReminderChannel;
  scheduledAt: string;
  /** Null = belum terkirim. */
  sentAt: string | null;
  enabled: boolean;
}

/** Laporan "Lapor data salah" (PRD §6.3 no. 5) — antrean prioritas admin. */
export interface Report {
  id: string;
  opportunityId: string;
  /** Judul peluang terkait — diisi repository (embed PostgREST). */
  opportunityTitle?: string;
  userId: string | null;
  message: string;
  status: ReportStatus;
  createdAt: string;
  resolvedAt: string | null;
}

/** Pencatatan aktivitas admin (PRD §8 Keamanan). */
export interface AdminLog {
  id: string;
  adminId: string;
  action: AdminAction;
  opportunityId: string;
  detail: string;
  createdAt: string;
}

/* ---------- Util tanggal deterministik ---------- */

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Tanggal verifikasi berikutnya setelah persetujuan admin. */
export function newVerification(fromIso: string): {
  lastVerifiedAt: string;
  verifiedUntil: string;
} {
  return {
    lastVerifiedAt: fromIso,
    verifiedUntil: addDays(fromIso, VERIFICATION_INTERVAL_DAYS),
  };
}

/* ---------- Aturan bisnis (PRD §6.3) ---------- */

import { daysUntil } from "@/lib/format";

/** Peluang yang boleh tampil di dashboard: terverifikasi & tenggat belum lewat. */
export function isTayang(opp: Opportunity): boolean {
  return opp.status === "terverifikasi" && daysUntil(opp.deadline) >= 0;
}

/** Peluang terverifikasi yang tenggatnya sudah lewat (filter "Telah berakhir"). */
export function isBerakhir(opp: Opportunity): boolean {
  return opp.status === "terverifikasi" && daysUntil(opp.deadline) < 0;
}

/** Verifikasi melewati batas 14 hari → badge "Perlu dicek ulang" (§6.3 no. 4). */
export function needsRecheck(opp: Opportunity): boolean {
  return opp.status === "terverifikasi" && daysUntil(opp.verifiedUntil) < 0;
}

/** Kiriman yang masuk antrean admin (PRD F6). */
export function isKiriman(opp: Opportunity): boolean {
  return (
    opp.status === "menunggu_verifikasi" ||
    opp.status === "perlu_revisi" ||
    opp.status === "ditolak"
  );
}
