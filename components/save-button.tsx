"use client";

/** Tombol simpan pada aside detail peluang, tersambung ke state global. */
import { Bookmark } from "lucide-react";
import { useSaved } from "@/lib/store";

export default function SaveButton({ id }: { id: string }) {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(id);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={saved}
      className={`flex h-11 w-full items-center justify-center gap-2 rounded-full border text-sm font-semibold transition-colors duration-200 focus-ring ${
        saved
          ? "border-transparent bg-blue-100 text-blue-700"
          : "border-line bg-surface text-ink-900 hover:bg-bg"
      }`}
    >
      <Bookmark
        className="h-4 w-4"
        fill={saved ? "currentColor" : "none"}
        aria-hidden="true"
      />
      {saved ? "Tersimpan" : "Simpan"}
    </button>
  );
}
