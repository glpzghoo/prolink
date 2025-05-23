import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Manrope,
  Montserrat,
} from "next/font/google";
import "../../globals.css";
import { Button } from "@mui/material";
import Link from "next/link";
import NavigationSettings from "./_component/navigation_settings";
import { Suspense } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProLink - Тохиргоо",
  description: "Generated by create next app",
};
const inter = Manrope({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <div className="">
        <NavigationSettings />
        {/* <Button>Профайл тохиргоо</Button>
        <Button>Профайл тохиргоо</Button> */}
      </div>
      <div className={`${inter.className} min-h-screen  bg-secondary`}>
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
