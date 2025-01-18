import { Metadata } from "next";
import messages from "@/app/i18n";

interface Props {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;
  const t = messages[lang as keyof typeof messages];

  return {
    title: t.privacy.title,
    description: t.privacy.sections.collect.description,
    alternates: {
      languages: {
        "en-US": `/en/privacy`,
        "zh-TW": `/zh/privacy`,
        "ja-JP": `/ja/privacy`,
        "ko-KR": `/ko/privacy`,
      },
    },
  };
}

export default function PrivacyPage({ params: { lang } }: Props) {
  const t = messages[lang as keyof typeof messages];

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">{t.privacy.title}</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
        <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6 py-8">
          <p className="text-gray-600">
            {t.privacy.lastUpdated}: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {t.privacy.sections.collect.title}
            </h2>
            <p className="text-gray-700">
              {t.privacy.sections.collect.description}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {t.privacy.sections.collect.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {t.privacy.sections.usage.title}
            </h2>
            <p className="text-gray-700">
              {t.privacy.sections.usage.description}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {t.privacy.sections.usage.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {t.privacy.sections.security.title}
            </h2>
            <p className="text-gray-700">
              {t.privacy.sections.security.description}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {t.privacy.sections.cookies.title}
            </h2>
            <p className="text-gray-700">
              {t.privacy.sections.cookies.description}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
