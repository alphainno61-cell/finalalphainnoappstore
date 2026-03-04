import Link from "next/link";
import { StoreShell } from "@/components/store-shell";

export default function LibraryPage() {
  return (
    <StoreShell active="library">
      <div className="max-w-[1400px] mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Library</h1>
          <p className="text-gray-500 mt-2">Your downloaded apps, games, and media.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-xl font-bold mb-2">Your library is empty</h2>
          <p className="text-gray-500 mb-6">Start downloading apps and games to build your collection.</p>
          <Link href="/apps" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Browse Apps
          </Link>
        </div>
      </div>
    </StoreShell>
  );
}
