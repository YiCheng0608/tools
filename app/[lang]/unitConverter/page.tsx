import { Metadata } from "next";
import messages from "@/app/i18n";
import UnitConverter from "@/components/widgets/UnitConverter";

interface Props {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;
  const t = messages[lang as keyof typeof messages];

  return {
    title: t.tools.list.unitConverter.label,
    description: t.tools.list.unitConverter.description,
    alternates: {
      languages: {
        "en-US": `/en/unitConverter`,
        "zh-TW": `/zh/unitConverter`,
        "ja-JP": `/ja/unitConverter`,
        "ko-KR": `/ko/unitConverter`,
      },
    },
  };
}

export default function UnitConverterPage({ params: { lang } }: Props) {
  const t = messages[lang as keyof typeof messages];

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {t.tools.list.unitConverter.label}
      </h1>
      <UnitConverter
        label={t.tools.list.unitConverter.label}
        units={t.tools.list.unitConverter.units}
      />
    </div>
  );
}
