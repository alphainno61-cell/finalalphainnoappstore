"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import { useEffect, useState } from "react";

export function ConditionalFooter() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't show footer on auth pages
  const hideFooter = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password";
  
  if (!mounted) {
    return null;
  }
  
  if (hideFooter) {
    return null;
  }
  
  return <Footer />;
}
