import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import ContextAppProvider from "./pages/contextApp";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SyncHand",
  description: "SyncHand is an AI-powered project designed to enhance productivity and efficiency for individuals and teams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <ContextAppProvider>
          <body className={`${poppins.variable} ${inter.className}`}>
            {children}
          </body>
        </ContextAppProvider>
      </ClerkProvider>
    </html>
  );
}
