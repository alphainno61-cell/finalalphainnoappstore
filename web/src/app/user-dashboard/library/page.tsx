"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getCurrentUser, signOut } from "@/lib/auth";
import UserSidebar from "@/components/user-sidebar";
import { Package, Download, Play, Star, MoreVertical } from "lucide-react";

export default function LibraryPage() {
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

  const library = [
    { name: "DesignStudio", category: "Design", icon: "🎨", installed: true, size: "450 MB", rating: 4.9 },
    { name: "CodeSmith", category: "Development", icon: "💻", installed: true, size: "320 MB", rating: 4.5 },
    { name: "SecureVault", category: "Security", icon: "🔒", installed: true, size: "85 MB", rating: 4.7 },
    { name: "OmniMail", category: "Communications", icon: "📧", installed: false, size: "120 MB", rating: 4.8 },
    { name: "WriteFlow", category: "Writing", icon: "✍️", installed: true, size: "95 MB", rating: 4.7 },
    { name: "Planify", category: "Productivity", icon: "📋", installed: true, size: "110 MB", rating: 4.6 },
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
            <h1 className="text-2xl font-bold text-gray-900">My Library</h1>
            <p className="text-sm text-gray-600 mt-1">{library.length} apps in your library</p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-4">
            {library.map((app, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{app.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg">{app.name}</h3>
                    <p className="text-sm text-gray-600">{app.category}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-gray-700">{app.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">{app.size}</span>
                      {app.installed && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                          Installed
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {app.installed ? (
                      <>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Open
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                      </>
                    ) : (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Install
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
