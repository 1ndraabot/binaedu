import type { Metadata } from "next";
import AdminClient from "./admin-client";

export const metadata: Metadata = {
  title: "Antrean Verifikasi — BinaEdu",
  description: "Antrean kiriman dan laporan data salah untuk admin.",
};

export default function AdminPage() {
  return <AdminClient />;
}
