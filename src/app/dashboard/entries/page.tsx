"use client";

export default function JournalEntries() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {/* Title Section */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Journal</h1>
          <p className="text-gray-400">March 2025</p>
        </div>
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z"
            />
          </svg>
        </button>
      </header>

      {/* Journal Entries */}
      <div className="space-y-4">
        {/* Entry 1 */}
        <div className="card bg-black/90 shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="badge badge-neutral text-xs">TUE</span>
              <p className="text-lg font-semibold">25</p>
            </div>
            <p className="text-sm text-gray-300">aksgrnfklgmf;lsamzfg'lasdvgldfmbl;dmfv csv</p>
          </div>
        </div>
      </div>
    </div>
  );
}