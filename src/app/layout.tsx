import type { Metadata } from "next";
import { Inter,Poppins } from "next/font/google";
import "./globals.css";
import ContextAppProvider from "./pages/contextApp";

const inter = Inter({
  subsets:['latin']
});

const poppins = Poppins({
  subsets:['latin'],
  variable:'--font-poppins',
  weight: ["100","200","300","400","500","600","700","800","900"],
})

export const metadata: Metadata = {
  title: "Project Master",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <ContextAppProvider>
          <body className={poppins.variable}>
            {children}
          </body>
      </ContextAppProvider>
    </html>
  );
}
