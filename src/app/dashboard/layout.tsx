"use client";

import SideBar from "~/components/sidebar/page";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen">
        <SideBar />
        <main className="flex-1 p-6 overflow-auto w-full md:w-auto">
            {children}
        </main>
    </div>
    );
  }
  