"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getCurrentUser, signOut } from "@/lib/auth";
import { getUserRole } from "@/lib/user-role";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const init = async () => {
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
    await signOut();
    router.replace("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  const role = getUserRole(user);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{role === "admin" ? "Admin Dashboard" : "User Dashboard"}</h1>
            <p className="text-gray-600 mt-1">Signed in as {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Log out
          </button>
        </div>

        {role === "admin" ? (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-3xl font-bold mt-2">1,248</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-sm text-gray-500">Apps Published</p>
              <p className="text-3xl font-bold mt-2">342</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-sm text-gray-500">Revenue (30d)</p>
              <p className="text-3xl font-bold mt-2">$18,430</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:col-span-2">
              <h2 className="font-semibold text-lg mb-2">Admin Actions</h2>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Review newly uploaded apps</li>
                <li>• Manage developers and permissions</li>
                <li>• Monitor authentication activity</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-semibold text-lg mb-2">System</h2>
              <p className="text-sm text-gray-600">All services operational.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-sm text-gray-500">My Library</p>
              <p className="text-3xl font-bold mt-2">12 Apps</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-sm text-gray-500">Purchased</p>
              <p className="text-3xl font-bold mt-2">$126</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-sm text-gray-500">Wishlist</p>
              <p className="text-3xl font-bold mt-2">8 Items</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:col-span-3">
              <h2 className="font-semibold text-lg mb-2">Quick Actions</h2>
              <div className="flex gap-3 flex-wrap">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Browse Apps
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                  View Library
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                  Account Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
