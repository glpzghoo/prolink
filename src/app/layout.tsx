import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Gothic_A1,
  Inter,
  Montserrat,
  Roboto,
} from "next/font/google";
import "./globals.css";
import { Navigation } from "./account/_components/navigation";
import Footer from "./account/_components/footer";
import { Suspense } from "react";
import Loading from "./_component/loading";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/lib/theme";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ProLink",
  description:
    "Mанай веб сайт нь Монголын чадварлаг залууст зориулан гаргасан, өөрт тохирох ажлыг олох зорилготой Та мөрөөдлийн карьер болон ажлын байраа манай веб сайтаас олоорой  ",
};
const inter = Roboto({ subsets: ["latin"], weight: "400" });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-white ${montserrat.variable}`}>
        <div>
          <Navigation />
        </div>
        <div className=" min-h-screen bg-background">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
        <div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
