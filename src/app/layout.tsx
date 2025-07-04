import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Footer from './account/_components/footer';
import { Suspense } from 'react';
import Navigation from './account/_components/navigation';

const montserrat = Roboto({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'ProLink',
  description:
    'Mанай веб сайт нь Монголын чадварлаг залууст зориулан гаргасан, өөрт тохирох ажлыг олох зорилготой Та мөрөөдлийн карьер болон ажлын байраа манай веб сайтаас олоорой  ',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${montserrat.variable} bg-secondary`}>
        <div>
          <Navigation />
        </div>
        <div className=" min-h-screen">
          <Suspense>{children}</Suspense>
        </div>
        <div className=" mt-6">
          <Footer />
        </div>
      </body>
    </html>
  );
}
