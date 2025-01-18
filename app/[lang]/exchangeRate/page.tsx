import { Metadata } from "next";
import messages from "@/app/i18n";
import ExchangeRate from "@/components/widgets/ExchangeRate";
import { exchangeRateService } from "@/utils/api/services/exchangeRateService";

interface Props {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;
  const t = messages[lang as keyof typeof messages];

  return {
    title: t.tools.list.exchangeRate.label,
    description: t.tools.list.exchangeRate.description,
    alternates: {
      languages: {
        "en-US": `/en/exchangeRate`,
        "zh-TW": `/zh/exchangeRate`,
        "ja-JP": `/ja/exchangeRate`,
        "ko-KR": `/ko/exchangeRate`,
      },
    },
  };
}

export default async function ExchangeRatePage({ params: { lang } }: Props) {
  const t = messages[lang as keyof typeof messages];

  // 在 server side 獲取初始匯率數據
  const initialData = await exchangeRateService.getExchangeRates();

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {t.tools.list.exchangeRate.label}
      </h1>
      <ExchangeRate
        formats={t.tools.list.exchangeRate.formats}
        initialData={initialData}
      />
    </div>
  );
}
