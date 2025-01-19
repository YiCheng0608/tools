import { Metadata } from "next";
import ArticleGenerator from "@/components/widgets/ArticleGenerator";
import messages, { languages } from "@/app/i18n";

interface Props {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;
  const t = messages[lang as keyof typeof messages];

  return {
    title: t.tools.list.articleGenerator.label,
    description: t.tools.list.articleGenerator.description,
    alternates: {
      languages: {
        "en-US": `/en/articleGenerator`,
        "zh-TW": `/zh/articleGenerator`,
        "ja-JP": `/ja/articleGenerator`,
        "ko-KR": `/ko/articleGenerator`,
      },
    },
  };
}

export default function ArticleGeneratorPage({ params: { lang } }: Props) {
  const t = messages[lang as keyof typeof messages];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-center gap-2">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {t.tools.list.articleGenerator.label}
        </h1>
        <span className="bg-blue-500 h-fit text-white text-xs px-1.5 py-0.5 rounded font-medium">
          BETA
        </span>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <ArticleGenerator
          formats={t.tools.list.articleGenerator.formats}
          lang={languages[lang as keyof typeof languages]}
        />
      </div>
    </div>
  );
}
