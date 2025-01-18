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
    title: t.contact.title,
    description: t.contact.description,
    alternates: {
      languages: {
        "en-US": `/en/contact`,
        "zh-TW": `/zh/contact`,
        "ja-JP": `/ja/contact`,
        "ko-KR": `/ko/contact`,
      },
    },
  };
}

export default function ContactPage({ params: { lang } }: Props) {
  const t = messages[lang as keyof typeof messages];

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">{t.contact.title}</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <p className="text-gray-600">{t.contact.description}</p>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{t.contact.methods.title}</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">{t.contact.methods.email}:</span>{" "}
              <a
                href="mailto:cheng.real2025@gmail.com"
                className="text-blue-600 hover:underline"
              >
                cheng.real2025@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{t.contact.response.title}</h2>
          <p className="text-gray-600">{t.contact.response.description}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{t.contact.note.title}</h2>
          <div className="space-y-2">
            {t.contact.note.items.map((item: string, index: number) => (
              <p key={index} className="text-gray-600">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
