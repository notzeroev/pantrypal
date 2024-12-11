import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PantryPal",
  description: "A smart grocery assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased min-h-screen flex flex-col`}>
        <header className="bg-primary p-4">
          <div className="container mx-auto flex items-center">
            <div className="w-10 h-10">
              <svg></svg>
            </div>
          </div>
        </header>
        
        <main className="flex-grow container mx-auto">
          {children}
        </main>

        <footer className="py-4 mt-auto">
          <div className="container mx-auto text-center text-gray-600 text-sm">
            Developed by Nathan Isaiah
          </div>
        </footer>
      </body>
    </html>
  );
}