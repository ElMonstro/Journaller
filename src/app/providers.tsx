"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { ReactNode  } from "react";

import NotificationProvider from "~/components/notifications/page";
import { useAuthStore } from "~/store/auth";
import type { User } from "~/types/user";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const stringifiedUser = localStorage.getItem("user");

    if (token && stringifiedUser) {
      const user = JSON.parse(stringifiedUser) as User;
      login(token, user); // Auto-login
    }
  }, [login]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <NotificationProvider />
    </QueryClientProvider>
  );
}
