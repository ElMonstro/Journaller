"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { fetchWithAuth } from "~/lib/utils";
import { toastError, toastSuccess } from "~/components/notifications/page";
import { useRouter } from "next/navigation";

const journalEntrySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.enum(["Personal", "Work", "Ideas", "Reflections", "Dreams", "Health"], {
    errorMap: () => ({ message: "Please select a category" }),
  }),
  body: z.string().min(10, "Journal entry must be at least 10 characters"),
});

type JournalEntryData = z.infer<typeof journalEntrySchema>;

export default function JournalEntryForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JournalEntryData>({
    resolver: zodResolver(journalEntrySchema),
  });

  const mutation = useMutation({
    mutationFn: async (newEntry: JournalEntryData) => {
      const response = await fetchWithAuth("/api/journal", {
        method: "POST",
        body: JSON.stringify(newEntry),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to save entry");
      }
      return response.json();
    },
    onSuccess: () => {
      toastSuccess("Journal entry saved!");
      reset(); 
    },
    onError: (error) => {
      toastError(error instanceof Error ? error.message : "Something went wrong");
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className="w-full h-full flex flex-col justify-center px-6 max-w-2xl"
      >
        <button 
          onClick={() => router.back()}
          type="button" className="absolute top-4 right-4 text-gray-400 hover:text-white">
          ✕
        </button>

        <h2 className="text-lg text-gray-300 mb-6 text-center">Hi Josh, what’s on your mind?</h2>

        <div className="mb-4">
          <input
            {...register("title")}
            type="text"
            placeholder="Title"
            className={`input input-bordered w-full bg-gray-800 text-white ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <select
            {...register("category")}
            className={`select select-bordered w-full bg-gray-800 text-white ${
              errors.category ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Category</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Ideas">Ideas</option>
            <option value="Reflections">Reflections</option>
            <option value="Dreams">Dreams</option>
            <option value="Health">Health</option>
          </select>
          {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>}
        </div>

        <div className="mb-4 flex-1">
          <textarea
            {...register("body")}
            placeholder="Write your journal entry here..."
            className={`textarea textarea-bordered w-full h-full bg-gray-800 text-white ${
              errors.body ? "border-red-500" : ""
            }`}
          ></textarea>
          {errors.body && <p className="text-red-400 text-sm mt-1">{errors.body.message}</p>}
        </div>

        <div className="mt-6 text-center">
          <button type="submit" className="btn btn-primary w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Entry"}
          </button>
        </div>
      </form>
    </div>
  );
}
