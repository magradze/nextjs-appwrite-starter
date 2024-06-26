import type { Metadata } from "next";
import { CookiesProvider } from 'next-client-cookies/server';
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/providers/provider";
import Navbar from "@/components/partials/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <CookiesProvider>
            <div className="flex min-h-screen flex-col items-center p-8">
              <Navbar />
              {children}
            </div>
          </CookiesProvider>
        </Provider>
      </body>
    </html>
  );
}
