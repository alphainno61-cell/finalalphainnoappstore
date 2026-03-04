"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getCurrentUser, signOut } from "@/lib/auth";
import UserSidebar from "@/components/user-sidebar";
import { Download, ShoppingBag, Star, Play, Clock, Calendar } from "lucide-react";

export default function ActivityPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [filter, setFilter] = useState("all");

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

  const activities = [
    {
      type: "download",
      icon: Download,
      color: "bg-blue-500",
      title: "Downloaded DesignStudio",
      description: "Version 2.5.0 - 450 MB",
      time: "2 hours ago",
      date: "Today",
    },
    {
      type: "purchase",
      icon: ShoppingBag,
      color: "bg-green-500",
      title: "Purchased CodeSmith",
      description: "Paid $19.99",
      time: "1 day ago",
      date: "Yesterday",
    },
    {
      type: "review",
      icon: Star,
      color: "bg-yellow-500",
      title: "Reviewed SecureVault",
      description: "Rated 5 stars",
      time: "3 days ago",
      date: "Mar 1, 2026",
    },
    {
      type: "play",
      icon: Play,
      color: "bg-purple-500",
      title: "Played Cyber Tactics",
      description: "Session: 2 hours 15 minutes",
      time: "5 days ago",
      date: "Feb 27, 2026",
    },
    {
      type: "download",
      icon: Download,
      color: "bg-blue-500",
      title: "Downloaded OmniMail",
      description: "Version 1.2.3 - 120 MB",
      time: "1 week ago",
      date: "Feb 24, 2026",
    },
    {
      type: "purchase",
      icon: ShoppingBag,
      color: "bg-green-500",
      title: "Purchased Apex Drift",
      description: "Paid $29.99",
      time: "1 week ago",
      date: "Feb 23, 2026",
    },
  ];

  const filteredActivities = filter === "all" 
    ? activities 
    : activities.filter(a => a.type === filter);

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
            <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
            <p className="text-sm text-gray-600 mt-1">Track your app usage and purchases</p>
          </div>
        </div>

        <div className="p-8 max-w-5xl">
          {/* Filter Tabs */}
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-6 inline-flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Activity
            </button>
            <button
              onClick={() => setFilter("download")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "download"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Downloads
            </button>
            <button
              onClick={() => setFilter("purchase")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "purchase"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Purchases
            </button>
            <button
              onClick={() => setFilter("review")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "review"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Reviews
            </button>
          </div>

          {/* Activity List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {filteredActivities.map((activity, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`${activity.color} p-3 rounded-xl flex-shrink-0`}>
                    <activity.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activity.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity found</h3>
              <p className="text-gray-600">Try selecting a different filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
