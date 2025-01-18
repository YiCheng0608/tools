import { Metadata } from "next";
import messages from "@/app/i18n";
import ColorConverter from "@/components/widgets/ColorConverter";

interface Props {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;
  const t = messages[lang as keyof typeof messages];

  return {
    title: t.tools.list.colorConverter.label,
    description: t.tools.list.colorConverter.description,
    alternates: {
      languages: {
        "en-US": `/en/colorConverter`,
        "zh-TW": `/zh/colorConverter`,
        "ja-JP": `/ja/colorConverter`,
        "ko-KR": `/ko/colorConverter`,
      },
    },
  };
}

export default function ColorConverterPage({ params: { lang } }: Props) {
  const t = messages[lang as keyof typeof messages];

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {t.tools.list.colorConverter.label}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <ColorConverter formats={t.tools.list.colorConverter.formats} />
      </div>
    </div>
  );
}
