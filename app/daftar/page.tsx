import type { Metadata } from "next";
import DaftarClient from "./daftar-client";

export const metadata: Metadata = {
  title: "Daftar — BinaEdu",
  description: "Buat akun BinaEdu untuk menyimpan peluang dan pengingat tenggat.",
};

export default function DaftarPage() {
  return <DaftarClient />;
}
