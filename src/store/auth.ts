"use client";

import { create } from "zustand";
import type { User } from "~/types/user";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean,
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  login: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user))
    set({ token, user });
    
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
  refreshToken: async () => {
    try {
      const res = await fetch("/api/refresh-token", {
        method: "POST",
        credentials: "include", // For cookies-based refresh tokens
      });

      if (!res.ok) throw new Error("Failed to refresh token");

      const data = await res.json() as { access: string };
      localStorage.setItem("token", data.access);
      set({ token: data.access });

      return true; 
    } catch (error) {
      console.error("Token refresh failed:", error);
      useAuthStore.getState().logout(); // Logout if refresh fails
      return false;
    }
  },
}));
