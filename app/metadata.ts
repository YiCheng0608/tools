import { Metadata } from "next";

export function generateMetadata(
  params: { lang: string },
  translations: {
    meta: {
      title: string;
      description: string;
      keywords: string;
    };
  }
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: {
      template: `%s | ${translations.meta.title}`,
      default: translations.meta.title,
    },
    description: translations.meta.description,
    applicationName: "Widget Tools",
    authors: [{ name: "Widget Tools Team" }],
    generator: "Next.js",
    keywords: translations.meta.keywords,
    referrer: "origin-when-cross-origin",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "zh-TW": "/zh",
        "ja-JP": "/ja",
        "ko-KR": "/ko",
      },
    },
    openGraph: {
      title: translations.meta.title,
      description: translations.meta.description,
      siteName: "Widget Tools",
      url: siteUrl,
      locale:
        {
          en: "en_US",
          zh: "zh_TW",
          ja: "ja_JP",
          ko: "ko_KR",
        }[params.lang] || "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: translations.meta.title,
      description: translations.meta.description,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}
