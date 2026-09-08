import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "UNIT ECONOMICS AND BREAK-EVEN simulator  | FRED",
  description:
    "Real-time macroeconomic intelligence powered by FRED.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}