/**
 * Klien Supabase bersama (anon key — akses dibatasi RLS).
 * Dipakai di komponen client maupun server; sesi pengguna dikelola
 * supabase-js secara otomatis (localStorage di browser).
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    "Variabel lingkungan Supabase belum diisi (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local)."
  );
}

export const supabase = createClient(url, key);
