"use client";

import { useState, useEffect, useRef } from "react";
import { exchangeRateService } from "@/utils/api/services/exchangeRateService";
import { SwapIcon } from "@/components/icons";

interface ExchangeRateProps {
  formats: {
    from: string;
    to: string;
    amount: string;
    result: string;
    convert: string;
    loading: string;
    error: string;
    lastUpdate: string;
    swap: string;
    attribution: {
      text: string;
      api: string;
      license: string;
      comply: string;
    };
  };
  initialData: {
    currencies: Currency[];
    lastUpdate: string;
  };
}

interface Currency {
  code: string;
  rate: number;
  lastUpdate: string;
}

export default function ExchangeRate({
  formats,
  initialData,
}: ExchangeRateProps) {
  const [currencies, setCurrencies] = useState<Currency[]>(
    initialData.currencies
  );
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdate, setLastUpdate] = useState(
    new Date(initialData.lastUpdate).toLocaleString()
  );

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // 處理點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 檢查貨幣代碼是否有效
  const isValidCurrencyCode = (code: string) => {
    // 特殊貨幣代碼對應表
    const specialCases: Record<string, string> = {
      EUR: "🇪🇺", // 歐元
      USD: "🇺🇸", // 美元
      GBP: "🇬🇧", // 英鎊
      AUD: "🇦🇺", // 澳元
      NZD: "🇳🇿", // 紐西蘭元
      XDR: "🌐", // 特別提款權
      XAU: "🏅", // 黃金
      XAG: "🥈", // 白銀
      BTC: "₿", // 比特幣
    };

    // 檢查是否為特殊貨幣
    if (specialCases[code]) {
      return true;
    }

    try {
      const offset = 0x1f1e6;
      const A = 0x41;

      const firstChar = code.charCodeAt(0) - A + offset;
      const secondChar = code.charCodeAt(1) - A + offset;

      // 檢查是否為有效的 code point
      if (isNaN(firstChar) || isNaN(secondChar)) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  // 過濾貨幣選項
  const filteredFromCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(fromSearch.toLowerCase()) &&
      isValidCurrencyCode(currency.code)
  );

  const filteredToCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(toSearch.toLowerCase()) &&
      isValidCurrencyCode(currency.code)
  );

  // 處理貨幣交換
  const handleSwap = () => {
    if (!toCurrency) return;

    // 交換貨幣代碼
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    // 同時更新搜尋框的顯示值
    setFromSearch(toCurrency);
    setToSearch(fromCurrency);

    setResult(null);
  };

  // 獲取國旗表情符號
  const getFlagEmoji = (countryCode: string) => {
    // 特殊貨幣代碼對應表
    const specialCases: Record<string, string> = {
      EUR: "🇪🇺", // 歐元
      USD: "🇺🇸", // 美元
      GBP: "🇬🇧", // 英鎊
      AUD: "🇦🇺", // 澳元
      NZD: "🇳🇿", // 紐西蘭元
      XDR: "🌐", // 特別提款權
      XAU: "🏅", // 黃金
      XAG: "🥈", // 白銀
      BTC: "₿", // 比特幣
    };

    // 檢查是否為特殊貨幣
    if (specialCases[countryCode]) {
      return specialCases[countryCode];
    }

    try {
      // 一般貨幣使用國家代碼
      const offset = 0x1f1e6;
      const A = 0x41;

      const firstChar = countryCode.charCodeAt(0) - A + offset;
      const secondChar = countryCode.charCodeAt(1) - A + offset;

      // 檢查是否為有效的 code point
      if (isNaN(firstChar) || isNaN(secondChar)) {
        return "💱"; // 如果無法轉換，返回一般貨幣符號
      }

      return String.fromCodePoint(firstChar, secondChar);
    } catch (error) {
      return "💱"; // 發生錯誤時返回一般貨幣符號
    }
  };

  // 處理轉換
  const handleConvert = () => {
    if (!toCurrency || !amount) return;

    try {
      const convertedAmount = exchangeRateService.convertCurrency(
        Number(amount),
        fromCurrency,
        toCurrency,
        currencies
      );
      setResult(convertedAmount);
      setError("");
    } catch (err) {
      setError(formats.error);
      setResult(null);
    }
  };

  // 處理來源貨幣的 blur
  const handleFromBlur = () => {
    setTimeout(() => {
      const matchedCurrency = filteredFromCurrencies.find(
        (currency) => currency.code.toLowerCase() === fromSearch.toLowerCase()
      );

      if (matchedCurrency) {
        setFromCurrency(matchedCurrency.code);
        setFromSearch(matchedCurrency.code); // 保持顯示選中的貨幣代碼
      } else {
        setFromSearch(fromCurrency); // 恢復顯示原本選中的貨幣代碼
      }
      setShowFromDropdown(false);
      setResult(null);
    }, 200);
  };

  // 處理目標貨幣的 blur
  const handleToBlur = () => {
    setTimeout(() => {
      const matchedCurrency = filteredToCurrencies.find(
        (currency) => currency.code.toLowerCase() === toSearch.toLowerCase()
      );

      if (matchedCurrency) {
        setToCurrency(matchedCurrency.code);
        setToSearch(matchedCurrency.code); // 保持顯示選中的貨幣代碼
      } else {
        setToSearch(toCurrency); // 恢復顯示原本選中的貨幣代碼
      }
      setShowToDropdown(false);
      setResult(null);
    }, 200);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
          {/* From Currency */}
          <div ref={fromRef} className="relative">
            <label className="block text-sm font-medium mb-1">
              {formats.from}
            </label>
            <input
              type="text"
              className={`w-full p-2 border rounded ${
                fromCurrency ? "text-gray-900 font-medium" : "text-gray-500"
              }`}
              value={fromSearch}
              onChange={(e) => {
                setFromSearch(e.target.value);
                setShowFromDropdown(true);
              }}
              onFocus={() => {
                setShowFromDropdown(true);
                setFromSearch(""); // 清空搜尋框，方便重新輸入
              }}
              onBlur={handleFromBlur}
              placeholder={fromCurrency}
              disabled={loading}
            />
            {showFromDropdown && filteredFromCurrencies.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredFromCurrencies.map((currency) => (
                  <button
                    key={currency.code}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 ${
                      currency.code === fromCurrency
                        ? "text-blue-600 font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setFromCurrency(currency.code);
                      setFromSearch(currency.code);
                      setShowFromDropdown(false);
                      setResult(null);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <span>{getFlagEmoji(currency.code.slice(0, 2))}</span>
                    <span>{currency.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title={formats.swap}
          >
            <SwapIcon className="w-6 h-6 text-gray-600" />
          </button>

          {/* To Currency */}
          <div ref={toRef} className="relative">
            <label className="block text-sm font-medium mb-1">
              {formats.to}
            </label>
            <input
              type="text"
              className={`w-full p-2 border rounded ${
                toCurrency ? "text-gray-900 font-medium" : "text-gray-500"
              }`}
              value={toSearch}
              onChange={(e) => {
                setToSearch(e.target.value);
                setShowToDropdown(true);
              }}
              onFocus={() => {
                setShowToDropdown(true);
                setToSearch(""); // 清空搜尋框，方便重新輸入
              }}
              onBlur={handleToBlur}
              placeholder={toCurrency || formats.to}
              disabled={loading}
            />
            {showToDropdown && filteredToCurrencies.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredToCurrencies.map((currency) => (
                  <button
                    key={currency.code}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 ${
                      currency.code === toCurrency
                        ? "text-blue-600 font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setToCurrency(currency.code);
                      setToSearch(currency.code);
                      setShowToDropdown(false);
                      setResult(null);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <span>{getFlagEmoji(currency.code.slice(0, 2))}</span>
                    <span>{currency.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {formats.amount}
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setResult(null);
            }}
            min="0"
            step="any"
            disabled={loading}
          />
        </div>

        {/* Convert Button */}
        <button
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          onClick={handleConvert}
          disabled={loading || !toCurrency || !amount}
        >
          {loading ? formats.loading : formats.convert}
        </button>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
        )}

        {/* Result */}
        {result !== null && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-500">
              {formats.result}
            </div>
            <div className="text-lg font-bold text-gray-900">
              {`${amount} ${fromCurrency} = ${result} ${toCurrency}`}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {formats.lastUpdate}: {lastUpdate}
            </div>
          </div>
        )}

        {/* Attribution */}
        <div className="text-xs text-gray-500 mt-4">
          <p>
            {formats.attribution.text}{" "}
            <a
              href="https://tw.rter.info/howto_currencyapi.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {formats.attribution.api}
            </a>
            {"," + formats.attribution.comply}
            <a
              href="https://creativecommons.org/licenses/by-sa/3.0/tw/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {formats.attribution.license}
            </a>{" "}
            。
          </p>
        </div>
      </div>
    </div>
  );
}
