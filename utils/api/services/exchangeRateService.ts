import { ApiService } from "../apiService";

interface RawExchangeRate {
  Exrate: number;
  UTC: string;
}

interface ExchangeRateResponse {
  [key: string]: RawExchangeRate;
}

interface Currency {
  code: string;
  rate: number;
  lastUpdate: string;
}

class ExchangeRateService extends ApiService<ExchangeRateResponse> {
  constructor() {
    super("https://tw.rter.info/capi.php");
  }

  // 解析貨幣代碼
  private parseCurrencyCode(key: string): string {
    // 移除 "USD" 前綴，得到實際貨幣代碼
    return key.replace("USD", "");
  }

  // 取得所有匯率
  async getExchangeRates(): Promise<{
    currencies: Currency[];
    lastUpdate: string;
  }> {
    try {
      // 在 server side 使用 node-fetch 或 axios
      const response = await fetch("https://tw.rter.info/capi.php", {
        next: { revalidate: 60 }, // 每分鐘重新驗證數據
      });
      const data = await response.json();

      const currencies: Currency[] = [];
      let lastUpdate = "";

      // 處理數據的邏輯保持不變...
      Object.entries(data).forEach(([key, data]: [string, any]) => {
        if (!key.startsWith("USD") || key === "USDUSD") return;

        const currencyCode = this.parseCurrencyCode(key);

        currencies.push({
          code: currencyCode,
          rate: data.Exrate,
          lastUpdate: data.UTC,
        });

        if (!lastUpdate || data.UTC > lastUpdate) {
          lastUpdate = data.UTC;
        }
      });

      currencies.push({
        code: "USD",
        rate: 1,
        lastUpdate: lastUpdate,
      });

      return {
        currencies: currencies.sort((a, b) => a.code.localeCompare(b.code)),
        lastUpdate,
      };
    } catch (error) {
      throw new Error("Failed to fetch exchange rates");
    }
  }

  // 匯率轉換計算
  convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    rates: Currency[]
  ): number {
    const fromRate = rates.find((r) => r.code === fromCurrency)?.rate || 0;
    const toRate = rates.find((r) => r.code === toCurrency)?.rate || 0;

    if (!fromRate || !toRate) {
      throw new Error("Invalid currency code");
    }

    // 先轉換成 USD，再轉換成目標貨幣
    const usdAmount = amount / fromRate;
    const result = usdAmount * toRate;

    return result;
  }
}

export const exchangeRateService = new ExchangeRateService();
