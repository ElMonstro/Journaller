import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useAuthStore } from "~/store/auth";
import type { User } from "~/types/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decodeJwtToken(token: string): User {
  const [, payload] = token.split(".");
  if (!payload) throw new Error("Invalid token format");

  const decoded = atob(payload);
  return JSON.parse(decoded) as User;
}

export async function fetchWithAuth(url: string, options?: RequestInit) {
  const store = useAuthStore.getState();
  const token = store.token;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (res.status === 401) {
    const refreshed = await store.refreshToken();
    if (refreshed) {
      return fetchWithAuth(url, options);
    }
  }

  return res;
}
