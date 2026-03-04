import type { User } from "@supabase/supabase-js";

export type UserRole = "admin" | "user";

const parseAdminEmails = () => {
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
};

export const getUserRole = (user: User | null): UserRole => {
  if (!user?.email) {
    return "user";
  }

  const adminEmails = parseAdminEmails();
  if (adminEmails.includes(user.email.toLowerCase())) {
    return "admin";
  }

  return "user";
};

export const isAdminUser = (user: User | null): boolean => {
  return getUserRole(user) === "admin";
};
