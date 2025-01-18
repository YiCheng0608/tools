import { Metadata } from "next";
import messages from "@/app/i18n";
import ImageConverter from "@/components/widgets/ImageConverter";

interface Props {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;
  const t = messages[lang as keyof typeof messages];

  return {
    title: t.tools.list.imageConverter.label,
    description: t.tools.list.imageConverter.description,
    alternates: {
      languages: {
        "en-US": `/en/imageConverter`,
        "zh-TW": `/zh/imageConverter`,
        "ja-JP": `/ja/imageConverter`,
        "ko-KR": `/ko/imageConverter`,
      },
    },
  };
}

export default function ImageConverterPage({ params: { lang } }: Props) {
  const t = messages[lang as keyof typeof messages];

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {t.tools.list.imageConverter.label}
      </h1>
      <ImageConverter formats={t.tools.list.imageConverter.formats} />
    </div>
  );
}
