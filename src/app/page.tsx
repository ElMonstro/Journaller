"use server";

import { redirect } from "next/navigation";

export default async function HomeContainer() {
  redirect("/dashboard/insights");
  return (
      <main className="flex-1 p-6 overflow-auto w-full md:w-auto">
        <h1>Home</h1>
      </main>
  );
}
