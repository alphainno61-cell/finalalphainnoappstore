import Image from "next/image";
import Link from "next/link";
import { StoreShell } from "@/components/store-shell";
import { apps } from "@/lib/apps";

export default function AppsPage() {
  return (
    <StoreShell active="apps">
      <div className="max-w-[1400px] mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Apps</h1>
          <p className="text-gray-500 mt-2">Browse productivity and utility apps across all platforms.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition"
            >
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-gray-100 relative">
                <Image src={app.imageUrl} alt={app.name} fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">{app.name}</h2>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{app.platform}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{app.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">{app.category}</span>
                <span className="font-semibold">{app.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </StoreShell>
  );
}
