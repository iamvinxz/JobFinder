import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import TanstackProvider from "./provider/TanstackProvider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobFinder",
  description: "Look for your dream job!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav>
          <ul className="flex justify-center gap-10 p-5 cursor-pointer items-center">
            <li><Link href="./">Home</Link></li> 
            <li><Link href="./Jobs">Jobs</Link></li>
            <li><Link href="./about">About</Link></li>
          </ul>
        </nav>
        
        <TanstackProvider>
          {children}
        <ToastContainer  autoClose={3000} position="top-right"/>
        </TanstackProvider>

        <footer className="text-center relative h-[40px] mt-[20px]">
          <p className="text-xs"> &copy; 2025 JobFinder, All Rights Reserved.</p> 
        </footer>
      </body>
    </html>
  );
}
