
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "NotionClone",
  description: "Create new document",
};
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ReactQueryProvider from "./reactQueryProviders";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ReactQueryProvider>
          <Navbar />
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-4 bg-gray-100 overflow-y-auto scrollbar-hide">{children}</div>
          </div>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
