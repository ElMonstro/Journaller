"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { toastError, toastSuccess } from "~/components/notifications/page";
import type { RegisterResponse } from "~/types/user";
import { REGISTER_URL } from "~/lib/constants";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  first_name: z.string().min(2, { message: "First name must be at least 2 characters" }),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json() as {detail: string};
        throw new Error(errorData.detail || "Registration failed");
      }

      return await res.json() as RegisterResponse;
    },
    onSuccess: async () => {
      toastSuccess("Registration successful! Redirecting...");
      // Redirect to login page or dashboard
      router.push("/auth/login/")
    },
    onError: (error: Error) => {
      toastError(error.message);
    },
  });

  const onSubmit = (data: RegisterData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto">
      <div>
        <Label htmlFor="first_name">First Name</Label>




        <Input id="first_name" {...register("first_name")} />
        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
      </div>
      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input id="last_name" {...register("last_name")} />
        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <div>
        <Label htmlFor="password_confirmation">Confirm Password</Label>
        <Input id="password_confirmation" type="password" {...register("password_confirmation")} />
        {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting || mutation.isPending} className="w-full">
        {mutation.isPending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
