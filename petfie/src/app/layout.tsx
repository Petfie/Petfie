import type { Metadata } from "next";
import "./globals.css";
import { Theme } from "@radix-ui/themes";


export const metadata: Metadata = {
  title: "Petfie",
  description: "Build your pet's profile cards with Petfie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
