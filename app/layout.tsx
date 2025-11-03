import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simon Cottier - Portfolio",
  description: "Personal portfolio and presentation of Simon Cottier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
