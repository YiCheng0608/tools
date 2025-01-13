"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import messages from "@/app/i18n";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const t = messages[lang as keyof typeof messages];

  useEffect(() => {
    // 檢查是否已經有 cookie 設定
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = {
      essential: true,
      analytics: true,
    };
    savePreferences(preferences);
  };

  const handleAcceptEssential = () => {
    const preferences = {
      essential: true,
      analytics: false,
    };
    savePreferences(preferences);
  };

  const savePreferences = (preferences: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setIsVisible(false);
    // 如果用戶同意分析，重新載入頁面以啟用 GA
    if (preferences.analytics) {
      window.location.reload();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-500 ease-in-out translate-y-0">
      <div className="bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {!showPreferences ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                <p className="mb-2">{t.cookieConsent.message}</p>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {t.cookieConsent.preferences}
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleAcceptEssential}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {t.cookieConsent.essential}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {t.cookieConsent.acceptAll}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t.cookieConsent.title}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      {t.cookieConsent.essentialTitle}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t.cookieConsent.essentialDesc}
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked
                      disabled
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      {t.cookieConsent.analyticsTitle}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t.cookieConsent.analyticsDesc}
                    </p>
                  </div>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      id="analytics"
                      name="analytics"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      onChange={(e) =>
                        savePreferences({
                          essential: true,
                          analytics: e.target.checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  {t.cookieConsent.back}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
