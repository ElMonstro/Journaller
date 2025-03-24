"use client";

import { useEffect, useState } from "react";
import type { JournalEntry } from "~/types/entries";

export default function Entries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    fetch("https://your-api.com/journal-entries") // Replace with actual API
      .then((res) => res.json())
      .then((data: JournalEntry[]) => setEntries(data))
      .catch((error) => console.error(error));
  }, []);

  return (
      <main className="flex-1 p-6 overflow-auto w-full md:w-auto">
        <h2 className="text-2xl font-bold">Journal</h2>
        <p className="text-gray-400">March 2025</p>
        
        <div className="mt-4 space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* {entries.map((entry) => (
            <div key={entry.id} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold">{entry.title}</h3>
              <p className="text-gray-400">{entry.date}</p>
              <p>{entry.content}</p>
              <div className="mt-2 flex flex-wrap space-x-2">
                {entry.tags.map((tag) => (
                  <span key={tag} className="bg-indigo-600 px-2 py-1 text-xs rounded">{tag}</span>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </main>
  );
}

