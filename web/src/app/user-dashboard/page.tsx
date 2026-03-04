"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { getCurrentUser, signOut } from "@/lib/auth";
import { isAdminUser } from "@/lib/user-role";
import UserSidebar from "@/components/user-sidebar";
import { 
  Package, 
  ShoppingBag, 
  Heart, 
  TrendingUp, 
  Download, 
  Star,
  Clock,
  ChevronRight,
  Gamepad2,
  Film,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

export default function UserDashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const init = async () => {
      // Check for demo user first
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

      if (isAdminUser(currentUser)) {
        router.replace("/admin");
        return;
      }

      setUser(currentUser);
      setIsLoading(false);
    };

    void init();
  }, [router]);

  const handleLogout = async () => {
    // Clear demo user if exists
    localStorage.removeItem("demo-user");
    await signOut();
    router.replace("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "My Library", value: "12", icon: Package, color: "bg-blue-500", trend: "+2 this week" },
    { label: "Total Spent", value: "$126", icon: ShoppingBag, color: "bg-green-500", trend: "3 purchases" },
    { label: "Wishlist", value: "8", icon: Heart, color: "bg-pink-500", trend: "2 on sale" },
    { label: "Downloads", value: "24", icon: Download, color: "bg-purple-500", trend: "Last 30 days" },
  ];

  const recentActivity = [
    { name: "DesignStudio", action: "Downloaded", time: "2 hours ago", icon: "🎨" },
    { name: "CodeSmith", action: "Purchased", time: "1 day ago", icon: "💻" },
    { name: "SecureVault", action: "Updated", time: "3 days ago", icon: "🔒" },
    { name: "Cyber Tactics", action: "Played", time: "5 days ago", icon: "🎮" },
  ];

  const recommendations = [
    { name: "WriteFlow", category: "Writing", price: "$2.99", rating: 4.7, image: "✍️" },
    { name: "Planify", category: "Productivity", price: "Free", rating: 4.6, image: "📋" },
    { name: "Apex Drift", category: "Racing", price: "$29.99", rating: 4.8, image: "🏎️" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <UserSidebar onLogout={handleLogout} userEmail={user?.email} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">Welcome back, {user?.email?.split("@")[0]}!</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/apps"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  Browse Store
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.trend}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Quick Actions
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link
                  href="/apps"
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Browse Apps</p>
                    <p className="text-xs text-gray-600">Discover new apps</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </Link>

                <Link
                  href="/games"
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50/50 transition-all group"
                >
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <Gamepad2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Browse Games</p>
                    <p className="text-xs text-gray-600">Find your next game</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                </Link>

                <Link
                  href="/user-dashboard/library"
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50/50 transition-all group"
                >
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Download className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">My Library</p>
                    <p className="text-xs text-gray-600">View all your apps</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                </Link>

                <Link
                  href="/movies"
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50/50 transition-all group"
                >
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <Film className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Movies</p>
                    <p className="text-xs text-gray-600">Watch & discover</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {activity.name}
                      </p>
                      <p className="text-xs text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Recommended for You
              </h2>
              <Link
                href="/apps"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((app, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-4xl">{app.image}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-xs text-gray-600">{app.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-gray-900">{app.rating}</span>
                    </div>
                    <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      {app.price === "Free" ? "Get" : app.price}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
