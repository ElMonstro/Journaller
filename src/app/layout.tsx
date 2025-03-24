import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import SideBar from "../components/sidebar/page";

export const metadata: Metadata = {
  title: "Journaller",
  description: "Reflection app for daily journaling",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex h-screen bg-gray-900 text-white">
        <SideBar />
        {children}
      </body>
      
    </html>
  );
}
