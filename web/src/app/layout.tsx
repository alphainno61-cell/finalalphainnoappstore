import type { Metadata } from "next";
import "./globals.css";
import { ConditionalFooter } from "@/components/conditional-footer";

export const metadata: Metadata = {
  title: "Alphainno App Store - Universal App Marketplace",
  description:
    "Discover and publish Android, iOS, macOS, Windows, and Linux apps in one unified marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}
