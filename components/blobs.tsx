/**
 * Bingkai blob & mock visual untuk Beranda.
 * Aturan dari docs/illustration-imagery.md §3: bingkai blob, latar warna muda,
 * lingkaran penanda kuning di sudut. Foto asli menyusul (lihat dokumentasi §2.2).
 */
import { type LucideIcon } from "lucide-react";
import {
  BookOpen,
  CalendarDays,
  Trophy,
  GraduationCap,
  CircleCheck,
  CircleX,
  CircleHelp,
} from "lucide-react";

interface BlobFrameProps {
  icon: LucideIcon;
  /** Warna latar bingkai — hanya token dari design-tokens.md */
  bg: string;
  iconColor: string;
  /** Bentuk blob via borderRadius (daun, setengah lingkaran, lembut, lingkaran) */
  radius: string;
  className?: string;
}

export function BlobFrame({ icon: Icon, bg, iconColor, radius, className = "" }: BlobFrameProps) {
  return (
    <div
      className={`flex aspect-square items-center justify-center ${bg} ${className}`}
      style={{ borderRadius: radius }}
    >
      <Icon className={`h-10 w-10 md:h-14 md:w-14 ${iconColor}`} strokeWidth={1.75} aria-hidden="true" />
    </div>
  );
}

/** Lingkaran penanda kuning dengan objek kecil di sudut bingkai. */
export function MarkerCircle({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="absolute -bottom-2 -left-2 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 shadow-card">
      <Icon className="h-5 w-5 text-ink-900" aria-hidden="true" />
    </span>
  );
}

/* ---------- Mock visual mini (pengganti foto sementara) ---------- */

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
/** 1 = hari bertenggat (titik oranye), 2 = bertenggat dekat (merah) */
const CALENDAR_MARKS: Record<number, 1 | 2> = { 6: 1, 10: 2, 17: 1, 24: 1 };

export function MiniCalendarMock() {
  return (
    <div className="w-full max-w-xs rounded-xl bg-surface p-5 shadow-pop">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink-900">November 2026</p>
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">
          Terverifikasi
        </span>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-ink-400">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs text-ink-800">
        {Array.from({ length: 30 }, (_, i) => {
          const day = i + 1;
          const mark = CALENDAR_MARKS[day];
          const isToday = day === 16;
          return (
            <span key={day} className="flex flex-col items-center py-1">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  isToday ? "bg-blue-600 text-white" : ""
                }`}
              >
                {day}
              </span>
              {mark && (
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${mark === 2 ? "bg-red-600" : "bg-orange-500"}`}
                />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const CHECK_ITEMS = [
  {
    icon: CircleCheck,
    tone: "text-green-700",
    label: "IPK 3,25",
    status: "Memenuhi",
  },
  {
    icon: CircleX,
    tone: "text-red-600",
    label: "Sertifikat TOEFL",
    status: "Belum memenuhi",
  },
  {
    icon: CircleHelp,
    tone: "text-orange-700",
    label: "Esai motivasi",
    status: "Perlu dicek manual",
  },
];

export function MiniChecklistMock() {
  return (
    <div className="w-full max-w-xs rounded-xl bg-surface p-5 shadow-pop">
      <p className="text-sm font-semibold text-ink-900">Kecocokan syarat</p>
      <p className="mt-0.5 text-xs text-ink-600">5 dari 7 syarat sudah cocok denganmu.</p>
      <ul className="mt-4 space-y-3">
        {CHECK_ITEMS.map((item) => (
          <li key={item.label} className="flex items-center gap-3">
            <item.icon className={`h-5 w-5 ${item.tone}`} aria-hidden="true" />
            <span className="text-sm text-ink-900">{item.label}</span>
            <span className="ml-auto text-xs text-ink-600">{item.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Empat bingkai foto blob pada hero. */
export const HERO_BLOBS: BlobFrameProps[] = [
  { icon: BookOpen, bg: "bg-sky-200", iconColor: "text-blue-600", radius: "50% 16px 50% 16px" },
  { icon: Trophy, bg: "bg-yellow-400", iconColor: "text-ink-900", radius: "16px 50% 16px 50%" },
  { icon: CalendarDays, bg: "bg-cyan-100", iconColor: "text-blue-600", radius: "999px 999px 16px 16px" },
  { icon: GraduationCap, bg: "bg-blue-100", iconColor: "text-blue-600", radius: "24px" },
];
