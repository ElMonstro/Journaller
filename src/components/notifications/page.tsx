"use client";

import { Toaster } from "~/components/ui/toaster";
import { toast } from "~/hooks/use-toast";

// Define allowed variants
type ToastVariant = "default" | "destructive";

/**
 * Show a toast notification.
 * @param message - The message to display.
 * @param variant - The toast variant (default or destructive).
 */
function showToast(message: string, variant: ToastVariant = "default") {
  toast({
    title: variant === "destructive" ? "Error" : "Success",
    description: message,
    variant,
  });
}

/**
 * Success toast notification.
 * @param message - The success message.
 */
export function toastSuccess(message: string) {
  showToast(message, "default");
}

/**
 * Error toast notification.
 * @param message - The error message.
 */
export function toastError(message: string) {
  showToast(message, "destructive");
}

/**
 * Info toast notification (alias for default variant).
 * @param message - The info message.
 */
export function toastInfo(message: string) {
  showToast(message, "default");
}

// Toast provider component
export default function NotificationProvider() {
  return <Toaster  />;
}
