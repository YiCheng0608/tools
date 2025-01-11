import { Metadata } from "next";
import Calculator from "@/components/widgets/Calculator";
import AdLayout from "@/components/AdLayout";
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
    title: t.widgets.calculator.title,
    description: t.widgets.calculator.description,
    keywords: t.meta.keywords,
    alternates: {
      languages: {
        "en-US": `/en/calculator`,
        "zh-TW": `/zh/calculator`,
      },
    },
  };
}

export default function CalculatorPage({ params: { lang } }: Props) {
  const t = messages[lang as keyof typeof messages];

  return (
    <AdLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {t.widgets.calculator.title}
        </h1>
        <Calculator />
      </div>
    </AdLayout>
  );
}
