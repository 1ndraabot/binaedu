/**
 * Lapisan akses data — kini tersambung ke Supabase (Fase 2).
 * Komponen tetap hanya memanggil fungsi di sini; bentuk tipe mengikuti
 * lib/schema.ts. Semua fungsi asinkron (PostgREST), keamanan dijaga RLS.
 */
import { supabase } from "@/lib/supabase";
import {
  SCOPE_LABELS,
  type AdminLog,
  type Opportunity,
  type OpportunityStatus,
  type ProfileDraft,
  type Report,
  type TrackStatus,
  type User,
} from "@/lib/schema";
import { todayIso } from "@/lib/format";

/* ---------- Bentuk baris database ---------- */

interface OppRow {
  slug: string;
  title: string;
  organizer: string;
  summary: string;
  contact: string;
  category: string;
  status: string;
  scope: string;
  location_id: string | null;
  level: string;
  field: string;
  fee: number;
  deadline: string;
  official_url: string;
  requirements: string[];
  benefits: string[];
  steps: string[];
  created_at: string;
  last_updated_at: string;
  last_verified_at: string | null;
  verified_until: string | null;
  promoted: boolean;
  rejection_reason: string | null;
  created_by: string | null;
  location?: { name: string } | null;
}

interface ReportRow {
  id: string;
  message: string;
  status: string;
  created_at: string;
  resolved_at: string | null;
  user_id: string | null;
  opportunity_id: string;
  opportunity?: { slug: string; title: string } | null;
}

interface LogRow {
  id: string;
  admin_id: string;
  action: string;
  opportunity_id: string;
  detail: string;
  created_at: string;
}

interface UserRow {
  id: string;
  email: string;
  name: string;
  role: string;
}

/** Kolom yang diambil + nama lokasi langsung (embed 1 tingkat). */
const OPP_SELECT = "*,location:locations!opportunities_location_id_fkey(id,name)";

/** Peta id lokasi → rantai nama (kota, provinsi) dari view location_paths. */
async function locationPathMap(): Promise<Record<string, string[]>> {
  const { data, error } = await supabase
    .from("location_paths")
    .select("id,path");
  if (error || !data) return {};
  const map: Record<string, string[]> = {};
  for (const row of data as { id: string; path: string[] }[]) {
    // Tampilkan dua tingkat terakhir saja (kota + provinsi) untuk label kartu
    map[row.id] = row.path.slice(-2);
  }
  return map;
}

/** Baris database → bentuk skema FE. FE memakai slug sebagai `id` (URL). */
function mapOpportunity(
  row: OppRow,
  paths: Record<string, string[]>
): Opportunity {
  const locationPath = row.location_id ? (paths[row.location_id] ?? []) : [];
  return {
    id: row.slug,
    title: row.title,
    summary: row.summary,
    organizer: row.organizer,
    contact: row.contact,
    category: row.category as Opportunity["category"],
    status: row.status as OpportunityStatus,
    scope: row.scope as Opportunity["scope"],
    locationId: row.location_id,
    locationPath,
    level: row.level as Opportunity["level"],
    field: row.field as Opportunity["field"],
    fee: row.fee,
    deadline: row.deadline,
    officialUrl: row.official_url,
    requirements: row.requirements ?? [],
    benefits: row.benefits ?? [],
    steps: row.steps ?? [],
    createdAt: row.created_at,
    lastUpdatedAt: row.last_updated_at,
    lastVerifiedAt: row.last_verified_at ?? "",
    verifiedUntil: row.verified_until ?? "",
    promoted: row.promoted,
    rejectionReason: row.rejection_reason,
    createdBy: row.created_by ?? "",
  };
}

/* ---------- Peluang ---------- */

/** Peluang tayang (dashboard & kartu, PRD §6.3 no. 1). */
export async function listAktif(): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select(OPP_SELECT)
    .eq("status", "terverifikasi")
    .gte("deadline", todayIso())
    .order("deadline");
  if (error) throw error;
  const paths = await locationPathMap();
  return ((data ?? []) as unknown as OppRow[]).map((r) => mapOpportunity(r, paths));
}

/** Peluang terverifikasi yang tenggatnya sudah lewat (filter "Telah berakhir"). */
export async function listBerakhir(): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select(OPP_SELECT)
    .eq("status", "terverifikasi")
    .lt("deadline", todayIso())
    .order("deadline");
  if (error) throw error;
  const paths = await locationPathMap();
  return ((data ?? []) as unknown as OppRow[]).map((r) => mapOpportunity(r, paths));
}

/** Peluang tersimpan milik tamu/user — dicari berdasarkan slug. */
export async function listBySlugs(slugs: string[]): Promise<Opportunity[]> {
  if (slugs.length === 0) return [];
  const { data, error } = await supabase
    .from("opportunities")
    .select(OPP_SELECT)
    .in("slug", slugs)
    .order("deadline");
  if (error) throw error;
  const paths = await locationPathMap();
  return ((data ?? []) as unknown as OppRow[]).map((r) => mapOpportunity(r, paths));
}

export async function getOpportunityBySlug(
  slug: string
): Promise<Opportunity | undefined> {
  const { data, error } = await supabase
    .from("opportunities")
    .select(OPP_SELECT)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!data) return undefined;
  const paths = await locationPathMap();
  return mapOpportunity(data as unknown as OppRow, paths);
}

/** Semua slug terverifikasi — untuk generateStaticParams (waktu build). */
export async function listSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("slug")
    .eq("status", "terverifikasi")
    .order("slug");
  if (error) throw error;
  return ((data ?? []) as { slug: string }[]).map((r) => r.slug);
}

/** Kiriman yang masuk antrean admin (PRD F6) — hanya terlihat oleh admin (RLS). */
export async function listKiriman(): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select(OPP_SELECT)
    .in("status", ["menunggu_verifikasi", "perlu_revisi", "ditolak"])
    .order("created_at", { ascending: true });
  if (error) throw error;
  const paths = await locationPathMap();
  return ((data ?? []) as unknown as OppRow[]).map((r) => mapOpportunity(r, paths));
}

/* ---------- Laporan & log admin ---------- */

export async function listReports(): Promise<Report[]> {
  const { data, error } = await supabase
    .from("reports")
    .select("*,opportunity:opportunities!reports_opportunity_id_fkey(slug,title)")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return ((data ?? []) as unknown as ReportRow[]).map((r) => ({
    id: r.id,
    opportunityId: r.opportunity?.slug ?? r.opportunity_id,
    opportunityTitle: r.opportunity?.title,
    userId: r.user_id,
    message: r.message,
    status: r.status as Report["status"],
    createdAt: r.created_at.slice(0, 10),
    resolvedAt: r.resolved_at?.slice(0, 10) ?? null,
  }));
}

export async function listAdminLogs(): Promise<AdminLog[]> {
  const { data, error } = await supabase
    .from("admin_logs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return ((data ?? []) as unknown as LogRow[]).map((l) => ({
    id: l.id,
    adminId: l.admin_id,
    action: l.action as AdminLog["action"],
    opportunityId: l.opportunity_id,
    detail: l.detail,
    createdAt: l.created_at.slice(0, 10),
  }));
}

/* ---------- Pengguna & sesi ---------- */

/** Baris users milik sesi saat ini (auth.uid() → users.auth_id via RLS). */
export async function getMe(): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id,email,name,role")
    .maybeSingle();
  if (error) return null;
  if (!data) return null;
  const row = data as unknown as UserRow;
  return { id: row.id, email: row.email, name: row.name, role: row.role as User["role"] };
}

/* ---------- Lokasi ---------- */

export async function listLocations() {
  const { data, error } = await supabase
    .from("locations")
    .select("id,type,name,parent_id")
    .order("id");
  if (error) throw error;
  return data ?? [];
}

/** Rantai lokasi dari kota ke negara, mis. ["Semarang", "Jawa Tengah"]. */
export function getLocationPath(id: string, locations: Awaited<ReturnType<typeof listLocations>>): string[] {
  const path: string[] = [];
  let current = locations.find((l) => l.id === id);
  while (current) {
    path.unshift(current.name);
    current = current.parent_id
      ? locations.find((l) => l.id === current?.parent_id)
      : undefined;
  }
  return path;
}

/** Label lokasi kartu: cakupan khusus, atau nama kota + provinsi. */
export function locationLabel(opp: Opportunity): string {
  if (opp.scope === "nasional" || opp.scope === "internasional") {
    return SCOPE_LABELS[opp.scope];
  }
  return opp.locationPath?.length ? opp.locationPath.join(", ") : "—";
}

/* ---------- Kirim kiriman baru (PRD F6) ---------- */

export interface KirimanBaru {
  title: string;
  category: Opportunity["category"];
  organizer: string;
  summary: string;
  contact: string;
  scope: Opportunity["scope"];
  locationId: string | null;
  level: Opportunity["level"];
  field: Opportunity["field"];
  fee: number;
  deadline: string;
  officialUrl: string;
  requirements: string[];
  benefits: string[];
  createdBy: string;
}

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "peluang"}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Insert peluang baru berstatus menunggu verifikasi. */
export async function submitKiriman(p: KirimanBaru): Promise<string | null> {
  const { error } = await supabase.from("opportunities").insert({
    slug: slugify(p.title),
    title: p.title,
    organizer: p.organizer,
    summary: p.summary,
    contact: p.contact,
    category: p.category,
    status: "menunggu_verifikasi",
    scope: p.scope,
    location_id: p.locationId,
    level: p.level,
    field: p.field,
    fee: p.fee,
    deadline: p.deadline,
    official_url: p.officialUrl,
    requirements: p.requirements,
    benefits: p.benefits,
    steps: [],
    created_by: p.createdBy,
  });
  return error ? error.message : null;
}

/* ---------- Simpan (PRD F5) — sinkronisasi pengguna masuk ---------- */

/** Tulis/ubah baris saves milik sesi saat ini. Null bila tamu/ gagal. */
export async function upsertSave(
  slug: string,
  status: TrackStatus
): Promise<string | null> {
  const me = await getMe();
  if (!me) return null;
  const { data, error: lookupError } = await supabase
    .from("opportunities")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (lookupError) return lookupError.message;
  if (!data) return null;
  const { error } = await supabase.from("saves").upsert(
    { user_id: me.id, opportunity_id: (data as { id: string }).id, status },
    { onConflict: "user_id,opportunity_id" }
  );
  return error ? error.message : null;
}

/** Hapus baris saves milik sesi saat ini. */
export async function removeSave(slug: string): Promise<string | null> {
  const me = await getMe();
  if (!me) return null;
  const { data, error: lookupError } = await supabase
    .from("opportunities")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (lookupError) return lookupError.message;
  if (!data) return null;
  const { error } = await supabase
    .from("saves")
    .delete()
    .eq("user_id", me.id)
    .eq("opportunity_id", (data as { id: string }).id);
  return error ? error.message : null;
}

/** Simpan profil ke user_profiles (PRD F3). */
export async function upsertProfile(
  draft: ProfileDraft
): Promise<string | null> {
  const me = await getMe();
  if (!me) return null;
  const semester = draft.semester === "" ? null : Number(draft.semester);
  const ipkRaw = draft.ipk.replace(",", ".");
  const ipk = ipkRaw === "" ? null : Number(ipkRaw);
  const { error } = await supabase.from("user_profiles").upsert(
    {
      user_id: me.id,
      jenjang: draft.jenjang,
      jurusan: draft.jurusan,
      semester: Number.isFinite(semester) ? semester : null,
      ipk: Number.isFinite(ipk) ? ipk : null,
      minat: draft.minat,
      remind_h7: draft.remindH7,
      remind_h1: draft.remindH1,
      channel: draft.channel,
    },
    { onConflict: "user_id" }
  );
  return error ? error.message : null;
}

/* ---------- Aksi admin (tercatat di admin_logs, PRD §8) ---------- */

async function writeLog(
  adminId: string,
  action: AdminLog["action"],
  opportunityId: string,
  detail: string
) {
  await supabase.from("admin_logs").insert({ admin_id: adminId, action, opportunity_id: opportunityId, detail });
}

/** Setujui → terverifikasi + jadwal verifikasi ulang (§6.3 no. 4). */
export async function approveKiriman(
  opp: Opportunity,
  adminId: string,
  todayIso: string,
  verifiedUntilIso: string
): Promise<string | null> {
  const { error } = await supabase
    .from("opportunities")
    .update({
      status: "terverifikasi",
      last_verified_at: todayIso,
      verified_until: verifiedUntilIso,
      rejection_reason: null,
    })
    .eq("slug", opp.id);
  if (error) return error.message;
  await writeLog(adminId, "setujui", opp.id, `Terverifikasi sampai ${verifiedUntilIso}.`);
  return null;
}

/** Minta revisi / tolak — alasan wajib. */
export async function decideKiriman(
  opp: Opportunity,
  status: "perlu_revisi" | "ditolak",
  reason: string,
  adminId: string
): Promise<string | null> {
  const { error } = await supabase
    .from("opportunities")
    .update({ status, rejection_reason: reason })
    .eq("slug", opp.id);
  if (error) return error.message;
  await writeLog(adminId, status === "ditolak" ? "tolak" : "minta_revisi", opp.id, reason);
  return null;
}

/** Tandai laporan selesai (antrean prioritas, §6.3 no. 5). */
export async function resolveReport(id: string, todayIso: string): Promise<string | null> {
  const { error } = await supabase
    .from("reports")
    .update({ status: "selesai", resolved_at: `${todayIso}T00:00:00Z` })
    .eq("id", id);
  return error ? error.message : null;
}

/** Laporan "Lapor data salah" dari pengguna (boleh tanpa akun). */
export async function submitReport(
  slug: string,
  message: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (error) return error.message;
  if (!data) return "Peluang tidak ditemukan.";
  const { error: insertError } = await supabase
    .from("reports")
    .insert({ opportunity_id: (data as { id: string }).id, message });
  return insertError ? insertError.message : null;
}
