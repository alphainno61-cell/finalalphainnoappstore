import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoreShell } from "@/components/store-shell";
import { apps } from "@/lib/apps";
import { Star, Download, Heart, Share2, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

type AppDetailProps = {
  params: Promise<{ slug: string }>;
};

export default async function AppDetailPage({ params }: AppDetailProps) {
  const { slug } = await params;
  const app = apps.find((item) => item.slug === slug);

  if (!app) {
    notFound();
  }

  const relatedProducts = apps
    .filter((item) => item.slug !== app.slug)
    .filter((item) => item.category === app.category || item.platform === app.platform)
    .slice(0, 6);

  return (
    <StoreShell active="apps">
      <div className="bg-[#f6f8fb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-10 space-y-8">
          <section className="sticky top-0 z-30 rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-md px-4 py-3 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{app.name}</p>
                <p className="text-xs text-gray-500 inline-flex items-center gap-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  {app.rating.toFixed(1)} • {app.platform}
                </p>
              </div>
              <button className="shrink-0 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
                {app.price === "Free" ? "Install" : `Buy ${app.price}`}
              </button>
            </div>
          </section>

          <Link href="/apps" className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1">
            <span>←</span>
            <span>Back to apps</span>
          </Link>

          <section className="sticky top-[68px] z-20 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <nav className="flex items-center gap-5 overflow-x-auto text-sm">
              <a href="#overview" className="text-gray-600 hover:text-black font-medium whitespace-nowrap">Overview</a>
              <a href="#screenshots" className="text-gray-600 hover:text-black font-medium whitespace-nowrap">Screenshots</a>
              <a href="#reviews" className="text-gray-600 hover:text-black font-medium whitespace-nowrap">Reviews</a>
              <a href="#requirements" className="text-gray-600 hover:text-black font-medium whitespace-nowrap">Requirements</a>
            </nav>
          </section>

          <section id="overview" className="rounded-3xl border border-gray-200 bg-white p-6 lg:p-8 shadow-sm scroll-mt-40">
            <div className="grid lg:grid-cols-[1fr_320px] gap-8">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                    <Image src={app.imageUrl} alt={app.name} fill className="object-cover" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{app.name}</h1>
                      <p className="text-sm text-gray-500 mt-1">by OmniStore Verified Publisher</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1 font-medium">
                        {app.platform}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-3 py-1 font-medium">
                        {app.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-gray-700">
                        <ShieldCheck size={16} className="text-green-600" />
                        Trusted & Secure
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed max-w-3xl">{app.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="text-base font-semibold">{app.rating.toFixed(1)} / 5</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Reviews</p>
                    <p className="text-base font-semibold">1,234</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Downloads</p>
                    <p className="text-base font-semibold">1M+</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-base font-semibold">{app.price}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 h-fit space-y-3">
                <button className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <Download size={18} />
                  {app.price === "Free" ? "Install" : `Buy ${app.price}`}
                </button>
                <button className="w-full border border-gray-300 bg-white px-5 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2">
                  <Heart size={18} />
                  Add to wishlist
                </button>
                <button className="w-full border border-gray-300 bg-white px-5 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>
                <p className="text-xs text-gray-500 pt-1">In-app purchases may apply. Compatible with your current device.</p>
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-[1fr_300px] gap-6">
            <div className="space-y-6">
              <div id="screenshots" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm scroll-mt-40">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Screenshots</h2>
                  <span className="text-sm text-gray-500">Preview</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="relative aspect-[10/16] rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                      <Image src={app.imageUrl} alt={`${app.name} screenshot ${item}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">What’s new</h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="inline-flex items-center gap-2"><Sparkles size={16} className="text-blue-600" /> Performance improvements and stability fixes</p>
                  <p className="inline-flex items-center gap-2"><Sparkles size={16} className="text-blue-600" /> Refined onboarding experience for new users</p>
                  <p className="inline-flex items-center gap-2"><Sparkles size={16} className="text-blue-600" /> Better syncing speed across devices</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Features</h2>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600" /> Fast and lightweight performance</li>
                  <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600" /> Cross-device sync support</li>
                  <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600" /> Dark mode and accessibility tools</li>
                  <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600" /> Regular feature updates</li>
                </ul>
              </div>

              <div id="reviews" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm scroll-mt-40">
                <h2 className="text-xl font-bold mb-4">Ratings & Reviews</h2>
                <div className="grid md:grid-cols-[180px_1fr] gap-6">
                  <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
                    <p className="text-4xl font-bold">{app.rating.toFixed(1)}</p>
                    <div className="flex justify-center gap-1 my-2">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={index < Math.floor(app.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">1,234 global ratings</p>
                  </div>
                  <div className="space-y-3">
                    {[1, 2].map((item) => (
                      <div key={item} className="rounded-xl border border-gray-200 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-sm">User {item}</p>
                            <div className="flex gap-1 mt-1">
                              {[...Array(5)].map((_, index) => (
                                <Star key={index} size={13} className="fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {item === 1
                            ? "Clean interface, smooth updates, and very reliable daily usage."
                            : "Great app quality with modern design and cross-platform consistency."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Related products</h3>
                  <Link href="/apps" className="text-xs text-blue-600 hover:underline">
                    Discover more
                  </Link>
                </div>

                {relatedProducts.length > 0 ? (
                  <div className="space-y-3">
                    {relatedProducts.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/apps/${item.slug}`}
                        className="flex items-center gap-3 rounded-xl p-2 hover:bg-gray-50 transition"
                      >
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold truncate">{item.name}</p>
                          <p className="text-xs text-gray-500 truncate">{item.category}</p>
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{item.price}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 rounded-lg border border-gray-200 p-3">No related products found.</div>
                )}
              </div>

              <div id="requirements" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm scroll-mt-40">
                <h3 className="font-bold mb-3">System requirements</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500">Operating system</span>
                    <span className="font-medium text-right">{app.platform} 11 or later</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500">Architecture</span>
                    <span className="font-medium">x64 / ARM64</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500">Storage</span>
                    <span className="font-medium">250 MB</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500">Version</span>
                    <span className="font-medium">v2.8.1</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
                <h3 className="font-bold mb-2">Publisher details</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Verified publisher with a strong track record of secure, high-quality releases.
                </p>
                <button className="text-sm text-blue-700 font-semibold hover:underline">View all products →</button>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </StoreShell>
  );
}
