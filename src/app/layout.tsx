import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from '@/components/Includes/Header';
import Footer from '@/components/Includes/Footer';
import { Providers } from '@/providers/ReduxProvider';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to GEN21: Bangladesh's Premier On-Demand Service Platform | GEN21",
  description: "GEN21 offers hassle-free access to essential services in Bangladesh. Explore our user-friendly app, connect with verified providers, and elevate your lifestyle with convenience at your fingertips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main className="min-h-[calc(100vh-140px)]">{children}</main>
          <Footer />
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
