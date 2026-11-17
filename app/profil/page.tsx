import type { Metadata } from "next";
import ProfilClient from "./profil-client";

export const metadata: Metadata = {
  title: "Profil dan Preferensi — BinaEdu",
  description:
    "Isi profil singkat untuk mencocokkan peluang dengan jurusan dan minatmu.",
};

export default function ProfilPage() {
  return <ProfilClient />;
}
