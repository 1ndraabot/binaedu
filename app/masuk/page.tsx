import type { Metadata } from "next";
import MasukClient from "./masuk-client";

export const metadata: Metadata = {
  title: "Masuk — BinaEdu",
  description: "Masuk ke akun BinaEdu untuk menyimpan peluang dan pengingat.",
};

export default function MasukPage() {
  return <MasukClient />;
}
