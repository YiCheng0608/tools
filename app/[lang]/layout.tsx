import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Navigation from "@/components/Navigation";
import messages from "@/app/i18n";
import { generateMetadata as baseMetadata } from "@/app/metadata";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;
  const t = messages[lang as keyof typeof messages];

  return {
    ...baseMetadata(params, t),
    title: {
      template: `%s | ${t.meta.title}`,
      default: t.meta.title,
    },
    description: t.meta.description,
    keywords: t.meta.keywords,
  };
}

export default function RootLayout({ children, params: { lang } }: Props) {
  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Navigation lang={lang} />
            <LanguageSwitcher />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
