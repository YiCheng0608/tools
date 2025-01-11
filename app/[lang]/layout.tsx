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
                <script
                  async
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                ></script>
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
                  data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR}
                  data-ad-format="vertical"
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
                <script
                  async
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                ></script>
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
                  data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR}
                  data-ad-format="vertical"
                ></ins>
              </div>
            </div>
          </div>

          {/* Bottom Ad */}
          <div className="h-24 p-4">
            <div className="bg-gray-100 h-full flex items-center justify-center">
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
              ></script>
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
                data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM}
                data-ad-format="horizontal"
              ></ins>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
