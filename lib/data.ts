/**
 * Data tampilan FE yang tetap lokal: gaya chip/ikon per kategori.
 * Seluruh data konten kini berasal dari Supabase (lihat lib/repository.ts);
 * seed database ada di migration 0004_seed (data FIKTIF).
 */
import {
  GraduationCap,
  Trophy,
  DoorOpen,
  HandCoins,
  Briefcase,
  Plane,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/lib/schema";

export const CATEGORY_META: Record<
  Category,
  { icon: LucideIcon; lightBg: string; darkText: string }
> = {
  beasiswa: { icon: GraduationCap, lightBg: "bg-blue-100", darkText: "text-blue-700" },
  lomba: { icon: Trophy, lightBg: "bg-yellow-100", darkText: "text-orange-700" },
  jalur_masuk: { icon: DoorOpen, lightBg: "bg-green-100", darkText: "text-green-700" },
  hibah: { icon: HandCoins, lightBg: "bg-cyan-100", darkText: "text-blue-700" },
  magang: { icon: Briefcase, lightBg: "bg-sky-200", darkText: "text-blue-700" },
  pertukaran: { icon: Plane, lightBg: "bg-pink-100", darkText: "text-ink-800" },
};
