"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth";
import { toastError, toastSuccess } from "~/components/notifications/page";
import type { LoginData, LoginResponse, User } from "~/types/user";
import { decodeJwtToken } from "~/lib/utils";
import { LOGIN_URL } from "~/lib/constants";


export function useLoginMutation() {
  const login = useAuthStore((state) => state.login);

  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (data) => {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Handle error safely
        const errorData: { detail?: string } = await res.json() as { detail?: string };
        throw new Error(errorData.detail ?? "Login failed");
      }

      return await res.json() as LoginResponse;

    },
    onSuccess: (data) => {
      toastSuccess("Login successful!");
      const user: User = decodeJwtToken(data.access)
      login(data.access, user);
    },
    onError: (error) => {
      toastError(error.message);
    },
  });
}
