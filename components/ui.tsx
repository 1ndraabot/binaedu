/**
 * Tombol & elemen dasar sesuai docs/components.md §1.
 * Satu tombol kuning per bagian (docs/style.md §2).
 */
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href?: string;
  variant?: ButtonVariant;
  size?: "default" | "sm";
  className?: string;
  children: ReactNode;
  onClick?: ComponentProps<"button">["onClick"];
  disabled?: boolean;
  type?: "button" | "submit";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-yellow-400 text-ink-900 hover:bg-yellow-500 disabled:bg-line disabled:text-ink-400 disabled:cursor-not-allowed",
  secondary:
    "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-line disabled:text-ink-400 disabled:cursor-not-allowed",
  ghost:
    "text-ink-900 font-medium hover:underline underline-offset-4",
};

export function Button({
  href,
  variant = "primary",
  size = "default",
  className = "",
  children,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const sizeClasses =
    variant === "ghost"
      ? size === "sm"
        ? "h-9 px-3 text-sm"
        : "h-11 px-3"
      : size === "sm"
        ? "h-9 px-5 text-sm"
        : "h-11 px-6";
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold focus-ring transition-colors duration-200 ${variantClasses[variant]} ${sizeClasses} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

/**
 * Tombol ikon (docs/components.md §1.5): lingkaran 40 px.
 * Dipakai untuk simpan (penanda buku), tutup, navigasi.
 */
interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  active?: boolean;
  /** Ikon jadi terisi (fill) saat aktif, mis. penanda buku tersimpan. */
  filled?: boolean;
  className?: string;
}

export function IconButton({
  icon: Icon,
  label,
  onClick,
  active = false,
  filled = false,
  className = "",
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      onClick={onClick}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 focus-ring ${
        active
          ? "border-transparent bg-blue-100 text-blue-600"
          : "border-line bg-surface text-ink-800 hover:bg-bg"
      } ${className}`}
    >
      <Icon
        className="h-4 w-4"
        strokeWidth={active ? 2.5 : 2}
        fill={filled ? "currentColor" : "none"}
      />
    </button>
  );
}

/** Label kecil di atas judul (eyebrow) — style.md §4: kapital, oranye gelap. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-[0.06em] text-orange-700 uppercase">
      {children}
    </p>
  );
}
