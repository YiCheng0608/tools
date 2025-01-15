import { Metadata } from "next";
import Roulette from "@/components/widgets/Roulette";
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
    title: t.tools.list.roulette.label,
    description: t.tools.list.roulette.description,
    alternates: {
      languages: {
        "en-US": `/en/roulette`,
        "zh-TW": `/zh/roulette`,
      },
    },
  };
}

export default function RoulettePage({ params: { lang } }: Props) {
  const t = messages[lang as keyof typeof messages];

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {t.tools.list.roulette.label}
        </h1>
        <Roulette texts={t.tools.list.roulette} />
      </div>
    </>
  );
}
