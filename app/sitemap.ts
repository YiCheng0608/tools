import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const locales = ["en", "zh"];
  const tools = ["calculator", "timer", "color-picker"];

  return tools.flatMap((tool) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/${tool}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    }))
  );
}
