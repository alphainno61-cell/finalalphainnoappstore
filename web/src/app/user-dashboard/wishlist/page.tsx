"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getCurrentUser, signOut } from "@/lib/auth";
import UserSidebar from "@/components/user-sidebar";
import { Heart, Star, ShoppingBag, X } from "lucide-react";

export default function WishlistPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const init = async () => {
      const demoUser = localStorage.getItem("demo-user");
      if (demoUser) {
        setUser(JSON.parse(demoUser));
        setIsLoading(false);
        return;
      }

      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.replace("/login");
        return;
      }

      setUser(currentUser);
      setIsLoading(false);
    };

    void init();
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem("demo-user");
    await signOut();
    router.replace("/login");
  };

  const wishlist = [
    { name: "WriteFlow", category: "Writing", icon: "✍️", price: "$2.99", rating: 4.7, onSale: false },
    { name: "Planify", category: "Productivity", icon: "📋", price: "Free", rating: 4.6, onSale: false },
    { name: "Apex Drift", category: "Racing", icon: "🏎️", price: "$29.99", originalPrice: "$39.99", rating: 4.8, onSale: true },
    { name: "Neon Knight", category: "Action", icon: "⚔️", price: "$14.99", rating: 4.5, onSale: false },
    { name: "Ghost Runner", category: "Parkour", icon: "🏃", price: "$9.99", originalPrice: "$14.99", rating: 4.4, onSale: true },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <UserSidebar onLogout={handleLogout} userEmail={user?.email} />

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
            <p className="text-sm text-gray-600 mt-1">{wishlist.length} items • 2 on sale</p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group"
              >
                {item.onSale && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                    SALE
                  </div>
                )}
                
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                  <X className="w-4 h-4 text-red-500" />
                </button>

                <div className="text-5xl mb-4">{item.icon}</div>
                
                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.category}</p>
                
                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">{item.rating}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {item.onSale && item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through mr-2">
                        {item.originalPrice}
                      </span>
                    )}
                    <span className={`font-bold ${item.onSale ? "text-red-600" : "text-gray-900"}`}>
                      {item.price}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 text-sm">
                    <ShoppingBag className="w-4 h-4" />
                    {item.price === "Free" ? "Get" : "Buy"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {wishlist.length === 0 && (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600">Add apps you're interested in to keep track of them</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
