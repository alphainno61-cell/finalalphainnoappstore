"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getCurrentUser } from "@/lib/auth";
import { isAdminUser } from "@/lib/user-role";

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const user: User | null = await getCurrentUser();
      if (!user) {
        router.replace("/login");
        return;
      }

      if (!isAdminUser(user)) {
        router.replace("/user-dashboard");
        return;
      }

      setIsLoading(false);
    };

    void checkAccess();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Checking admin access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold">Admin Control Panel</h1>
        <p className="text-gray-600 mt-2">You have administrator access.</p>
      </div>
    </div>
  );
}
