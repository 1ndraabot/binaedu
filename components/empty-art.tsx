/**
 * Ilustrasi keadaan kosong (docs/illustration-imagery.md §6):
 * kombinasi doodle sederhana dan satu ikon besar, bukan foto.
 */
import { CalendarX2, SearchX } from "lucide-react";
import { DoodleZigzag } from "@/components/doodles";

export function EmptyCalendarArt() {
  return (
    <div className="relative" aria-hidden="true">
      <CalendarX2 className="h-14 w-14 text-ink-400" />
      <DoodleZigzag className="absolute -right-7 -top-1 w-8 text-yellow-400" />
    </div>
  );
}

export function EmptySearchArt() {
  return (
    <div className="relative" aria-hidden="true">
      <SearchX className="h-14 w-14 text-ink-400" />
      <DoodleZigzag className="absolute -right-7 -top-1 w-8 text-yellow-400" />
    </div>
  );
}
