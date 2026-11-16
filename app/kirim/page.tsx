import type { Metadata } from "next";
import KirimClient from "./kirim-client";

export const metadata: Metadata = {
  title: "Kirim Info Kegiatan — BinaEdu",
  description:
    "Punya lomba atau beasiswa? Bagikan ke ribuan pelajar melalui formulir sederhana.",
};

export default function KirimPage() {
  return <KirimClient />;
}
