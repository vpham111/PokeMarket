// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientCartProvider from "./components/ClientCartProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PokeMarket",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientCartProvider>
          {children}
        </ClientCartProvider>
      </body>
    </html>
  );
}