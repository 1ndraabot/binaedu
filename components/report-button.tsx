"use client";

/** Lapor data salah — inline, tanpa perlu akun (PRD §6.2). */
import { useState } from "react";
import { CircleAlert, Send } from "lucide-react";
import { submitReport } from "@/lib/repository";
import { useToast } from "@/lib/store";

export default function ReportButton({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim().length < 10) {
      setError("Ceritakan sedikit lebih rinci (minimal 10 karakter).");
      return;
    }
    if (sending) return;
    setSending(true);
    setError(null);
    const err = await submitReport(slug, message.trim());
    setSending(false);
    if (err) {
      setError("Gagal mengirim laporan. Coba lagi sebentar.");
      return;
    }
    setMessage("");
    setOpen(false);
    toast("Laporan terkirim. Terima kasih — tim kami akan menindaklanjuti.");
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-center gap-1.5 text-sm text-ink-600 underline underline-offset-2 hover:text-ink-900 focus-ring rounded-sm"
      >
        <CircleAlert className="h-4 w-4" aria-hidden="true" />
        Lapor data salah
      </button>

      {open && (
        <form onSubmit={onSubmit} className="mt-3 rounded-md bg-bg p-3">
          <label
            htmlFor={`lapor-${slug}`}
            className="block text-xs font-medium text-ink-800"
          >
            Bagian mana yang keliru?
          </label>
          <p className="mt-0.5 text-[11px] text-ink-500">{title}</p>
          <textarea
            id={`lapor-${slug}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            maxLength={500}
            placeholder="Mis. tenggat di kartu berbeda dengan situs resmi"
            className="mt-2 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus-ring"
          />
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={sending}
            className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60 focus-ring"
          >
            <Send className="h-3.5 w-3.5" aria-hidden="true" />
            {sending ? "Mengirim…" : "Kirim laporan"}
          </button>
        </form>
      )}
    </div>
  );
}
