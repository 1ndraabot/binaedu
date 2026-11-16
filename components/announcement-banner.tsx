"use client";

/** Banner pengumuman kuning sesuai docs/components.md §2.2 — bisa ditutup, satu pesan. */
import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative bg-yellow-400 px-10 py-2 text-center">
      <p className="text-[13px] leading-snug text-ink-900">
        Penyelenggara lomba atau beasiswa? Kirim info kegiatanmu{" "}
        <a href="/kirim" className="font-medium text-blue-600 underline">
          di sini
        </a>
        .
      </p>
      <button
        type="button"
        aria-label="Tutup pengumuman"
        onClick={() => setDismissed(true)}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 text-ink-900 hover:bg-yellow-500/40 focus-ring"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
