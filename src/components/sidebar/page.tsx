"use client";
import React from "react";

export default function SideBar() {
    return (
        <aside className="w-64 bg-black p-4 flex flex-col justify-between hidden md:flex">
        <div>
          <h1 className="text-xl font-bold mb-6">Reflection</h1>
          <nav className="space-y-4">
            <a href="#" className="block p-2 rounded bg-gray-800">Today</a>
            <a href="#" className="block p-2 rounded">Journal</a>
            <a href="#" className="block p-2 rounded">Guides</a>
            <a href="#" className="block p-2 rounded">Settings</a>
          </nav>
        </div>
        <button className="bg-indigo-500 text-white p-3 rounded">+ New Entry</button>
      </aside>
      );
}
