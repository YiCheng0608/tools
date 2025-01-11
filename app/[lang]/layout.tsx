import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Navigation from "@/components/Navigation";
import AdsenseScript from "@/components/AdsenseScript";
import messages from "@/app/i18n";
import { generateMetadata as baseMetadata } from "@/app/metadata";
import "../globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <Navigation lang={lang} />
              <LanguageSwitcher />
            </div>
          </header>
          {/* Main Content with Ads */}
          <div className="flex-1 flex">
            {/* Left Ad */}
            <div className="hidden lg:block w-64 p-4">
              <div className="bg-gray-100 h-full flex items-center justify-center">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
                  data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT}
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            </div>

            {/* Main Content */}
            <main className="flex-1">
              <div className="max-w-4xl mx-auto p-4">{children}</div>
            </main>

            {/* Right Ad */}
            <div className="hidden lg:block w-64 p-4">
              <div className="bg-gray-100 h-full flex items-center justify-center">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
                  data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT}
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            </div>
          </div>

          {/* Bottom Ad */}
          <div className="h-24 p-4">
            <div className="bg-gray-100 h-full flex items-center justify-center">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
                data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT}
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>
          </div>
        </div>
        <AdsenseScript />
      </body>
    </html>
  );
}
