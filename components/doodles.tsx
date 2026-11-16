/**
 * Doodle tangan sesuai docs/illustration-imagery.md §4:
 * SVG dekoratif, tebal garis 2–3 px, ujung membulat, disembunyikan dari pembaca layar.
 * Hanya dipakai di halaman pemasaran dan keadaan kosong (docs/layouts.md §1).
 */

interface DoodleProps {
  className?: string;
}

export function DoodleZigzag({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 13 L12 3 L22 13 L32 3"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleTriangle({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 26"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 21 L20 5 L35 21 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleCircle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <circle cx="8" cy="8" r="7" fill="currentColor" />
    </svg>
  );
}

export function DoodleSquare({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="6"
        y="6"
        width="20"
        height="20"
        rx="6"
        stroke="currentColor"
        strokeWidth="3"
        transform="rotate(12 16 16)"
      />
    </svg>
  );
}

/** Garis bawah tulisan tangan kuning untuk kata kunci judul hero (maks 1 per halaman). */
export function DoodleUnderline({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 9 C 40 3, 80 3, 118 7 S 180 9, 198 5"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
