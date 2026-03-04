import Image from "next/image";
import Link from "next/link";
import { StoreShell } from "@/components/store-shell";
import { games, productivityApps } from "@/lib/apps";

export default function Home() {
  return (
    <StoreShell active="home">
      <div className="p-8 max-w-[1400px] mx-auto space-y-16">
        <section className="hero-banner">
          <div className="w-full h-full grid md:grid-cols-2">
            <div className="flex flex-col justify-center p-10 md:p-14 text-white">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 w-fit">
                Featured App
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Master Your Workflow</h1>
              <p className="text-lg opacity-80 mb-8 max-w-md">
                Download the latest productivity suite now available for Windows, Mac, and Linux.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg">
                  Get OmniOffice
                </button>
                <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center p-10">
              <div className="w-[220px] h-[220px] bg-black rounded-[40px] flex items-center justify-center shadow-2xl">
                <span className="text-[140px] font-black text-red-600">N</span>
              </div>
            </div>
          </div>
        </section>

        <div className="flex gap-3 flex-wrap">
          <div className="platform-pill">🪟 Windows</div>
          <div className="platform-pill">🍎 macOS</div>
          <div className="platform-pill">🤖 Android</div>
          <div className="platform-pill">🐧 Linux</div>
          <div className="platform-pill">📱 iOS</div>
        </div>

        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold">Best-selling games</h2>
            <Link href="/games" className="text-blue-600 text-sm font-semibold hover:underline">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {games.map((game) => (
              <Link key={game.slug} href={`/games/${game.slug}`} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 mb-3 relative">
                  <Image
                    src={game.imageUrl}
                    alt={game.name}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>
                <h3 className="font-bold text-sm">{game.name}</h3>
                <p className="text-xs text-gray-500">
                  {game.category} • {game.price}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="dev-section flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4">Build the future of apps</h2>
            <p className="text-gray-400 mb-8">
              Join 50,000+ developers publishing across all major OS platforms from one unified dashboard.
              Get global reach and 95% revenue share.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/developer/upload" className="bg-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                Upload Your App
              </Link>
              <button className="bg-transparent border border-gray-600 px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition">
                Dev Documentation
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="stat-card">
              <div className="text-blue-400 text-2xl font-bold">95%</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold mt-1">Rev Share</div>
            </div>
            <div className="stat-card">
              <div className="text-green-400 text-2xl font-bold">5+</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold mt-1">Platforms</div>
            </div>
            <div className="stat-card">
              <div className="text-purple-400 text-xl font-bold">Instant</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold mt-1">Deployment</div>
            </div>
            <div className="stat-card">
              <div className="text-orange-400 text-2xl font-bold">24/7</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold mt-1">Support</div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold">Essential productivity apps</h2>
            <Link href="/apps" className="text-blue-600 text-sm font-semibold hover:underline">
              Explore all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productivityApps.map((item) => (
              <div key={item.name} className="prod-app-card">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                  ✦
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-xs text-gray-500">
                    {item.price} • {item.category}
                  </p>
                  <p className="text-yellow-500 text-[10px] mt-1">★ ★ ★ ★ ☆</p>
                </div>
                <button className="text-blue-600 font-bold text-sm px-4">{item.cta}</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </StoreShell>
  );
}
