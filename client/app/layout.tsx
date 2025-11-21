import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from '@/app/components/Footer';
import { headers } from "next/headers";
import DashboardNav from "./components/DashboardNav";
import Providers from "./components/Providers";
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300','400','500','600','700'],
  variable: '--font-poppins',   
  display: 'swap',
})


export const metadata: Metadata = {
  title: "SOKONI APP",
  description: "Connecting buyers and sellers",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  
  const path = headersList.get("x-current-path")
  

  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <Providers>
            {
            path === "/dashboard"? 
            <DashboardNav/>: <Navbar/>
          }
          {children}
          <Footer/>
        </Providers>
        
      </body>
    </html>
  );
}
