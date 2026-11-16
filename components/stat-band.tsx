/** Pita statistik biru sesuai docs/components.md §3. Angka adalah placeholder FE — ganti dengan angka nyata sebelum rilis. */
const STATS = [
  { value: "100+", label: "Peluang aktif" },
  { value: "20+", label: "Kampus & sekolah" },
  { value: "10+", label: "Penyelenggara" },
  { value: "1.000+", label: "Pengguna" },
];

export default function StatBand() {
  return (
    <section aria-label="Statistik BinaEdu" className="bg-blue-600">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-y-8 px-4 py-10 md:grid-cols-4 md:px-6 md:divide-x md:divide-white/30">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-stat text-white md:text-[32px]">{stat.value}</p>
            <p className="mt-1 text-sm text-white/90 md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
