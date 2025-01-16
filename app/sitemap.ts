import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locales = ["en", "zh", "ja", "ko"];
  const tools = [
    "roulette",
    "calculator",
    "colorConverter",
    "qrGenerator",
    "unitConverter",
    "imageConverter",
  ];

  const routes = [
    // 首頁
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    })),

    // 工具頁面
    ...locales.flatMap((locale) =>
      tools.map((tool) => ({
        url: `${baseUrl}/${locale}/${tool}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    ),

    // 隱私權政策頁面
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return routes;
}
