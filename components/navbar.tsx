"use client";

/** Navigasi atas sesuai docs/components.md §2.1. Mobile: menu panel penuh. */
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui";
import { useSession } from "@/lib/store";

const LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/cari", label: "Cari Peluang" },
  { href: "/kalender", label: "Kalender" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, signOut } = useSession();

  return (
    <header className="sticky top-0 z-40 bg-surface">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-4 md:px-6">
        {/* Logo: ikon biru + wordmark tebal (docs/illustration-imagery.md §7) */}
        <Link href="/" className="flex items-center gap-2 focus-ring rounded-md">
          <GraduationCap className="h-7 w-7 text-blue-600" aria-hidden="true" />
          <span className="text-lg font-bold text-ink-900">BinaEdu</span>
        </Link>

        {/* Tautan tengah — desktop */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => {
            const active = link.href === pathname;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm transition-colors duration-200 focus-ring rounded-sm ${
                  active
                    ? "font-semibold text-blue-600"
                    : "text-ink-800 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Aksi kanan — desktop */}
        <div className="hidden items-center gap-3 sm:flex">
          {user ? (
            <>
              <span className="max-w-[160px] truncate text-sm font-medium text-ink-900">
                {user.name}
              </span>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                Keluar
              </Button>
            </>
          ) : (
            <>
              <Button href="/masuk" variant="ghost" size="sm">
                Masuk
              </Button>
              <Button href="/daftar" variant="secondary" size="sm">
                Daftar
              </Button>
            </>
          )}
        </div>

        {/* Tombol menu — mobile */}
        <button
          type="button"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 focus-ring sm:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Menu panel penuh — mobile */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-surface sm:hidden">
          <div className="flex h-[72px] items-center justify-between px-4">
            <span className="flex items-center gap-2">
              <GraduationCap className="h-7 w-7 text-blue-600" aria-hidden="true" />
              <span className="text-lg font-bold text-ink-900">BinaEdu</span>
            </span>
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 focus-ring"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Menu seluler" className="flex flex-col gap-1 px-4 py-4">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-base focus-ring ${
                  link.href === pathname
                    ? "font-semibold text-blue-600"
                    : "text-ink-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 px-4 pb-8">
            {user ? (
              <>
                <span className="px-3 text-sm font-medium text-ink-900">
                  {user.name}
                </span>
                <Button variant="secondary" onClick={() => { setOpen(false); signOut(); }}>
                  Keluar
                </Button>
              </>
            ) : (
              <>
                <Button href="/daftar" variant="secondary" onClick={() => setOpen(false)}>
                  Daftar
                </Button>
                <Button href="/masuk" variant="ghost" onClick={() => setOpen(false)}>
                  Masuk
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
