import { Metadata } from "next";
import messages from "@/app/i18n";
import QRCodeGenerator from "@/components/widgets/QRCodeGenerator";

interface Props {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;
  const t = messages[lang as keyof typeof messages];

  return {
    title: t.tools.list.qrGenerator.label,
    description: t.tools.list.qrGenerator.description,
    alternates: {
      languages: {
        "en-US": `/en/qrGenerator`,
        "zh-TW": `/zh/qrGenerator`,
      },
    },
  };
}

export default function QRGeneratorPage({ params: { lang } }: Props) {
  const t = messages[lang as keyof typeof messages];

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {t.tools.list.qrGenerator.label}
      </h1>
      <QRCodeGenerator label={t.tools.list.qrGenerator.label} />
    </div>
  );
}
