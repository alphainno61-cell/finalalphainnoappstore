"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getCurrentUser, signOut } from "@/lib/auth";
import UserSidebar from "@/components/user-sidebar";
import { Download, CheckCircle, XCircle, Clock, Pause, Play } from "lucide-react";

export default function DownloadsPage() {
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

  const downloads = [
    { name: "DesignStudio", icon: "🎨", status: "completed", progress: 100, size: "450 MB", speed: "" },
    { name: "CodeSmith", icon: "💻", status: "downloading", progress: 65, size: "320 MB", speed: "5.2 MB/s" },
    { name: "SecureVault", icon: "🔒", status: "paused", progress: 30, size: "85 MB", speed: "" },
    { name: "OmniMail", icon: "📧", status: "queued", progress: 0, size: "120 MB", speed: "" },
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
            <h1 className="text-2xl font-bold text-gray-900">Downloads</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your app downloads</p>
          </div>
        </div>

        <div className="p-8 max-w-4xl">
          <div className="space-y-4">
            {downloads.map((download, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{download.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{download.name}</h3>
                      <div className="flex items-center gap-2">
                        {download.status === "completed" && (
                          <span className="flex items-center gap-1 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                          </span>
                        )}
                        {download.status === "downloading" && (
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <Pause className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                        {download.status === "paused" && (
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <Play className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                        {download.status === "queued" && (
                          <span className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            Queued
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {download.status !== "completed" && (
                      <>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              download.status === "downloading"
                                ? "bg-blue-600"
                                : download.status === "paused"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                            }`}
                            style={{ width: `${download.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{download.progress}% of {download.size}</span>
                          {download.speed && (
                            <span className="text-gray-500">{download.speed}</span>
                          )}
                        </div>
                      </>
                    )}
                    
                    {download.status === "completed" && (
                      <p className="text-sm text-gray-600">{download.size}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {downloads.length === 0 && (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No downloads</h3>
              <p className="text-gray-600">Your download history will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
