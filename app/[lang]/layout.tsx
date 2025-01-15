import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Navigation from "@/components/Navigation";
import AdsenseScript from "@/components/AdsenseScript";
import messages from "@/app/i18n";
import { generateMetadata as baseMetadata } from "@/app/metadata";
import "../globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Logo from "@/components/Logo";
import Link from "next/link";
import CookieConsent from "@/components/CookieConsent";

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

function AdUnit() {
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
      data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export default function RootLayout({ children, params: { lang } }: Props) {
  const t = messages[lang as keyof typeof messages];
  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/images/favicon-32x32.ico" sizes="32x32" />
        <link rel="icon" href="/images/favicon-16x16.ico" sizes="16x16" />
        <link
          rel="apple-touch-icon"
          href="/images/apple-touch-icon.ico"
          sizes="180x180"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        ></script>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-yellow-50`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-yellow-100 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <Logo />
              <div className="flex items-center space-x-4 text-gray-800">
                <Navigation lang={lang} />
                <LanguageSwitcher />
              </div>
            </div>
          </header>

          <main className="flex-1 flex flex-col justify-center py-4">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-100 text-center py-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Cheng Tools. All rights reserved.{" "}
              <span className="mx-2">|</span>
              <Link
                href={`/${lang}/privacy`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t.privacy.title}
              </Link>
            </p>
          </footer>
        </div>
        <AdsenseScript />
        <CookieConsent />
      </body>
    </html>
  );
}
