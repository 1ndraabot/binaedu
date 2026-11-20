"use client";

/** Navigasi atas sesuai docs/components.md §2.1. Mobile: menu panel penuh. */
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui";
import { useSession } from "@/lib/store";
import type { User } from "@/lib/schema";

const LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/cari", label: "Cari Peluang" },
  { href: "/kalender", label: "Kalender" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

/** Tautan milik sesi — sesuai peran (docs/components.md §2.1). */
function sessionLinks(user: User) {
  const links = [{ href: "/peluang-saya", label: "Peluang saya" }];
  if (user.role === "penyelenggara") {
    links.push(
      { href: "/penyelenggara", label: "Dashboard" },
      { href: "/kirim/saya", label: "Kiriman saya" }
    );
  }
  if (user.role === "admin") {
    links.push({ href: "/admin", label: "Dashboard admin" });
  }
  links.push({ href: "/profil", label: "Profil" });
  return links;
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useSession();
  const links = user ? sessionLinks(user) : [];
  // Penyelenggara & admin bekerja di dashboard masing-masing —
  // menu publik disembunyikan (docs/layouts.md §9, §8).
  const showPublicNav = !user || user.role === "pengguna";

  return (
    <header className="sticky top-0 z-40 bg-surface">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-4 md:px-6">
        {/* Logo BinaEdu */}
        <Link href="/" className="flex items-center focus-ring rounded-md">
          <img
            src="/logo-binaedu.jpeg"
            alt="BinaEdu — Temukan Peluang, Raih Masa Depan"
            className="h-12 w-auto object-contain mix-blend-multiply md:h-14"
          />
        </Link>

        {/* Tautan tengah — desktop */}
        {showPublicNav && (
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
        )}

        {/* Aksi kanan — desktop */}
        <div className="hidden items-center gap-3 sm:flex">
          {user ? (
            <div className="relative">
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-2.5 text-sm font-medium text-ink-900 hover:bg-bg focus-ring"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700"
                >
                  {user.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="max-w-[140px] truncate">{user.name}</span>
                <ChevronDown
                  className={`h-4 w-4 text-ink-600 transition-transform duration-200 ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {menuOpen && (
                <>
                  {/* Penangkap klik di luar menu */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                    aria-hidden="true"
                  />
                  <div
                    role="menu"
                    aria-label={`Menu ${user.name}`}
                    className="absolute right-0 z-50 mt-2 w-52 rounded-lg border border-line bg-surface p-2 shadow-card"
                  >
                    <p className="truncate px-3 pb-1 pt-1.5 text-xs text-ink-500">
                      {user.email}
                    </p>
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                        className={`block rounded-md px-3 py-2 text-sm text-ink-800 hover:bg-bg focus-ring ${
                          pathname === link.href ? "font-semibold text-blue-600" : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        signOut();
                      }}
                      className="mt-1 block w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-bg focus-ring"
                    >
                      Keluar
                    </button>
                  </div>
                </>
              )}
            </div>
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
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center focus-ring rounded-md"
            >
              <img
                src="/logo-binaedu.jpeg"
                alt="BinaEdu — Temukan Peluang, Raih Masa Depan"
                className="h-12 w-auto object-contain mix-blend-multiply"
              />
            </Link>
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 focus-ring"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {showPublicNav && (
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
          )}
          <div className="mt-auto flex flex-col gap-3 px-4 pb-8">
            {user ? (
              <>
                <span className="truncate px-3 text-sm font-medium text-ink-900">
                  {user.name}
                </span>
                {links.map((link) => (
                  <Link
                    key={link.href}
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