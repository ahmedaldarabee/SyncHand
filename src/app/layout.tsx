"use client"

import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ContextAppProvider from "./pages/contextApp";
import 'ldrs/ring'
import { Helix } from 'ldrs/react'
import 'ldrs/react/Helix.css'
import { useEffect, useState } from "react";
import { metadata } from "metadata";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!clerkKey) {
  throw new Error("Missing Clerk Publishable Key! Ensure it is set in your environment variables.");
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (performance.navigation.type === 1) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    } else {
      setIsLoading(false);
    }
  }, []);
  

  return (
    <html lang="en">
      <head>
        <title>SyncHand</title>
        <meta name="description" content="SyncHand is an AI-powered project designed to enhance productivity and efficiency for individuals and teams." />
      </head>

        <ClerkProvider>
          <ContextAppProvider>
            <body className={poppins.variable}>
            {isLoading ? (
              <div className="flex justify-center items-center h-screen">
                <Helix size={100} speed={3} color="black" />
              </div>
            ) : (
              children
            )}
            </body>
          </ContextAppProvider>
        </ClerkProvider>

    </html>
  );
}