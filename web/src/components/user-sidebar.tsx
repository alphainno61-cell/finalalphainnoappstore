"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Download, 
  Heart, 
  Settings, 
  User, 
  Code, 
  Activity,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

interface UserSidebarProps {
  onLogout: () => void;
  userEmail?: string;
}

export default function UserSidebar({ onLogout, userEmail }: UserSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/user-dashboard" },
    { icon: Package, label: "My Library", href: "/user-dashboard/library" },
    { icon: Download, label: "Downloads", href: "/user-dashboard/downloads" },
    { icon: Activity, label: "Activity", href: "/user-dashboard/activity" },
    { icon: Heart, label: "Wishlist", href: "/user-dashboard/wishlist" },
    { icon: Code, label: "Developer Portal", href: "/user-dashboard/developer" },
    { icon: User, label: "Profile", href: "/user-dashboard/profile" },
    { icon: Settings, label: "Settings", href: "/user-dashboard/settings" },
  ];

  return (
    <div 
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        {!isCollapsed ? (
          <h2 className="text-xl font-bold text-gray-900">Alphainno</h2>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
        )}
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {userEmail?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {userEmail?.split("@")[0] || "User"}
              </p>
              <p className="text-xs text-gray-600 truncate">{userEmail}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.label : ""}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "Logout" : ""}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </div>
  );
}
