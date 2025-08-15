import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SpinTech – Finance Dashboard",
  description: "Series‑D startup digital fidget spinner for AI agents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-surface min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 container mx-auto p-6">{children}</main>
        <footer className="text-center py-4 text-sm text-gray-500">
          © {new Date().getFullYear()} SpinTech Inc.
        </footer>
      </body>
    </html>
  );
}
