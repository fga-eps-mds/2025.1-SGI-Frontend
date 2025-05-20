import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto", // variável CSS para uso global
  subsets:["latin"], // inclui apenas caracteres usados em idiomas ocidentais, reduzindo o tamanho da fonte
})

export const metadata: Metadata = {
  title: "GitFica",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header/>
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
