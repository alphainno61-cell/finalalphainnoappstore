import Image from "next/image";
import Link from "next/link";
import { StoreShell } from "@/components/store-shell";
import { games } from "@/lib/apps";

export default function GamesPage() {
  return (
    <StoreShell active="games">
      <div className="max-w-[1400px] mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Games</h1>
          <p className="text-gray-500 mt-2">Discover the best games across all platforms.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Link key={game.slug} href={`/games/${game.slug}`} className="group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 mb-3 group-hover:shadow-md transition">
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
              <h3 className="font-bold text-sm">{game.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{game.category} • {game.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </StoreShell>
  );
}
