
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import ContextAppProvider from "./pages/contextApp";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SyncHand",
  description: "SyncHand is an AI-powered project and task management dashboard that enhances collaboration, tracking, and workflow optimization.",
  keywords: [
    "project management",
    "task management",
    "AI project assistant",
    "team collaboration",
    "workflow optimization",
    "progress tracking",
  ],
  authors: [{ name: "Ahmed Nayel Al Darabee" }],
  themeColor: "#000000",
  manifest: "/manifest.json"
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <Head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />

        {/* Theme & Background Colors */}
        <meta name="theme-color" content="#000000" />
        <meta name="background-color" content="#ffffff" />

        {/* SEO Metadata */}
        <meta name="author" content="Ahmed Nayel Al Darabee" />
      </Head>
      <body className={`${poppins.variable} ${inter.className}`}>
        <ClerkProvider>
          <ContextAppProvider>{children}</ContextAppProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
