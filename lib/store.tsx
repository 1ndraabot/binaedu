"use client";

/**
 * State klien bersama untuk FE (belum ada backend):
 * - Toast (docs/components.md §9): kanan atas, ikon + pesan, hilang setelah 5 detik
 * - Simpan & status peluang (PRD F5), tersimpan di localStorage
 * - Profil pengguna (PRD F3), tersimpan di localStorage
 *
 * localStorage dibaca lewat useSyncExternalStore: aman untuk SSR/hidrasi
 * (server memakai snapshot default, client menyelaraskan setelah hidrasi).
 * Nilai lama dari versi skema sebelumnya dimigrasikan saat dibaca.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { CheckCircle2 } from "lucide-react";
import {
  TRACK_STATUSES,
  TRACK_STATUS_LABELS,
  type TrackStatus,
  type ProfileDraft,
  type ReminderChannel,
} from "@/lib/schema";
import { supabase } from "@/lib/supabase";
import {
  getMe,
  removeSave,
  upsertProfile,
  upsertSave,
} from "@/lib/repository";
import type { User } from "@/lib/schema";

/* ---------- Toast ---------- */

interface ToastItem {
  id: number;
  message: string;
}

const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

function ToastViewport({ items }: { items: ToastItem[] }) {
  if (items.length === 0) return null;
  return (
    <div
      aria-live="polite"
      className="fixed top-20 right-4 z-[60] flex w-72 flex-col gap-2"
    >
      {items.map((t) => (
        <div
          key={t.id}
          className="flex items-start gap-2 rounded-lg bg-surface px-4 py-3 text-sm text-ink-900 shadow-pop"
        >
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0 text-green-700"
            aria-hidden="true"
          />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Penyimpanan lokal sebagai external store ---------- */

const listeners = new Set<() => void>();

function subscribeStorage(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function notifyStorage() {
  for (const listener of listeners) listener();
}

/** Baca/tulis satu kunci JSON di localStorage dengan pola store React. */
function useStoredJson<T>(
  key: string,
  fallback: T,
  parse: (raw: string, fallback: T) => T = tryParseJson
): [T, (value: T) => void] {
  const raw = useSyncExternalStore(
    subscribeStorage,
    () => {
      try {
        return localStorage.getItem(key) ?? JSON.stringify(fallback);
      } catch {
        return JSON.stringify(fallback);
      }
    },
    () => JSON.stringify(fallback)
  );
  const value = useMemo(() => parse(raw, fallback), [raw, fallback, parse]);
  const set = useCallback(
    (next: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // localStorage tidak tersedia — abaikan
      }
      notifyStorage();
    },
    [key]
  );
  return [value, set];
}

function tryParseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const EMPTY_IDS: string[] = [];
const EMPTY_STATUSES: Record<string, TrackStatus> = {};

/* ---------- Migrasi data lama (versi pra-skema) ---------- */

/** Label tampilan lama → nilai enum baru; nilai tak dikenal diabaikan. */
function parseStatuses(
  raw: string,
  fallback: Record<string, TrackStatus>
): Record<string, TrackStatus> {
  const parsed = tryParseJson(raw, fallback);
  const next: Record<string, TrackStatus> = {};
  for (const [id, value] of Object.entries(parsed)) {
    if ((TRACK_STATUSES as readonly string[]).includes(value)) {
      next[id] = value as TrackStatus;
    } else {
      const fromLabel = TRACK_STATUSES.find((s) => TRACK_STATUS_LABELS[s] === value);
      if (fromLabel) next[id] = fromLabel;
    }
  }
  return next;
}

function parseChannel(value: string): ReminderChannel {
  return value === "web" || value === "Email dan notifikasi web" ? "web" : "email";
}

/* ---------- Simpan & lacak progres (PRD F5) ---------- */

interface SavedValue {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggle: (id: string) => void;
  statuses: Record<string, TrackStatus>;
  setStatus: (id: string, status: TrackStatus) => void;
}

const SavedContext = createContext<SavedValue | null>(null);

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved dipakai di luar AppProvider");
  return ctx;
}

/* ---------- Profil (PRD F3) ---------- */

const DEFAULT_PROFILE: ProfileDraft = {
  jenjang: "",
  jurusan: "",
  semester: "",
  ipk: "",
  minat: [],
  domisili: "",
  remindH7: true,
  remindH1: true,
  channel: "email",
};

/** Profil versi lama (minat string, saluran label) → versi baru. */
function parseProfile(raw: string, fallback: ProfileDraft): ProfileDraft {
  try {
    type OldProfile = Omit<Partial<ProfileDraft>, "minat" | "channel"> & {
      minat?: string | string[];
      channel?: string;
    };
    const old = JSON.parse(raw) as OldProfile;
    return {
      ...fallback,
      ...old,
      minat: Array.isArray(old.minat)
        ? old.minat
        : typeof old.minat === "string" && old.minat.trim() !== ""
          ? old.minat.split(",").map((s: string) => s.trim()).filter(Boolean)
          : fallback.minat,
      channel: parseChannel(old.channel ?? fallback.channel),
    };
  } catch {
    return fallback;
  }
}

interface ProfileValue {
  profile: ProfileDraft;
  saveProfile: (p: ProfileDraft) => void;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileValue | null>(null);

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile dipakai di luar AppProvider");
  return ctx;
}

/* ---------- Sesi pengguna (Supabase Auth) ---------- */

interface SessionValue {
  /** null = tamu; name/email diambil dari baris users miliknya. */
  user: User | null;
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionValue>({
  user: null,
  signOut: async () => {},
});

export function useSession() {
  return useContext(SessionContext);
}

/* ---------- Penyedia gabungan ---------- */

export default function AppProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const [user, setUser] = useState<User | null>(null);
  const [savedIds, setSavedIds] = useStoredJson<string[]>(
    "binaedu:saved",
    EMPTY_IDS
  );
  const [statuses, setStatuses] = useStoredJson<Record<string, TrackStatus>>(
    "binaedu:statuses",
    EMPTY_STATUSES,
    parseStatuses
  );
  const [profile, setProfile] = useStoredJson<ProfileDraft>(
    "binaedu:profile",
    DEFAULT_PROFILE,
    parseProfile
  );

  // Sesi: ikuti status Supabase Auth (setState hanya dalam callback async)
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(async ({ data }) => {
        if (data.session) {
          const me = await getMe();
          setUser(me);
        }
      })
      .catch(() => {});
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
        return;
      }
      getMe()
        .then((me) => setUser(me))
        .catch(() => setUser(null));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Migrasi lokal → database saat pengguna masuk (sekali per sesi)
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      for (const slug of savedIds) {
        if (cancelled) return;
        await upsertSave(slug, statuses[slug] ?? "belum_daftar");
      }
    })();
    return () => {
      cancelled = true;
    };
    // Hanya saat sesi berubah — tidak memicu ulang saat daftar berubah
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const toggle = useCallback(
    (id: string) => {
      if (savedIds.includes(id)) {
        setSavedIds(savedIds.filter((x) => x !== id));
        if (user) removeSave(id);
      } else {
        setSavedIds([...savedIds, id]);
        if (user) upsertSave(id, statuses[id] ?? "belum_daftar");
        toast("Tersimpan. Kami akan mengingatkanmu sebelum tenggat.");
      }
    },
    [savedIds, setSavedIds, toast, user, statuses]
  );

  const setStatus = useCallback(
    (id: string, status: TrackStatus) => {
      setStatuses({ ...statuses, [id]: status });
      if (user) upsertSave(id, status);
    },
    [statuses, setStatuses, user]
  );

  const saveProfile = useCallback(
    (p: ProfileDraft) => {
      setProfile(p);
      if (user) upsertProfile(p);
    },
    [setProfile, user]
  );
  const clearProfile = useCallback(
    () => setProfile(DEFAULT_PROFILE),
    [setProfile]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast("Kamu sudah keluar.");
  }, [toast]);

  return (
    <ToastContext.Provider value={toast}>
      <SessionContext.Provider value={{ user, signOut }}>
        <SavedContext.Provider
          value={{ savedIds, isSaved, toggle, statuses, setStatus }}
        >
          <ProfileContext.Provider
            value={{ profile, saveProfile, clearProfile }}
          >
            {children}
            <ToastViewport items={toasts} />
          </ProfileContext.Provider>
        </SavedContext.Provider>
      </SessionContext.Provider>
    </ToastContext.Provider>
  );
}
