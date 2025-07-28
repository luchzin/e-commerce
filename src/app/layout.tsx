import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Tshop - E-commerce Platform",
  description:
    "Join with Tshop to purchase and sell high quality products all over the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="grid items-center">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
