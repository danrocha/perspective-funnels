import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "400 600 700",
});

const nunito = localFont({
  src: "./fonts/NunitoVF.ttf",
  variable: "--font-nunito",
  weight: "400 600 700",
});

export const metadata: Metadata = {
  title: "Funnel Previews",
  description: "by Perspective",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${nunito.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
