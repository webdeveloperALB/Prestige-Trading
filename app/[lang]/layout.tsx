import type React from "react";
import { Navbar } from "../../components/navbar";
import Footer from "../../components/footer";
import type { Locale } from "../../lib/translations";

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "it" }, { lang: "de" }];
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body>
        <Navbar locale={lang} />
        <main>{children}</main>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
