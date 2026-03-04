"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { getCurrentUser, signOut } from "@/lib/auth";
import UserSidebar from "@/components/user-sidebar";
import { 
  Code, 
  Upload, 
  TrendingUp, 
  DollarSign, 
  Users, 
  CheckCircle,
  ArrowRight,
  Rocket,
  Shield,
  Zap
} from "lucide-react";

export default function DeveloperPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    const init = async () => {
      const demoUser = localStorage.getItem("demo-user");
      if (demoUser) {
        setUser(JSON.parse(demoUser));
        // Check if user is already a developer
        const devStatus = localStorage.getItem("is-developer");
        setIsDeveloper(devStatus === "true");
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

  const handleBecomeDeveloper = () => {
    localStorage.setItem("is-developer", "true");
    setIsDeveloper(true);
    setShowRegistration(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isDeveloper && !showRegistration) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <UserSidebar onLogout={handleLogout} userEmail={user?.email} />

        <div className="flex-1 overflow-y-auto">
          <div className="bg-white border-b border-gray-200">
            <div className="px-8 py-6">
              <h1 className="text-2xl font-bold text-gray-900">Developer Portal</h1>
              <p className="text-sm text-gray-600 mt-1">Join our developer community</p>
            </div>
          </div>

          <div className="p-8 max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white mb-8">
              <div className="max-w-2xl">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                  <Code className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Become a Developer</h2>
                <p className="text-lg text-blue-100 mb-8">
                  Share your apps with millions of users worldwide. Build, publish, and monetize your applications on our platform.
                </p>
                <button
                  onClick={() => setShowRegistration(true)}
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Global Reach</h3>
                <p className="text-sm text-gray-600">
                  Reach millions of users across 150+ countries with our distribution platform.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Monetization</h3>
                <p className="text-sm text-gray-600">
                  Flexible pricing models with 70% revenue share and instant payouts.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Platform</h3>
                <p className="text-sm text-gray-600">
                  Enterprise-grade security with automated malware scanning and code review.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">What You Get</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Free developer account",
                  "Analytics dashboard",
                  "App store optimization tools",
                  "Marketing support",
                  "Technical documentation",
                  "Developer community access",
                  "Priority support",
                  "Beta testing platform",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showRegistration) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <UserSidebar onLogout={handleLogout} userEmail={user?.email} />

        <div className="flex-1 overflow-y-auto">
          <div className="bg-white border-b border-gray-200">
            <div className="px-8 py-6">
              <h1 className="text-2xl font-bold text-gray-900">Developer Registration</h1>
              <p className="text-sm text-gray-600 mt-1">Complete your developer profile</p>
            </div>
          </div>

          <div className="p-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Developer Name / Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Your name or company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Website
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    About
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    placeholder="Tell us about yourself and what you build"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Country
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <input type="checkbox" className="mt-1" required />
                  <p className="text-sm text-gray-700">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Developer Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRegistration(false)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleBecomeDeveloper}
                    className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    Complete Registration
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Developer Dashboard
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <UserSidebar onLogout={handleLogout} userEmail={user?.email} />

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Developer Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">Manage your apps and analytics</p>
              </div>
              <Link
                href="/developer/upload"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload App
              </Link>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">0</p>
              <p className="text-sm text-gray-600">Published Apps</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">0</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">$0</p>
              <p className="text-sm text-gray-600">Revenue</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">0</p>
              <p className="text-sm text-gray-600">Downloads</p>
            </div>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No apps yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start by uploading your first app to reach millions of users worldwide.
            </p>
            <Link
              href="/developer/upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Upload className="w-5 h-5" />
              Upload Your First App
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
