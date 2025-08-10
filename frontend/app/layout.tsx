import type { Metadata } from "next";
import "./globals.css";

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "./_components/theme-provider";

export const metadata: Metadata = {
  title: "GitUI 2.0",
  description: "Personal Git UI for private Git Server.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased min-h-screen bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div className="flex h-screen flex-col flex-row overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SidebarProvider>
              <AppSidebar />
            </SidebarProvider>
          </div>
          <div className="grow p-6 overflow-y-auto md:p-12 ml-[--sidebar-width-icon]">
            {children}
          </div>
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
