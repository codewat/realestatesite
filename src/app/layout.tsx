import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cemar Watin, REALTOR® | Toronto & GTA Real Estate Specialist | HomeLife / Miracle Realty Ltd., Brokerage",
  description:
    "Find your dream home, luxury condominiums, and investment properties in Toronto and the Greater Toronto Area with Cemar Watin, REALTOR® at HomeLife / Miracle Realty Ltd., Brokerage. Higher Standards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 antialiased selection:bg-emerald-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
