"use client"

import { Footer } from "@/components";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

// check on import meta data using use client


export default function RootLayout({ children }) {

  const router = useRouter();

  // Define an array of routes where you don't want to display the additional content
  const excludedRoutes = ['/dashboard', '/accounts'];

  // Check if the current route is not in the excludedRoutes array
  const shouldDisplayContent = !excludedRoutes.includes(router.pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
      
          {children}
          {/* <Footer /> */}
          
        </AuthContextProvider>
      </body>
    </html>
  );
}
