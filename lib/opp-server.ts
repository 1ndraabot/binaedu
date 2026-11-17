/**
 * Akses data server dengan cache (Cache Components).
 * Halaman detail memanggil database saat prerender — harus dibungkus
 * "use cache" agar tidak memblokir prerendering (Next.js 16).
 */
import { getOpportunityBySlug, listSlugs } from "@/lib/repository";
import type { Opportunity } from "@/lib/schema";

export async function getCachedOpportunity(
  slug: string
): Promise<Opportunity | undefined> {
  "use cache";
  return getOpportunityBySlug(slug);
}

export async function getCachedSlugs(): Promise<string[]> {
  "use cache";
  return listSlugs();
}
