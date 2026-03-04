import { StoreShell } from "@/components/store-shell";

export default function MoviesPage() {
  return (
    <StoreShell active="movies">
      <div className="max-w-[1400px] mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Movies & TV</h1>
          <p className="text-gray-500 mt-2">Stream the latest movies and TV shows.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="w-full aspect-[2/3] rounded-xl bg-gradient-to-br from-red-500 to-orange-500 mb-3"></div>
              <h3 className="font-bold text-sm">Title {i}</h3>
              <p className="text-xs text-gray-500">2026 • Action</p>
            </div>
          ))}
        </div>
      </div>
    </StoreShell>
  );
}
