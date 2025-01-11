import { Metadata } from "next";

export function generateMetadata(
  params: { lang: string },
  translations: any
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "zh-TW": "/zh",
      },
    },
    openGraph: {
      images: "/og-image.png",
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      url: siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      images: "/twitter-image.png",
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}
