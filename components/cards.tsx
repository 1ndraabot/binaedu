/** Kartu fitur & kartu kategori sesuai docs/components.md §4.1–4.2. */
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { CATEGORY_META } from "@/lib/data";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/lib/schema";

interface FeatureCardProps {
  icon: LucideIcon;
  /** Warna kotak ikon fitur (docs/illustration-imagery.md §5.2) */
  color: "blue" | "green" | "orange" | "pink";
  title: string;
  desc: string;
}

const featureBoxColors = {
  blue: "bg-blue-600",
  green: "bg-green-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
} as const;

export function FeatureCard({ icon: Icon, color, title, desc }: FeatureCardProps) {
  return (
    <div className="h-full rounded-lg bg-surface p-6 shadow-card">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-md ${featureBoxColors[color]}`}
      >
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink-900 md:text-lg">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{desc}</p>
    </div>
  );
}

export function CategoryGrid() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CATEGORIES.map((category) => (
        <li key={category}>
          <CategoryCard category={category} />
        </li>
      ))}
      <li>
        <Link
          href="/cari"
          className="flex h-14 items-center gap-3 rounded-lg border border-line bg-surface px-4 transition-shadow duration-200 hover:shadow-card focus-ring"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100">
            <ArrowRight className="h-4 w-4 text-blue-700" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium text-ink-900">Lihat semua</span>
        </Link>
      </li>
    </ul>
  );
}

export function CategoryCard({ category }: { category: Category }) {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;
  return (
    <Link
      href={`/cari?kategori=${encodeURIComponent(category)}`}
      className="flex h-14 items-center gap-3 rounded-lg border border-line bg-surface px-4 transition-shadow duration-200 hover:shadow-card focus-ring"
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-md ${meta.lightBg}`}
      >
        <Icon className={`h-4 w-4 ${meta.darkText}`} aria-hidden="true" />
      </span>
      <span className="text-sm font-medium text-ink-900">
        {CATEGORY_LABELS[category]}
      </span>
      <ArrowRight className="ml-auto h-4 w-4 text-ink-400" aria-hidden="true" />
    </Link>
  );
}
