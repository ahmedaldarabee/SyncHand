import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ContextAppProvider from "./pages/contextApp";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SyncHand",
  description:
    "SyncHand is an AI-powered project designed to enhance productivity and efficiency for individuals and teams.",
};

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!clerkKey) {
  throw new Error("Missing Clerk Publishable Key! Ensure it is set in your environment variables.");
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>SyncHand</title>
        <meta name="description" content="SyncHand is an AI-powered project designed to enhance productivity and efficiency for individuals and teams." />
      </head>
      <ClerkProvider>
        <ContextAppProvider>
          <body className={poppins.variable}>{children}</body>
        </ContextAppProvider>
      </ClerkProvider>
    </html>
  );
}