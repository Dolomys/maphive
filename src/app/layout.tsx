import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme.provider";
import { Navbar } from "@/components/layout/Navbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Providers } from "./providers";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shadcn - Landing template",
  description: "Landing template from Shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("flex flex-col bg-background", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <NuqsAdapter>
              <Navbar />
              <main className="mt-[30px] flex-1 w-full">
                <Providers>{children}</Providers>
              </main>
              <Toaster />
            </NuqsAdapter>
          </ReactQueryProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
