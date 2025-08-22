import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackProvider from "./provider/TanstackProvider";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/navbar";

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
        <TanstackProvider>
          <Navbar/>
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
