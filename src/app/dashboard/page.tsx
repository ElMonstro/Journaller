"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import SideBar from "~/components/sidebar/page";

export default function Dashboard() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen">
        <main className="flex-1 p-6 overflow-auto w-full md:w-auto">
            
        </main>
      </div>
    </QueryClientProvider>
  );
}
