// app/layout.js
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS 추가
import "./globals.css";
import SessionProviderWrapper from './SessionProviderWrapper'; // 세션 프로바이더 임포트


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "구역카드",
  description: "It's a simple progressive web application made with NextJS",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "imvinojanv",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/logo192.png" },
    { rel: "icon", url: "icons/logo192.png" },
    { rel: "icon", url: "/icons/logo192.png", sizes: "512x512" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <body>  <SessionProviderWrapper>{children}</SessionProviderWrapper></body>
    </html>
  );
}