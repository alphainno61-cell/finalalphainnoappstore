import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Home, Package, Gamepad2, Film, Settings } from "lucide-react";

type StoreShellProps = {
  children: ReactNode;
  active: "home" | "apps" | "games" | "movies" | "developer" | "library" | "settings";
};

export function StoreShell({ children, active }: StoreShellProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <div className="w-32 h-10 relative">
              <Image
                src="/Alphainno App Store Logo.png"
                alt="Alphainno App Store"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <div className="relative ml-4 hidden md:block">
            <input
              type="text"
              placeholder="Search apps, games, movies and more"
              className="w-[450px] bg-gray-100 border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <span className="absolute right-4 top-2.5 text-gray-400 text-sm">⌕</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/login" className="text-gray-600 hover:text-black">Log in</Link>
          <Link href="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition shadow-md">Get started</Link>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside className="sidebar flex flex-col py-4 h-full">
          <Link href="/" className={`sidebar-item ${active === "home" ? "active" : ""}`}>
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link href="/apps" className={`sidebar-item ${active === "apps" ? "active" : ""}`}>
            <Package size={20} />
            <span>Apps</span>
          </Link>
          <Link href="/games" className={`sidebar-item ${active === "games" ? "active" : ""}`}>
            <Gamepad2 size={20} />
            <span>Games</span>
          </Link>
          <Link href="/movies" className={`sidebar-item ${active === "movies" ? "active" : ""}`}>
            <Film size={20} />
            <span>Movies & TV</span>
          </Link>
        </aside>

        <main className="flex-1 overflow-y-auto bg-white">{children}</main>
      </div>
    </div>
  );
}
