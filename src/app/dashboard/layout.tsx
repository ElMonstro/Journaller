"use client";

import SideBar from "~/components/sidebar/page";
import { Providers } from "../providers";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <Providers><div className="flex h-screen">
        <SideBar />
        <main className="flex-1 p-6 overflow-auto w-full md:w-auto">
            {children}
        </main>
        </div>
      </Providers>
      
    );
  }
  